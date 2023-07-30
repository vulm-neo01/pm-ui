import React, {useEffect, useState} from 'react'
import { useParams } from 'next/navigation';
import { getManagerIdList, getManagerList, getMemberList } from '@/app/api/projectAPI';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '@/app/api/apiBase';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const GetMembers = () => {
    const params = useParams();
    const id = params.projectId;
    const userId = Cookies.get('userId');
    const [members, setMembers] = useState(null);
    const [managers, setManagers] = useState(null);
    const [managerIds, setManagerIds] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('MEMBER');
    const [emailError, setEmailError] = useState('');
    const [dialogs, setDialogs] = useState({});

    const handleClickOpen = (userId) => {
        setDialogs((prevDialogs) => ({
            ...prevDialogs,
            [userId]: true,
        }));
    };

    const handleClose = (userId) => {
        setDialogs((prevDialogs) => ({
            ...prevDialogs,
            [userId]: false,
        }));
    };
    const handleOpenModal = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleCloseModal = (e) => {
        e.preventDefault();
        setShowModal(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email === '') {
            setEmailError('Email is required.');
            return;
        } else {
            setEmailError('');
        }
        
        const postData = {
            email,
            role: role.toUpperCase(),
            'projectId': localStorage.getItem('projectId'),
            'inviterId': Cookies.get('userId'),
            'inviterName': Cookies.get('user'),
        }
        console.log(postData)

        try {
            const res = await fetch(`${API_BASE_URL}/check-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( email ),
            });

            const emailExist = await res.json();
            console.log('Email ' + email + ' exist?: ' + emailExist);

            if(emailExist === true) {
                const response = await fetch(`${API_BASE_URL}/api/notifications/invite`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${Cookies.get('token')}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                        postData
                    ),
                });
    
                if (response.ok) {
                    // Xử lý phản hồi từ server nếu đăng nhập thành công
                    const data = await response.json();
                    alert("Send invite to user successfully! Waiting for responding.")
                    console.log('Post successful!', data);
                    setShowModal(false);
                    setEmail('');
                } else {
                    // Xử lý phản hồi từ server nếu đăng nhập không thành công
                    console.log('Post failed!');
                    console.log(postData)
                }
            } else {
                setEmailError('Email not exists!');
                return;
            }
            // Xử lý phản hồi từ API tại đây
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        getManagerList(id)
            .then((responseData) => {
                setManagers(responseData); // Cập nhật dữ liệu vào state data
                console.log(responseData);
            });
        getMemberList(id)
            .then((responseData) => {
                setMembers(responseData); // Cập nhật dữ liệu vào state data
                console.log(responseData);
            });
        getManagerIdList(id)
            .then((responseData) => {
                setManagerIds(responseData); // Cập nhật dữ liệu vào state data
                console.log(responseData);
            });
    }, []);

    const handleTurnIntoManager = async (userId) => {
        const postData = {
            projectId: id,
            userId: userId,
        }
        try {
            const response = await fetch(`${API_BASE_URL}/api/projects/memberToManager`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    postData
                ),
            });
            
            console.log('Change successful!');
            handleClose(userId);
            alert('Change successful!');
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <>
            <div className="grid grid-rows-2 gap-6">
                {/* Phần 1: Members */}
                <div className="bg-gray-100 rounded-lg p-4">
                    <strong className="block mb-4 text-xl">Members</strong>
                    {members ? (
                    <div className="flex flex-wrap gap-2">
                        {members.map((member) => (
                            <div className="flex items-center" key={member.userId}>
                                <section className="flex items-center hover:bg-gray-200 rounded-lg p-2">
                                    <Link href={`/your-home/info/${member.userId}`}>
                                        <div className="flex items-center hover:bg-gray-200 rounded-lg p-2">
                                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
                                                {member.username.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="ml-2 mr-2 text-blue-500">{member.username}</span>
                                        </div>
                                    </Link>
                                    {managerIds && managerIds.length > 0 && managerIds.includes(userId) && (
                                        <ArrowDownwardIcon className="cursor-pointer text-gray-500 hover:bg-sky-500 rounded-2xl" onClick={() => handleClickOpen(member.userId)} />
                                    )}
                                </section>
                                {/* Dialog */}
                                <Dialog open={dialogs[member.userId]} onClose={() => handleClose(member.userId)}>
                                    <DialogTitle>Turn {member.username} into MANAGER?</DialogTitle>
                                    <DialogActions>
                                        <Button onClick={() => handleTurnIntoManager(member.userId)} color="primary">
                                            Yes
                                        </Button>
                                        <Button onClick={() => handleClose(member.userId)} color="primary">
                                            Close
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        ))}
                    </div>
                    ) : (
                    <h1>Members not found</h1>
                    )}
                </div>

                {/* Phần 2: Managers */}
                <div className="bg-gray-100 rounded-lg p-4">
                    <strong className="block mb-4 text-xl">Managers</strong>
                    {managers ? (
                    <div className="flex flex-wrap gap-2">
                        {managers.map((manager) => (
                            <div className="flex items-center" key={manager.userId}>
                                <Link href={`/your-home/info/${manager.userId}`}>
                                    <section className="flex items-center hover:bg-gray-200 rounded-lg p-2">
                                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">
                                            {manager.username.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="ml-2 mr-2 text-green-500">{manager.username}</span>
                                    </section>
                                </Link>
                            </div>
                        ))}
                    </div>
                    ) : (
                    <h1>Managers not found</h1>
                    )}
                </div>
            </div>


            {/* Button "Add Member" */}
            {managerIds && managerIds.length > 0 && managerIds.includes(userId) && (
                <div className="flex justify-center mt-4">
                    <button onClick={handleOpenModal} className="bg-blue-500 text-white hover:bg-blue-600 font-semibold py-2 px-4 rounded focus:ring">
                        Add Member
                    </button>
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-2 w-full max-w-sm rounded-md shadow-md border-2 mt-8">
                        <button className=" text-gray-500" onClick={handleCloseModal}>
                            {/* Dấu X (hoặc biểu tượng đóng khác) */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h1 className="text-2xl font-bold mb-2 text-center">Add new member</h1>
                        <form>
                        {/* Các trường thông tin ở đây */}
                        <div className="mb-1">
                            <label className="block text-gray-700 text-sm font-bold" htmlFor="email">
                            Member Email
                            </label>
                            <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                            {emailError && <strong className="text-red-500 text-sm">{emailError}</strong>}
                        </div>
                        <div className="mb-1">
                            <label className="block text-gray-700 text-sm font-bold" htmlFor="role">
                                Role
                            </label>
                            <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="MEMBER">Member</option>
                                <option value="MANAGER">Manager</option>
                            </select>
                        </div>
                        <div className="flex justify-center">
                            <button
                            className="bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
                            type="submit"
                            onClick={handleSubmit}
                            >
                            Submit
                            </button>
                        </div>
                        </form>
                    </div>
                </div>
            )}

        </>
    )
}

export default GetMembers
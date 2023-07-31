import React, {useEffect, useState} from 'react'
import { useParams } from 'next/navigation';
import { API_BASE_URL } from '@/app/api/apiBase';
import Cookies from 'js-cookie';
import { getMemberTaskList, getTaskDetails } from '@/app/api/taskAPI';
import { getManagerIdList, getUserList } from '@/app/api/projectAPI';
import Link from 'next/link';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const TaskDetail = () => {
    const params = useParams();
    const id = params.taskId;
    const userId = Cookies.get('userId');
    const [data, setData] = useState(null);

    const [isEditing, setIsEditing] = useState(false);
    
    const [taskName, setTaskName] = useState(data ? data.taskName : 'New Task Name');
    const [description, setDescription] = useState(data ? data.description : 'New Description');
    const [progress, setProgress] = useState(data ? data.progress : 'READY');
    const [priority, setPriority] = useState(data ? data.priority : 'LOW');
    const [startDate, setStartDate] = useState(data ? data.startDate : '');
    const [endDate, setEndDate] = useState(data ? data.endDate : '');

    const [members, setMembers] = useState(null);
    const [managerIds, setManagerIds] = useState(null);
    const [memberIds, setMemberIds] = useState(null);
    const [email, setEmail] = useState('');

    const [projectUsers, setProjectUsers] = useState(null);
    const [restUsers, setRestUsers] = useState(null);

    const [dialogs, setDialogs] = useState({});
    const [dialogss, setDialogss] = useState({});

    const handleClickOpenDown = (userId) => {
        setDialogs((prevDialogs) => ({
            ...prevDialogs,
            [userId]: true,
        }));
    };

    const handleCloseDown = (userId) => {
        setDialogs((prevDialogs) => ({
            ...prevDialogs,
            [userId]: false,
        }));
    };

    const handleClickOpenUp = (userId) => {
        setDialogss((prevDialogss) => ({
            ...prevDialogss,
            [userId]: true,
        }));
    };

    const handleCloseUp = (userId) => {
        setDialogss((prevDialogss) => ({
            ...prevDialogss,
            [userId]: false,
        }));
    };

    useEffect(() => {
        // Gọi hàm fetchUserData từ module api.js
        getTaskDetails(id)
            .then((responseData) => {
                setData(responseData); // Cập nhật dữ liệu vào state data
                setMemberIds(responseData.memberIds)
                setTaskName(responseData.taskName)
                setDescription(responseData.description)
                setStartDate(responseData.startDate)
                setEndDate(responseData.endDate)
                setPriority(responseData.priority)
                setProgress(responseData.progress)
                localStorage.setItem('projectId', responseData.projectId)
                localStorage.setItem('taskId', responseData.taskId)
                console.log(responseData);
            });

        getMemberTaskList(id)
            .then((responseData) => {
                setMembers(responseData); // Cập nhật dữ liệu vào state data
                console.log('Members task: ' + responseData);
            });
        getManagerIdList(localStorage.getItem('projectId'))
            .then((responseData) => {
                setManagerIds(responseData); // Cập nhật dữ liệu vào state data
                console.log('ManagerIds: ' + responseData);
            });
        getUserList(localStorage.getItem('projectId'))
            .then((responseData) => {
                setProjectUsers(responseData); // Cập nhật dữ liệu vào state data
                console.log(responseData);
            });
            if (projectUsers) {
                // Filter out anotherUsers based on userId
                const anotherUsers = projectUsers.filter((projectUser) => !members.some((member) => member.userId === projectUser.userId));
                // Set the state with anotherUsers
                setRestUsers(anotherUsers);
                console.log(anotherUsers)
            }
    }, [members]);

    const getProgressClass = (progress) => {
        switch (progress) {
            case 'READY':
                return 'text-blue-500'; // Màu xanh cho giá trị READY
            case 'DOING':
                return 'text-yellow-500'; // Màu vàng cho giá trị DOING
            case 'DONE':
                return 'text-green-500'; // Màu xanh lá cho giá trị DONE
            case 'OUTDATED':
                return 'text-red-500'; // Màu đỏ cho giá trị OUTDATED
            default:
                return ''; // Không áp dụng lớp CSS cho các giá trị khác
            }
    };

    const getPriorityClass = (priority) => {
        switch (priority) {
            case 'MEDIUM':
                return 'text-yellow-500';
            case 'LOW':
                return 'text-green-500';
            case 'HIGH':
                return 'text-red-500';
            default:
                return '';
            }
    };

    const handleRemoveFromTask = async (userId) => {
        const postData = {
            taskId: localStorage.getItem('taskId'),
            userId: userId,
        }
        try {
            const response = await fetch(`${API_BASE_URL}/api/tasks/remove`, {
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
            handleCloseDown(userId);
            alert('Change successful!');
        } catch (error) {
            console.error('Error:', error);
        }
    }
    const handleAddToTask = async (userId) => {
        const postData = {
            taskId: localStorage.getItem('taskId'),
            userId: userId,
        }
        try {
            const response = await fetch(`${API_BASE_URL}/api/tasks/add`, {
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
            handleCloseUp(userId);
            alert('Change successful!');
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleSubmit = async (e) => {
    
        const postData = {
            "taskId": id,
            taskName,
            description,
            priority,
            progress,
            startDate,
            endDate,
        }
        console.log(postData)

        try {
            const response = await fetch(`${API_BASE_URL}/api/tasks/update`, {
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
                console.log('Post successful!', data);
                setIsEditing(false);
                alert('Task Information changed successfully!!!')
                window.location.reload();
            } else {
                // Xử lý phản hồi từ server nếu đăng nhập không thành công
                console.log('Post failed!');
            }
            // Xử lý phản hồi từ API tại đây
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="grid grid-cols-2 gap-6">
            {/* Phần Details Info */}
            <div className="border-r-2 bg-gray-100 rounded-lg p-4">
                <strong className="text-xl font-semibold">Details Information:</strong>
                <br />
                {data ? (
                <>
                    <div className='flex'>
                            {!isEditing ? (
                            <>
                                <div className="mr-12 mt-2">
                                    <div className="mb-4 opacity-transition hover:opacity-80">
                                        <strong>Task Name:</strong> {data.taskName}
                                    </div>
                                    <div className="mb-4 opacity-transition hover:opacity-80">
                                        <strong>Description:</strong> {data.description}
                                    </div>
                                    <div className="mb-4 opacity-transition hover:opacity-80">
                                        <strong>Priority:  </strong>
                                        <span className={`text-lg font-semibold ${getPriorityClass(data.priority)}`}>
                                            {data.priority}
                                        </span>
                                    </div>
                                    <div className="mb-4 opacity-transition hover:opacity-80">
                                        <strong>Progress:  </strong>
                                        <span className={`text-lg font-semibold ${getProgressClass(data.progress)}`}>
                                            {data.progress}
                                        </span>
                                    </div>
                                    <div className="mb-4 opacity-transition hover:opacity-80">
                                        <strong>Start Date:</strong> {data.startDate}
                                    </div>
                                    <div className="mb-4 opacity-transition hover:opacity-80">
                                        <strong>End Date:</strong> {data.endDate}
                                    </div>
                                    <div className="mb-4 opacity-transition hover:opacity-80">
                                        <strong>Create By:</strong> {data.createdBy}
                                    </div>
                                </div>
                            </>
                                ) : (
                            <>
                                <div className='mr-12 mt-2'>
                                    <div className='mb-4 opacity-transition hover:opacity-80'>
                                        <strong>Task Name:  </strong>
                                        <input 
                                            type='text'
                                            value={taskName}
                                            onChange={(e) => setTaskName(e.target.value)}
                                            placeholder={data.taskName}
                                        />
                                    </div>
                                    <div className='mb-4 opacity-transition hover:opacity-80'>
                                        <strong>Description:  </strong>
                                        <input 
                                            type='text'
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder={data.description}
                                        />
                                    </div>
                                    <div className='mb-4 opacity-transition hover:opacity-80'>
                                        <strong>Priority:  </strong>
                                        <select
                                            value={priority}
                                            onChange={(e) => setPriority(e.target.value)}
                                        >
                                            <option value="LOW">LOW</option>
                                            <option value="MEDIUM">MEDIUM</option>
                                            <option value="HIGH">HIGH</option>
                                        </select>
                                    </div>
                                    <div className='mb-4 opacity-transition hover:opacity-80'>
                                        <strong>Progress:  </strong>
                                        <select
                                            value={progress}
                                            onChange={(e) => setProgress(e.target.value)}
                                        >
                                            <option value="READY">READY</option>
                                            <option value="DOING">DOING</option>
                                            <option value="DONE">DONE</option>
                                            <option value="EXPIRED">OUTDATED</option>
                                        </select>
                                    </div>
                                    <div className='mb-4 opacity-transition hover:opacity-80'>
                                        <strong>Start Date:  </strong>
                                        <input 
                                            type='date'
                                            value={startDate}
                                            placeholder={data.startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                        />
                                    </div>
                                    <div className='mb-4 opacity-transition hover:opacity-80'>
                                        <strong>End Date:  </strong>
                                        <input
                                            type='date'
                                            value={endDate}
                                            placeholder={data.endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                        />
                                    </div>
                                    <div className='mb-4 opacity-transition hover:opacity-80'>
                                        <strong>Create By:  </strong> {data.createdBy}
                                    </div>
                                </div>
                            </>
                                )
                            }
                        </div>
                    
                { isEditing ? (
                    <>
                        <button onClick={() => setIsEditing(false)} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded focus:ring mt-2">
                            Cancel
                        </button>
                        <button onClick={handleSubmit} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded focus:ring mt-2 ml-5">
                            Save
                        </button>
                    </>
                ) : (
                    <> 
                        {memberIds && memberIds.includes(userId) || (managerIds && managerIds.includes(userId)) ? (
                            <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded focus:ring mt-5">
                                Edit Information
                            </button>
                        ) : (
                            <p></p>
                        )}
                    </>
                )}
                </>
            ) : (
                <h1>Loading</h1>
            )}
            </div>
            <div className="flex flex-col">
                <div className="bg-gray-100 rounded-lg p-4 mb-2">
                    <div className="flex justify-between items-center mb-4">
                        <strong className="text-xl">Members for this Task</strong>
                    </div>

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
                                        <ArrowDownwardIcon className="cursor-pointer text-gray-500 hover:bg-sky-500 rounded-2xl" onClick={() => handleClickOpenDown(member.userId)} />
                                    )}
                                </section>
                                {/* Dialog */}
                                <Dialog open={dialogs[member.userId]} onClose={() => handleCloseDown(member.userId)}>
                                    <DialogTitle>Remove {member.username} out of this task?</DialogTitle>
                                    <DialogActions>
                                        <Button onClick={() => handleRemoveFromTask(member.userId)} color="primary">
                                            Yes
                                        </Button>
                                        <Button onClick={() => handleCloseDown(member.userId)} color="primary">
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
                {managerIds && managerIds.length > 0 && managerIds.includes(userId) && (
                    <div className="bg-gray-100 rounded-lg p-4 mt-2">
                        <div className="flex justify-between items-center">
                            <strong className="text-xl">Another Member of this Project</strong>
                        </div>

                        {restUsers ? (
                        <div className="flex flex-wrap gap-2">
                            {restUsers.map((member) => (
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
                                            <ArrowUpwardIcon className="cursor-pointer text-gray-500 hover:bg-sky-500 rounded-2xl" onClick={() => handleClickOpenUp(member.userId)} />
                                        )}
                                    </section>
                                    {/* Dialog */}
                                    <Dialog open={dialogss[member.userId]} onClose={() => handleCloseUp(member.userId)}>
                                        <DialogTitle>Add {member.username} to this task?</DialogTitle>
                                        <DialogActions>
                                            <Button onClick={() => handleAddToTask(member.userId)} color="primary">
                                                Yes
                                            </Button>
                                            <Button onClick={() => handleCloseUp(member.userId)} color="primary">
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

                )}
            </div>
        </div>
    )
}

export default TaskDetail
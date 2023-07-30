"use client"
import React, {useState, useEffect} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link';
import { IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '@/app/api/apiBase';
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from '@/app/api/axios';
import { getManagerIdList } from '@/app/api/projectAPI';

const page = () => {
    const [projects, setProjects] = useState(null);
    const userId = Cookies.get('userId');
    
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [progress, setProgress] = useState('READY');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    
    // State để lưu id của project đang được chọn để xóa
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const router = useRouter();

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/users/projects`, {
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`,
            },
        })
            .then((response) => response.json())
            .then((responseData) => {
                setProjects(responseData); // Cập nhật dữ liệu vào state data
                console.log(responseData)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    
    const handleSubmit = async (e) => {
        // e.preventDefault();
        
        const postData = {
            projectName,
            description,
            progress: progress.toUpperCase(),
            startDate,
            endDate,
            "user": Cookies.get('user')
        }
        console.log(postData)

        try {
            const response = await fetch(`${API_BASE_URL}/api/projects`, {
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
                setShowModal(false);
            } else {
                // Xử lý phản hồi từ server nếu đăng nhập không thành công
                console.log('Post failed!');
                console.log(postData)
            }
            // Xử lý phản hồi từ API tại đây
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    const [managers, setManagers] = useState(null);
    
    const handleDelete = async (e) => {

        try {
            const res = await fetch(`${API_BASE_URL}/api/projects/managerIds/${selectedProjectId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`,
                }
            });

            const responseData = await res.json();
            console.log(responseData);
            console.log(userId);
            
            if (responseData && Array.isArray(responseData) && responseData.includes(userId)) {
                try {
                    await fetch(`${API_BASE_URL}/api/projects/${selectedProjectId}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${Cookies.get('token')}`,
                        }
                    });
                    
                    console.log('Delete successful!');
                    setSelectedProjectId(null);
                    window.location.reload();
                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                alert("You are not manager of this project!")
                setSelectedProjectId(null);
                return;
            }
            // Xử lý phản hồi từ API tại đây
        } catch (error) {
            console.error('Error:', error);
        }

        // if(managers && managers.includes(userId)){
        //     try {
        //         const response = await fetch(`${API_BASE_URL}/api/projects/${selectedProjectId}`, {
        //             method: 'DELETE',
        //             headers: {
        //                 'Authorization': `Bearer ${Cookies.get('token')}`,
        //             }
        //         });
                
        //         console.log('Delete successful!');
        //         setSelectedProjectId(null);
        //         // window.location.reload();
        //     } catch (error) {
        //         console.error('Error:', error);
        //     }
        // } else {
        //     alert("You are not manager of this project!")
        //     setSelectedProjectId(null);
        //     setManagers(null);
        //     return;
        // }
    };
    


    const handleOpenDialog = (projectId) => {
        setSelectedProjectId(projectId);
    };

    const handleCloseDialog = () => {
        setSelectedProjectId(null);
    };
    

    const handleOpenModal = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleCloseModal = (e) => {
        e.preventDefault();
        setShowModal(false);
    };
    
    return (
        <>
            <div className="flex justify-between items-center border-4 border-zinc-500 p-4 rounded-3xl">
                <h1 className="text-3xl font-semibold text-gray-800">Project List</h1>
                <button
                    className="bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-black-300 rounded-full"
                    onClick={handleOpenModal}
                >
                    <AddCircleOutlineIcon fontSize="large" className="text-white" />
                </button>
                      {/* Render CreateProjectModal */}
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-2 w-full max-w-sm rounded-md shadow-md border-2 mt-8">
                        <button className=" text-gray-500" onClick={handleCloseModal}>
                            {/* Dấu X (hoặc biểu tượng đóng khác) */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h1 className="text-2xl font-bold mb-2 text-center">Create new Project</h1>
                        <form>
                        {/* Các trường thông tin ở đây */}
                        <div className="mb-1">
                            <label className="block text-gray-700 text-sm font-bold" htmlFor="projectName">
                            Project Name
                            </label>
                            <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            type="text"
                            placeholder="Develop Software"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            />
                        </div>
                        <div className="mb-1">
                            <label className="block text-gray-700 text-sm font-bold" htmlFor="description">
                                Description
                            </label>
                            <textarea
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                placeholder="This project is created to make the world better"
                                rows="3" // Số dòng hiển thị ban đầu
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="mb-1">
                            <label className="block text-gray-700 text-sm font-bold" htmlFor="progress">
                                Progress
                            </label>
                            <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                value={progress}
                                onChange={(e) => setProgress(e.target.value)}
                            >
                                <option value="READY">READY</option>
                                <option value="DOING">DOING</option>
                                <option value="DONE">DONE</option>
                                <option value="EXPIRED">OUTDATED</option>
                            </select>
                        </div>
                        <div className="mb-1">
                            <label className="block text-gray-700 text-sm font-bold" htmlFor="startDate">
                            Start Date
                            </label>
                            <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div className="mb-1">
                            <label className="block text-gray-700 text-sm font-bold" htmlFor="endDate">
                            End Date
                            </label>
                            <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                        {/* Các trường thông tin khác */}
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
            </div>
            
            <div>
                {projects ? (
                    projects.map((project) => (
                        <div className="flex items-center gap-6 mb-8" key={project.projectId}>
                            <div className="w-1/4">
                                <div className="relative overflow-hidden rounded-lg bg-gray-100 shadow-lg">
                                <img src="https://www.ntaskmanager.com/wp-content/uploads/2020/02/What-is-a-Project-1-scaled.jpg" alt="Louvre" className="w-full h-auto" />
                                <Link href={`/your-home/projects/${project.projectId}`}>
                                    <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full bg-[hsla(0,0%,98.4%,.15)] opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
                                </Link>
                                </div>
                            </div>

                            <div className="flex-1">
                                <Link href={`/your-home/projects/${project.projectId}`}>
                                <h5 className="mb-3 text-lg font-bold cursor-pointer hover:text-blue-500">{project.projectName}</h5>
                                </Link>

                                <p className="mb-2 text-neutral-500 dark:text-neutral-300">
                                <small>Start from <u>{project.startDate}</u> to <u>{project.endDate}</u> by {project.createdBy}</small>
                                </p>
                                <p className="text-neutral-500 dark:text-neutral-300">
                                {project.description}
                                </p>
                            </div>

                            <div className="flex items-center">
                                {/* Button Sửa thông tin dự án */}
                                <IconButton aria-label="edit" style={{ fontSize: '1.5rem', margin: '10px' }}>
                                <EditIcon />
                                </IconButton>
                                {/* Button Xóa dự án */}
                                <IconButton onClick={() => handleOpenDialog(project.projectId)} id={`delete-${project.projectId}`} aria-label="delete" style={{ fontSize: '1.5rem', margin: '10px' }}>
                                <DeleteIcon />
                                </IconButton>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='flex justify-center items-center'>
                        <h1 className='text-4xl font-semibold text-gray-800'>Loading...</h1>
                    </div>
                    )
                }


            </div>

            <Dialog
                open={selectedProjectId !== null}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete Project"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you want to delete this project?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>No</Button>
                    <Button onClick={handleDelete} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>

            
        </>
    )
}

export default page
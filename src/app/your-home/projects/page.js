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
import axios from '@/app/api/axios';

const page = () => {
    const [projects, setProjects] = useState(null);
    
    const [projectName, setProjectName] = useState(null);
    const [description, setDescription] = useState(null);
    const [progress, setProgress] = useState('Ready');

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/users/projects`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`,
            },
            credentials: 'include'
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            "projectName": projectName,
            "description": description,
            "progress": progress
        }

        console.log(data)

        const configs = {
            "method": 'POST',
            "headers": {
                'Authorization': `Bearer ${Cookies.get('token')}`,
                'Content-Type': 'application/json'
            },
            'credentials':'include'
        }
        
        axios.patch(`${API_BASE_URL}/api/projects`, data, configs)
        .then((response) => response.json())
        .then((responseData) => {
            // Handle the response data if needed
            console.log(responseData);
            // Close the modal after successful submission
            setShowModal(false);
        })
        .catch((error) => {
            console.error('Error submitting data:', error);
        });
    };

    // State để lưu id của project đang được chọn để xóa
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    const handleOpenDialog = (projectId) => {
        setSelectedProjectId(projectId);
    };

    const handleCloseDialog = () => {
        setSelectedProjectId(null);
    };
    
    const [showModal, setShowModal] = useState(false);

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
            <div className='flex justify-between items-center border-b-4 border-l-4 border-zinc-500 p-4'>
                <h1 className='text-4xl font-semibold text-gray-800'>Project List</h1>
                <button className='bg-transparent hover:bg-sky-200 focus:outline-none focus:ring focus:ring-black-300 rounded-full'
                    onClick={handleOpenModal}>
                    <AddCircleOutlineIcon fontSize='large'></AddCircleOutlineIcon>
                </button>
                      {/* Render CreateProjectModal */}
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-4 w-full max-w-sm rounded-md shadow-md border-2">
                        <button className=" text-gray-500" onClick={handleCloseModal}>
                            {/* Dấu X (hoặc biểu tượng đóng khác) */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h1 className="text-2xl font-bold mb-6 text-center">Create new Project</h1>
                        <form>
                        {/* Các trường thông tin ở đây */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectName">
                            Project Name
                            </label>
                            <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            type="text"
                            id="projectName"
                            name="projectName"
                            placeholder="Develop Software"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                Description
                            </label>
                            <textarea
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                id="description"
                                name="description"
                                placeholder="This project is created to make the world better"
                                rows="5" // Số dòng hiển thị ban đầu
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="progress">
                                Progress
                            </label>
                            <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                id="progress"
                                name="progress"
                                value={progress}
                                onChange={(e) => setProgress(e.target.value)}
                            >
                                <option value="ready">Ready</option>
                                <option value="doing">Doing</option>
                                <option value="done">Done</option>
                                <option value="expired">Outdated</option>
                            </select>
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
                    <div className="flex flex-nowrap h-auto" key={project.projectId}>
                        <div className="w-full shrink-0 grow-0 basis-auto px-6 md:mb-0 md:w-3/12">
                            <div className="relative mb-6 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20"
                            data-te-ripple-init data-te-ripple-color="light">
                            <img src="https://www.ntaskmanager.com/wp-content/uploads/2020/02/What-is-a-Project-1-scaled.jpg" class="w-min" alt="Louvre" />
                            <a href={`/your-home/projects/${project.projectId}`}>
                                <div
                                className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]">
                                </div>
                            </a>
                            </div>
                        </div>
    
                        <div className="mb-6 mr-auto w-full shrink-0 grow-0 basis-auto px-3 md:mb-0 md:w-9/12 xl:w-7/12">
                            <a href={`/your-home/projects/${project.projectId}`}>
                                <h5 className="mb-3 text-lg font-bold">{project.projectName}</h5>
                            </a>
    
                            <p className="mb-6 text-neutral-500 dark:text-neutral-300">
                            <small>Start from <u>{project.startDate}</u> by {project.createdBy}</small>
                            </p>
                            <p className="text-neutral-500 dark:text-neutral-300">
                            {project.description}
                            </p>
                        </div>
                        <div className='shrink-0 grow-0 basis-auto flex justify-center items-center'>
                            {/* Button Sửa thông tin dự án */}
                            <IconButton aria-label="edit" style={{ fontSize: '1.5rem', margin: '10px' }}>
                                <EditIcon />
                            </IconButton>
                            {/* Button Xóa dự án */}
                            <IconButton id={`delete-${project.projectId}`} aria-label="delete" style={{ fontSize: '1.5rem', margin: '10px' }}>
                                <DeleteIcon onClick={() => handleOpenDialog(project.projectId)} />
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
                    <Button onClick={handleCloseDialog} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>

            
        </>
    )
}

export default page
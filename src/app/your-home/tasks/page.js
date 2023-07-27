"use client"
import React, {useState, useEffect} from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { API_BASE_URL } from '@/app/api/apiBase';
import Cookies from 'js-cookie';

const page = () => {
    const [tasks, setTasks] = useState(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/users/tasks`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`,
            },
        })
            .then((response) => response.json())
            .then((responseData) => {
                setTasks(responseData); // Cập nhật dữ liệu vào state data
                console.log(responseData)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    // State để lưu id của project đang được chọn để xóa
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    const handleOpenDialog = (projectId) => {
        setSelectedProjectId(projectId);
    };

    const handleCloseDialog = () => {
        setSelectedProjectId(null);
    };
    
    return (
        <>
            <div className='flex justify-between items-center border-b-4 border-l-4 border-zinc-500 p-4'>
                <h1 className='text-4xl font-semibold text-gray-800'>Task List</h1>
            </div>
            
            <div>
                {tasks ? (
                    tasks.map((task) => (
                        <div className="flex flex-nowrap h-auto" key={task.taskId}>
                            <div className="w-full shrink-0 grow-0 basis-auto px-6 md:mb-0 md:w-3/12">
                                <div className="relative mb-6 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20"
                                data-te-ripple-init data-te-ripple-color="light">
                                <img src="https://flow-e.com/wp-content/uploads/bfi_thumb/Google-task-list-379tmv50jkyo35v5zqpoui.png" className="w-min" alt="Louvre" />
                                <a href={`/your-home/tasks/${task.taskId}`}>
                                    <div
                                    className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]">
                                    </div>
                                </a>
                                </div>
                            </div>
    
                            <div className="mb-6 mr-auto w-full shrink-0 grow-0 basis-auto px-3 md:mb-0 md:w-9/12 xl:w-7/12">
                                <a href={`/your-home/tasks/${task.taskId}`}>
                                    <h5 className="mb-3 text-lg font-bold">{task.taskName}</h5>
                                </a>
    
                                <p className="mb-6 text-neutral-500 dark:text-neutral-300">
                                <small>Created <u>{task.createdDate}</u> by {task.createdBy}</small>
                                </p>
                                <p className="text-neutral-500 dark:text-neutral-300">
                                {task.description}
                                </p>
                            </div>
                            <div className='shrink-0 grow-0 basis-auto flex justify-center items-center'>
                                {/* Button Sửa thông tin dự án */}
                                <IconButton aria-label="edit" style={{ fontSize: '1.5rem', margin: '10px' }}>
                                    <EditIcon />
                                </IconButton>
                                {/* Button Xóa dự án */}
                                <IconButton onClick={() => handleOpenDialog(task.taskId)} id={`delete-${task.taskId}`} aria-label="delete" style={{ fontSize: '1.5rem', margin: '10px' }}>
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
                    {"Delete Task"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you want to delete this task?
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
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
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    const handleOpenDialog = (taskId) => {
        setSelectedTaskId(taskId);
    };

    const handleCloseDialog = () => {
        setSelectedTaskId(null);
    };

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

    const handleDelete = async () => {
        try {
            await fetch(`${API_BASE_URL}/api/tasks/${selectedTaskId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`,
                }
            });
            
            console.log('Delete successful!');
            setSelectedTaskId(null);
            window.location.reload();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <div className="flex justify-between items-center border-4 border-zinc-500 p-4 rounded-3xl">
                <h1 className="text-3xl font-semibold text-gray-800">Task List</h1>
            </div>
            
            <div>
                {tasks ? (
                    tasks.map((task) => (
                        <div key={task.taskId} className="flex items-center gap-6 mb-8">
                            <div className="w-1/4">
                                <div className="relative overflow-hidden rounded-lg bg-gray-100 shadow-lg">
                                <img src="https://flow-e.com/wp-content/uploads/bfi_thumb/Google-task-list-379tmv50jkyo35v5zqpoui.png" alt="Task" className="w-full h-auto" />
                                <a href={`/your-home/tasks/${task.taskId}`}>
                                    <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full bg-[hsla(0,0%,98.4%,.15)] opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
                                </a>
                                </div>
                            </div>

                            <div className="flex-1">
                                <a href={`/your-home/tasks/${task.taskId}`}>
                                <h5 className="mb-3 text-lg font-bold cursor-pointer hover:text-blue-500">{task.taskName}</h5>
                                </a>

                                <p className="mb-2 text-neutral-500 dark:text-neutral-300">
                                <small>Created <u>{task.createdDate}</u> by {task.createdBy}</small>
                                </p>
                                <p className="text-neutral-500 dark:text-neutral-300">
                                {task.description}
                                </p>
                            </div>

                            <div className="flex items-center">
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
                open={selectedTaskId !== null}
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
                    <Button onClick={handleDelete} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>

            
        </>
    )
}

export default page
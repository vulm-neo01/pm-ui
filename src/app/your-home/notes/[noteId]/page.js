"use client"

import { getNoteDetails, getNotesList, getProjectList, getTaskList } from '@/app/api/noteAPI';
import Cookies from 'js-cookie';
import React, {useState, useEffect} from 'react'
import { useParams } from 'next/navigation';
import Box from '@mui/material/Box';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import { format, addHours  } from 'date-fns';
import DatePicker from 'react-datepicker';
import { API_BASE_URL } from '@/app/api/apiBase';
import Link from 'next/link';
import { getUserData } from '@/app/api/api';

const page = () => {
    const [notes, setNotes] = useState(null);
    const userId = Cookies.get('userId');
    const user = Cookies.get('user');
    const params = useParams();
    const noteId = params.noteId;
    const [selectedDate, setSelectedDate] = useState(null);
    const [projectList, setProjectList] = useState(null);
    const [taskList, setTaskList] = useState(null);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [modifiedDate, setModifiedDate] = useState('');
    const [alertTime, setAlertTime] = useState('');
    const [projectId, setProjectId] = useState('');
    const [taskId, setTaskId] = useState('');

    const [isEditing, setIsEditing] = useState(false);
    const [isEditingInfo, setIsEditingInfo] = useState(false);

    useEffect(() => {
        
        getNoteDetails(noteId)
        .then((responseData) => {
            setNotes(responseData); // Cập nhật dữ liệu vào state data
            setTitle(responseData.title);
            setContent(responseData.content);
            setModifiedDate(responseData.modifiedDate);
            setAlertTime(responseData.alertTime);
            setProjectId(responseData.projectId);
            setTaskId(responseData.taskId);
            console.log(responseData);
        });

        getProjectList()
        .then((responseData) => {
            setProjectList(responseData); // Cập nhật dữ liệu vào state data
            console.log(responseData);
        });

        getTaskList()
        .then((responseData) => {
            setTaskList(responseData); // Cập nhật dữ liệu vào state data
            console.log(responseData);
        });

    }, []);

    const handleEditContent = async (e) => {
        e.preventDefault();
        const postData = {
            noteId,
            content
        }
        console.log(postData)

        try {
            const response = await fetch(`${API_BASE_URL}/api/notes/updateContent`, {
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
                window.location.reload();
            } else {
                // Xử lý phản hồi từ server nếu đăng nhập không thành công
                console.log('Post failed!');
                console.log(postData)
            }
            // Xử lý phản hồi từ API tại đây
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleEditInfo = async (e) => {
        e.preventDefault();
        const postData = {
            'noteId': noteId,
            title,
            alertTime,
            projectId,
            taskId
        }
        console.log(postData)

        try {
            const response = await fetch(`${API_BASE_URL}/api/notes/updateSetting`, {
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
                setIsEditingInfo(false);
                window.location.reload();
            } else {
                // Xử lý phản hồi từ server nếu đăng nhập không thành công
                console.log('Post failed!');
                console.log(postData)
            }
            // Xử lý phản hồi từ API tại đây
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleDateChange = (date) => {
        setAlertTime(addHours(date, 7));
        setSelectedDate(date);
    };

    return (
        <>
            {notes && (user == notes.createdBy) && (
                <div className="grid grid-cols-3 gap-6" key={notes.noteId}>
                    {/* Phần Details Info */}
                    <div className="col-span-2 p-2 space-y-4">
                        <div>
                            <strong className="text-3xl font-semibold">{notes.title}</strong>
                        </div>
                        {isEditing ? (
                            <div className='border-r-2 bg-gray-100 rounded-lg p-2'>
                                <TextField
                                    label="Content"
                                    multiline
                                    rows={12}
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="w-full bg-transparent outline-none border-b border-blue-500 focus:border-blue-600"
                                />
                            </div>
                        ) : (
                            <div className="border-r-2 bg-gray-100 rounded-lg p-4 h-80 overflow-y-scroll">
                                <section className='whitespace-pre-wrap'>{notes.content}</section>
                            </div>
                        )}
                        {isEditing ? (
                            <div className="flex space-x-4">
                                <button 
                                    className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    onClick={handleEditContent}
                                >
                                    Save
                                </button>

                                <button 
                                    className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600"
                                    onClick={() => setIsEditing(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <button 
                                className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                onClick={() => setIsEditing(true)}
                            >
                                Edit Note
                            </button>
                        )}
                    </div>

                    <div className="col-span-1 p-4 mt-12">
                        <div className="bg-blue-100 rounded-lg p-4 mb-2">
                            <div className="flex justify-between items-center mb-4">
                                <strong className="text-xl">Note Information</strong>
                                {isEditingInfo ? (
                                    <div className="flex space-x-2">
                                        <button
                                        className="text-blue-500 hover:text-blue-600 text-2xl"
                                        onClick={() => setIsEditingInfo(false)}
                                        >
                                            <CancelIcon />
                                        </button>
                                        <button
                                        className="text-green-500 hover:text-green-600 text-2xl"
                                        onClick={handleEditInfo}
                                        >
                                            <CheckIcon />
                                        </button>
                                    </div>
                                    ) : (
                                    <button
                                        className="text-blue-500 hover:text-blue-600 text-2xl"
                                        onClick={() => setIsEditingInfo(true)}
                                    >
                                        <EditIcon />
                                    </button>
                                    )}
                            </div>
                            {isEditingInfo ? (
                                <>
                                    <div className='mb-2'>
                                        <span className="font-semibold">Title: </span>
                                        <input 
                                            type='text'
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder={notes.title}
                                            className='bg-blue-100 p-1 border-2 border-blue-500/50 rounded-md'
                                        />
                                    </div>
                                    <div className='mb-2'>
                                        <span className="font-semibold">Created By: </span> {notes.createdBy}
                                    </div>
                                    <div className='mb-2'>
                                        <span className="font-semibold">Create Date: </span> {notes.createdDate}
                                    </div>
                                    <div className='mb-2'>
                                        <span className="font-semibold">Alert Time: </span>
                                        <DatePicker
                                            className="bg-blue-100 w-full px-3 py-2 border-2 border-blue-500/50 rounded-md focus:outline-none focus:border-indigo-500"
                                            selected={selectedDate}
                                            onChange={handleDateChange}
                                            showTimeSelect
                                            timeFormat="HH:mm"
                                            timeIntervals={15}
                                            timeCaption="Time"
                                            dateFormat="MMMM d, yyyy h:mm aa"
                                            placeholderText="Select Alert Time"
                                        />
                                    </div>
                                    <div className='mb-2'>
                                        <span className="font-semibold">Attached Project: </span>
                                        <select
                                            value={projectId}
                                            onChange={(e) => setProjectId(e.target.value)}
                                            className='bg-blue-100 p-1 border-2 border-blue-500/50 rounded-md'
                                        >
                                            <option value={''}>None</option>
                                            {projectList &&
                                            projectList.map((project) => (
                                                <option key={project.projectId} value={project.projectId}>
                                                {project.projectName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='mb-2'>
                                        <span className="font-semibold">Attached Task: </span>
                                        <select
                                            value={taskId}
                                            onChange={(e) => setTaskId(e.target.value)}
                                            className='bg-blue-100 p-1 border-2 border-blue-500/50 rounded-md'
                                        >
                                            <option value={''}>None</option>
                                            {taskList &&
                                            taskList.map((task) => (
                                                <option key={task.taskId} value={task.taskId}>
                                                {task.taskName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p className='mb-2'><span className="font-semibold">Title:</span> {notes.title}</p>
                                    <p className='mb-2'><span className="font-semibold">Created By:</span> {notes.createdBy}</p>
                                    <p className='mb-2'><span className="font-semibold">Create Date:</span> {notes.createdDate}</p>
                                    <p className='mb-2'>
                                        <span className="font-semibold">Alert Time:</span>{" "}
                                        {format(new Date(notes.alertTime), "dd/MM/yyyy HH:mm:ss")}
                                    </p>
                                    <div className='mb-2'><span className="font-semibold">Attached Project: </span>
                                        {notes.project && notes.project.projectName && (
                                            <Link href={`/your-home/projects/${notes.project.projectId}`} className='underline'>{notes.project.projectName}</Link>
                                        )}
                                    </div>
                                    <p className='mb-2'><span className="font-semibold">Attached Task: </span>
                                        {notes.task && notes.task.taskName && (
                                            <Link href={`/your-home/tasks/${notes.task.taskId}`} className='underline'>{notes.task.taskName}</Link>
                                        )}
                                        
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default page
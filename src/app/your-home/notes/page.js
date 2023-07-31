"use client"
import React, {useState, useEffect} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '@/app/api/apiBase';
import { format, addHours  } from 'date-fns';

import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { getNotesList } from '@/app/api/noteAPI';

const page = () => {
    const [notes, setNotes] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    
    const [selectedNoteId, setSelectedNoteId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [alertTime, setAlertTime] = useState(null);

    const handleOpenDialog = (noteId) => {
        setSelectedNoteId(noteId);
    };
    const handleCloseDialog = () => {
        setSelectedNoteId(null);
    };

    const handleOpenModal = (e) => {
        e.preventDefault();
        setShowModal(true);
    };
    const handleCloseModal = (e) => {
        e.preventDefault();
        setShowModal(false);
    };

    useEffect(() => {
        getNotesList()
            .then((responseData) => {
                setNotes(responseData); // Cập nhật dữ liệu vào state data
                console.log(responseData);
            });
    }, []);

    const handleDelete = async (e) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/notes/${selectedNoteId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`,
                }
            });
            
            console.log('Delete successful!');
            setSelectedNoteId(null);
            window.location.reload();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDateChange = (date) => {
        setAlertTime(addHours(date, 7));
        setSelectedDate(date);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {
            title,
            content,
            alertTime,
            "user": Cookies.get('user')
        }
        console.log(postData)

        try {
            const response = await fetch(`${API_BASE_URL}/api/notes`, {
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
    
    return (
        <>
            <div className="flex justify-between items-center border-4 border-zinc-500 p-4 rounded-3xl">
                <h1 className="text-3xl font-semibold text-gray-800">Note List</h1>
                <button
                    className="bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-black-300 rounded-full"
                    onClick={handleOpenModal}
                >
                    <AddCircleOutlineIcon fontSize="large" className="text-white" />
                </button>
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-4 w-full max-w-sm rounded-md shadow-md border-2">
                        <button className=" text-gray-500" onClick={handleCloseModal}>
                            {/* Dấu X (hoặc biểu tượng đóng khác) */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h1 className="text-2xl font-bold mb-2 text-center">Create new Note</h1>
                        <form>
                        {/* Các trường thông tin ở đây */}
                        <div className="mb-1">
                            <label className="block text-gray-700 text-sm font-bold" htmlFor="name">
                            Note Title
                            </label>
                            <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            id="name"
                            name="name"
                            placeholder="Timeline work"
                            />
                        </div>
                        <div className="mb-1">
                            <label className="block text-gray-700 text-sm font-bold" htmlFor="content">
                                Note Content
                            </label>
                            <textarea
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                id="content"
                                name="content"
                                onChange={(e) => setContent(e.target.value)}
                                value={content}
                                placeholder="This field is your description about your note"
                                rows="5"
                            />
                        </div>
                        <div className="mb-1">
                            <label className="block text-gray-700 text-sm font-bold" htmlFor="alertTime">
                            Alert Time
                            </label>
                            <DatePicker
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
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
            
            <List sx={{}}>
                {notes ? (
                    notes.map((note) => (
                        <ListItem key={note.noteId} disableGutters sx={{ border: '2px solid #ccc', borderRadius: '8px', marginBottom: '10px', paddingLeft: '8px', '&:hover': { background: '#C0C0C0' } }}>
                            <Link href={`/your-home/notes/${note.noteId}`} passHref>
                                <ListItemText
                                primary={<span className="font-bold">{note.title}</span>}
                                secondary={
                                    <span className="text-gray-600">
                                    Alert at <strong>{format(new Date(note.alertTime), 'MMMM d, yyyy h:mm a')}</strong>
                                    </span>
                                }
                                />
                            </Link>
                            <ListItemSecondaryAction>
                                {/* Button Sửa thông tin */}
                                <IconButton aria-label="edit" style={{ fontSize: '1.5rem', margin: '10px' }}>
                                    <EditIcon />
                                </IconButton>
                                {/* Button Xóa */}
                                <IconButton onClick={() => handleOpenDialog(note.noteId)} id={`delete-${note.noteId}`} aria-label="delete" style={{ fontSize: '1.5rem', margin: '10px' }}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))
                ) : (
                    <div className='flex justify-center items-center'>
                        <h1 className='text-4xl font-semibold text-gray-800'>Loading...</h1>
                    </div>
                )
            }
            </List>
            <Dialog
                open={selectedNoteId !== null}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete Note"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Do you want to delete this note?
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
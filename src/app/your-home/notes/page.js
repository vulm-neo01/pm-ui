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

import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';

const page = () => {
    const [notes, setNotes] = useState(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/users/notes`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`,
            },
        })
            .then((response) => response.json())
            .then((responseData) => {
                setNotes(responseData); // Cập nhật dữ liệu vào state data
                console.log(responseData)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    const [selectedDate, setSelectedDate] = useState(null);

    const [selectedNoteId, setSelectedNoteId] = useState(null);

    const handleOpenDialog = (noteId) => {
        setSelectedNoteId(noteId);
    };

    const handleCloseDialog = () => {
        setSelectedNoteId(null);
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
                <h1 className='text-4xl font-semibold text-gray-800'>Your Note</h1>
                <button className='bg-transparent hover:bg-sky-200 focus:outline-none focus:ring focus:ring-black-300 rounded-full'
                    onClick={handleOpenModal}>
                    <AddCircleOutlineIcon fontSize='large'></AddCircleOutlineIcon>
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
                        <h1 className="text-2xl font-bold mb-6 text-center">Create new Note</h1>
                        <form>
                        {/* Các trường thông tin ở đây */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Note Title
                            </label>
                            <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Timeline work"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                DialogContent
                            </label>
                            <textarea
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                id="description"
                                name="description"
                                placeholder="This field is your description about your note"
                                rows="5" // Số dòng hiển thị ban đầu
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="alertTime">
                            Alert Time
                            </label>
                            <DatePicker
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
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
                        <ListItem key={note.noteId} disableGutters sx={{ border: '2px solid #ccc',borderRadius: '8px', marginBottom: '10px', paddingLeft:'8px','&:hover': { background: '#C0C0C0' }}}>
                            <Link href={`/your-home/notes/${note.noteId}`} passHref>
                                
                                <ListItemText
                                    primary={
                                        <span style={{ fontWeight: 'bold' }}>
                                            {note.title}
                                        </span>
                                    }
                                    secondary={
                                        <span style={{ color: '#888' }}>
                                            Alert at <strong>{note.alertTime}</strong>
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
                <Button onClick={handleCloseDialog} autoFocus>
                    Yes
                </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default page
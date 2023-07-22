import React from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';

const page = () => {
    const notes = [
        { id: 1, name: 'Note1', description: 'Description1'},
        { id: 2, name: 'Note2', description: 'Description2'},
        { id: 3, name: 'Note3', description: 'Description3'}
    ]
    
    return (
        <>
            <div className='flex justify-between items-center border-b-4 border-l-4 border-zinc-500 p-4'>
                <h1 className='text-4xl font-semibold text-gray-800'>Your Note</h1>
                <button className='bg-transparent hover:bg-sky-200 focus:outline-none focus:ring focus:ring-black-300 rounded-full'>
                    <AddCircleOutlineIcon fontSize='large'></AddCircleOutlineIcon>
                </button>
            </div>
            
            <List sx={{}}>
                {notes.map((task) => (
                    <ListItem key={task.id} disableGutters sx={{ border: '2px solid #ccc',borderRadius: '8px', marginBottom: '10px', paddingLeft:'8px','&:hover': { background: '#C0C0C0' }}}>
                        <Link href={`/your-home/projects/${task.id}`} passHref>
                            {/* Bấm vào tên dự án sẽ link đến trang dự án với id là id của dự án đó */}
                            <ListItemText
                                primary={
                                    <span style={{ fontWeight: 'bold' }}>
                                        {task.name}
                                    </span>
                                }
                                secondary={
                                    <span style={{ color: '#888' }}>
                                        {task.description}
                                    </span>
                                }
                            />
                        </Link>
                        <ListItemSecondaryAction>
                            {/* Button Sửa thông tin dự án */}
                            <IconButton aria-label="edit">
                                <EditIcon />
                            </IconButton>
                            {/* Button Xóa dự án */}
                            <IconButton aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </>
    )
}

export default page
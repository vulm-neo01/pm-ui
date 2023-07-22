import React from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';

const page = () => {
    const projects = [
        { id: 1, name: 'Project1', description: 'Description1'},
        { id: 2, name: 'Project2', description: 'Description2'},
        { id: 3, name: 'Project3', description: 'Description3'}
    ]
    
    return (
        <>
            <div className='flex justify-between items-center border-b-4 border-l-4 border-zinc-500 p-4'>
                <h1 className='text-4xl font-semibold text-gray-800'>Project List</h1>
                <button className='bg-transparent hover:bg-sky-200 focus:outline-none focus:ring focus:ring-black-300 rounded-full'>
                    <AddCircleOutlineIcon fontSize='large'></AddCircleOutlineIcon>
                </button>
            </div>
            
            <List sx={{}}>
                {projects.map((project) => (
                    <ListItem key={project.id} disableGutters sx={{ border: '2px solid #ccc',borderRadius: '8px', marginBottom: '10px', paddingLeft:'8px','&:hover': { background: '#D0D0D0' }}}>
                        <Link href={`/your-home/projects/${project.id}`} passHref>
                            {/* Bấm vào tên dự án sẽ link đến trang dự án với id là id của dự án đó */}
                            <ListItemText
                                primary={
                                    <span style={{ fontWeight: 'bold' }}>
                                        {project.name}
                                    </span>
                                }
                                secondary={
                                    <span style={{ color: '#888' }}>
                                        {project.description}
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
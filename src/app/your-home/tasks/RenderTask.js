import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton, ListItemButton } from '@mui/material';
import Cookies from 'js-cookie';

const RenderTask = ({task, color}) => {
    const userId = Cookies.get('userId');
    const isUserMember = task.memberIds && task.memberIds.includes(userId);
    
    const getPriorityIcon = (priority) => {
        switch (priority) {
            case 'HIGH':
                return <span className='text-xl'>⭐⭐⭐</span>;
            case 'MEDIUM':
                return <span className='text-xl'>⭐⭐</span>;
            case 'LOW':
                return <span className='text-xl'>⭐</span>;
            default:
                return '';
        }
    };
    return (
        <ListItem key={task.taskId} disableGutters sx={{ backgroundColor: '#FFFFFF', borderRadius: '8px',padding:'2px' ,marginBottom: '10px','&:hover': { background: '#FFFFFF' }}}>
            <ListItemButton>
                <Link href={`/your-home/tasks/${task.taskId}`} passHref>
                    
                    <ListItemText
                        primary={
                            <span style={{ fontWeight: 'bold' }}>
                                {task.taskName}
                            </span>
                        }
                        secondary={
                            <>
                                <span style={{ color: '#888' }}>
                                    From <u>{task.startDate}</u>
                                </span>
                                <br />
                                <span style={{ color: '#888' }}>
                                    To <u>{task.endDate}</u>
                                </span>
                            </>
                        }
                    />
                </Link>
                <span style={{ marginLeft: 'auto'}}>
                    {getPriorityIcon(task.priority)}
                </span>
                {isUserMember && (
                    <span
                    style={{
                        position: 'absolute',
                        top: '-5px',
                        right: '-5px',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: 'green', // Replace 'green' with your desired color
                        zIndex: 1,
                    }}
                    />
                )}
            </ListItemButton>
        </ListItem>
    )
}

export default RenderTask
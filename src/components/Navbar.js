'use client'
import * as React from 'react';
import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Image from 'next/image';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { AiOutlineClose } from 'react-icons/ai';
import Notification from '@/model/Notification';

const drawerWidth = 240;

const darkTheme = createTheme({
    palette: {
      mode: 'dark', // Đặt mode thành 'dark' để chuyển sang chủ đề màu tối
    },
});

const ProjectListItem = () => (
    <Link href="/your-home/projects">
        <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
            sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
            }}
            >
            <ListItemIcon
                sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
                }}
            >
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Project List" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
        </ListItem>
    </Link>
);

const TaskListItem = () => (
    <Link href="/your-home/tasks">
        <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
            sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
            }}
            >
            <ListItemIcon
                sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
                }}
            >
                <TaskAltIcon />
            </ListItemIcon>
            <ListItemText primary="Task List" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
        </ListItem>

    </Link>
);

const NotesListItem = () => (
    <Link href="/your-home/notes">
        <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
            sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
            }}
            >
            <ListItemIcon
                sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
                }}
            >
                <NoteAltIcon />
            </ListItemIcon>
            <ListItemText primary="Your Notes" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
        </ListItem>
    </Link>
);

const ProfileListItem = () => (
    <Link href="/your-home/personal">
        <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
            sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
            }}
            >
            <ListItemIcon
                sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
                }}
            >
                <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
        </ListItem>
    </Link>
);

const SettingsListItem = () => (
    <Link href="/your-home">
        <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
            sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
            }}
            >
            <ListItemIcon
                sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
                }}
            >
                <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
        </ListItem>
    </Link>
);

const LogoutListItem = () => {
    const handleLogout = () => {
        Cookies.remove('token')
        Cookies.remove('user')
        Cookies.remove('userId')
    };
    return (
        <Link href="/">
            <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                }}
                onClick={handleLogout}
                >
                <ListItemIcon
                    sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    }}
                >
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Log Out" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
            </ListItem>
        </Link>
    );
}




const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);



export default function NavBar() {
    const [isOpen, setIsOpen] = React.useState(false);
    const handleOpenModal = () => {
        setIsOpen(true);
    };
    
    const handleCloseModal = () => {
        setIsOpen(false);
    };
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <ThemeProvider theme={darkTheme}>
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
                }}
            >
                <MenuIcon />
            </IconButton>
            <Image
                src="/png/logo4.png"
                alt="N"
                width="40"
                height="40"
                className="w-8 mr-2"
            />
            <Link href="/your-home">
                <Typography variant="h6" noWrap component="div">
                    Manage Now
                </Typography>
            </Link>
            <button className="absolute right-0 mr-4 inline-flex items-center rounded-full bg-blue-400 w-10 h-10 p-3 text-white shadow-lg dark:text-gray-200 focus:outline-none hover:bg-blue-500" onClick={handleOpenModal}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
                    <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z" clipRule="evenodd" />
                </svg>
            </button>
            </Toolbar>
        </AppBar>
        {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="modal-overlay absolute inset-0 bg-gray-700 opacity-70" onClick={handleCloseModal}></div>
                    <div className="modal-container bg-white w-1/2 rounded-lg shadow-lg z-50">
                        <div className="modal-header flex justify-between items-center bg-blue-400 text-white py-2 px-4">
                        <h3 className="text-lg font-semibold">Notifications</h3>
                        <button className="text-white" onClick={handleCloseModal}>
                            <AiOutlineClose className="h-6 w-6" />
                        </button>
                        </div>
                        <div className="modal-content p-2 text-black">
                            <Notification />
                        </div>
                        <div className="modal-footer flex justify-end bg-gray-100 py-2 px-4">
                        <button
                            className="bg-blue-400 text-white rounded-md px-4 py-2 font-semibold hover:bg-blue-500"
                            onClick={handleCloseModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        )}
        <Drawer variant="permanent" open={open}>
            <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                <ProjectListItem />
                <TaskListItem />
                <NotesListItem />
            </List>
            <Divider />
            <List>
                <ProfileListItem />
                <SettingsListItem />
                <LogoutListItem />
            </List>
        </Drawer>
        </Box>
        </ThemeProvider>
    );
}
'use client'
import * as React from 'react';
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
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

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
            <Link href="/your-home">
                <Typography variant="h6" noWrap component="div">
                    Manage Now
                </Typography>
            </Link>
            <Image
                src="/png/logo4.png"
                alt="N"
                width="40"
                height="40"
                className="w-8 mr-2 absolute right-0"
            />
            </Toolbar>
        </AppBar>
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
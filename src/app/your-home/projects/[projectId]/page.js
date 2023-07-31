"use client"

import React, {useEffect, useState} from 'react'
import Cookies from 'js-cookie';
import { useParams } from 'next/navigation';
import { getProjectDetails } from '@/app/api/api';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ProjectDetail from './projectDetail';
import GetMembers from './Members';
import TaskList from './Tasks';
import AlertChecker from '../../notes/[noteId]/AlertChecker';

const page = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Project Details" value="1" />
                    <Tab label="Task List" value="2" />
                    <Tab label="Members" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1"><ProjectDetail/></TabPanel>
                <TabPanel value="2"><TaskList/></TabPanel>
                <TabPanel value="3"><GetMembers/></TabPanel>
            </TabContext>
            <AlertChecker />
        </Box>
    )
}

export default page
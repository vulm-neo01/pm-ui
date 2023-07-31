"use client"

import React, {useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TaskDetail from './TaskDetail';
import Discussion from './Discussion';


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
                        <Tab label="Task Details" value="1" />
                        <Tab label="Discussions" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1"><TaskDetail/></TabPanel>
                <TabPanel value="2"><Discussion/></TabPanel>
            </TabContext>
        </Box>
    )
}

export default page
"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { API_BASE_URL } from '../api/apiBase';
import Cookies from 'js-cookie';
import { fetchUserData } from '../api/api';
import AlertChecker from './notes/[noteId]/AlertChecker';


const Page = () => {
    const [data, setData] = useState(null);
    const [userId, setUserId] = useState(null);
    const expirationTimeInMinutes = 30;
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + (expirationTimeInMinutes * 60 * 1000));

    useEffect(() => {
        // Gọi hàm fetchUserData từ module api.js
        fetchUserData()
            .then((responseData) => {
                setData(responseData); // Cập nhật dữ liệu vào state data
                const userIdFromResponse = responseData.userId;
                setUserId(userIdFromResponse); // Cập nhật giá trị userId
                Cookies.set('userId', userIdFromResponse, { expires: expirationDate });
                console.log(responseData);
            });
        
    }, []);

    return (
        <>
            <div className='text-center text-3xl'>
                {data ? (
                    <>
                        <p>Welcome <strong>{data.username}</strong> to Manage Now!</p>
                        <p>Select the Function in the Sidebar to continue!</p>
                    </>
                ) : (
                    <p>Loading data...</p>
                )}
            </div>
            <div className='flex justify-center items-center h-max'>
                <Image 
                    src="https://accan.org.au/images/content/Talking%20Telco/Choosingan_internetplan/ChoosingAnInternetPlan-Graphics-22.png"
                    width={450}
                    height={450}
                    className='items-center'
                    alt='home'
                    priority
                />
            </div>
            <AlertChecker />
        </>
    );
};

export default Page;
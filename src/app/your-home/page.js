"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { API_BASE_URL } from '../api/apiBase';
import Cookies from 'js-cookie';
import { fetchUserData } from '../api/getUser';


const Page = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        // Gọi hàm fetchUserData từ module api.js
        fetchUserData()
            .then((responseData) => {
                setData(responseData); // Cập nhật dữ liệu vào state data
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
        </>
    );
};

export default Page;
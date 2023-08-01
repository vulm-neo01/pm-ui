"use client"
import React, {useEffect, useState} from 'react'
import { getUserData } from '@/app/api/api';
import AlertChecker from '../notes/[noteId]/AlertChecker';

const page = () => {

    const [data, setData] = useState(null);

    useEffect(() => {
        // Gọi hàm fetchUserData từ module api.js
        getUserData()
            .then((responseData) => {
                setData(responseData); // Cập nhật dữ liệu vào state data
                console.log(responseData);
            });
    }, []);

    return (
        <div>
            {data ? (
                <>
                    <div className='flex justify-center items-center'>
                        <h1 className='text-4xl font-semibold text-gray-800'>Your Information</h1>
                    </div>
                    <div className='flex flex-col items-center mt-8'>
                        <div className='flex'>
                            <div className="mr-12">
                                <div className="mb-4 opacity-transition hover:opacity-80">
                                    <strong>Username:</strong> {data.username}
                                </div>
                                <div className="mb-4 opacity-transition hover:opacity-80">
                                    <strong>Fullname:</strong> {data.fullName}
                                </div>
                                <div className="mb-4 opacity-transition hover:opacity-80">
                                    <strong>Job Position:</strong> {data.jobPosition}
                                </div>
                                <div className="mb-4 opacity-transition hover:opacity-80">
                                    <strong>Email:</strong> {data.email}
                                </div>
                            </div>
                            <div className="mr-12">
                                <div className="mb-4 opacity-transition hover:opacity-80">
                                    <strong>Phone:</strong> {data.phoneNumber}
                                </div>
                                <div className="mb-4 opacity-transition hover:opacity-80">
                                    <strong>Birthday: ************</strong>
                                </div>
                                <div className="mb-4 opacity-transition hover:opacity-80">
                                    <strong>Address:</strong> {data.address}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <div className="mr-12 opacity-transition">
                                <div className="mb-4 opacity-transition hover:opacity-80">
                                <strong>Number of Projects:</strong> {data.projectIds.length}
                                </div>
                            </div>
                            <div className="mr-12 opacity-transition">
                                <div className="mb-4 opacity-transition hover:opacity-80">
                                <strong>Number of Tasks:</strong> {data.taskIds.length}
                                </div>
                            </div>
                            <div className="mr-12 opacity-transition">
                                <div className="mb-4 opacity-transition hover:opacity-80">
                                <strong>Number of Notes:</strong> {data.noteIds.length}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className='flex justify-center items-center'>
                    <h1 className='text-4xl font-semibold text-gray-800'>Loading...</h1>
                </div>
            )}
        </div>
    )
}

export default page
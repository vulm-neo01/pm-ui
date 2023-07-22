import { Typography } from '@mui/material'
import React from 'react'
import Image from 'next/image'

const page = () => {
    return (
        <>
            <div className='text-center text-4xl'>
                <p>Select the Function in the Sidebar to continue!</p>
            </div>
            <div className='flex justify-center items-center h-max'>
                <Image 
                    src="https://accan.org.au/images/content/Talking%20Telco/Choosingan_internetplan/ChoosingAnInternetPlan-Graphics-22.png"
                    width={500}
                    height={500}
                    className='items-center'
                >

                </Image>
            </div>
        </>
    )
}

export default page
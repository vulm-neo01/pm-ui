import { getAlert } from '@/app/api/noteAPI';
import React, { useEffect, useState } from 'react'

const AlertChecker = () => {
    const [alert, setAlert] = useState(null);
    useEffect(() => {
        getAlert()
        .then((responseData) => {
            setAlert(responseData); // Cập nhật dữ liệu vào state data
            console.log(responseData);
        });
    }, [alert])

    return (
        <div></div>
    )
}

export default AlertChecker
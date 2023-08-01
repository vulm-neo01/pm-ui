"use client"
import { getAllNotification } from '@/app/api/api';
import React, {useState, useEffect} from 'react'
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { API_BASE_URL } from '@/app/api/apiBase';
import Cookies from 'js-cookie';
import Link from 'next/link';

const NotificationItem = ({ notification }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isAccepted, setIsAccepted] = useState(false);
    const [isDenied, setIsDenied] = useState(false);
    const [isOK, setIsOK] = useState(false);
    const [message, setMessage] = useState('');

    const handleAccept = async (notificationId) => {
        try {
            setIsLoading(true);
            // Gửi POST request đến API với thông tin notificationId và state là ACCEPT
            const response = await fetch(`${API_BASE_URL}/api/notifications/replyProject`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('token')}`,
                },
                body: JSON.stringify({
                    notificationId: notificationId,
                    state: 'ACCEPT',
                }),
            });

            // Kiểm tra kết quả từ server
            if (response.ok) {
                // Xử lý thành công, có thể hiển thị thông báo thành công, hoặc thực hiện các hành động khác cần thiết
                console.log('Notification accepted successfully');
                setMessage('Accepted successfully');
            } else {
                // Xử lý lỗi, có thể hiển thị thông báo lỗi, hoặc thực hiện các hành động khác cần thiết
                console.error('Error accepting notification');
            }
            
            setIsAccepted(true);
            setIsLoading(false);
        } catch (error) {
            console.error('Error handling accept:', error);
            setIsLoading(false);
        }
    };

    const handleDeny = async (notificationId) => {
        try {
            setIsLoading(true);
            // Gửi POST request đến API với thông tin notificationId và state là ACCEPT
            const response = await fetch(`${API_BASE_URL}/api/notifications/replyProject`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('token')}`,
                },
                body: JSON.stringify({
                    notificationId: notificationId,
                    state: 'DENY',
                }),
            });

            // Kiểm tra kết quả từ server
            if (response.ok) {
                // Xử lý thành công, có thể hiển thị thông báo thành công, hoặc thực hiện các hành động khác cần thiết
                console.log('Notification deny successfully');
                setMessage('Denied successfully');
            } else {
                // Xử lý lỗi, có thể hiển thị thông báo lỗi, hoặc thực hiện các hành động khác cần thiết
                console.error('Error deny notification');
            }
            
            setIsDenied(true);
            setIsLoading(false);
        } catch (error) {
            console.error('Error handling accept:', error);
            setIsLoading(false);
        }
    };

    const handleOK = async (notificationId) => {
        try {
            setIsLoading(true);
            // Gửi POST request đến API với thông tin notificationId và state là ACCEPT
            const response = await fetch(`${API_BASE_URL}/api/notifications/reply`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('token')}`,
                },
                body: JSON.stringify({
                    notificationId,
                    state: 'READ',
                }
                ),
            });

            // Kiểm tra kết quả từ server
            if (response.ok) {
                // Xử lý thành công, có thể hiển thị thông báo thành công, hoặc thực hiện các hành động khác cần thiết
                console.log('Notification OK successfully');
                setMessage('OK!');
            } else {
                // Xử lý lỗi, có thể hiển thị thông báo lỗi, hoặc thực hiện các hành động khác cần thiết
                console.error('Error OK notification');
            }
            
            setIsOK(true);
            setIsLoading(false);
        } catch (error) {
            console.error('Error handling OK:', error);
            setIsLoading(false);
        }
    };

    return (
        <div className={`p-2 mb-2 rounded-lg shadow-md`}>
            {notification && (notification.type === "REPLY") && (
                <>
                    <p>
                        <strong>{notification.inviterName}</strong> invite you to be a <strong>
                            {notification.role}</strong> for his <Link className="text-blue-500 text-base underline" href={`/your-home/projects/${notification.projectId}`}>project</Link>!
                    </p>
                    <p>
                        {message && <strong className="text-red-500 text-sm">{message}</strong>}
                    </p>
                    <div className="mt-2 flex justify-end space-x-2">
                        <button
                            onClick={() => handleAccept(notification.notificationId)}
                            disabled={isLoading || isAccepted || isDenied}
                            className="bg-blue-500 text-white rounded-lg px-4 py-2 font-semibold hover:bg-blue-600"
                        >
                            <CheckIcon />
                        </button>
                        <button
                            onClick={() => handleDeny(notification.notificationId)}
                            disabled={isLoading || isAccepted || isDenied}
                            className="bg-red-500 text-white rounded-lg px-4 py-2 font-semibold hover:bg-blue-600"
                        >
                            <ClearIcon />
                        </button>
                    </div>
                </>
            )}
            {(notification.type === "NOTIFY") && (
                <>
                    <p>
                        <strong>{notification.inviterName}</strong> change your role to in his project/task!
                    </p>
                    <p>
                        {message && <strong className="text-blue-500 text-sm">{message}</strong>}
                    </p>
                    <div className="mt-2 flex justify-end space-x-2">
                        <button
                            onClick={() => handleOK(notification.notificationId)}
                            disabled={isLoading || isOK }
                            className="bg-blue-500 text-white rounded-lg px-4 py-2 font-semibold hover:bg-blue-600"
                        >
                            <CheckIcon />
                        </button>
                    </div>
                </>
            )}
            {(notification.type === "NOTE") && (
                <>
                    <p>
                        You have a new alert to a note, <Link className='text-blue-600' href={`/your-home/notes/${notification.noteId}`}>Click to see!</Link>
                    </p>
                    <p>
                        {message && <strong className="text-blue-500 text-sm">{message}</strong>}
                    </p>
                    <div className="mt-2 flex justify-end space-x-2">
                        <button
                            onClick={() => handleOK(notification.notificationId)}
                            disabled={isLoading || isOK }
                            className="bg-blue-500 text-white rounded-lg px-4 py-2 font-semibold hover:bg-blue-600"
                        >
                            <CheckIcon />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

const Notification = () => {
    const [notifications, setNotifications] = useState(null);
    const unreadNotifications = notifications ? notifications.filter((notification) => notification.state === 'UNREAD') : null;
    useEffect(() => {
        getAllNotification()
            .then((responseData) => {
                setNotifications(responseData); // Cập nhật dữ liệu vào state data
                console.log(responseData);
            });
    }, [notifications]);
    return (
        <div>
            {unreadNotifications && unreadNotifications.length > 0 ? (
                unreadNotifications.map((notification) => (
                <div key={notification.notificationId}>
                    <NotificationItem key={notification.notificationId} notification={notification}/>
                </div>
                ))
            ) : (
                <p>You do not have any new notifications!</p>
            )}
        </div>

    )
}

export default Notification
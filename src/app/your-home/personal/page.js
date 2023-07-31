"use client"
import React, {useEffect, useState} from 'react'
import { fetchUserData } from '@/app/api/api';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '@/app/api/apiBase';

const page = () => {

    const [data, setData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [jobPosition, setJobPosition] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthday, setBirthday] = useState('');
    const [address, setAddress] = useState('');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleCloseModal = (e) => {
        e.preventDefault();
        setShowModal(false);
    };

    const isPasswordSecure = (password) => {
        // Kiểm tra độ dài tối thiểu của mật khẩu (ví dụ: ít nhất 8 ký tự)
        if (password.length < 8) {
            return false;
        }

        // Kiểm tra xem mật khẩu có chứa ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const digitRegex = /\d/;
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        return (
            uppercaseRegex.test(password) &&
            lowercaseRegex.test(password) &&
            digitRegex.test(password) &&
            specialCharRegex.test(password)
        );
    };

    useEffect(() => {
        // Gọi hàm fetchUserData từ module api.js
        fetchUserData()
            .then((responseData) => {
                setData(responseData); // Cập nhật dữ liệu vào state data
                console.log(responseData);
            });
    }, [data]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {
            username,
            fullName,
            jobPosition,
            phoneNumber,
            birthday,
            address,
            "user": Cookies.get('user')
        }
        console.log(postData)

        try {
            const response = await fetch(`${API_BASE_URL}/api/users/update`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    postData
                ),
            });

            if (response.ok) {
                // Xử lý phản hồi từ server nếu đăng nhập thành công
                const data = await response.json();
                console.log('Post successful!', data);
                setIsEditing(false);
                alert('Your Information changed successfully!!!')
                // window.location.reload();
            } else {
                // Xử lý phản hồi từ server nếu đăng nhập không thành công
                console.log('Post failed!');
            }
            // Xử lý phản hồi từ API tại đây
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        const postData = {
            password,
        }
        console.log(postData)

        if (password === '') {
            setPasswordError('Password is required.');
            return;
        } else if (!isPasswordSecure(password)) {
            setPasswordError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.');
            return;
        } else {
            setPasswordError(''); // Xóa thông báo lỗi nếu password đủ an toàn
        }
        if (password !== confirmPassword) {
            // Passwords do not match, show an error message
            setConfirmPasswordError('Passwords do not match.');
            return;
        } else {
            setConfirmPasswordError('');
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/users/password`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    postData
                ),
            });

            if (response.ok) {
                // Xử lý phản hồi từ server nếu đăng nhập thành công
                const data = await response.json();
                console.log('Post successful!', data);
                setShowModal(false);
                setPassword('');
                setConfirmPassword('');
                alert('Password changed successfully!!!')
            } else {
                // Xử lý phản hồi từ server nếu đăng nhập không thành công
                console.log('Post failed!');
            }
            // Xử lý phản hồi từ API tại đây
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div>
            {data ? (
                <>
                    <div className='flex justify-center items-center'>
                        <h1 className='text-4xl font-semibold text-gray-800'>Your Information</h1>
                    </div>
                    <div className='flex flex-col items-center mt-8'>
                        <div className='flex'>
                            {!isEditing ? (
                            <>
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
                                        <strong>Birthday:</strong> {data.birthday}
                                    </div>
                                    <div className="mb-4 opacity-transition hover:opacity-80">
                                        <strong>Address:</strong> {data.address}
                                    </div>
                                    <div className="mb-4 opacity-transition hover:opacity-80">
                                        <strong>Password: ************</strong>
                                    </div>
                                </div>
                            </>
                                ) : (
                            <>
                                <div className='mr-12'>
                                    <div className='mb-4 opacity-transition hover:opacity-80'>
                                        <strong>Username:  </strong>
                                        <input 
                                            type='text'
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            placeholder={data.username}
                                        />
                                    </div>
                                    <div className='mb-4 opacity-transition hover:opacity-80'>
                                        <strong>Fullname:  </strong>
                                        <input 
                                            type='text'
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            placeholder={data.fullName}
                                        />
                                    </div>
                                    <div className='mb-4 opacity-transition hover:opacity-80'>
                                        <strong>Job Position:  </strong>
                                        <input 
                                            type='text'
                                            value={jobPosition}
                                            onChange={(e) => setJobPosition(e.target.value)}
                                            placeholder={data.jobPosition}
                                        />
                                    </div>
                                    <div className='mb-4 opacity-transition hover:opacity-80'>
                                        <strong>Email:  </strong> {data.email}
                                    </div>
                                </div>
                                <div className='mr-12 opacity-transition'>
                                    <div className='mb-4 opacity-transition hover:opacity-80'>
                                        <strong>Phone:  </strong>
                                        <input 
                                            type='text'
                                            value={phoneNumber}
                                            placeholder={data.phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                    </div>
                                    <div className='mb-4 opacity-transition hover:opacity-80'>
                                        <strong>Birthday:  </strong>
                                        <input 
                                            type='text'
                                            value={birthday}
                                            placeholder='2001-07-24'
                                            onChange={(e) => setBirthday(e.target.value)}
                                        />
                                    </div>
                                    <div className='mb-4 opacity-transition hover:opacity-80'>
                                        <strong>Address:  </strong>
                                        <input 
                                            type='text'
                                            placeholder={data.address}
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                    </div>
                                    <div className='mb-4 opacity-transition hover:opacity-80'>
                                        <strong>Password: ************</strong>
                                    </div>
                                </div>
                            </>
                                )
                            }
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

                        <div className='flex justify-center mt-8'>
                            {isEditing ? (
                                <>
                                    <button onClick={handleSubmit} className='bg-blue-500 text-white hover:bg-sky-500 font-semibold py-2 px-4 rounded focus:ring mr-4'>
                                        Save
                                    </button>
                                    <button onClick={() => setIsEditing(false)} className='bg-blue-500 text-white hover:bg-sky-500 font-semibold py-2 px-4 rounded focus:ring mr-4'>
                                        Cancel
                                    </button>
                                </>
                                ) : (
                                    <>
                                        <button onClick={() => setIsEditing(true)} className='bg-blue-500 text-white hover:bg-sky-500 font-semibold py-2 px-4 rounded focus:ring mr-4'>
                                            Change Information
                                        </button>
                                        <button onClick={handleOpenModal} className='bg-blue-500 text-white hover:bg-sky-500 font-semibold py-2 px-4 rounded focus:ring'>
                                            Change Password
                                        </button>
                                    </>
                                )
                            }
                        </div>
                    </div>
                    {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="bg-white p-4 w-full max-w-sm rounded-md shadow-md border-2">
                            <button className=" text-gray-500" onClick={handleCloseModal}>
                                {/* Dấu X (hoặc biểu tượng đóng khác) */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <h1 className="text-2xl font-bold mb-6 text-center">Change Password</h1>
                            <form>
                            {/* Các trường thông tin ở đây */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectName">
                                Password
                                </label>
                                <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                type="password"
                                placeholder="Contain digit, Uppercase text and special characters"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                />
                                {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                    Confirm Password
                                </label>
                                <input
                                    type='password'
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                    placeholder="Contain digit, Uppercase text and special characters"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                {confirmPasswordError && <p className="text-red-500 text-sm">{confirmPasswordError}</p>}
                            </div>
                            {/* Các trường thông tin khác */}
                            <div className="flex justify-center">
                                <button
                                className="bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
                                type="submit"
                                onClick={handleChangePassword}
                                >
                                Submit
                                </button>
                            </div>
                            </form>
                        </div>
                    </div>
                )}
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
"use client"
import React, {useState} from 'react';
import Link from 'next/link';
import { RiArrowLeftSLine } from 'react-icons/ri'; // Import biểu tượng quay lại từ react-icons
import { API_BASE_URL } from '@/app/api/apiBase';
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [jobPosition, setJobPosition] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [birthday, setBirthday] = useState('');

    const [emailError, setEmailError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [fullNameError, setFullNameError] = useState('');
    const [jobPositionError, setJobPositionError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [birthdayError, setBirthdayError] = useState('');

    const router = useRouter();
    const isEmailValid = (email) => {
        // Biểu thức chính quy kiểm tra định dạng email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
        // Kiểm tra xem email có khớp với biểu thức chính quy không
        return emailRegex.test(email);
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
    

    const handleRegister = async (e) => {
        e.preventDefault();
    // Kiểm tra và cập nhật trạng thái cảnh báo cho từng trường
        if (email === '') {
            setEmailError('Email is required.');
            return;
        } else if (!isEmailValid(email)) {
            setEmailError('Invalid email format.');
            return;
        } else {
            setEmailError('');
        }

        if (username === '') {
            setUsernameError('Username is required.');
            return;
        } else {
            setUsernameError('');
        }

        if (password === '') {
            setPasswordError('Password is required.');
            return;
        } else if (!isPasswordSecure(password)) {
            setPasswordError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.');
            return;
        } else {
            setPasswordError(''); // Xóa thông báo lỗi nếu password đủ an toàn
        }

        if (confirmPassword === '') {
            setConfirmPasswordError('Confirm password is required.');
            return;
        } else {
            setConfirmPasswordError('');
        }

        if (fullName === '') {
            setFullNameError('Fullname is required.');
            return;
        } else {
            setFullNameError('');
        }

        if (jobPosition === '') {
            setJobPositionError('Job position is required.');
            return;
        } else {
            setJobPositionError('');
        }

        if (phoneNumber === '') {
            setPhoneNumberError('Phone number is required.');
            return;
        } else {
            setPhoneNumberError('');
        }

        if (address === '') {
            setAddressError('Address is required.');
            return;
        } else {
            setAddressError('');
        }

        if (birthday === '') {
            setBirthdayError('Birthday is required.');
            return;
        } else {
            setBirthdayError('');
        }

        if (password !== confirmPassword) {
            // Passwords do not match, show an error message
            setConfirmPasswordError('Passwords do not match.');
            return;
        } else {
            setConfirmPasswordError('');
        }

        try {
            const res = await fetch(`${API_BASE_URL}/check-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( email ),
            });

            const emailExist = await res.json();
            console.log('Email ' + email + ' exist?: ' + emailExist);
            
            if (emailExist === false) {
                const response = await fetch(`${API_BASE_URL}/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',

                    },
                    body: JSON.stringify({
                        email,
                        username,
                        password,
                        fullName,
                        jobPosition,
                        phoneNumber,
                        address,
                        birthday,
                    }),
                });
    
                const data = await response.json();
                console.log(data);
                setEmailError('');
                alert('Register successfully. Login to continue!')
                router.push('/auth/login')
            } else {
                setEmailError('Email already exists!');
                return;
            }
            // Xử lý phản hồi từ API tại đây
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="bg-gradient-to-br py-4 from-blue-100 to-purple-200 relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="absolute top-4 left-4">
                <Link href="/"> {/* Đặt đường dẫn tới trang Home */}
                    <RiArrowLeftSLine size={36} color="purple" />
                </Link>
            </div>
            
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring ring-2 ring-purple-600 lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700 underline uppercase decoration-wavy">
                    Register
                </h1>
                <form className="mt-6" onSubmit={handleRegister}>
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40
                            ${emailError ? 'border-red-500' : ''}`}
                        />
                        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="username"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={`block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40
                            ${usernameError ? 'border-red-500' : ''}`}
                        />
                        {usernameError && <p className="text-red-500 text-sm">{usernameError}</p>}
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40
                            ${passwordError ? 'border-red-500' : ''}`}
                        />
                        {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40
                            ${confirmPasswordError ? 'border-red-500' : ''}`}
                        />
                        {confirmPasswordError && <p className="text-red-500 text-sm">{confirmPasswordError}</p>}
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="fullName"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            FullName
                        </label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className={`block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40
                            ${fullNameError ? 'border-red-500' : ''}`}
                        />
                        {fullNameError && <p className="text-red-500 text-sm">{fullNameError}</p>}
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="jobPosition"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Job Position
                        </label>
                        <input
                            type="text"
                            value={jobPosition}
                            onChange={(e) => setJobPosition(e.target.value)}
                            className={`block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40
                            ${jobPositionError ? 'border-red-500' : ''}`}
                        />
                        {jobPositionError && <p className="text-red-500 text-sm">{jobPositionError}</p>}
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="phoneNumber"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Phone Number
                        </label>
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className={`block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40
                            ${phoneNumberError ? 'border-red-500' : ''}`}
                        />
                        {phoneNumberError && <p className="text-red-500 text-sm">{phoneNumberError}</p>}
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="address"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Address
                        </label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className={`block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40
                            ${addressError ? 'border-red-500' : ''}`}
                        />
                        {addressError && <p className="text-red-500 text-sm">{addressError}</p>}
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="birthday"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Birthday
                        </label>
                        <input
                            type="date"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                            className={`block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40
                            ${birthdayError ? 'border-red-500' : ''}`}
                        />
                        {birthdayError && <p className="text-red-500 text-sm">{birthdayError}</p>}
                    </div>
                    <div className="mt-6">
                        <button
                            type='submit'
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                        >
                            Register
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Already have account?{" "}
                    <a
                        href="/auth/login"
                        className="font-medium text-purple-600 hover:underline"
                    >
                        Sign In
                    </a>
                </p>
            </div>
            
        </div>
    );
}

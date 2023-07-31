"use client"
import React, {useState} from 'react';
import Link from 'next/link';
import { RiArrowLeftSLine } from 'react-icons/ri'; // Import biểu tượng quay lại từ react-icons
import { API_BASE_URL } from '@/app/api/apiBase';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const expirationTimeInMinutes = 30;

    // Tính toán thời gian hết hạn
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + (expirationTimeInMinutes * 60 * 1000));

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}/authentication`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (response.ok) {
                // Xử lý phản hồi từ server nếu đăng nhập thành công
                const data = await response.json();
                console.log('Login successful!', data);
                Cookies.set('token', data.jwt, { expires: expirationDate });
                Cookies.set('user', data.user, { expires: expirationDate });
                alert('Login successfully! Happy Manage Now!')
                router.push('/your-home')
            } else {
                // Xử lý phản hồi từ server nếu đăng nhập không thành công
                console.log('Login failed!');
                console.log(password)
                setErrorMessage("Mật khẩu hoặc Email không đúng!")
            }
            // Xử lý phản hồi từ API tại đây
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="bg-gradient-to-br from-blue-100 to-purple-200 relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="absolute top-4 left-4">
                <Link href="/"> {/* Đặt đường dẫn tới trang Home */}
                    <RiArrowLeftSLine size={36} color="purple" />
                </Link>
            </div>
            

            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring ring-2 ring-purple-600 lg:max-w-xl">
                {/* Đây là phần logo ứng dụng */}
                <h1 className="text-3xl font-semibold text-center text-purple-700 underline uppercase decoration-wavy">
                    Sign in
                </h1>
                <form className="mt-6" onSubmit={handleLogin}>
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
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
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <a
                        href="#"
                        className="text-xs text-purple-600 hover:underline"
                    >
                        Forget Password?
                    </a>
                    <div className="mt-6">
                    {errorMessage && <p className='text-red-700 font-semibold mb-1'>{errorMessage}</p>}
                        <button
                            type="submit"
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                        >
                            Login
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Don't have an account?{" "}
                    <a
                        href="/auth/register"
                        className="font-medium text-purple-600 hover:underline"
                    >
                        Sign up
                    </a>
                </p>
            </div>
            <div className="my-10 text-sm text-center text-gray-600 dark:text-gray-400">
            Copyright © {new Date().getFullYear()}. Made with ♥ by{" "}
            <a
                href="https://youtube.com/"
                target="_blank"
                rel="noopener">
                Manage Now.
            </a>{" "}
            </div>
        </div>
    );
}

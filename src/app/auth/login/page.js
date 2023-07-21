"use client"
import React from 'react';
import Link from 'next/link';
import { RiArrowLeftSLine } from 'react-icons/ri'; // Import biểu tượng quay lại từ react-icons
import Image from 'next/image';

export default function Login() {
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
                <form className="mt-6">
                    <div className="mb-2">
                        <label
                            for="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            for="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
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
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
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

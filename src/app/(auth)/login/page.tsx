"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate username and password
        if (username === 'admin' && password === 'password') {
            // Redirect to dashboard page
            router.push('/dashboard');
        } else {
            setError('Invalid username or password');
        }
    };
    return (
        <>
            <div style={{ backgroundImage: `url("https://img.freepik.com/free-photo/flat-lay-with-traveler-accessories-tropical-palm-leaf-retro-camera-sun-hat-starfish-yellow-background_24972-366.jpg?w=1380&t=st=1709650609~exp=1709651209~hmac=a680e67f5557649860c5cc5986266883949296684db6b9293180c247cd198305")`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: "cover",
                backgroundPosition:'center'}}
                className="min-h-screen flex items-center justify-end pl-12 px-4 mr-0 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-10 px-2 mr-96">
                    <div>
                        <h1 className="text-center text-3xl font-extrabold text-gray-900">Login</h1>
                    </div>
                    <form method={'post'} className="mt-8 space-y-6" onSubmit={() => handleSubmit(event)}>
                        <input type="hidden" name="remember" value="true"/>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="username" className="sr-only">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    required
                                    className="my-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}/>
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <svg
                                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 7.293a1 1 0 011.414 0L10 11.586l4.293-4.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414z"
                                        clipRule="evenodd"/>
                                </svg>
                            </span>
                                Sign in
                            </button>
                        </div>
                    </form>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                </div>
            </div>
        </>
    );
};

export default LoginPage;

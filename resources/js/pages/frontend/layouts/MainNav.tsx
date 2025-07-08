import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import ThemeToggle from '@/pages/frontend/components/ThemeToggle';

const MainNav = () => {
    const { auth } = usePage().props as {
        auth?: {
            user?: {
                name: string;
                email: string;
            } | null;
        };
    };
    return (
        <>
            <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-300">
                <div className="container mx-auto flex justify-between items-center px-6 py-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3">
                        <img src="/logo.svg" alt="Logo" width={120} height={24} className="h-7 w-auto" />
                    </Link>

                    {/* Nav Menu (Desktop) */}
                    <nav className="hidden md:flex gap-8 items-center text-sm font-semibold">
                        {['/jobs', '/quiz', '/guides'].map((path, idx) => {
                            const labels = ['চাকরির খবর', 'MCQ কুইজ', 'প্রস্তুতি গাইড'];
                            return (
                                <Link
                                    key={path}
                                    href={path}
                                    className="relative text-gray-700 dark:text-gray-200 hover:text-yellow-500 transition-colors duration-300
                       before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-0.5 before:bg-yellow-500 before:transition-all before:duration-300 hover:before:w-full"
                                >
                                    {labels[idx]}
                                </Link>
                            );
                        })}

                        {/* Login Button */}
                        {auth?.user ? (
                            <Link
                                href="/dashboard"
                                className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full font-semibold shadow-md
                transition-all duration-300 hover:scale-105 active:scale-95"
                            >
                                ড্যাশবোর্ড
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-5 py-2 rounded-full font-semibold shadow-md
                transition-all duration-300 hover:scale-105 active:scale-95"
                            >
                                লগইন
                            </Link>
                        )}
                        <ThemeToggle/>
                    </nav>

                    {/* Mobile menu toggle placeholder */}
                    <button
                        className="md:hidden text-gray-700 dark:text-white hover:text-yellow-500 transition-colors"
                        aria-label="Open menu"
                    >
                        {/* Hamburger Icon (3 bars) */}
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            viewBox="0 0 24 24"
                        >
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    </button>
                </div>
            </header>
        </>
    );
};

export default MainNav;

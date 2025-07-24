import React from 'react';
import { Link } from '@inertiajs/react';
import { LockKeyhole } from 'lucide-react';

export default function Error403({ status = 403, message = 'নতুন রেজিস্ট্রেশন বর্তমানে বন্ধ আছে।' }) {
    return (
        <div className="min-h-screen bg-gradient-to-tr from-red-100 via-yellow-50 to-red-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-6">
            <div className="max-w-md w-full text-center">
                <div className="inline-flex items-center justify-center bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-100 rounded-full p-4 mb-6 shadow-lg animate-bounce">
                    <LockKeyhole size={40} />
                </div>

                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                    403 - নিষিদ্ধ
                </h1>

                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                    {message}
                </p>

                <Link
                    href="/login"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold px-6 py-3 rounded-full shadow-md transition duration-300 hover:scale-105 hover:ring-2 hover:ring-blue-300"
                >
                    🔐 লগইন পেইজে যান
                </Link>
            </div>
        </div>
    );
}

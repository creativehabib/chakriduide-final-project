import { PageProps as InertiaPageProps } from '@inertiajs/core';
import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import { LuArrowLeft, LuMessageSquare, LuUser } from "react-icons/lu";
import MainNav from '@/pages/frontend/layouts/MainNav';

// প্রশ্নের অপশনের ডেটার জন্য ইন্টারফেস
interface Option {
    id: number;
    option_text: string;
    is_correct: string;
}

// প্রশ্নের ডেটার জন্য ইন্টারফেস
interface Question {
    id: number;
    question_text: string;
    description: string;
    created_at: string;
    user: {
        id: number;
        name: string;
    };
    answers_count: number;
    options: Option[]; // অপশন অ্যারে যোগ করা হয়েছে
}

// ক্যাটাগরি ডেটার জন্য ইন্টারফেস
interface Category {
    id: number;
    name: string;
    slug: string;
}

// Inertia থেকে আসা প্রপস-এর জন্য ইন্টারফেস
interface PageProps extends InertiaPageProps {
    category: Category;
    questions: {
        data: Question[];
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
    };
}

export default function CategoryQuestions() {
    const { category, questions } = usePage<PageProps>().props;

    return (
        <>
            <MainNav/>
            <div className="bg-gray-100 min-h-screen p-8">
                <div className="container mx-auto">
                    <div className="flex items-center mb-6">
                        <Link href={route('q.category')} className="text-blue-600 hover:text-blue-800 transition-colors">
                            <LuArrowLeft className="h-6 w-6" />
                        </Link>
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 ml-4">
                            {category.name} এর প্রশ্নসমূহ
                        </h1>
                    </div>

                    {questions.data.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {questions.data.map((question) => (
                                <div key={question.id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between h-full border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                            {question.question_text}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                            {question.description}
                                        </p>

                                        {/* প্রশ্নের অপশনগুলো দেখানোর জন্য নতুন সেকশন */}
                                        {question.options && question.options.length > 0 && (
                                            <div className="mt-4 border-t pt-4">
                                                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                                                    অপশনসমূহ:
                                                </h4>
                                                <ul className="space-y-2 text-sm text-gray-700">
                                                    {question.options.map((option) => (
                                                        <li
                                                            key={option.id}
                                                            className="bg-gray-50 p-2 rounded-md border border-gray-200"
                                                        >
                                                            <span
                                                                className={`ml-2 text-sm ${
                                                                    !!Number(option.is_correct)
                                                                        ? 'text-green-700 font-semibold'
                                                                        : 'text-gray-700'
                                                                }`}
                                                            >
                                                    {option.option_text}
                                                </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex justify-between items-center text-sm text-gray-500 mt-4 border-t pt-4">
                                        <div className="flex items-center space-x-2">
                                            <LuUser className="h-4 w-4" />
                                            <span>{question.user.name}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <LuMessageSquare className="h-4 w-4" />
                                            <span>{question.answers_count} উত্তর</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 text-lg mt-10">
                            এই ক্যাটাগরিতে কোনো প্রশ্ন খুঁজে পাওয়া যায়নি।
                        </div>
                    )}

                    {/* Pagination links here if using Laravel pagination */}
                </div>
            </div>
        </>
    );
}

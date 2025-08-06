import { PageProps as InertiaPageProps } from '@inertiajs/core';
import React, { useState } from 'react';
import { usePage, Link } from '@inertiajs/react';
import { LuArrowLeft, LuMessageSquare, LuUser } from "react-icons/lu";
import MainNav from '@/pages/frontend/layouts/MainNav';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Share2 } from 'lucide-react';
import { formatTimeAgo } from '@/helper/helpers';

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
    updated_at: string;
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
    const banglaLetters = ["ক", "খ", "গ", "ঘ"];
    const englishLetters = ["A", "B", "C", "D"];
    const [openDescriptionId, setOpenDescriptionId] = useState<number | null>(null);


    const toggleDescription = (id: number): void => {
        setOpenDescriptionId(openDescriptionId === id ? null : id);
    };
    return (
        <>
            <MainNav/>
            <div className="bg-gray-100 min-h-screen py-8">
                <div className="max-w-3xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="flex items-center mb-6">
                        <Link href={route('q.category')} className="text-blue-600 hover:text-blue-800 transition-colors">
                            <LuArrowLeft className="h-6 w-6" />
                        </Link>
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 ml-4">
                            {category.name} এর প্রশ্নসমূহ
                        </h1>
                    </div>

                    <div className="space-y-4">
                        {questions.data.map((q, qIndex) => (
                            <div key={q.id} className="border rounded-lg p-3 mb-3 bg-white shadow-sm">
                                {/* প্রশ্ন */}

                                {/* Header section with question number and timestamps */}
                                <div className="mb-4">
                                    <h2 className="text-lg font-bold text-gray-900">
                                        <span className="mr-2">Q. {qIndex + 1}.</span>
                                        {q.question_text}
                                    </h2>
                                    <div className="text-xs text-gray-400 mt-1">
                                        <span>Created: {formatTimeAgo(q.created_at)}</span> |
                                        <span> Updated: {formatTimeAgo(q.updated_at)}</span>
                                    </div>
                                </div>

                                {/* অপশনগুলো */}
                                <div className="grid gap-1 mt-2">
                                    {q.options.map((option, index) => (
                                        <div
                                            key={option.id}
                                            className={`flex items-center gap-1 rounded p-2 transition ${
                                                !!Number(option.is_correct)
                                                    ? "bg-green-100 text-green-900 font-medium"
                                                    : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                                            }`}
                                        >
                                            <p className="w-5 h-5 flex items-center justify-center rounded-full border border-gray-400 text-xs">
                                                {banglaLetters[index]}
                                            </p>

                                            <div>
                                                <p className='pl-1.5'>{option.option_text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 text-xs text-blue-600 font-medium mt-4">
                                    <span className="bg-blue-100 px-2 py-1 rounded-full">
                                        বিসিএস প্রিলিমিনারি + রিটেন টেস্ট
                                    </span>
                                    <span className="bg-blue-100 px-2 py-1 rounded-full">
                                        ৩৮ তম বিসিএস (লিখিত)
                                    </span>
                                    <span className="bg-blue-100 px-2 py-1 rounded-full">
                                        মানসিক দক্ষতা
                                    </span>
                                </div>

                                {/* Description */}
                                {q.description && (
                                    <div className=" pt-4 border-t border-gray-200 mt-4">
                                        <div className="flex justify-between items-center">
                                            <button
                                                onClick={() => toggleDescription(q.id)}
                                                className="w-full text-left flex items-center text-sm font-semibold text-gray-700"
                                            >
                                                <span className="mr-2">Des</span>
                                                <svg
                                                    className={`h-5 w-5 transform transition-transform duration-200 ${
                                                        openDescriptionId === q.id ? 'rotate-180' : ''
                                                    }`}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>
                                            </button>
                                            <div className="flex items-center space-x-4 text-gray-500 text-sm">
                                                <div className="flex items-center">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-4 w-4 mr-1"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                                        />
                                                    </svg>
                                                    <span>0</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-4 w-4 mr-1"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                        />
                                                    </svg>
                                                    <span>5</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Share2 size={14} />
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                                                openDescriptionId === q.id ? 'max-h-96' : 'max-h-0'
                                            }`}
                                        >
                                            <p className="mt-2 text-sm text-gray-600">{q.description}</p>
                                        </div>
                                    </div>
                                )}
                                {/*<Accordion*/}
                                {/*    type="single"*/}
                                {/*    collapsible*/}
                                {/*    className="w-full px-2 bg-gray-50 mt-2 rounded-md shadow-sm"*/}
                                {/*>*/}
                                {/*    <AccordionItem value={`desc-${q.id}`}>*/}
                                {/*        <AccordionTrigger className="py-3 text-gray-800 hover:text-gray-900 transition font-bold hover:no-underline">*/}
                                {/*            প্রশ্নের বর্ণনা*/}
                                {/*        </AccordionTrigger>*/}
                                {/*        <AccordionContent*/}
                                {/*            className="flex flex-col gap-4 text-gray-700 text-sm px-2 pb-3 transition-all duration-300 ease-in-out"*/}
                                {/*        >*/}
                                {/*            {q.description}*/}
                                {/*        </AccordionContent>*/}
                                {/*    </AccordionItem>*/}
                                {/*</Accordion>*/}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

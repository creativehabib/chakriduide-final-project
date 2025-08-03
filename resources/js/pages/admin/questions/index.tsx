import React, { useState, useEffect } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Share2, Edit, Trash2 } from 'lucide-react';
import { formatTimeAgo } from '@/helper/helpers';
import toast from 'react-hot-toast';
import { FlashProps } from '@/types/globals';

export default function Index({
                                  questions = [],
                                  categories = [],
                                  selectedCategory = 'All',
                              }: {
    questions: any[];
    categories: any[];
    selectedCategory: string;
}) {
    const [openDescriptionId, setOpenDescriptionId] = useState<number | null>(null);
    const [currentCategory, setCurrentCategory] = useState(selectedCategory || 'All');
    const { flash } = usePage<{ flash: FlashProps }>().props;
    useEffect(() => {
        if (currentCategory !== selectedCategory) {
            setCurrentCategory(selectedCategory);
        }
    }, [selectedCategory]);

    const toggleDescription = (id: number): void => {
        setOpenDescriptionId(openDescriptionId === id ? null : id);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        const newCategory = e.target.value;
        setCurrentCategory(newCategory);

        // Inertia Router GET with filter
        router.get(route('admin.questions.index'), { category: newCategory }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this question?')) {
            router.delete(route('admin.questions.destroy', id), {
                preserveScroll: true,
            });
        }
    };
    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);
    return (
        <AppLayout>
            <Head title="Questions" />
            <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 md:mb-0">
                        Questions List
                    </h1>
                    <Link
                        href={route('admin.questions.create')}
                        className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-white transition-colors duration-200 bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Create New Question
                    </Link>
                </div>

                {/* Category Selection */}
                <div className="flex items-center gap-4 mb-8">
                    <span className="text-gray-700 font-semibold">Filter by Category:</span>
                    <select
                        onChange={handleCategoryChange}
                        value={currentCategory}
                        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                        <option value="All">All Categories</option>
                        {categories.map((category: any) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* One Column Card Layout */}
                <div className="space-y-6 md:space-y-8">
                    {questions.length > 0 ? (
                        questions.map((question: any, index: number) => (
                            <div
                                key={question.id}
                                className="relative bg-white p-6 rounded-xl shadow-lg border border-gray-200 flex flex-col justify-between hover:shadow-xl transition-shadow duration-200 w-full"
                            >
                                {/* Admin Action Buttons */}
                                <div className="absolute top-3 right-3 flex space-x-2 opacity-80 hover:opacity-100 transition">
                                    <Link
                                        href={route('admin.questions.edit', question.id)}
                                        className="p-2 bg-blue-50 hover:bg-blue-100 rounded-full text-blue-600 transition"
                                    >
                                        <Edit size={16} />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(question.id)}
                                        className="p-2 bg-red-50 hover:bg-red-100 rounded-full text-red-600 transition"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                                {/* Header section with question number and timestamps */}
                                <div className="mb-4">
                                    <h2 className="text-lg font-bold text-gray-900">
                                        <span className="mr-2">Q. {index + 1}.</span>
                                        {question.question_text}
                                    </h2>
                                    <div className="text-xs text-gray-400 mt-1">
                                        <span>Created: {formatTimeAgo(question.created_at)}</span> |
                                        <span>Updated: {formatTimeAgo(question.updated_at)}</span>
                                    </div>
                                </div>

                                {/* Question Options */}
                                <div className="p-4 bg-gray-50 rounded-md border border-gray-200 mb-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        {question.options.map((option: any) => (
                                            <div key={option.id} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={!!Number(option.is_correct)}
                                                    readOnly
                                                    className="form-checkbox h-4 w-4 text-green-600 rounded-sm"
                                                />
                                                <span
                                                    className={`ml-2 text-sm ${
                                                        !!Number(option.is_correct)
                                                            ? 'text-green-700 font-semibold'
                                                            : 'text-gray-700'
                                                    }`}
                                                >
                                                    {option.option_text}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Vote Statistics */}
                                <div className="p-4 bg-gray-50 rounded-md border border-gray-200 mb-4">
                                    <div className="text-sm font-semibold text-gray-700 mb-2">
                                        Vote Statistics
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                                        <span>Option 1: 0</span>
                                        <span>Option 2: 0</span>
                                        <span>Option 3: 0</span>
                                        <span>Option 4: 1</span>
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 text-xs text-blue-600 font-medium mb-4">
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
                                {question.description && (
                                    <div className="mt-auto pt-4 border-t border-gray-200">
                                        <div className="flex justify-between items-center">
                                            <button
                                                onClick={() => toggleDescription(question.id)}
                                                className="w-full text-left flex items-center text-sm font-semibold text-gray-700"
                                            >
                                                <span className="mr-2">Des</span>
                                                <svg
                                                    className={`h-5 w-5 transform transition-transform duration-200 ${
                                                        openDescriptionId === question.id ? 'rotate-180' : ''
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
                                                openDescriptionId === question.id ? 'max-h-96' : 'max-h-0'
                                            }`}
                                        >
                                            <p className="mt-2 text-sm text-gray-600">{question.description}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500 p-8">
                            <p className="text-lg">No questions found.</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

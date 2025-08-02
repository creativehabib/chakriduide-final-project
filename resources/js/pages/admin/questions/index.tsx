import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function Index({ questions } :any) {
    return (
        <AppLayout>
            <Head title="Questions" />
            <div className="container mx-auto p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Question List</h1>
                    <Link href={route('admin.questions.create')} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Create New Question
                    </Link>
                </div>

                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                        <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Question
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Category
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Options
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {questions.map((question :any) => (
                            <tr key={question.id}>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">{question.question_text}</p>
                                    {question.description && (
                                        <p className="text-gray-600 text-xs mt-1">
                                            **Description:** {question.description}
                                        </p>
                                    )}
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">{question.category?.name}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <ul className="list-disc list-inside">
                                        {question.options.map((option :any) => (
                                            <li key={option.id} className={`${option.is_correct ? 'text-green-600 font-bold' : ''}`}>
                                                {option.option_text}
                                                {option.is_correct && <span className="ml-2 text-xs">(Correct)</span>}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                                    <Link href={''} className="text-indigo-600 hover:text-indigo-900">
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}

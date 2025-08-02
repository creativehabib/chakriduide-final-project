import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { useForm } from '@inertiajs/react';

export default function Create({ categories }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        category_id: '',
        question_text: '',
        description: '',
        options: [
            { option_text: '', is_correct: false },
            { option_text: '', is_correct: false },
            { option_text: '', is_correct: false },
            { option_text: '', is_correct: false },
        ],
        correct_option_index: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.questions.store'));
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...data.options];
        newOptions[index].option_text = value;
        setData('options', newOptions);
    };

    const handleCorrectOptionChange = (index) => {
        setData('correct_option_index', index);
    };

    return (
        <AppLayout>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Create New Question</h1>
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block font-medium text-sm text-gray-700">Category</label>
                        <select
                            value={data.category_id}
                            onChange={(e) => setData('category_id', e.target.value)}
                            className="mt-1 block w-full"
                        >
                            <option value="">Select a Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_id && <div className="text-red-500">{errors.category_id}</div>}
                    </div>

                    <div>
                        <label className="block font-medium text-sm text-gray-700">Question Text</label>
                        <textarea
                            value={data.question_text}
                            onChange={(e) => setData('question_text', e.target.value)}
                            className="mt-1 block w-full"
                        />
                        {errors.question_text && <div className="text-red-500">{errors.question_text}</div>}
                    </div>

                    <div>
                        <label className="block font-medium text-sm text-gray-700">Description (Optional)</label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="mt-1 block w-full"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block font-medium text-sm text-gray-700">Options</label>
                        {data.options.map((option, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="correct_option"
                                    checked={data.correct_option_index === index}
                                    onChange={() => handleCorrectOptionChange(index)}
                                    className="form-radio"
                                />
                                <input
                                    type="text"
                                    value={option.option_text}
                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                    className="mt-1 block w-full"
                                    placeholder={`Option ${index + 1}`}
                                />
                            </div>
                        ))}
                        {errors['options.0.option_text'] && <div className="text-red-500">All options are required.</div>}
                        {errors.correct_option_index && <div className="text-red-500">{errors.correct_option_index}</div>}
                    </div>

                    <button type="submit" disabled={processing} className="px-4 py-2 bg-blue-500 text-white rounded">
                        Create Question
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}

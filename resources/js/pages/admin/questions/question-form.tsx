import React from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';

interface QuestionFormProps {
    categories: any[];
    question?: any; // Edit এর জন্য
}

export default function QuestionForm({ categories, question }: QuestionFormProps) {
    const { data, setData, post, put, processing, errors } = useForm({
        category_id: question?.category_id ? String(question.category_id) : '',
        question_text: question?.question_text || '',
        description: question?.description || '',
        options: question?.options || [
            { option_text: '', is_correct: false },
            { option_text: '', is_correct: false },
            { option_text: '', is_correct: false },
            { option_text: '', is_correct: false },
        ],
        correct_option_index: question
            && question.options.findIndex((opt: any) => opt.is_correct) !== -1
            ? question.options.findIndex((opt: any) => opt.is_correct)
            : null,
    });

    // Form submit
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (question) {
            put(route('admin.questions.update', question.id));
        } else {
            post(route('admin.questions.store'));
        }
    };

    // Option Text Change
    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...data.options];
        newOptions[index].option_text = value;
        setData('options', newOptions);
    };

    // Correct Option Change + is_correct update
    const handleCorrectOptionChange = (index: number): void => {
        const newOptions = data.options.map((option: any, i: number): any => ({
            ...option,
            is_correct: i === index,
        }));

        setData('options', newOptions);
        setData('correct_option_index', index);
    };

    return (
        <form
            onSubmit={submit}
            className="max-w-3xl bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 space-y-6 border border-gray-200 dark:border-gray-700"
        >
            {/* Category */}
            <div className="space-y-2">
                <Label>Category</Label>
                <Select
                    value={data.category_id}
                    onValueChange={(value) => setData('category_id', value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select a Category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((category) => (
                            <SelectItem key={category.id} value={String(category.id)}>
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.category_id && (
                    <div className="text-red-500 text-xs">{errors.category_id}</div>
                )}
            </div>

            {/* Question Text */}
            <div className="space-y-2">
                <Label>Question Text</Label>
                <Textarea
                    value={data.question_text}
                    onChange={(e) => setData('question_text', e.target.value)}
                    placeholder="Enter the question here..."
                />
                {errors.question_text && (
                    <div className="text-red-500 text-xs">{errors.question_text}</div>
                )}
            </div>

            {/* Description */}
            <div className="space-y-2">
                <Label>Description (Optional)</Label>
                <Textarea
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    placeholder="Write explanation or notes..."
                />
            </div>

            {/* Options */}
            <div className="space-y-3">
                <Label>Options</Label>
                {data.options.map((option: any, index: number) => (
                    <div
                        key={index}
                        className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                    >
                        <input
                            type="radio"
                            name="correct_option"
                            checked={data.correct_option_index === index}
                            onChange={() => handleCorrectOptionChange(index)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <Input
                            type="text"
                            value={option.option_text}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            placeholder={`Option ${index + 1}`}
                        />
                        {(errors as any)[`options.${index}.option_text`] && (
                            <div className="text-red-500 text-xs ml-2">
                                {(errors as any)[`options.${index}.option_text`]}
                            </div>
                        )}
                    </div>
                ))}
                {errors.correct_option_index && (
                    <div className="text-red-500 text-xs">
                        Please select the correct option.
                    </div>
                )}
            </div>

            {/* Submit */}
            <Button type="submit" disabled={processing} className="w-full">
                {question ? 'Update Question' : 'Create Question'}
            </Button>
        </form>
    );
}

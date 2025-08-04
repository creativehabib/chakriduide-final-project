import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { LuFileQuestion } from "react-icons/lu"; // প্রশ্ন আইকন

// ক্যাটাগরি অবজেক্টের জন্য ইন্টারফেস সংজ্ঞায়িত করা হয়েছে
interface CategoryProps {
    id: number;
    slug: string;
    name: string;
    questions_count: number;
}

const QuestionCategory = () => {
    // usePage থেকে সঠিকভাবে ক্যাটাগরিগুলোর অ্যারে টাইপ করা হয়েছে
    const { categories } = usePage<{ categories: CategoryProps[] }>().props;

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <div className="container mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
                    ক্যাটাগরি সমূহ
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/questions/${category.slug}`}
                            className="group"
                        >
                            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 p-6 flex flex-col items-center text-center h-full border border-gray-200">
                                <div className="bg-blue-100 text-blue-600 rounded-full p-4 mb-4 group-hover:bg-blue-200 transition-colors">
                                    <LuFileQuestion className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    {category.name}
                                </h3>
                                <p className="text-md text-gray-600">
                                    <span className="font-bold text-lg">{category.questions_count}</span> টি প্রশ্ন
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuestionCategory;

import React from 'react';
import AppLayout from '@/layouts/app-layout';
import QuestionForm from '@/pages/admin/questions/question-form';

export default function Create({ categories } : any) {
    return (
        <AppLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Create New Question</h1>
                <QuestionForm categories={categories} />
            </div>
        </AppLayout>
    );
}

// components/seo/SerpPreview.tsx

import React from 'react';

interface SerpPreviewProps {
    title: string;
    slug: string;
    description: string;
    baseUrl?: string;
    date?: Date;
}

const SerpPreview: React.FC<SerpPreviewProps> = ({
                                                     title,
                                                     slug,
                                                     description,
                                                     baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://your-site.com',
                                                     date = new Date(),
                                                 }) => {
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    return (
        <div className="space-y-1 border border-gray-300 dark:border-neutral-700 rounded-md p-4 bg-gray-50 dark:bg-neutral-900 text-sm">
            <p className="text-blue-700 dark:text-blue-400 text-base font-semibold leading-tight truncate">
                {title || 'Meta Title'}
            </p>
            <p className="text-green-600 text-sm break-all">
                {baseUrl}/{slug || 'your-slug'}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
                {formattedDate} – {(description || 'Meta description preview...').slice(0, 160)}
            </p>
        </div>
    );
};

export default SerpPreview;

import React from 'react';
import { usePage } from '@inertiajs/react';
import { BlogType } from '@/types/globals';

const Single = () => {
    const { blog } = usePage<{ blog: BlogType }>().props;
    return (
        <section className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-4">{blog.name}</h1>

            {blog.media?.path && (
                <img
                    src={`/storage/${blog.media.path}`}
                    alt={blog.media.name}
                    className="w-full h-auto mb-6 rounded"
                />
            )}

            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
        </section>
    );
};

export default Single;

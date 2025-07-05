import React from 'react';
import { usePage } from '@inertiajs/react';
import PostForm from '@/pages/admin/blog/post-form';
import { BlogType } from '@/types/globals';

export default function EditPost() {
    const { post } = usePage<{ post: BlogType }>().props;
    return  <PostForm post={post} isEdit={true} />;
}

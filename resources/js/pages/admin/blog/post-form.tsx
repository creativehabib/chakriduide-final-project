import React, { FormEvent, useEffect, useState } from 'react';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import toast from 'react-hot-toast';
import AppLayout from '@/layouts/app-layout';
import { Check, ChevronsUpDown, Wand2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import SetFeaturedImage from '@/components/media-image-select';
import { TiptapEditor } from '@/components/TiptapEditor';
import SlugInput from '@/components/slug-input';
import { MetaSeo } from '@/components/project-components/meta-seo';
import { AddCategoryModal } from '@/components/add-category-modal';
import InputError from '@/components/input-error';
import { cn } from '@/lib/utils';
import { BlogType, CategoryType, FlashProps, MediaItem } from '@/types/globals';
import { BreadcrumbItem } from '@/types';


const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Post Create', href: '/create' },
];
interface postFormDataType {
    [key: string]: string | number | boolean | File | null | undefined; // Allow string keys with File and null types
    name: string;
    slug: string;
    category_id: string;
    description: string;
    meta_title: string;
    meta_description: string;
    is_featured: boolean;
    status: string;
    content: string;
    media_id?: number | null;
    og_img_id?: number | null;
    allow_comments?: boolean;
    index: boolean;
}

interface PostFormProps {
    post?: Partial<BlogType> & { id?: number };
    isEdit?: boolean;
}

export default function PostForm({ post, isEdit = false }: PostFormProps) {
    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(post?.category_id?.toString() || "");
    const [selectedImage] = useState<MediaItem | undefined>(post?.media ?? undefined);
    const [editing, setEditing] = useState<CategoryType | null>(null);

    const { flash, categories } = usePage<{ flash: FlashProps, categories: CategoryType[] }>().props;

    const { data, setData, post: submitPost, put, processing, errors } = useForm<postFormDataType>({
        name: post?.name || '',
        slug: post?.slug || '',
        category_id: post?.category_id?.toString() || '',
        description: post?.description || '',
        meta_title: post?.meta_title || '',
        meta_description: post?.meta_description || '',
        is_featured: post?.is_featured ?? false,
        status: post?.status || 'draft',
        content: post?.content || '',
        media_id: post?.media_id || null,
        og_img_id: post?.og_img_id || null,
        allow_comments: post?.allow_comments ?? true,
        index: post?.index ?? true,
    });

    useEffect(() => {
        if (flash.success) toast.success(flash.success);
        if (flash.error) toast.error(flash.error);
    }, [flash]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (isEdit && post?.id) {
            put(route('blog.posts.update', post.id));
        } else {
            submitPost(route('blog.posts.store'));
        }
    };
    const handleImageSelect = (media: Partial<MediaItem> | null) => {
        if (media?.id !== undefined) {
            setData('media_id', media?.id ?? null);
        }
    };
    // console.log('🚀 Post Data:', post);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? "Edit Post" : "Create Post"} />
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                <div className="lg:col-span-2 space-y-4">
                    <Card className='rounded'>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Wand2 size={18} /> {isEdit ? 'Edit Post' : 'Create New Post'}
                            </CardTitle>
                            <CardDescription>Fill in the post details.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label htmlFor="name" className="text-sm font-medium block mb-1">Name <span className="text-red-500">*</span></label>
                                <input type="text" id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder='Enter post name...' maxLength={250} className="w-full border rounded px-3 py-2 text-sm" aria-invalid={!!errors.name} />
                                <div className="flex items-center justify-between">
                                    <InputError message={errors.name} />
                                    <div className="text-xs text-right mt-1">{data.name.length}/250</div>
                                </div>
                            </div>

                            <SlugInput name={data.name} data={data} setData={setData} table={'blogs'} postId={post?.id ?? undefined}/>

                            <div>
                                <label htmlFor="description" className="text-sm font-medium block mb-1">Description</label>
                                <textarea id="description" value={data.description} onChange={(e) => setData('description', e.target.value)} rows={4} maxLength={400} placeholder='Enter a brief description...' className="w-full border rounded px-3 py-2 text-sm" />
                                <div className="text-xs text-right mt-1">{data.description.length}/400</div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <input type="checkbox" id="is_featured" checked={data.is_featured} onChange={e => setData('is_featured', e.target.checked)} />
                                <label htmlFor="is_featured" className="text-sm">Is Featured?</label>
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-1 block">Content</label>
                                <TiptapEditor content={data.content} onChange={(val) => setData('content', val)} editable={true} />
                            </div>
                        </CardContent>
                    </Card>

                    <MetaSeo
                        data={data}
                        setData={setData}
                        handleOgImageSelect={(mediaId) => setData('og_img_id', mediaId)}
                        initialOgImage={
                            post?.og_img_id && post?.meta_image?.id === post.og_img_id
                                ? post.meta_image
                                : null
                        }
                    />
                </div>

                <div className="space-y-6">
                    <Card className='rounded'>
                        <CardHeader><CardTitle>Publish</CardTitle></CardHeader>
                        <CardContent className="space-y-2">
                            <Button type="submit" disabled={processing} className="w-full">Save</Button>
                            <Button type="button" className="w-full" variant="outline" onClick={() => {
                                submitPost(route('blog.posts.store'), {
                                    onSuccess: () => router.visit('/posts')
                                });
                            }}>Save & Exit</Button>
                        </CardContent>
                    </Card>

                    <Card className='rounded'>
                        <CardHeader><CardTitle>Status</CardTitle></CardHeader>
                        <CardContent className="space-y-2">
                            {["published", "draft", "archived"].map((val) => (
                                <label key={val} className="flex items-center space-x-2">
                                    <input type="radio" name="status" value={val} checked={data.status === val} onChange={(e) => setData('status', e.target.value)} />
                                    <span>{val.charAt(0).toUpperCase() + val.slice(1)}</span>
                                </label>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className='rounded'>
                        <CardHeader><CardTitle>Category</CardTitle></CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2">
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className="flex-1 justify-between">
                                            {selectedCategory ? categories.find(cat => cat.id.toString() === selectedCategory)?.name || 'Select Category' : 'Select Category'}
                                            <ChevronsUpDown className="ml-2 h-4 w-4" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0">
                                        <Command>
                                            <CommandInput placeholder="Search category..." />
                                            <CommandList>
                                                <CommandEmpty>No category found.</CommandEmpty>
                                                <CommandGroup>
                                                    {categories.map((category) => (
                                                        <CommandItem key={category.id} onSelect={() => {
                                                            setSelectedCategory(category.id.toString());
                                                            setData('category_id', category.id.toString());
                                                            setOpen(false);
                                                        }} className={cn('flex items-center justify-between', selectedCategory === category.id.toString() ? 'bg-blue-100' : '')}>
                                                            <span>{category.name}</span>
                                                            {selectedCategory === category.id.toString() && <Check className="ml-2 h-4 w-4" />}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <AddCategoryModal category={editing} onClose={() => setEditing(null)} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className='rounded'>
                        <CardHeader><CardTitle>Featured Image</CardTitle></CardHeader>
                        <CardContent>
                            <SetFeaturedImage
                                onSelect={handleImageSelect}
                                initial={selectedImage}
                            />
                        </CardContent>
                    </Card>

                    <Card className='rounded'>
                        <CardHeader><CardTitle>Comments</CardTitle></CardHeader>
                        <CardContent>
                            <label className="flex items-center space-x-2">
                                <input type="checkbox" checked={data.allow_comments} onChange={(e) => setData('allow_comments', e.target.checked)} />
                                <span>Allow comments</span>
                            </label>
                        </CardContent>
                    </Card>
                </div>
            </form>
        </AppLayout>
    );
}

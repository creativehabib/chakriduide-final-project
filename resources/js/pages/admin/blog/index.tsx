import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react';
import type { BreadcrumbItem } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Search, Trash2 } from 'lucide-react';
import { getImageUrl } from '@/helper/helpers';
import Permalink from '@/components/ui/permalink';
import DeleteDialog from '@/components/delete-dialog';
import toast from 'react-hot-toast';
import { BlogType, FlashProps, LinksType, MetaType } from '@/types/globals';
import InertiaPagination from '@/components/inertia-pagination';
import debounce from 'lodash.debounce';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Blogs',
        href: '/blogs',
    },
];

interface blogsType {
    data: BlogType[];
    meta: MetaType;
    links: LinksType[];
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    total: number;
}

export default function BlogIndex() {
    const { flash, blogs } = usePage<{ flash: FlashProps; blogs: blogsType }>().props;
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [blogToDelete, setBlogToDelete] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    console.log(blogs);
    const handleDelete = () => {
        if (blogToDelete !== null) {
            router.delete(route('blog.posts.destroy', blogToDelete), {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    setBlogToDelete(null);
                },
            });
            setOpenDeleteDialog(false);
        }
    };

    const handleDeleteClick = (id: number) => {
        setBlogToDelete(id);
        setOpenDeleteDialog(true);
    };

    const handleSearch = useRef(
        debounce((value: string) => {
            const params: Record<string, string> = {};
            if (value.trim() !== '') {
                params.search = value;
            }
            setLoading(true);
            router.get('/blog/posts', params, {
                preserveState: true,
                replace: true,
                onFinish: () => setLoading(false),
            });
        }, 500)
    ).current;

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        handleSearch(value);
    };

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);
    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Blogs" />
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4">Blog Management</h1>
                    <div className="flex justify-between items-center mb-4">
                        <div className="relative md:w-1/4">
                            <Input
                                id="search"
                                className="peer ps-9"
                                placeholder="Search..."
                                type="text"
                                onChange={onSearchChange}
                            />
                            <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                                <Search size={16} aria-hidden="true" />
                            </div>
                        </div>
                        <Link
                            href={route('blog.posts.create')}
                            className="px-3 py-1.5 bg-blue-600 text-white rounded-md"
                        >
                            Add New Post
                        </Link>
                    </div>

                    <div>
                        <Table className="border">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Image</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Author</TableHead>
                                    <TableHead>Created At</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    Array.from({ length: 5 }).map((_, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell><Skeleton className="h-4 w-4" /></TableCell>
                                            <TableCell><Skeleton className="h-10 w-10 rounded" /></TableCell>
                                            <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                            <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                                            <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                                            <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                            <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                                            <TableCell><Skeleton className="h-8 w-16" /></TableCell>
                                        </TableRow>
                                    ))
                                ) : blogs.data.length > 0 ? (
                                    blogs.data.map((post, index) => (
                                        <TableRow key={post.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>
                                                <img
                                                    src={getImageUrl(
                                                        post.media?.path,
                                                        400,
                                                        300,
                                                        post.media?.name || 'No Image'
                                                    )}
                                                    alt={post.media?.name}
                                                    className="h-10 w-10 rounded object-cover"
                                                />
                                            </TableCell>
                                            <TableCell width={150}>
                                                <Permalink slug={post.slug} name={post.name} />
                                            </TableCell>
                                            <TableCell>{post.category ? post.category?.name : 'No Category'}</TableCell>
                                            <TableCell>{post.user?.name}</TableCell>
                                            <TableCell>{new Date(post.created_at).toLocaleDateString()}</TableCell>
                                            <TableCell>{post.status}</TableCell>
                                            <TableCell className="space-x-1">
                                                <Link
                                                    href={route('blog.posts.edit', post.id)}
                                                    className="rounded bg-blue-500 cursor-pointer px-3 py-1 text-white hover:bg-blue-600 inline-flex items-center"
                                                >
                                                    <Edit size={16} />
                                                </Link>
                                                <button
                                                    className="bg-red-500 hover:bg-red-400 cursor-pointer rounded px-3 py-1 text-white"
                                                    onClick={() => handleDeleteClick(post.id)}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center py-4">
                                            No posts found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>

                        <div className="mb-2">
                            <InertiaPagination meta={blogs.meta} />
                        </div>
                    </div>
                </div>
            </AppLayout>

            <DeleteDialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
                onConfirm={handleDelete}
                title="Confirm Deletion"
                description="Are you sure you want to delete this blog post?"
            />
        </>
    );
}

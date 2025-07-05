import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { FlashProps, LinksType, MediaItem, MetaType, UserType } from '@/types/globals';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getImageUrl } from '@/helper/helpers';
import { Edit, Trash2 } from 'lucide-react';
import DeleteDialog from '@/components/delete-dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Toggle from '@/components/toggle';
import InertiaPagination from '@/components/inertia-pagination';
import UserDrawerForm from '@/pages/admin/users/form';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];
interface UserProps {
    data: UserType[];
    meta: MetaType;
    links: LinksType[];
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    total: number;
}
const UserIndex = () => {
    const [ editing, setEditing ] = useState<UserType | null>(null);
    const { flash, users, media } = usePage<{
        flash: FlashProps;
        users: UserProps;
        media: MediaItem[];
    }>().props;

    // Show a success message
    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const [userToDelete, setUserToDelete] = React.useState<number | null>(null);

    const handleDeleteClick = (id: number) => {
        setUserToDelete(id);
        setOpenDeleteDialog(true);
    }

    const handleDelete = () => {
        if (userToDelete !== null) {
            router.delete(route('users.destroy', userToDelete), {
                preserveScroll: true,
                preserveState: true,
                only: ['users', 'flash'],
            });
            setOpenDeleteDialog(false);
        }
    };
    const handleStatusToggle = (id: number) => {
        router.post(route('users.toggle-status', id), {},  {
            only: ['users', 'flash'],
            preserveScroll: true,
            preserveState: false, // Force re-fetch of 'users' prop from the server
        });
    };
    const handleEdit = (user: UserType) => {
        setEditing(user);
    }
    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Users" />
                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Users</h1>
                        <div className="flex items-center gap-4">
                            <UserDrawerForm
                                user={editing}
                                media={media as MediaItem[]}
                                onClose={() => setEditing(null)}
                                triggerLabel= "Add User"
                                open={false}
                            />
                        </div>
                    </div>
                    <Card>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>#</TableHead>
                                        <TableHead>Image</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.data.length > 0 ? (
                                        users.data?.map((user, index) => (
                                            <TableRow key={user.id}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>
                                                    <img
                                                        src={getImageUrl(user.media?.path, 400, 300, user.media?.name || 'No Image')}
                                                        alt={user.name}
                                                        className="w-10 h-10 rounded-full"
                                                    />
                                                </TableCell>
                                                <TableCell>{user.name}</TableCell>
                                                <TableCell>{user.email}</TableCell>

                                                <TableCell>
                                                    <Toggle initial={user.status} onChange={() => handleStatusToggle(user.id)} />
                                                </TableCell>
                                                <TableCell className="space-x-1">
                                                    <button
                                                        onClick={() => handleEdit(user)}
                                                        className="cursor-pointer rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                                                    >
                                                        <Edit size={16} />
                                                    </button>

                                                    <button
                                                        className="cursor-pointer rounded bg-red-500 px-3 py-1 text-white hover:bg-red-400"
                                                        onClick={() => handleDeleteClick(user.id)}
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={7} className="py-4 text-center">
                                                No users found.
                                            </td>
                                        </tr>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <InertiaPagination meta={users.meta} />
                </div>
            </AppLayout>
            <DeleteDialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
                onConfirm={handleDelete}
                title="Confirm Deletion"
                description="Are you sure you want to delete this user?"
            />
        </>
    );
}
export default UserIndex;

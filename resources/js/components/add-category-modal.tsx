import { Button } from "@/components/ui/button"
import {Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle,DialogTrigger} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { LoaderCircle, Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { CategoryType } from '@/types/globals';
import Toggle from '@/components/toggle';

interface DialogDemoProps {
    category?: CategoryType | null;
    onClose: () => void;
    onCreated?: (category: CategoryType) => void; // ✅ Callback for new category
}

export function AddCategoryModal({ category, onClose }: DialogDemoProps) {
    const isEditing = Boolean(category);
    const [open, setOpen] = useState(false);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        description: '',
        status: true as boolean,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // just in case
        const method = isEditing ? put : post;
        const url = isEditing ? route('blog.categories.update', category?.id) : route('blog.categories.store');
        method(url, {
            onSuccess: () => {
                reset(); // Reset form after successful submission
                setOpen(false); // Close the dialog
                onClose(); // Call onClose to reset the selected designation
            },
        });
    };

    useEffect(() => {
        if (category) {
            setOpen(true);
            setData({
                name: category.name,
                description: category.description || '',
                status: category.status ?? true,
            });
        } else if (!Object.keys(errors).length) {
            reset();
            setOpen(false);
        }
    }, [category, setData, reset, errors]);

    return (
        <Dialog
            open={open}
            onOpenChange={(val) => {
                setOpen(val);
                if (!val) onClose();
            }}
        >
            <DialogTrigger asChild>
                {!isEditing && (
                    <Button variant="outline" type="button">
                        <Plus className="h-4 w-4" />
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] w-full overflow-y-auto sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{isEditing ? 'Edit' : 'Add'} Category</DialogTitle>
                    <DialogDescription>{isEditing ? 'Update the category details.' : 'Provide a name and description.'}</DialogDescription>
                </DialogHeader>

                {/* Do NOT use <form> inside another form */}
                <div className="grid gap-4">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            placeholder={'Enter name...'}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder='Enter description...'
                            disabled={processing}
                            rows={4}
                        />
                        <InputError message={errors.description} />
                    </div>

                    <div>
                        <Label htmlFor="status">Status</Label>
                        <Toggle initial={!!Number(data.status)} onChange={(val) => setData('status', val)} />
                        <InputError message={errors.status} />
                    </div>

                    <DialogFooter>
                        <Button onClick={handleSubmit} disabled={processing}>
                            {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                            {isEditing ? 'Update' : 'Save'}
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}

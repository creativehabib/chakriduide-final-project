import {
    Drawer, DrawerClose,
    DrawerContent, DrawerDescription,
    DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger
} from '@/components/ui/drawer';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { MediaItem, UserType, UserFormData } from '@/types/globals';
import { useForm } from '@inertiajs/react';
import { transformFormDataToUserData } from '@/helper/helpers';
import SetFeaturedImage from '@/components/media-image-select';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface UserDrawerFormProps {
    triggerLabel?: string; // button label
    user: UserType | null; // user type
    media: MediaItem[];
    open: boolean;
    onClose: () => void;
}
const initialFormData: UserFormData = {
    name: '',
    email: '',
    phone: '',
    status: false,
    about: '',
    email_verified_at: '',
    created_at: '',
    updated_at: '',
    media_id: null,
}
const UserDrawerForm = ({
            user=null,
            media=[],
            triggerLabel,
            onClose
}:UserDrawerFormProps) => {
    const [open, setOpen] = useState(false);
    const isEditing = Boolean(user);
    const { data, setData, put, post, processing, reset, errors } = useForm<UserFormData>(initialFormData);


    // Form field configuration
    const formFields = [
        {id: 'name', label: 'Name', type: 'text', component: Input, placeholder: 'Enter your name'},
        { id: 'email', label: 'Email', type: 'email', component: Input, placeholder: 'Enter your email'},
        { id: 'phone', label: 'Phone', type: 'text', component: Input, placeholder: 'Enter your phone number'},
        { id: 'about', label: 'About', component: Textarea, placeholder: 'Tell us about yourself'},
        { id: 'password', label: 'Password', type: 'password', component: Input, placeholder: 'Enter your password'},
        { id: 'password_confirmation', label: 'Confirm Password', type: 'password', component: Input, placeholder: 'Re-enter your password'},
    ];

    useEffect(() => {
        if(user){
            setOpen(true);
            setData(transformFormDataToUserData(user));
        } else if (!Object.keys(errors).length) {
            setOpen(false);
            reset();
        }
    }, [user, setData, reset, errors]);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setData(name as keyof typeof data, value);
    };

    const handleImageSelect = (media: Partial<MediaItem> | null) => {
        if (media?.id !== undefined) {
            setData('media_id', media?.id ?? null);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const method = isEditing ? put : post;
        const url = isEditing
            ? route("users.update", user?.id)
            : route("users.store");

        method(url, {
            onSuccess: () => {
                reset();
                setOpen(false);
                onClose();
            },
        });
    };
    const handleClose = () => {
        setOpen(false);
        reset();
        onClose();
    };
    return (
        <Drawer open={open} onOpenChange={(val) => {
            setOpen(val);
            if (!val) onClose(); // Reset on close
        }} direction="right">
            <DrawerTrigger asChild>
                <Button
                    className='cursor-pointer'
                    variant="outline"
                    onClick={() => { onClose(); reset(); }}
                >
                    {triggerLabel}
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <form onSubmit={handleSubmit} className="flex flex-col h-full">
                    {/* Header */}
                    <DrawerHeader className="border-b">
                        <div className="flex justify-between items-center">
                            <div>
                                <DrawerTitle>{isEditing ? "Edit" : "New"} User</DrawerTitle>
                                <DrawerDescription>
                                    {isEditing ? "Update user details." : "Fill in user details."}
                                </DrawerDescription>
                            </div>
                            <DrawerClose asChild>
                                <Button size="sm" className='cursor-pointer' variant="ghost" onClick={handleClose}>✕</Button>
                            </DrawerClose>
                        </div>
                    </DrawerHeader>

                    {/* Form Body */}
                    <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
                        {/*Render standard fields*/}
                        {formFields.map((field) => {
                            const FieldComponent = field.component;
                            return (
                                <div key={field.id}>
                                    <Label htmlFor={field.id} className='mb-4'>{field.label}</Label>
                                    <FieldComponent
                                        id={field.id}
                                        name={field.id}
                                        value={data[field.id as keyof UserFormData] as string}
                                        onChange={handleChange}
                                        placeholder={field.placeholder}
                                        type={field.type || 'text'}
                                    />
                                    <InputError message={errors[field.id as keyof typeof errors]} />
                                </div>
                            );
                        })}
                        <div className="mt-4">


                            <SetFeaturedImage
                                onSelect={handleImageSelect}
                                initial={
                                    Array.isArray(media) && media.length > 0 && data.media_id
                                        ? media.find((img) => img.id === Number(data.media_id))
                                        : undefined
                                }
                            />
                        </div>
                    </div>
                    {/* Footer */}
                    <DrawerFooter className="border-t pt-4">
                        <Button type="submit" disabled={processing} className='cursor-pointer' variant="outline">
                            {processing ? "Saving..." : isEditing ? "Update" : "Save"}
                        </Button>
                        <DrawerClose asChild>
                            <Button type="button" variant="outline" onClick={handleClose} className='cursor-pointer'>
                                Cancel
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </form>
            </DrawerContent>
        </Drawer>
    );
}
export default UserDrawerForm;

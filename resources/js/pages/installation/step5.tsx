import AppInstallLayout from '@/pages/installation/AppInstallLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

type FormData = {
    system_name: string;
    admin_name: string;
    admin_email: string;
    admin_password: string;
}
interface FlashProps{
    success?: string;
    error?: string;
}
const Step5 = () => {
    const { flash } = usePage<{ flash: FlashProps }>().props;
    const { data, setData, post, processing, errors } = useForm<FormData>({
        system_name: '',
        admin_name: '',
        admin_email: '',
        admin_password: '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('system_settings'));
    };
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }

        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);
    return (
        <AppInstallLayout>
            <Head title="Step 3" />
            <div className="rounded-xl border p-6">
                <h1 className="mb-2 text-center text-2xl font-bold">Admin Settings</h1>
                <p className="mb-3 text-center">Fill this form with basic information & admin login credentials</p>
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="system_name">System Name</Label>
                            <Input
                                id="system_name"
                                type="system_name"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="system_name"
                                value={data.system_name}
                                onChange={(e) => setData('system_name', e.target.value)}
                                placeholder="Enter system name"
                            />
                            <InputError message={errors.system_name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="admin_name">Admin Name</Label>
                            <Input
                                id="admin_name"
                                type="text"
                                required
                                autoComplete="admin_name"
                                value={data.admin_name}
                                onChange={(e) => setData('admin_name', e.target.value)}
                                placeholder="Enter admin name"
                            />
                            <InputError message={errors.admin_name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="admin_email">Admin Email</Label>
                            <Input
                                id="admin_email"
                                type="email"
                                required
                                autoComplete="admin_email"
                                value={data.admin_email}
                                onChange={(e) => setData('admin_email', e.target.value)}
                                placeholder="Enter admin email"
                            />
                            <InputError message={errors.admin_email} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="admin_password">Admin Password (At least 8 characters)</Label>
                            <Input
                                id="admin_password"
                                type="password"
                                required
                                autoComplete="admin_password"
                                value={data.admin_password}
                                onChange={(e) => setData('admin_password', e.target.value)}
                                placeholder="Enter admin password"
                            />
                            <InputError message={errors.admin_password} />
                        </div>

                        <Button type="submit" className="mt-2 w-full cursor-pointer" disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Continue
                        </Button>
                    </div>
                </form>
            </div>
        </AppInstallLayout>
    );
};

export default Step5;


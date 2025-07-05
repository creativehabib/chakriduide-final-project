import AppInstallLayout from '@/pages/installation/AppInstallLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Checkbox } from '@/components/ui/checkbox';
import { LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

type FormData = {
    types: string[];
    DB_HOST: string;
    DB_DATABASE: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    reset: boolean;
}
interface FlashProps{
    success?: string;
    error?: string;
}
const Step3 = () => {
    const { flash } = usePage<{ flash: FlashProps }>().props;
    const { data, setData, post, processing, errors } = useForm<FormData>({
        types: ['DB_HOST', 'DB_DATABASE', 'DB_USERNAME', 'DB_PASSWORD'],
        DB_HOST: '',
        DB_DATABASE: '',
        DB_USERNAME: '',
        DB_PASSWORD: '',
        reset: false,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('install.db'));
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
                <h1 className="mb-2 text-center text-2xl font-bold">Database setup</h1>
                <p className="mb-3 text-center">Fill this form with valid database credentials</p>
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="db_host">Database Host</Label>
                            <Input
                                id="db_host"
                                type="DB_HOST"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="DB_HOST"
                                value={data.DB_HOST}
                                onChange={(e) => setData('DB_HOST', e.target.value)}
                                placeholder="localhost"
                            />
                            <InputError message={errors.DB_HOST} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="db_name">Database Name</Label>
                            <Input
                                id="db_name"
                                type="text"
                                required
                                tabIndex={2}
                                autoComplete="DB_DATABASE"
                                value={data.DB_DATABASE}
                                onChange={(e) => setData('DB_DATABASE', e.target.value)}
                                placeholder="Enter database name"
                            />
                            <InputError message={errors.DB_DATABASE} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="db_user">Database Username</Label>
                            <Input
                                id="db_user"
                                type="text"
                                required
                                tabIndex={3}
                                autoComplete="DB_USERNAME"
                                value={data.DB_USERNAME}
                                onChange={(e) => setData('DB_USERNAME', e.target.value)}
                                placeholder="Enter database username"
                            />
                            <InputError message={errors.DB_USERNAME} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="db_pass">Database Password</Label>
                            <Input
                                id="db_pass"
                                type="password"
                                tabIndex={4}
                                value={data.DB_PASSWORD}
                                onChange={(e) => setData('DB_PASSWORD', e.target.value)}
                                placeholder="Enter database password"
                            />
                            <InputError message={errors.DB_PASSWORD} />
                        </div>

                        <div className="flex items-center space-x-3">
                            <Checkbox
                                id="reset"
                                name="reset"
                                checked={data.reset}
                                onClick={() => setData('reset', !data.reset)}
                                tabIndex={3}
                            />
                            <Label htmlFor="reset">Reset database before installing (fresh migration)</Label>
                        </div>

                        <Button type="submit" className="mt-2 w-full cursor-pointer" tabIndex={4} disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Continue
                        </Button>
                    </div>
                </form>
            </div>
        </AppInstallLayout>
    );
};

export default Step3;

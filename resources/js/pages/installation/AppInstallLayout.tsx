import React from 'react';
import { Head} from '@inertiajs/react';

export default function AppInstallLayout({children}: { children: React.ReactNode }) {

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
                <div className="w-full max-w-lg">
                    <main className="flex flex-col gap-8">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}

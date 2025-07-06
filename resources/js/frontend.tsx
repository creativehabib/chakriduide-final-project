// resources/js/frontend.tsx
import '../css/frontend.css';
import React from 'react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';

// Optional: React rendering logic if needed
createInertiaApp({
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
});

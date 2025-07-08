// tailwind.config.ts
import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'
import animate from 'tailwindcss-animate'
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
    content: [
        './resources/**/*.blade.php',
        './resources/**/*.js',
        './resources/**/*.jsx',
        './resources/**/*.ts',
        './resources/**/*.tsx',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Hind Siliguri', ...defaultTheme.fontFamily.sans],
            },
            animation: {
                'bg-scroll': 'bgScroll 15s ease infinite',
            },
            keyframes: {
                bgScroll: {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                },
            },
        },
    },
    plugins: [typography, animate],
}

export default config

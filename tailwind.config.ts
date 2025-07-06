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
        },
    },
    plugins: [typography, animate],
}

export default config

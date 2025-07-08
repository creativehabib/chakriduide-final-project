import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const isDark = localStorage.getItem('theme') === 'dark';
        document.documentElement.classList.toggle('dark', isDark);
        setTheme(isDark ? 'dark' : 'light');
    }, []);

    const toggleTheme = () => {
        const isDark = theme === 'light';
        document.documentElement.classList.toggle('dark', isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        setTheme(isDark ? 'dark' : 'light');
    };

    return (
        <button onClick={toggleTheme} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition">
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
    );
};
export default ThemeToggle;

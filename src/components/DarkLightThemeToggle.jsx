import React from 'react';
import useAuth from '../hooks/useAuth';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

const DarkLightThemeToggle = () => {

    const { toggle, toggleTheme } = useAuth();

    return (
        <button
            onClick={toggleTheme}
            className="relative w-17 h-8 bg-gray-300 dark:bg-slate-900 rounded-full p-1 transition-colors duration-300">
            {/* Sliding Circle */}
            <div
                className={`absolute top-1 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300
                ${toggle ? "left-10 bg-amber-500 text-white" : "left-1 bg-indigo-700 text-white"}`}
            >
                {toggle ? <MdLightMode /> : <MdDarkMode />}
            </div>
        </button>
    );
};

export default DarkLightThemeToggle;
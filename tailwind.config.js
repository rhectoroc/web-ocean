/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                ocean: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e',
                    950: '#082f49',
                },
                secondary: {
                    500: '#f59e0b', // Amber for accents (common in construction)
                    600: '#d97706',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            keyframes: {
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'cinematic-reveal': {
                    '0%': { opacity: '0', filter: 'blur(20px)', transform: 'scale(1.05)' },
                    '100%': { opacity: '1', filter: 'blur(0px)', transform: 'scale(1)' },
                }
            },
            animation: {
                'fade-in': 'fade-in 1s ease-in-out',
                'cinematic-reveal': 'cinematic-reveal 2s cubic-bezier(0.22, 1, 0.36, 1) forwards',
            }
        },
    },
    plugins: [],
}

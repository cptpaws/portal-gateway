/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var'],
            },
            animation: {
                fade: 'fade .5s ease-out',
            },
            keyframes: {
                fade: {
                    '0%': {
                        transform: 'translateY(-10px)',
                        opacity: 0,
                    },
                    '100%': {
                        transform: 'none',
                        opacity: 1,
                    },
                },
            },
        },
    },
    plugins: [],
}

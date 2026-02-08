import React from 'react';

const Button = ({ children, onClick, className = '', variant = 'primary', ...props }) => {
    const baseStyle = "px-6 py-3 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg";
    const variants = {
        primary: "bg-pink-500 hover:bg-pink-600 text-white shadow-pink-200",
        secondary: "bg-white hover:bg-gray-50 text-pink-500 border-2 border-pink-500",
        outline: "border-2 border-white text-white hover:bg-white/10",
        danger: "bg-red-500 hover:bg-red-600 text-white"
    };

    return (
        <button
            onClick={onClick}
            className={`${baseStyle} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;

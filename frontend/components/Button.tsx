// components/Button.tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
}

export default function Button({ loading = false, children, ...props }: ButtonProps) {
    return (
        <button
            {...props}
            disabled={loading || props.disabled}
            className={`bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-60 ${
                props.className || ''
            }`}
        >
            {loading ? 'در حال پردازش...' : children}
        </button>
    );
}

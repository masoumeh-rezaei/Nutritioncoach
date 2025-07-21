// components/FormWrapper.tsx
import React from 'react';

interface FormWrapperProps {
    title: string;
    children: React.ReactNode;
}

export default function FormWrapper({ title, children }: FormWrapperProps) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white shadow-md rounded-md p-6 w-full max-w-md">
                <h1 className="text-xl font-bold mb-4 text-center">{title}</h1>
                {children}
            </div>
        </div>
    );
}

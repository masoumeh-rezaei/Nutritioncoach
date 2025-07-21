'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import Button from '@/components/Button';

interface User {
    name: string;
    email: string;
}

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMe = async () => {
            try {
                const res = await api.get('/me');
                setUser(res.data);
            } catch (err) {
                router.push('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchMe();
    }, [router]);

    const handleLogout = async () => {
        try {
            await api.post('/logout');
            router.push('/login');
        } catch (err) {
            console.error('خطا در خروج');
        }
    };

    if (loading) return <p className="text-center mt-10">در حال بارگذاری...</p>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white shadow-md rounded-md p-6 w-full max-w-md">
                <h1 className="text-xl font-bold mb-4 text-center">داشبورد</h1>
                {user && (
                    <div className="text-center space-y-2">
                        <p><strong>نام:</strong> {user.name}</p>
                        <p><strong>ایمیل:</strong> {user.email}</p>
                    </div>
                )}
                <div className="mt-6 flex justify-center">
                    <Button onClick={handleLogout}>خروج</Button>
                </div>
            </div>
        </div>
    );
}

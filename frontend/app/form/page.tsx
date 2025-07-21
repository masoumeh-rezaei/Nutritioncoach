'use client';

import { useState } from 'react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import FormWrapper from '@/components/FormWrapper';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function NutritionFormPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        age: '',
        height: '',
        weight: '',
        goal: 'lose',
        activityLevel: 'low',
    });
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');
        setSuccessMsg('');

        try {
            await api.post('/nutrition-form', formData);
            setSuccessMsg('فرم با موفقیت ارسال شد!');
            setFormData({ age: '', height: '', weight: '', goal: 'lose', activityLevel: 'low' });
            // router.push('/dashboard'); // اگر خواستی کاربر رو برگردونی
        } catch (err: any) {
            setErrorMsg(err.response?.data?.message || 'خطایی رخ داد.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormWrapper title="فرم مشاوره تغذیه">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input label="سن" name="age" type="number" value={formData.age} onChange={handleChange} required />
                <Input label="قد (سانتی‌متر)" name="height" type="number" value={formData.height} onChange={handleChange} required />
                <Input label="وزن (کیلوگرم)" name="weight" type="number" value={formData.weight} onChange={handleChange} required />

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">هدف</label>
                    <select name="goal" value={formData.goal} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2">
                        <option value="lose">کاهش وزن</option>
                        <option value="gain">افزایش وزن</option>
                        <option value="maintain">تثبیت وزن</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">سطح فعالیت بدنی</label>
                    <select name="activityLevel" value={formData.activityLevel} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2">
                        <option value="low">کم</option>
                        <option value="medium">متوسط</option>
                        <option value="high">زیاد</option>
                    </select>
                </div>

                {successMsg && <p className="text-green-600 text-sm">{successMsg}</p>}
                {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}

                <Button type="submit" loading={loading}>ارسال فرم</Button>
            </form>
        </FormWrapper>
    );
}

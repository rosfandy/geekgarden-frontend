import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import Field from './Field';
import Cookies from 'universal-cookie';

interface FormProps {
    path: string;
}
interface ErrorResponse {
    error: string;
}

const LoginForm: React.FC<FormProps> = ({ path }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState<string | null>(null);
    const cookies = new Cookies();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);

        try {
            const response = await axios.post(path, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                cookies.set('token', response.data.token, {
                    path: '/',
                    maxAge: 3600,
                    secure: true,
                    sameSite: 'none',
                });
                setFormData({ email: '', password: '' });
                setError(null);
                window.location.href = '/dashboard'
            } else {
                alert('Failed to send message. Please try again later.');
            }
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;

            if (axiosError.response && axiosError.response.data) {
                setError(axiosError.response.data.error);
                console.error('Error sending message:', axiosError.response.data);
            } else {
                setError('An unexpected error occurred.');
                console.error('Error sending message:', error);
            }
        }
    };

    return (
        <div className="">
            {error !== null && <p className="text-red-500 my-6">{error}</p>}
            <div className="mx-auto w-full max-w-lg">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-y-6">
                        <Field
                            type="email"
                            name="email"
                            label="Your email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <Field
                            type="password"
                            name="password"
                            label="Your password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="mt-12 rounded-md bg-black px-10 py-2 text-white">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
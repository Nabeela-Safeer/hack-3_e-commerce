'use client'
import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    interface FormData {
        name: string;
        email: string;
        subject: string;
        message: string;
    }

    interface Errors {
        [key: string]: string;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setFormData((prevFormData: FormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid';
        }
        if (!formData.subject) newErrors.subject = 'Subject is required';
        if (!formData.message) newErrors.message = 'Message is required';
        return newErrors;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const formErrors: Errors = validateForm();
        if (Object.keys(formErrors).length === 0) {
            // Submit the form data (e.g., send to an API)
            console.log('Form data submitted:', formData);
            Swal.fire({

                title: 'Message Sent!',
                text: 'We will get back to you soon.',
                icon: 'success',
                confirmButtonColor: '#0a4343'
            })
            setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
        } else {
            setErrors(formErrors);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`mt-1 block w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`mt-1 block w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={4}
                            className={`mt-1 block w-full px-4 py-2 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                        />
                        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-teal-900 text-white py-2 px-4 hover:bg-teal-400 hover:scale-100 rounded-full focus:ring-offset-2"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
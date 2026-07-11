import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAddress } from '../hooks/useAddress';

import { useToast } from '../context/ToastContext';

const Address = () => {

    const {showToast} = useToast();
    const location = useLocation();
    const navigate = useNavigate();

    const {
        address,
        loading,
        updateUserAddress
    } = useAddress();

    const emptyAddress = {
        fullName: "",
        phone: "",
        addressLine: "",
        city: "",
        state: "",
        pincode: ""
    };

    const [formData, setFormData] = useState(emptyAddress);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (address) {
            setFormData(address);
        }
    }, [address]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            console.log(formData)
            const data = await updateUserAddress(formData);
            showToast(data.message, 'success');

            const redirectTo = location.state?.from || '/profile';
            navigate(redirectTo);
        } catch (error) {
            const message = error.response?.data?.message || 'Something went wrong'
            showToast(message, 'error')
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className='flex h-96 items-center justify-center'>
                <div className='h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-black'></div>
            </div>
        );
    }

    return (
        <div className='mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8'>
            <div className='border-b border-gray-200 pb-4 mb-8'>
                <h1 className='text-2xl font-light tracking-tight text-gray-900 sm:text-3xl'>Shipping Address</h1>
                <p className='mt-1 text-sm text-gray-500'>Please enter your delivery details below.</p>
            </div>

            <form onSubmit={handleSave} className='space-y-6'>
                
                {/* Full Name Field */}
                <div>
                    <label htmlFor="fullName" className="block text-xs font-medium uppercase tracking-wider text-gray-500 mb-2">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        value={formData.fullName || ''}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:border-black focus:outline-none transition-colors"
                    />
                </div>

                {/* Contact Phone Field */}
                <div>
                    <label htmlFor="phone" className="block text-xs font-medium uppercase tracking-wider text-gray-500 mb-2">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone || ''}
                        onChange={handleChange}
                        placeholder="10-digit mobile number"
                        className="w-full px-4 py-3 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:border-black focus:outline-none transition-colors"
                    />
                </div>

                {/* Flat/Street Address Line Field */}
                <div>
                    <label htmlFor="addressLine" className="block text-xs font-medium uppercase tracking-wider text-gray-500 mb-2">
                        Street Address
                    </label>
                    <input
                        type="text"
                        id="addressLine"
                        name="addressLine"
                        required
                        value={formData.addressLine || ''}
                        onChange={handleChange}
                        placeholder="Flat, House no., Building, Company, Apartment"
                        className="w-full px-4 py-3 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:border-black focus:outline-none transition-colors"
                    />
                </div>

                {/* Nested Grid Block: City, State & Zip */}
                <div className='grid grid-cols-1 gap-6 sm:grid-cols-3'>
                    <div>
                        <label htmlFor="city" className="block text-xs font-medium uppercase tracking-wider text-gray-500 mb-2">
                            City
                        </label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            required
                            value={formData.city || ''}
                            onChange={handleChange}
                            placeholder="Delhi"
                            className="w-full px-4 py-3 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:border-black focus:outline-none transition-colors"
                        />
                    </div>

                    <div>
                        <label htmlFor="state" className="block text-xs font-medium uppercase tracking-wider text-gray-500 mb-2">
                            State
                        </label>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            required
                            value={formData.state || ''}
                            onChange={handleChange}
                            placeholder="New Delhi"
                            className="w-full px-4 py-3 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:border-black focus:outline-none transition-colors"
                        />
                    </div>

                    <div>
                        <label htmlFor="pincode" className="block text-xs font-medium uppercase tracking-wider text-gray-500 mb-2">
                            Pincode
                        </label>
                        <input
                            type="text"
                            id="pincode"
                            name="pincode"
                            required
                            value={formData.pincode || ''}
                            onChange={handleChange}
                            placeholder="1100xx"
                            className="w-full px-4 py-3 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:border-black focus:outline-none transition-colors"
                        />
                    </div>
                </div>

                {/* Interactive Submission Controls */}
                <div className='pt-4 flex items-center gap-4'>
                    <button
                        type='submit'
                        disabled={isSubmitting}
                        className={`px-8 py-3.5 text-sm font-medium uppercase tracking-wider text-white shadow-sm transition-all duration-150 active:scale-[0.98] cursor-pointer rounded-md ${
                            isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-neutral-800'
                        }`}
                    >
                        {isSubmitting ? 'Saving...' : 'Save Address'}
                    </button>
                    
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-6 py-3.5 text-sm font-medium uppercase tracking-wider text-gray-500 hover:text-gray-900 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Address;
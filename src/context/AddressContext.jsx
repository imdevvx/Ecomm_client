import React, { createContext, useEffect, useState } from 'react'
import { getAddress, updateAddress } from '../services/addressService';
import { useAuth } from '../hooks/useAuth';

export const AddressContext = createContext();

const AddressProvider = ({ children }) => {

    const { token } = useAuth();

    const emptyAddress = {
        fullName: '',
        phone: '',
        addressLine: '',
        city: '',
        state: '',
        pincode: '',
    }

    const [address, setAddress] = useState(emptyAddress);
    const [loading, setLoading] = useState(true);

    const getUserAddress = async () => {
        try {
            const data = await getAddress();
            if (data.address) {
                setAddress(data.address);
            }
            return data
        } 
        catch (error) {
            throw error
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        // As soon as the user log ins fetch user address
        if (token) {
            getUserAddress();
        }
        // else clear state on logout
        else {
            setAddress(emptyAddress);
        }
    }, [token])

    const updateUserAddress = async (address) => {
        try {
            const data = await updateAddress(
                address.fullName,
                address.phone,
                address.addressLine,
                address.city,
                address.state,
                address.pincode
            )
            setAddress(data.address)
            return data
        } catch (error) {
            throw error;
        }
    }


    return (
        <AddressContext.Provider value={{
            address,
            loading,

            setAddress,
            updateUserAddress,
        }}>
            {children}
        </AddressContext.Provider>
    )
}

export default AddressProvider;

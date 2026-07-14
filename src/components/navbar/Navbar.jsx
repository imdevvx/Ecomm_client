// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// import CartNav from './CartNav';
// import UserProfileNav from './UserProfileNav';

// const Navbar = () => {

//     const [isOpen, setIsOpen] = useState(false);

//     return (
//         <nav className='bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm'>

//             <div className='mx-auto px-6 sm:px-6 lg:px-8'>
//                 <div className='flex h-16 justify-between items-center'>

//                     {/* Brand Logo */}
//                     <Link className='text-2xl font-bold tracking-tight text-gray-900 hover:text-gray-700 transition-colors' to='/'>
//                         BRAND
//                     </Link>

//                     {/* Desktop Navigation Links */}
//                     <div className='hidden md:flex items-center gap-8 font-medium text-sm text-gray-600'>
//                         {/* <SearchBarNav /> */}
//                         <Link to='/' className='hover:text-gray-900 transition-colors'>Home</Link>
//                         {/* Cart Link with Badge */}
//                         <CartNav />
//                         <Link to='/orders' className='hover:text-gray-900 transition-colors'>Orders</Link>
//                         <UserProfileNav />

//                     </div>

//                     {/* Hamburger Button (Visible below 768px) */}
//                     <div className='md:hidden flex items-center'>

//                         {/* <div className="flex-1 mx-3 md:hidden">
//                             <SearchBarNav isMobile = {true} />
//                         </div> */}

//                         <button
//                             onClick={() => setIsOpen(!isOpen)}
//                             type='button'
//                             className='inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none'
//                             aria-expanded='false'
//                         >
//                             <span className='sr-only'>Open main menu</span>
//                             {isOpen ? (
//                                 // Close Icon (X)
//                                 <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor'>
//                                     <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
//                                 </svg>
//                             ) : (
//                                 // Hamburger Icon
//                                 <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor'>
//                                     <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
//                                 </svg>
//                             )}
//                         </button>
//                     </div>

//                 </div>
//             </div>

//             {/* Mobile Menu Dropdown */}
//             <div className={`${isOpen ? 'block' : 'hidden'} md:hidden border-t border-gray-100 bg-white`}>
//                 <div className='px-4 pt-2 pb-4 space-y-3 font-medium text-gray-600'>
//                     <Link to='/' onClick={() => setIsOpen(false)} className='block py-2 hover:text-gray-900 transition-colors'>Home</Link>
//                     <Link to='/orders' onClick={() => setIsOpen(false)} className='block py-2 hover:text-gray-900 transition-colors'>Orders</Link>
//                     <CartNav setIsOpen={setIsOpen} isMobile={true} />
//                     <hr className='border-gray-100 my-2' />
//                     <UserProfileNav setIsOpen={setIsOpen} isMobile={true} />
//                 </div>
//             </div>

//         </nav>
//     );
// };

// export default Navbar;



import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ListOrdered, ShoppingBag } from 'lucide-react';

import CartNav from './CartNav';
import UserProfileNav from './UserProfileNav';

const Navbar = () => {
    return (
        <nav className='bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm'>

            <div className='mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex h-16 justify-between items-center'>

                    {/* Brand Logo */}
                    <Link className='text-2xl font-semibold tracking-tight text-gray-900 hover:text-gray-600 transition-colors' to='/'>
                        DVL
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className='hidden md:flex items-center gap-12 font-medium text-sm text-gray-600'>
                        <Link
                            to='/'
                            className='inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors'>
                            <span className='sr-only'>Orders</span>
                            <Home className='h-6 w-6' strokeWidth={1.5} />
                        </Link>

                        <CartNav />
                        <Link
                            to='/orders'
                            className='inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors'
                        >
                            <span className='sr-only'>Orders</span>
                            <ShoppingBag className='h-6 w-6' strokeWidth={1.5} />
                        </Link>
                        <UserProfileNav />
                    </div>

                    {/* Mobile Icon Row: Cart, Orders, Profile only */}
                    <div className='flex md:hidden items-center gap-4'>
                        <CartNav />
                        <Link
                            to='/orders'
                            className='inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors'
                        >
                            <span className='sr-only'>Orders</span>
                            <ShoppingBag className='h-6 w-6' strokeWidth={1.5} />
                        </Link>
                        <UserProfileNav />
                    </div>

                </div>
            </div>

        </nav>
    );
};

export default Navbar;
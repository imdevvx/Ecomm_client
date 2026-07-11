// import React from 'react'
// import { Link } from 'react-router-dom'
// import { useCart } from '../../hooks/useCart'

// const CartNav = ({ setIsOpen, isMobile = false }) => {
//     const { cartTotals } = useCart();

//     // 1. Mobile Render Style
//     if (isMobile) {
//         return <Link to='/cart' onClick={() => setIsOpen(false)} className='flex items-center justify-between py-2 text-gray-600 hover:text-red-500 transition-colors'>
//             <span>Cart</span>
//             {cartTotals?.totalQuantity > 0 && (
//                 <span className='bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full'>
//                     {cartTotals.totalQuantity}
//                 </span>
//             )}
//         </Link>
//     }

//     // 2. Desktop Render Style
//     return (
//         <Link to='/cart' className='relative flex items-center gap-1 hover:bg-gray-100 text-gray-900 px-4 py-2 rounded-full transition-all'>
//             <span className='font-medium text-sm'>Cart</span>
//             {cartTotals?.totalQuantity > 0 && (
//                 <span className='flex items-center justify-center bg-red-500 text-white text-xs font-semibold h-5 w-5 rounded-full px-1'>
//                     {cartTotals.totalQuantity}
//                 </span>
//             )}
//         </Link>
//     )
// }

// export default CartNav


import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, ShoppingCart } from 'lucide-react'
import { useCart } from '../../hooks/useCart'

const CartNav = () => {
    const { cartTotals } = useCart();
    const count = cartTotals?.totalQuantity || 0;

    return (
        <Link
            to='/cart'
            className='relative inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors'
        >
            <span className='sr-only'>Cart</span>
            <ShoppingCart className='h-6 w-6' strokeWidth={1.5} />
            {count > 0 && (
                <span className='absolute -top-0.5 -right-0.5 flex items-center justify-center h-4.5 px-1 bg-red-500 text-white text-[10px] font-semibold rounded-full'>
                    {count}
                </span>
            )}
        </Link>
    )
}

export default CartNav
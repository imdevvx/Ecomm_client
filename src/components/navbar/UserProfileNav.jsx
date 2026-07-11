// import React, { useContext } from 'react'
// import { AuthContext } from '../../context/AuthContext'
// import { Link } from 'react-router-dom';

// const UserProfileNav = ({ setIsOpen, isMobile = false }) => {
//     const { token } = useContext(AuthContext);
//     const handleClick = () => {
//         if (setIsOpen) {
//             setIsOpen(false);
//         }
//     }

//     // 1. Mobile Render Style
//     if (isMobile) {
//         return <Link
//             to={token ? '/profile' : '/login'}
//             onClick={handleClick}
//             className='hover:text-gray-900 transition-colors'>
//             {token ? 'Profile' : 'Login'}
//         </Link>
//     }

//     // 2. Desktop Render Style
//     return (
//         <Link to={token ? '/profile' : '/login'} className='hover:text-gray-900 transition-colors'>
//             {token ? 'Profile' : 'Login'}
//         </Link>
//     )
// }

// export default UserProfileNav



import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import { User } from 'lucide-react'

const UserProfileNav = () => {
    const { token } = useContext(AuthContext);

    return (
        <Link
            to={token ? '/profile' : '/login'}
            className='inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors'
        >
            <span className='sr-only'>{token ? 'Profile' : 'Login'}</span>
            <User className='h-6 w-6' strokeWidth={1.5} />
        </Link>
    )
}

export default UserProfileNav
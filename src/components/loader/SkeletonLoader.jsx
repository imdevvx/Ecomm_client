import React from 'react'

const SkeletonLoader = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="h-8 w-56 bg-gray-200 rounded animate-pulse mb-10"></div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {[...Array(8)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                        <div className="aspect-square bg-gray-200 rounded-lg"></div>

                        <div className="h-4 bg-gray-200 rounded mt-4"></div>

                        <div className="h-4 w-2/3 bg-gray-200 rounded mt-2"></div>

                        <div className="h-5 w-20 bg-gray-300 rounded mt-4"></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SkeletonLoader

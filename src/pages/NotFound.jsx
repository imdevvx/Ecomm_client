import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
      {/* Editorial Status Code */}
      <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">Error 404</p>

      {/* Main Headers */}
      <h1 className="mt-4 text-4xl font-light tracking-tight text-gray-900 sm:text-5xl">
        Page Not Found
      </h1>
      <p className="mt-4 text-base text-gray-500 max-w-md mx-auto leading-relaxed">
        Sorry, we couldn’t find the page you’re looking for. It might have been moved, deleted, or never existed.
      </p>

      {/* Navigation Redirect Links */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to="/"
          className="w-full sm:w-auto inline-flex items-center justify-center bg-black px-6 py-3 text-sm font-medium uppercase tracking-wider text-white shadow-sm transition-all hover:bg-neutral-800 active:scale-95 rounded-md"
        >
          Go Back Home
        </Link>

        <Link
          to="/"
          state={
            { scrollToProducts: true }
          }
          className="w-full sm:w-auto inline-flex items-center justify-center border border-gray-200 bg-white px-6 py-3 text-sm font-medium uppercase tracking-wider text-gray-700 shadow-sm transition-all hover:border-gray-400 active:scale-95 rounded-md"
        >
          Explore Shop
        </Link>
      </div>

      {/* Small design accent */}
      <div className="mt-16 inline-flex h-px w-16 bg-gray-200" />
    </div>
  );
};

export default NotFound;
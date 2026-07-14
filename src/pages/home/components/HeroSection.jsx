import React from 'react'
import { Link } from 'react-router-dom'

const HeroSection = ({ onShopClick }) => {
  return (
    <section className="relative h-[75vh] md:h-[calc(100vh-4rem)]">
      <img
        // src="https://plain-apac-prod-public.komododecks.com/202607/14/9dGQRgpeag6BVEvgP0wm/image.png"
        src='https://plain-apac-prod-public.komododecks.com/202607/14/sRveWTWmFHeEbTXfZ1sI/image.jpg'
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/25" />

      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6">
          <div className="max-w-xl text-white">
            <p className="uppercase tracking-[0.25em] text-sm mb-4">
              New Collection
            </p>

            <h1 className="text-5xl md:text-7xl leading-tight">
              Timeless
              <br />
              Essentials
            </h1>

            <p className="mt-6 text-lg text-gray-100 leading-8">
              Modern products crafted with premium quality and minimalist
              design.
            </p>

            <button
              onClick={onShopClick}
              className="inline-block mt-10 bg-white text-black px-8 py-4 text-sm font-medium hover:bg-gray-100 transition">
              Shop Collection
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

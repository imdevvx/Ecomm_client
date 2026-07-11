import React, { useRef } from 'react';
import './productGallery.css'

const ProductGallery = ({ images, selectedImageIdx, setSelectedImageIdx }) => {
    const scrollContainerRef = useRef(null);

    const handleThumbnailClick = (idx) => {
        setSelectedImageIdx(idx);
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const imageWidth = container.clientWidth;
            container.scrollTo({
                left: imageWidth * idx,
                behavior: 'smooth'
            });
        }
    };

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const scrollLeft = container.scrollLeft;
            const imageWidth = container.clientWidth;
            if (imageWidth > 0) {
                const newIndex = Math.round(scrollLeft / imageWidth);
                if (newIndex !== selectedImageIdx) {
                    setSelectedImageIdx(newIndex);
                }
            }
        }
    };

    return (
        <div className="product-images">

            {/* Thumbnails */}
            {images && images.length > 1 && (
                <div className="thumbnail-list">
                    {images.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt={`thumbnail ${idx + 1}`}
                            className={selectedImageIdx === idx ? 'active' : ''}
                            onClick={() => handleThumbnailClick(idx)}
                        />
                    ))}
                </div>
            )}

            {/* Main sliding image */}
            <div className="main-image-slider">
                <div
                    className="filmstrip"
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                >
                    {images && images.length > 0 ? (
                        images.map((img, idx) => (
                            <img key={idx} src={img} alt={`product view ${idx + 1}`} />
                        ))
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-gray-400">
                            No Image Available
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductGallery;
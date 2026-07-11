import React, { useState, useEffect, useRef } from 'react';
import { getProducts } from '../../../services/productService';
import ProductCard from '../../../components/ProductCard';
import SearchBar from '../../../components/SearchBar';
import SkeletonLoader from '../../../components/loader/SkeletonLoader';

const COLORS = [
  { name: 'Blue', swatch: '#3B5B8C' },
  { name: 'Black', swatch: '#1A1A1A' },
  { name: 'Grey', swatch: '#9B9B96' },
];

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const loaderRef = useRef(null);

  // --- Filtering State Hooks ---
  const [selectedColor, setSelectedColor] = useState("");
  const [priceSort, setPriceSort] = useState(""); // "" | "low-high" | "high-low"
  const [sortOption, setSortOption] = useState("latest"); // "latest" | "bestseller"
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const limit = 8;

  // --- Existing Text Search Query Parsing ---
  const searchText = search.trim().toLowerCase();
  const stopWords = ["for", "the", "and", "with", "of", "in", "to", "a", "an"];
  const keywords = searchText
    .split(/\s+/)
    .filter(word => word.length > 2)
    .filter(word => !stopWords.includes(word));

  // --- Dynamic Filtering & Sorting Logic ---
  let processedProducts = products.filter((product) => {
    const searchable = `
      ${product.name}
      ${product.color}
      ${product.brand}
      ${product.category?.name || ''}
    `.toLowerCase();
    return keywords.every(word => searchable.includes(word));
  });

  if (selectedColor) {
    processedProducts = processedProducts.filter(
      p => p.color?.toLowerCase() === selectedColor.toLowerCase()
    );
  }

  if (sortOption === 'latest') {
    processedProducts = [...processedProducts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (sortOption === 'bestseller') {
    processedProducts = [...processedProducts].sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0));
  }

  if (priceSort === "low-high") {
    processedProducts = [...processedProducts].sort((a, b) => a.price - b.price);
  } else if (priceSort === "high-low") {
    processedProducts = [...processedProducts].sort((a, b) => b.price - a.price);
  }

  const handleClearFilters = () => {
    setSelectedColor("");
    setPriceSort("");
    setSortOption("latest");
    setSearch("");
  };

  const activeFilterCount = [selectedColor, priceSort, sortOption !== 'latest' ? sortOption : ''].filter(Boolean).length;

  // --- Infinite Scroll Fetch Operations ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts({ page, limit });
        setProducts(prev => [...prev, ...data]);
        if (data.length < limit) setHasMore(false);
      } catch (error) {
        const message = error.response?.data?.message || 'Something went wrong'
        showToast(message, 'error')
      } finally {
        setIsLoading(false);
      }
    };
    if (hasMore) fetchProducts();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !isLoading) {
        setPage(prev => prev + 1);
      }
    });
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, isLoading]);

  // --- Reusable Filter Sidebar Content ---
  const FilterSidebarContent = () => (
    <div className="space-y-7">
      {/* Colors */}
      <div>
        <h4 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400 mb-3">Color</h4>
        <div className="flex items-center gap-3">
          {COLORS.map(({ name, swatch }) => {
            const isActive = selectedColor === name;
            return (
              <button
                key={name}
                type="button"
                onClick={() => setSelectedColor(isActive ? "" : name)}
                title={name}
                className={`relative w-8 h-8 rounded-full transition-all duration-150 ${isActive ? 'ring-2 ring-offset-2 ring-gray-900' : 'ring-1 ring-offset-2 ring-gray-200 hover:ring-gray-400'
                  }`}
                style={{ backgroundColor: swatch }}
              >
                <span className="sr-only">{name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price */}
      <div>
        <h4 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400 mb-3">Price</h4>
        <div className="flex flex-col gap-1.5">
          {[
            { key: 'low-high', label: 'Low to High' },
            { key: 'high-low', label: 'High to Low' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setPriceSort(priceSort === key ? '' : key)}
              className={`text-left text-sm px-3 py-2 rounded-lg transition-colors ${priceSort === key
                  ? 'bg-gray-900 text-white font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Collections */}
      <div>
        <h4 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400 mb-3">Sort By</h4>
        <div className="flex bg-gray-100 rounded-lg p-1">
          {[
            { key: 'latest', label: 'Latest' },
            { key: 'bestseller', label: 'Bestsellers' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setSortOption(key)}
              className={`flex-1 text-xs font-medium py-2 rounded-md transition-all ${sortOption === key
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-800'
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleClearFilters}
        className="w-full border border-gray-200 py-2.5 text-xs font-medium uppercase tracking-wider text-gray-500 hover:text-gray-900 hover:border-gray-300 rounded-lg transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-8">
        <div>
          <h2 className="text-5xl tracking-tight text-gray-800">Featured Products</h2>
          <p className="text-sm text-gray-500 mt-1.5">Discover our latest arrivals, curated for you.</p>
        </div>
        <SearchBar search={search} setSearch={setSearch} />
      </div>

      <div className="h-px bg-gray-100 w-full mb-6" />

      {/* Mobile Controls */}
      <div className="flex gap-3 mb-6 md:hidden">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 text-sm font-medium rounded-lg text-gray-800 bg-white active:bg-gray-50"
        >
          Filters
          {activeFilterCount > 0 && (
            <span className="inline-flex items-center justify-center w-5 h-5 text-[11px] font-semibold bg-gray-900 text-white rounded-full">
              {activeFilterCount}
            </span>
          )}
        </button>
        <button
          onClick={handleClearFilters}
          className="flex-1 py-3 text-center border border-gray-200 text-sm font-medium rounded-lg text-gray-500 bg-gray-50 active:bg-gray-100"
        >
          Clear
        </button>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-4 items-start">

        {/* Desktop Sidebar */}
        <aside className="hidden md:block md:col-span-1 md:sticky md:top-24">
          <FilterSidebarContent />
        </aside>

        {/* Product Feed */}
        <div className="md:col-span-3 space-y-5">

          {/* Toolbar: count + active chips */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-900">{processedProducts.length}</span> items
            </p>

            {(selectedColor || priceSort) && (
              <div className="flex flex-wrap items-center gap-2">
                {selectedColor && (
                  <button
                    onClick={() => setSelectedColor("")}
                    className="flex items-center gap-1.5 pl-3 pr-2 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-xs font-medium text-gray-700 transition-colors"
                  >
                    {selectedColor}
                    <span className="text-gray-400">✕</span>
                  </button>
                )}
                {priceSort && (
                  <button
                    onClick={() => setPriceSort("")}
                    className="flex items-center gap-1.5 pl-3 pr-2 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-xs font-medium text-gray-700 transition-colors"
                  >
                    {priceSort === 'low-high' ? 'Price: Low-High' : 'Price: High-Low'}
                    <span className="text-gray-400">✕</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {isLoading && products.length === 0 ? (
            <SkeletonLoader />
          ) : processedProducts.length > 0 ? (
            <ProductCard products={processedProducts} />
          ) : (
            <div className="py-24 text-center border border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-xl">
                ⌕
              </div>
              <h3 className="text-base font-medium text-gray-900">No products found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your filters or search keywords.</p>
              <button
                onClick={handleClearFilters}
                className="mt-4 text-sm font-medium text-gray-900 underline underline-offset-4 hover:text-gray-600"
              >
                Clear all filters
              </button>
            </div>
          )}

          <div ref={loaderRef} className="h-4" />
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white p-6 shadow-2xl animate-slide-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                ✕
              </button>
            </div>
            <FilterSidebarContent />
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="mt-8 w-full bg-gray-900 py-3.5 text-sm font-semibold text-white rounded-lg shadow-md hover:bg-gray-800 transition-colors"
            >
              Show {processedProducts.length} Results
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductSection;
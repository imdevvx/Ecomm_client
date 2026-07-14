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

  // --- Filtering & Sorting State Hooks ---
  const [selectedColor, setSelectedColor] = useState("");
  const [priceSort, setPriceSort] = useState(""); // "" | "low-high" | "high-low"
  const [sortOption, setSortOption] = useState("latest"); // "latest" | "bestseller"
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const limit = 8;

  // --- Handle Filter Resets when Settings Change ---
  // Whenever filters change, reset back to page 1 and wipe out the old list
  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    setIsLoading(true);
  }, [search, selectedColor, priceSort, sortOption]);

  // --- Unified Fetch Operation ---
  useEffect(() => {
    let isMounted = true;

    // --- Inside your ProductSection React component's useEffect ---
    const fetchProducts = async () => {
      if (!hasMore && page !== 1) return;

      try {
        setIsLoading(true);

        let backendSort = 'latest';
        if (priceSort === 'low-high') backendSort = 'price';
        if (priceSort === 'high-low') backendSort = '-price';

        // Call service 
        const fetchedList = await getProducts({
          page,
          limit,
          sort: sortOption === 'bestseller' ? 'latest' : backendSort,
          bestseller: sortOption === 'bestseller' ? 'true' : 'false',
          color: selectedColor || undefined,
          search: search.trim() || undefined
        });

        // CRITICAL FIX: fetchedList is already the raw array here!
        if (isMounted) {
          setProducts(prev => (page === 1 ? fetchedList : [...prev, ...fetchedList]));
          if (fetchedList.length < limit) {
            setHasMore(false);
          }
        }
      } catch (error) {
        console.error("Failed fetching items:", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [page, search, selectedColor, priceSort, sortOption]);

  // --- Infinite Scroll Intersection Trigger ---
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !isLoading) {
        setPage(prev => prev + 1);
      }
    }, { threshold: 0.1 });

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, isLoading]);

  const handleClearFilters = () => {
    setSelectedColor("");
    setPriceSort("");
    setSortOption("latest");
    setSearch("");
  };

  const activeFilterCount = [
    selectedColor,
    priceSort,
    sortOption !== 'latest' ? sortOption : ''
  ].filter(Boolean).length;

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
              type="button"
              onClick={() => setPriceSort(priceSort === key ? '' : key)}
              className={`text-left text-sm px-3 py-2 rounded-lg transition-colors ${priceSort === key ? 'bg-gray-900 text-white font-medium' : 'text-gray-600 hover:bg-gray-100'
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
              type="button"
              onClick={() => setSortOption(key)}
              className={`flex-1 text-xs font-medium py-2 rounded-md transition-all ${sortOption === key ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-800'
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
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
          type="button"
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
          type="button"
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
          {/* Toolbar: count */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-900">{products.length}</span> items
            </p>

            {(selectedColor || priceSort) && (
              <div className="flex flex-wrap items-center gap-2">
                {selectedColor && (
                  <button
                    type="button"
                    onClick={() => setSelectedColor("")}
                    className="flex items-center gap-1.5 pl-3 pr-2 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-xs font-medium text-gray-700 transition-colors"
                  >
                    {selectedColor}
                    <span className="text-gray-400">✕</span>
                  </button>
                )}
                {priceSort && (
                  <button
                    type="button"
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

          {/* Main Product Display Area */}
          {isLoading && products.length === 0 ? (
            <SkeletonLoader />
          ) : products.length > 0 ? (
            <>
              <ProductCard products={products} />

              {/* --- UX Improvement: Loading More indicator --- */}
              {isLoading && (
                <div className="py-6 flex items-center justify-center gap-2 text-sm text-gray-500 font-medium tracking-wide border-t border-gray-100/60 mt-4 animate-pulse">
                  <svg className="animate-spin h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading more items...
                </div>
              )}
            </>
          ) : (
            <div className="py-24 text-center border border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-xl">
                ⌕
              </div>
              <h3 className="text-base font-medium text-gray-900">No products found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your filters or search keywords.</p>
              <button
                type="button"
                onClick={handleClearFilters}
                className="mt-4 text-sm font-medium text-gray-900 underline underline-offset-4 hover:text-gray-600"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Infinite Scroll Trigger Boundary */}
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
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                ✕
              </button>
            </div>
            <FilterSidebarContent />
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(false)}
              className="mt-8 w-full bg-gray-900 py-3.5 text-sm font-semibold text-white rounded-lg shadow-md hover:bg-gray-800 transition-colors"
            >
              Show {products.length} Results
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductSection;
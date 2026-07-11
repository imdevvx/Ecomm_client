import React, {useEffect}  from 'react';

const PrivacyPolicy = () => {
  const currentYear = new Date().getFullYear();
    useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // or "auto"
      });
    }, []);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Page Title Header */}
      <div className="border-b border-gray-100 pb-6 mb-12">
        <h1 className="text-3xl font-light tracking-tight text-gray-900 sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Last updated: {currentYear}. Learn how we manage and secure your data profile.
        </p>
      </div>

      <div className="space-y-10">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg font-medium text-gray-900 tracking-tight">1. Information We Collect</h2>
          <div className="h-px bg-gray-100 w-full mb-3" />
          <p className="text-sm text-gray-600 leading-relaxed">
            We collect profile elements you share directly with us when creating accounts, completing checkouts, or interacting with support. This includes your name, delivery address, email, and mobile tracking tokens.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-lg font-medium text-gray-900 tracking-tight">2. How We Use Your Data</h2>
          <div className="h-px bg-gray-100 w-full mb-3" />
          <p className="text-sm text-gray-600 leading-relaxed">
            Your tracking data is used to process checkout order payments, coordinate localized distribution logistics with shipping services, and distribute support updates via WhatsApp or automated mail streams.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg font-medium text-gray-900 tracking-tight">3. Data Security & Storage</h2>
          <div className="h-px bg-gray-100 w-full mb-3" />
          <p className="text-sm text-gray-600 leading-relaxed">
            We store sensitive account items securely. Alphanumeric passwords and security data hashes remain fully protected and are never sold, transferred, or exposed to unauthorized corporate entities.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-lg font-medium text-gray-900 tracking-tight">4. Cookies & Analytics</h2>
          <div className="h-px bg-gray-100 w-full mb-3" />
          <p className="text-sm text-gray-600 leading-relaxed">
            We track localized platform usage metrics to log shopping cart states and optimize search query performance using standard analytical cookies.
          </p>
        </section>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
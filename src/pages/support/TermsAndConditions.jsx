import React, {useEffect} from 'react';

const TermsAndConditions = () => {
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
          Terms & Conditions
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Last updated: {currentYear}. Rules governing your interaction with our storefront.
        </p>
      </div>

      <div className="space-y-10">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg font-medium text-gray-900 tracking-tight">1. Terms of Agreement</h2>
          <div className="h-px bg-gray-100 w-full mb-3" />
          <p className="text-sm text-gray-600 leading-relaxed">
            By entering and browsing this website, you agree to comply fully with our localized operational guidelines and commercial purchase conditions. If you do not accept these criteria, please cease platform interactions.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-lg font-medium text-gray-900 tracking-tight">2. Account Responsibility</h2>
          <div className="h-px bg-gray-100 w-full mb-3" />
          <p className="text-sm text-gray-600 leading-relaxed">
            When completing user configurations or saving temporary credentials inside local browsers, you accept accountability for maintaining security flags over your personal access channels and passwords.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg font-medium text-gray-900 tracking-tight">3. Inventory & Pricing Changes</h2>
          <div className="h-px bg-gray-100 w-full mb-3" />
          <p className="text-sm text-gray-600 leading-relaxed">
            We reserve the authorization to modify pricing scales, product specifications, or regional delivery flags at our warehouse discretion without issuing proactive notifications.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-lg font-medium text-gray-900 tracking-tight">4. Intellectual Property</h2>
          <div className="h-px bg-gray-100 w-full mb-3" />
          <p className="text-sm text-gray-600 leading-relaxed">
            All photography layouts, contemporary denim design patterns, typography structures, and text files sit as protected intellectual assets owned exclusively by our brand.
          </p>
        </section>
      </div>
    </main>
  );
};

export default TermsAndConditions;
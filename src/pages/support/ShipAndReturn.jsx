import React , {useEffect} from 'react';

const ShipAndReturn = () => {
    useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // or "auto"
      });
    }, []);
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Editorial Page Title Header */}
      <div className="border-b border-gray-100 pb-6 mb-12">
        <h1 className="text-3xl font-light tracking-tight text-gray-900 sm:text-4xl">
          Shipping & Returns
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Review our logistical fulfillment policies, distribution networks, and return protocols.
        </p>
      </div>

      <div className="space-y-12">
        {/* Shipping Policy Section */}
        <section className="space-y-3">
          <h2 className="text-lg font-medium text-gray-900 tracking-tight">Shipping Policy</h2>
          <div className="h-px bg-gray-100 w-full mb-4" />
          <p className="text-sm text-gray-600 leading-relaxed">
            We currently fulfill order logistics exclusively within the <strong className="text-gray-900 font-semibold">Delhi and Noida</strong> regions. Orders are typically processed and routed within <strong className="text-gray-900 font-semibold">1–2 business days</strong> following structural payment confirmation.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Standard destination delivery typically takes <strong className="text-gray-900 font-semibold">3–7 business days</strong> depending on your local region configurations and our scheduled courier partners.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Once your order is handed over to the carrier, dispatch tracking manifests will be systematically delivered via WhatsApp or email communication streams.
          </p>
        </section>

        {/* Delivery Charges Section */}
        <section className="space-y-3">
          <h2 className="text-lg font-medium text-gray-900 tracking-tight">Delivery Charges</h2>
          <div className="h-px bg-gray-100 w-full mb-4" />
          <p className="text-sm text-gray-600 leading-relaxed">
            We offer complimentary <strong className="text-gray-900 font-semibold">FREE shipping</strong> globally across our entire product range for all integrated prepaid digital orders.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Cash on Delivery (COD) transactions, where localized service coverage flags permit, may draw additional processing surcharges at checkout.
          </p>
        </section>

        {/* Returns & Exchanges Section */}
        <section className="space-y-3">
          <h2 className="text-lg font-medium text-gray-900 tracking-tight">Returns & Exchanges</h2>
          <div className="h-px bg-gray-100 w-full mb-4" />
          <p className="text-sm text-gray-600 leading-relaxed">
            We accept merchandise returns or size adjustments strictly under the following physical criteria configurations:
          </p>
          <ul className="list-disc list-inside pl-2 space-y-2 text-sm text-gray-600">
            <li>Physical structural damage upon transit arrival</li>
            <li>Incorrect barcode line item or size delivered</li>
            <li>Verified raw material manufacturing defects</li>
          </ul>
          <p className="text-sm text-gray-600 leading-relaxed pt-2">
            To hold valid processing eligibility, you must log a support notification file with our teams within <strong className="text-gray-900 font-semibold">48 hours</strong> of signed delivery.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Products must remain entirely unused, unwashed, unaltered, and enclosed inside original packaging configurations with tags attached.
          </p>
        </section>

        {/* How to Request a Return Section */}
        <section className="space-y-3">
          <h2 className="text-lg font-medium text-gray-900 tracking-tight">How to Request a Return</h2>
          <div className="h-px bg-gray-100 w-full mb-4" />
          <p className="text-sm text-gray-600 leading-relaxed">
            Please file your ticket by routing a message to our support channels on WhatsApp or Instagram along with the following ledger elements:
          </p>
          <ul className="list-none space-y-2 pl-4 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-black rounded-full" />
              <span>Your alphanumeric <strong className="text-gray-900 font-medium">Order ID</strong> string</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-black rounded-full" />
              <span>Clear image references or unboxing video documentation of the issue</span>
            </li>
          </ul>
          <p className="text-sm text-gray-600 leading-relaxed pt-2">
            Our customer management desk will analyze the uploaded references and guide you through subsequent processing vectors.
          </p>
        </section>

        {/* Refunds Section */}
        <section className="space-y-3">
          <h2 className="text-lg font-medium text-gray-900 tracking-tight">Refunds</h2>
          <div className="h-px bg-gray-100 w-full mb-4" />
          <p className="text-sm text-gray-600 leading-relaxed">
            Once returned items are received at our warehouse inspection deck and approved, refunds are processed into the banking pipeline within <strong className="text-gray-900 font-semibold">5–7 business days</strong>.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            All credit balancing distributions are systematically reversed directly back onto the original financial transaction account used at checkout.
          </p>
        </section>
      </div>
    </main>
  );
};

export default ShipAndReturn;
import React, {useEffect} from 'react';

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // or "auto"
    });
  }, []);
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Editorial Header Block */}
      <section className="text-center max-w-xl mx-auto mb-16">
        <h1 className="text-4xl font-light tracking-tight text-gray-900 sm:text-5xl">
          Need Help?
        </h1>
        <p className="mt-4 text-base text-gray-500 leading-relaxed">
          Reach out to our dedicated support ledger directly. We monitor incoming communications and usually respond within a few hours.
        </p>
      </section>

      {/* Modern High-Conversion Action Grid */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-3">

        {/* WhatsApp Card Channel */}
        <a
          href="https://wa.me/8588949227?text=Hi%20DVL%20Team,%20I%20need%20help%20with%20my%20order%20id%20[Paste%20your%20Order%20id%20here]"
          target="_blank"
          rel="noopener noreferrer"
          className="group block rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-emerald-400 hover:shadow-md hover:scale-[1.01]"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900 group-hover:text-emerald-600 transition-colors">WhatsApp</h2>
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">Chat instantly with our team.</p>
          <span className="block mt-6 font-mono text-sm font-semibold tracking-wide text-gray-700">+91 8588949227</span>
        </a>

        {/* Instagram Card Channel */}
        <a
          href="https://instagram.com/imdevx"
          target="_blank"
          rel="noopener noreferrer"
          className="group block rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-pink-400 hover:shadow-md hover:scale-[1.01]"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900 group-hover:text-pink-600 transition-colors">Instagram</h2>
            <span className="inline-flex h-2 w-2 rounded-full bg-pink-500 opacity-60" />
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">Send a direct message on our creative social space.</p>
          <span className="block mt-6 font-mono text-sm font-semibold tracking-wide text-gray-700">@imdevx</span>
        </a>

        {/* Email Card Channel */}
        <a
          href="mailto:edmindevv@gmail.com?subject=Support%20Request&body=Hi%20DVL%20Team,%0A%0AI%20need%20help%20with..."
          className="group block rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-black hover:shadow-md hover:scale-[1.01]"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900 group-hover:text-black transition-colors">Email</h2>
            <span className="inline-flex h-2 w-2 rounded-full bg-gray-400 opacity-60" />
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">For corporate, commercial, or formal order queries.</p>
          <span className="block mt-6 font-mono text-sm font-semibold tracking-wide text-gray-700 truncate">edmindevv@gmail.com</span>
        </a>

      </section>
    </main>
  );
};

export default ContactUs;
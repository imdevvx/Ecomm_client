import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-24 border-t border-gray-100 bg-white">
            {/* Top Footer Navigation Section */}
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-4">
                    
                    {/* Brand Meta Block */}
                    <div className="sm:col-span-2 space-y-4">
                        <Link 
                        to="/"
                        className="text-2xl tracking-tight text-gray-700 hover:text-gray-900 transition-colors">
                            Brand shop
                        </Link>
                        <p className="max-w-xs text-sm leading-relaxed text-gray-500">
                            Premium denim and contemporary fashion essentials designed for the modern wardrobe.
                        </p>
                        {/* Social Link Vectors */}
                        <div className="flex gap-4 pt-2">
                            <a 
                                href="https://instagram.com/imdevx" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-black transition-colors"
                            >
                                Instagram
                            </a>
                            <a 
                                href="https://wa.me/8588949227" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-black transition-colors"
                            >
                                Whatsapp
                            </a>
                        </div>
                    </div>

                    {/* Customer Support Directory Links */}
                    <div className="flex flex-col space-y-3">
                        <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-900">
                            Support
                        </h3>
                        <ul className="space-y-2.5 text-sm text-gray-500">
                            <li><Link to="/contact" className="hover:text-black transition-colors">Contact Us</Link></li>
                            <li><Link to="/shipping-return" className="hover:text-black transition-colors">Shipping & Returns</Link></li>
                            <li><Link to="/orders" className="hover:text-black transition-colors">Track Order</Link></li>
                        </ul>
                    </div>

                    {/* Legal Compliance Directory Links */}
                    <div className="flex flex-col space-y-3">
                        <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-900">
                            Legal
                        </h3>
                        <ul className="space-y-2.5 text-sm text-gray-500">
                            <li><Link to="/privacy-policy" className="hover:text-black transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms-conditions" className="hover:text-black transition-colors">Terms & Conditions</Link></li>
                        </ul>
                    </div>

                </div>
            </div>

            {/* Bottom Invoicing Trademark Strip */}
            <div className="border-t border-gray-50 bg-gray-50/50">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-gray-400 text-center sm:text-left">
                        &copy; {currentYear} Brand. All rights reserved.
                    </p>
                    <p className="text-[10px] tracking-wider text-gray-300 uppercase">
                        Crafted for Excellence
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
import React from "react";
import StaticSection from "../common/StaticSection";
import { CreditCard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/freshcart-logo.49f1b44d.svg";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <StaticSection />
      <section className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-4">
              {" "}
              <div className="bg-white p-3 rounded-lg mb-6 inline-block shadow-md">
                <Image alt="logo" src={logo} />
              </div>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed max-w-sm">
                FreshCart is your one-stop destination for quality products.
                From fashion to electronics, we bring you the best brands at
                competitive prices with a seamless shopping experience.
              </p>
              <div className="space-y-2 mb-6 text-sm">
                <div className="flex items-center gap-3 text-gray-400 hover:text-green-600">
                  <Phone className="w-4 h-4 fill-green-500 text-green-500" />
                  <span>+1 (800) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 hover:text-green-600">
                  <Mail className="w-4 h-4  text-green-500" />
                  <span>support@freshcart.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 hover:text-green-600">
                  <MapPin className="w-4 h-4 text-green-500" />
                  <span>123 Commerce Street, New York, NY 10001</span>
                </div>
              </div>
              <div className="flex space-x-3 pt-2">
                <Link
                  href="#"
                  className="bg-slate-800 hover:bg-green-600 p-2.5 rounded-full text-white transition-colors flex items-center justify-center"
                >
                  <FaFacebookF className="w-4 h-4" />
                </Link>
                <Link
                  href="#"
                  className="bg-slate-800 hover:bg-green-600 p-2.5 rounded-full text-white transition-colors flex items-center justify-center"
                >
                  <FaTwitter className="w-4 h-4" />
                </Link>
                <Link
                  href="#"
                  className="bg-slate-800 hover:bg-green-600 p-2.5 rounded-full text-white transition-colors flex items-center justify-center"
                >
                  <FaInstagram className="w-4 h-4" />
                </Link>
                <Link
                  href="#"
                  className="bg-slate-800 hover:bg-green-600 p-2.5 rounded-full text-white transition-colors flex items-center justify-center"
                >
                  <FaYoutube className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-white font-semibold text-lg tracking-wide">
                Shop
              </h3>
              <ul className="space-y-2.5 text-gray-400 text-sm">
                <li>
                  <Link
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Brands
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Men's Fashion
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Women's Fashion
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-white font-semibold text-lg tracking-wide">
                Account
              </h3>
              <ul className="space-y-2.5 text-gray-400 text-sm">
                <li>
                  <Link
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Order History
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Shopping Cart
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Create Account
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-white font-semibold text-lg tracking-wide">
                Support
              </h3>
              <ul className="space-y-2.5 text-gray-400 text-sm">
                <li>
                  <Link
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Returns & Refunds
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Track Order
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-white font-semibold text-lg tracking-wide">
                Legal
              </h3>
              <ul className="space-y-2.5 text-gray-400 text-sm">
                <li>
                  <Link
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-400 transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm text-center md:text-left">
                © 2026 FreshCart. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <CreditCard size={16} /> <span>Visa</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <CreditCard size={16} /> <span>Mastercard</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <CreditCard size={16} /> <span>PayPal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import { Headset, RotateCcw, ShieldHalf, Truck } from "lucide-react";
import React from "react";

export default function StaticSection() {
  return (
    <>
      <div className="bg-emerald-50 border-y border-primary-100">
        <div className="container mx-auto px-4 py-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-4 ">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                <Truck className="text-emerald-600 fill-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">
                  Free Shipping
                </h3>
                <p className="text-xs text-gray-500">On orders over 500 EGP</p>
              </div>
            </div>
            <div className="flex items-center gap-4 ">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                <RotateCcw className="text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">
                  Easy Returns
                </h3>
                <p className="text-xs text-gray-500">14-day return policy</p>
              </div>
            </div>
            <div className="flex items-center gap-4 ">
              <div className="bg-emerald-100 text-emerald-600 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                <ShieldHalf />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">
                  Secure Payment
                </h3>
                <p className="text-xs text-gray-500">
                  100% secure transactions
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 ">
              <div className="bg-emerald-100 text-emerald-600 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                <Headset />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">
                  24/7 Support
                </h3>
                <p className="text-xs text-gray-500">Contact us anytime</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

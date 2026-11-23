import {
  Apple,
  Headset,
  Leaf,
  Mail,
  MoveRight,
  PlayCircle,
  RotateCcw,
  ShieldHalf,
  Star,
  Tag,
  Truck,
} from "lucide-react";
import HomeCategory from "@/components/categories/HomeCategory";
import ProductCard from "@/components/products/ProductCard";
import HeroSection from "@/components/common/HeroSection";
import getAllProducts from "@/services/product.services";
import { ProductI } from "@/types/product.type";

export default async function Home() {
  const data = await getAllProducts();
  const products: ProductI[] = data.data;
  return (
    <>
      <HeroSection />

      <div className="py-8 bg-gray-50">
        <div className="container px-3 mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-blue-50 text-blue-500 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                <Truck className="fill-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">
                  Free Shipping
                </h3>
                <p className="text-xs text-gray-500">On orders over 500 EGP</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-emerald-50 text-emerald-500 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
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
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-orange-50 text-orange-500 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                <RotateCcw />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">
                  Easy Returns
                </h3>
                <p className="text-xs text-gray-500">14-day return policy</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-purple-50 text-purple-500 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                <Headset />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">
                  24/7 Support
                </h3>
                <p className="text-xs text-gray-500">Dedicated support team</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8">
            <div className="flex  items-center gap-3 my-8">
              <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                Shop By <span className="text-emerald-600">Category</span>
              </h2>
            </div>
            <a
              className="text-emerald-600 self-end sm:self-auto hover:text-emerald-700 font-medium flex items-center cursor-pointer"
              href=""
            >
              View All Categories <MoveRight className="ms-2" />
            </a>
          </div>
          <HomeCategory />
        </div>
      </section>
      <section className="py-10">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-emerald-500 to-emerald-700 p-8 text-white">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm mb-4">
                  <span>🔥</span> <span>Deal of the Day</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  Fresh Organic Fruits
                </h3>
                <p className="text-white/80 mb-4">
                  Get up to 40% off on selected organic fruits
                </p>
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-3xl font-bold">40% OFF</div>
                  <div className="text-sm text-white/70">
                    Use code:{" "}
                    <span className="font-bold text-white">ORGANIC40</span>
                  </div>
                </div>
                <a
                  className="inline-flex items-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                  href=""
                >
                  Shop Now <MoveRight />
                </a>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-orange-400 to-rose-500 p-8 text-white">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm mb-4">
                  <span>✨</span> <span>New Arrivals</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  Exotic Vegetables
                </h3>
                <p className="text-white/80 mb-4">
                  Discover our latest collection of premium vegetables
                </p>
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-3xl font-bold">25% OFF</div>
                  <div className="text-sm text-white/70">
                    Use code:{" "}
                    <span className="font-bold text-white">FRESH25</span>
                  </div>
                </div>
                <a
                  className="inline-flex items-center gap-2 bg-white text-orange-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                  href=""
                >
                  Explore Now <MoveRight />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8">
            <div className="flex  items-center gap-3 my-8">
              <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                Featured <span className="text-emerald-600">Products</span>
              </h2>
            </div>
          </div>
          <ProductCard products={products} />{" "}
        </div>
      </section>
<section className="py-16 px-4 bg-linear-to-b from-white to-gray-50">
  <div className="bg-linear-to-br from-emerald-50 via-white to-teal-50 rounded-[2.5rem] border border-emerald-100/50 shadow-2xl shadow-emerald-500/10 overflow-hidden">
        <div className="relative grid lg:grid-cols-5 gap-8 p-8 lg:p-14">
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 text-white bg-linear-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <Mail />
              </div>
              <div className="">
                <h3 className="text-sm font-semibold text-emerald-600 uppercase tracking-wide">
                  Newsletter
                </h3>
                <p className="text-xs text-gray-500">50,000+ subscribers</p>
              </div>
            </div>
            <div className="">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-snug">
                Get the Freshest Updates{" "}
                <span className="text-emerald-600"> Delivered Free</span>
              </h2>
              <p className="text-gray-500 mt-3 text-lg">
                Weekly recipes, seasonal offers & exclusive member perks.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2.5 bg-white/80 backdrop-blur-sm border border-emerald-100 px-4 py-2.5 rounded-full shadow-sm">
                <div className="w-7 h-7 text-emerald-600  bg-emerald-100 rounded-full flex items-center justify-center">
                  <Leaf size={16} />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Fresh Picks Weekly
                </span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/80 backdrop-blur-sm border border-emerald-100 px-4 py-2.5 rounded-full shadow-sm">
                <div className="w-7 h-7 text-emerald-600  bg-emerald-100 rounded-full flex items-center justify-center">
                  <Truck size={16} />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Free Delivery Codes
                </span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/80 backdrop-blur-sm border border-emerald-100 px-4 py-2.5 rounded-full shadow-sm">
                <div className="w-7 h-7 text-emerald-600  bg-emerald-100 rounded-full flex items-center justify-center">
                  <Tag size={16} />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Members-Only Deals
                </span>
              </div>
            </div>
            <form className="pt-2">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <input
                    placeholder="you@example.com"
                    className="w-full pl-5 pr-5 py-4 bg-white border-2 border-gray-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all text-base shadow-sm"
                    type="email"
                  />
                </div>
                <button
                  className="group flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold text-base transition-all duration-300 shadow-lg bg-linear-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-500/30 hover:shadow-emerald-500/40 hover:scale-[1.02]"
                  type="submit"
                >
                  <span>Subscribe</span>{" "}
                  <MoveRight className="text-sm group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-3 pl-1">
                ✨ Unsubscribe anytime. No spam, ever.
              </p>
            </form>
          </div>
          <div className="lg:col-span-2 lg:border-l lg:border-emerald-100 lg:pl-8">
            <div className="h-full flex flex-col justify-center">
              <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-500/20 rounded-full blur-2xl"></div>
                <div className="relative space-y-5">
                  <div className="inline-block bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-500/30">
                    📱 MOBILE APP
                  </div>
                  <h3 className="text-2xl font-bold leading-tight">
                    Shop Faster on Our App
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Get app-exclusive deals & 15% off your first order.
                  </p>
                  <div className="flex flex-col gap-3 pt-2">
                    <a
                      className="flex items-center gap-3 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/10 px-4 py-3 rounded-xl transition-all hover:scale-[1.02]"
                      href=""
                    >
                      <Apple />
                      <div className="text-left">
                        <div className="text-[10px] text-gray-400 uppercase tracking-wide">
                          Download on
                        </div>
                        <div className="text-sm font-semibold -mt-0.5">
                          App Store
                        </div>
                      </div>
                    </a>
                    <a
                      className="flex items-center gap-3 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/10 px-4 py-3 rounded-xl transition-all hover:scale-[1.02]"
                      href=""
                    >
                      <PlayCircle />
                      <div className="text-left">
                        <div className="text-[10px] text-gray-400 uppercase tracking-wide">
                          Get it on
                        </div>
                        <div className="text-sm font-semibold -mt-0.5">
                          Google Play
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="flex items-center gap-2 pt-2 text-sm">
                    <div className="text-yellow-400">★★★★★</div>
                    <span className="text-gray-400">4.9 • 100K+ downloads</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
</section>
      
    </>
  );
}

"use client"; 

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import logo from "@/assets/home-slider-1.d79601a8.png";



export default function HeroSection() {
      const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);
  return (
    <><div className="w-full">
        <Carousel
          setApi={setApi}
          className="w-full relative rounded-none overflow-hidden shadow-lg"
        >
          <CarouselContent>
            <CarouselItem>
              <div className="relative w-full h-[350px] sm:h-[450px] flex items-center">
                <Image
                  src={logo}
                  alt="Slider Background"
                  fill
                  className="object-cover brightness-75"
                  priority
                />
                <div className="absolute inset-0 bg-green-900/70" />

                <div className="relative z-10 px-8 sm:px-16 text-white max-w-xl">
                  <h2 className="text-white text-3xl font-bold mb-4 max-w-96">
                    Fresh Products Delivered to your Door
                  </h2>
                  <p className="text-base opacity-90 sm:text-lg mb-6 text-gray-100">
                    Get 20% off your first order
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Button className="border-none bg-white text-green-500 hover:bg-white inline-block px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform">
                      Shop Now
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white text-white bg-transparent hover:bg-transparent hover:text-white font-semibold px-6 py-2 rounded-md"
                    >
                      View Deals
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>

            <CarouselItem>
              <div className="relative w-full h-[350px] sm:h-[450px] flex items-center">
                <Image
                  src={logo}
                  alt="Slider Background"
                  fill
                  className="object-cover brightness-75"
                  priority
                />
                <div className="absolute inset-0 bg-green-900/70" />

                <div className="relative z-10 px-8 sm:px-16 text-white max-w-xl">
                  <h2 className="text-white text-3xl font-bold mb-4 max-w-96">
                    Premium Quality Guaranteed
                  </h2>
                  <p className="text-base sm:text-lg mb-6 text-gray-100">
                    Fresh from farm to your table
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Button className="bg-white text-blue-700 hover:bg-gray-100 font-semibold px-6 py-2 rounded-md shadow">
                      Shop Now
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white text-white bg-transparent hover:bg-transparent hover:text-white font-semibold px-6 py-2 rounded-md"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative w-full h-[350px] sm:h-[450px] flex items-center">
                <Image
                  src={logo}
                  alt="Slider Background"
                  fill
                  className="object-cover brightness-75"
                  priority
                />
                <div className="absolute inset-0 bg-green-900/70" />

                <div className="relative z-10 px-8 sm:px-16 text-white max-w-xl">
                  <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-3">
                    Fast & Free Delivery
                  </h2>
                  <p className="text-base sm:text-lg mb-6 text-gray-100">
                    Same day delivery available
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Button className="bg-white text-purple-700 hover:bg-gray-100 font-semibold px-6 py-2 rounded-md shadow">
                      Order Now
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white text-white bg-transparent hover:bg-transparent hover:text-white font-semibold px-6 py-2 rounded-md"
                    >
                      Delivery Info
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>

          <CarouselPrevious className="absolute left-4 top-1/4 -translate-y-1/2 z-10 cursor-pointer bg-white/90 hover:bg-white text-green-500 hover:text-green-600 rounded-full w-12 h-12 hidden md:flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110" />
          <CarouselNext className="absolute right-4 top-1/4 -translate-y-1/2 z-10 cursor-pointer bg-white/90 hover:bg-white text-green-500 hover:text-green-600 rounded-full w-12 h-12 hidden md:flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110" />

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-reverse">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2.5 me-2  rounded-full transition-all duration-300 ${
                  current === index
                    ? "w-8 bg-white"
                    : "w-2.5 bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </Carousel>
      </div></>
  )
}

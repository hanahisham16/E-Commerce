"use client";

import React, { useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Image from "next/image";



export default function ProductSlider({ images }: { images: string[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <>
      <Swiper
       style={{
    '--swiper-navigation-color': '#0aad0a',
    '--swiper-pagination-color': '#0aad0a',
    '--swiper-navigation-size': '22px',
  }as React.CSSProperties}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {images.map((image,i) => {
          return (
              <SwiperSlide key={`main-${i}`}>
                <Image loading="eager" alt={`main-img-${i}`} width={500} height={200} src={image} />
              </SwiperSlide>
          );
        })}

        
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.map((image,i) => {
          return (
              <SwiperSlide key={`thumbails-${i}`}>
                <Image loading="eager"  alt={`thumbails-img-${i}`} width={500} height={500} src={image} />
              </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

const carouselData = [
  { image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg", title: "Slide 5" },
  { image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg", title: "Slide 5" },
  { image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg", title: "Slide 5" },
  { image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg", title: "Slide 5" },
  { image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg", title: "Slide 5" },
  { image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg", title: "Slide 5" },
  { image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg", title: "Slide 5" },
  { image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg", title: "Slide 5" },
  { image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg", title: "Slide 5" },
  { image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg", title: "Slide 5" },
];

export default function ProjectsCarousel() {
  return (
    <div className="w-full py-10">
      <Swiper
        modules={[Pagination, Navigation, Autoplay, EffectCoverflow]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        // loop={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 100,
          depth: 250,
          modifier: 2,
          slideShadows: true,
        }}
        // autoplay={{ delay: 2500, disableOnInteraction: false }}
        // pagination={{ clickable: true }}
        navigation={true}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {carouselData.map((slide, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            <img src={slide.image} alt={slide.title} className="rounded-xl shadow-lg w-full h-auto" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

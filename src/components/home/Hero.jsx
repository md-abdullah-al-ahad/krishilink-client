import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Hero = () => {
  const slides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1920&q=80",
      title: "Connect with Fellow Farmers",
      description:
        "Join a thriving community of farmers sharing knowledge, crops, and opportunities across the region.",
      cta: "Get Started",
      link: "/register",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1920&q=80",
      title: "Share Your Harvest",
      description:
        "List your crops and reach buyers directly. Build sustainable partnerships with local farmers and markets.",
      cta: "Add Your Crop",
      link: "/add-crop",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1920&q=80",
      title: "Discover Quality Produce",
      description:
        "Browse fresh crops from verified farmers. Find exactly what you need for your farm or business.",
      cta: "Browse Crops",
      link: "/all-crops",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1920&q=80",
      title: "Grow Together",
      description:
        "Access expert farming advice, weather updates, and market prices. Empowering farmers for a better tomorrow.",
      cta: "Learn More",
      link: "/all-crops",
    },
  ];

  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        loop={true}
        className="hero-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-black/50"></div>
              </div>

              <div className="relative h-full flex items-center justify-center px-4">
                <div className="max-w-4xl mx-auto text-center text-white">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl mx-auto animate-fade-in-delay">
                    {slide.description}
                  </p>
                  <Link
                    to={slide.link}
                    className="btn btn-primary btn-lg gap-2 animate-fade-in-delay-2"
                  >
                    {slide.cta}
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx>{`
        .hero-swiper {
          --swiper-navigation-size: 44px;
          --swiper-navigation-color: #fff;
          --swiper-pagination-color: #10b981;
          --swiper-pagination-bullet-inactive-color: #fff;
          --swiper-pagination-bullet-inactive-opacity: 0.5;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-fade-in-delay {
          opacity: 0;
          animation: fadeIn 0.8s ease-out 0.3s forwards;
        }

        .animate-fade-in-delay-2 {
          opacity: 0;
          animation: fadeIn 0.8s ease-out 0.6s forwards;
        }
      `}</style>
    </div>
  );
};

export default Hero;

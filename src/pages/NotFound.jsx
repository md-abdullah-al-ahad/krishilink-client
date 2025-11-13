import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  useEffect(() => {
    document.title = "404 - Page Not Found | KrishiLink";
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 via-emerald-50 to-lime-50 px-4 py-12">
      <div className="max-w-4xl w-full text-center">
        {/* Animated Farm Illustration */}
        <div className="relative mb-8">
          <div className="text-9xl md:text-[12rem] font-black text-green-600/10 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-bounce">
              <svg
                className="w-32 h-32 md:w-48 md:h-48 text-green-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className="text-6xl md:text-8xl">🌾</span>
            <h1 className="text-5xl md:text-7xl font-bold text-green-800">
              Oops!
            </h1>
            <span className="text-6xl md:text-8xl">🚜</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
            This Field is Empty
          </h2>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Looks like you've wandered off the farm! The page you're looking for
            doesn't exist or has been harvested already.
          </p>

          {/* Decorative Elements */}
          <div className="flex justify-center gap-4 text-4xl md:text-5xl py-6">
            <span className="animate-pulse">🌻</span>
            <span className="animate-pulse delay-75">🌽</span>
            <span className="animate-pulse delay-150">🥕</span>
            <span className="animate-pulse delay-200">🍅</span>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link to="/" className="btn btn-primary btn-lg gap-3 group">
              <svg
                className="w-6 h-6 group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Return to Farm
            </Link>
            <Link to="/all-crops" className="btn btn-outline btn-lg gap-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Browse Crops
            </Link>
          </div>

          {/* Helpful Message */}
          <div className="mt-12 p-6 bg-white/80 backdrop-blur rounded-2xl shadow-lg max-w-md mx-auto">
            <p className="text-sm text-gray-600 flex items-start gap-2">
              <svg
                className="w-5 h-5 text-green-600 shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                If you believe this is a mistake or need assistance, please
                contact our support team or return to the homepage to continue
                exploring KrishiLink.
              </span>
            </p>
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 text-6xl opacity-20 animate-float">
            🌱
          </div>
          <div className="absolute top-40 right-20 text-5xl opacity-20 animate-float-delay">
            🌾
          </div>
          <div className="absolute bottom-40 left-20 text-7xl opacity-20 animate-float">
            🌳
          </div>
          <div className="absolute bottom-20 right-10 text-6xl opacity-20 animate-float-delay">
            🌻
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

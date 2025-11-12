const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
          />
        </svg>
      ),
      title: "Register/Login",
      description:
        "Create your free account in minutes. Join our farming community and get started with connecting to fellow farmers across the region.",
    },
    {
      id: 2,
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      ),
      title: "Post Your Crops",
      description:
        "List your available crops with details like price, quantity, and location. Make your produce visible to potential buyers instantly.",
    },
    {
      id: 3,
      icon: (
        <svg
          className="w-12 h-12"
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
      ),
      title: "Browse & Connect",
      description:
        "Explore crops from other farmers, filter by location and type, and express interest in products that match your needs.",
    },
    {
      id: 4,
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      title: "Collaborate & Grow",
      description:
        "Build lasting partnerships with farmers and buyers. Share knowledge, negotiate deals, and grow your agricultural business together.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">How It Works</h2>
        <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
          Get started with KrishiLink in four simple steps. Join thousands of
          farmers already transforming their agricultural business.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="relative group"
            style={{
              animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`,
            }}
          >
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 h-full border-t-4 border-primary">
              <div className="card-body items-center text-center">
                <div className="relative mb-4">
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-content rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    {step.id}
                  </div>
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-content transition-all duration-300 transform group-hover:scale-110">
                    {step.icon}
                  </div>
                </div>

                <h3 className="card-title text-xl mb-2">{step.title}</h3>
                <p className="text-base-content/70 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>

            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                <svg
                  className="w-8 h-8 text-primary/30"
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
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <a href="/register" className="btn btn-primary btn-lg gap-2">
          Get Started Now
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
        </a>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default HowItWorks;

const AgroNews = () => {
  const newsArticles = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80",
      title: "Smart Farming Technologies Revolutionize Bangladeshi Agriculture",
      excerpt:
        "Discover how AI and IoT are transforming traditional farming practices, helping farmers increase yields and reduce costs through precision agriculture.",
      date: "November 10, 2025",
      category: "Technology",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80",
      title: "Organic Farming Gains Momentum Across Rural Communities",
      excerpt:
        "More farmers are adopting organic practices, responding to growing consumer demand for chemical-free produce and sustainable agriculture methods.",
      date: "November 8, 2025",
      category: "Organic",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80",
      title: "Government Announces New Subsidies for Small-Scale Farmers",
      excerpt:
        "Latest policy changes include financial support, insurance schemes, and direct market access programs designed to empower rural farming communities.",
      date: "November 5, 2025",
      category: "Policy",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80",
      title: "Climate-Resilient Crops: The Future of Sustainable Farming",
      excerpt:
        "Scientists develop drought-resistant and high-yield crop varieties to help farmers adapt to changing climate conditions and ensure food security.",
      date: "November 2, 2025",
      category: "Research",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Agro News & Updates</h2>
        <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
          Stay informed with the latest trends, technologies, and insights from
          the agricultural world.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {newsArticles.map((article) => (
          <div
            key={article.id}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
          >
            <figure className="h-48 overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </figure>
            <div className="card-body">
              <div className="flex items-center justify-between mb-2">
                <span className="badge badge-primary">{article.category}</span>
                <span className="text-xs text-base-content/60">
                  {article.date}
                </span>
              </div>

              <h3 className="card-title text-lg leading-tight mb-2">
                {article.title}
              </h3>

              <p className="text-base-content/70 text-sm line-clamp-3 mb-4">
                {article.excerpt}
              </p>

              <div className="card-actions justify-end mt-auto">
                <button className="btn btn-ghost btn-sm gap-2 hover:btn-primary">
                  Read More
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <button className="btn btn-outline btn-primary btn-lg gap-2">
          View All News
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
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AgroNews;

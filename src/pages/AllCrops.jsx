import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCrops } from "../utils/api";

const AllCrops = () => {
  const [crops, setCrops] = useState([]);
  const [filteredCrops, setFilteredCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "All Crops - KrishiLink";
    const fetchCrops = async () => {
      try {
        setLoading(true);
        const data = await getAllCrops();
        setCrops(data || []);
        setFilteredCrops(data || []);
      } catch (error) {
        console.error("Error fetching crops:", error);
        setCrops([]);
        setFilteredCrops([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCrops();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCrops(crops);
    } else {
      const filtered = crops.filter((crop) =>
        crop.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCrops(filtered);
    }
  }, [searchQuery, crops]);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-base-200 to-base-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <div className="h-12 bg-base-300 rounded-xl w-64 animate-pulse mb-4"></div>
            <div className="h-6 bg-base-300 rounded-lg w-96 animate-pulse mb-8"></div>
            <div className="h-14 bg-base-300 rounded-xl w-full animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="card bg-base-100 shadow-xl animate-pulse h-[460px] flex flex-col"
              >
                <figure className="h-52 bg-base-300"></figure>
                <div className="card-body flex-1 flex flex-col justify-between p-5">
                  <div>
                    <div className="h-7 bg-base-300 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-base-300 rounded w-1/2 mb-4"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-base-300 rounded w-full"></div>
                    <div className="h-4 bg-base-300 rounded w-5/6"></div>
                    <div className="h-4 bg-base-300 rounded w-4/5"></div>
                  </div>
                  <div className="h-12 bg-base-300 rounded-lg mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-base-200 to-base-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <svg
                className="w-8 h-8 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              Explore Crops
            </h1>
            <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
              Discover quality crops from trusted farmers across the region
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-base-content/40"
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
              </div>
              <input
                type="text"
                placeholder="Search crops by name..."
                className="input input-bordered w-full pl-12 pr-4 h-14 text-base bg-base-100 shadow-lg border-2 border-base-300 focus:border-primary focus:outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {searchQuery && (
              <div className="mt-4 flex items-center justify-between bg-base-100 px-4 py-3 rounded-lg shadow-md border border-base-300">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  <span className="font-medium text-base-content">
                    <span className="text-primary font-bold">
                      {filteredCrops.length}
                    </span>{" "}
                    {filteredCrops.length === 1 ? "crop" : "crops"} found
                  </span>
                </div>
                <button
                  onClick={() => setSearchQuery("")}
                  className="btn btn-sm btn-ghost gap-2"
                >
                  Clear
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {filteredCrops.length === 0 ? (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-base-300/50 mb-6">
            <svg
              className="w-12 h-12 text-base-content/30"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-base-content/60 mb-3">
            {searchQuery ? "No crops found" : "No crops available"}
          </h2>
          <p className="text-base-content/50 text-lg mb-8 max-w-md mx-auto">
            {searchQuery
              ? "Try searching with different keywords or browse all crops"
              : "Be the first to add a crop to the marketplace and connect with buyers"}
          </p>
          {!searchQuery && (
            <Link
              to="/add-crop"
              className="btn btn-primary btn-lg gap-2 shadow-lg"
            >
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Your Crop
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCrops.map((crop, index) => (
            <div
              key={crop._id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-base-300 h-[460px] flex flex-col"
              style={{
                animation: `fadeInUp 0.4s ease-out ${index * 0.03}s both`,
              }}
            >
              <figure className="h-52 overflow-hidden relative group">
                <img
                  src={crop.image}
                  alt={crop.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <div className="badge badge-secondary badge-lg font-semibold shadow-lg">
                    {crop.type}
                  </div>
                </div>
              </figure>

              <div className="card-body flex-1 flex flex-col justify-between p-5">
                <div>
                  <h3 className="card-title text-xl font-bold mb-3 line-clamp-2">
                    {crop.name}
                  </h3>

                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-primary font-bold text-lg">
                      <svg
                        className="w-5 h-5 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="truncate">
                        ৳{crop.pricePerUnit}/{crop.unit}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-base-content/70 text-sm">
                      <svg
                        className="w-4 h-4 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                      </svg>
                      <span className="truncate">
                        {crop.quantity} {crop.unit} available
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-base-content/70 text-sm">
                      <svg
                        className="w-4 h-4 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="truncate">{crop.location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-base-content/70 text-sm">
                      <svg
                        className="w-4 h-4 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span className="truncate">
                        {crop.owner?.ownerName || "Unknown"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <Link
                    to={`/crops/${crop._id}`}
                    className="btn btn-primary w-full gap-2 shadow-lg hover:shadow-xl transition-all"
                  >
                    <span>View Details</span>
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
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
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

export default AllCrops;

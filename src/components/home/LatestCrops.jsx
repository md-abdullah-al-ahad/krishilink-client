import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLatestCrops } from "../../utils/api";

const LatestCrops = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestCrops = async () => {
      try {
        setLoading(true);
        const data = await getLatestCrops();
        setCrops(data || []);
      } catch (error) {
        console.error("Error fetching latest crops:", error);
        setCrops([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestCrops();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Latest Crops</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-xl animate-pulse"
            >
              <figure className="h-48 bg-base-300"></figure>
              <div className="card-body">
                <div className="h-6 bg-base-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-base-300 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-base-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-base-300 rounded w-2/3 mb-2"></div>
                <div className="h-10 bg-base-300 rounded mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 bg-base-200">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Latest Crops</h2>
        <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
          Discover fresh produce from our farming community. Connect with local
          farmers and find quality crops.
        </p>
      </div>

      {crops.length === 0 ? (
        <div className="text-center py-12">
          <svg
            className="w-24 h-24 mx-auto text-base-content/30 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <p className="text-xl text-base-content/60 mb-6">
            No crops available at the moment
          </p>
          <p className="text-base-content/50 mb-6">
            Be the first to share your crops with the community!
          </p>
          <Link to="/add-crop" className="btn btn-primary gap-2">
            Add Your First Crop
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
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {crops.map((crop) => (
              <div
                key={crop._id}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <figure className="h-48 overflow-hidden">
                  <img
                    src={crop.image}
                    alt={crop.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title text-2xl">
                    {crop.name}
                    <div className="badge badge-secondary">{crop.type}</div>
                  </h3>

                  <div className="space-y-2 my-2">
                    <div className="flex items-center gap-2 text-primary font-semibold text-lg">
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
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>
                        ৳{crop.pricePerUnit}/{crop.unit}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-base-content/70">
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
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>{crop.location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-base-content/70">
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
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span>{crop.owner?.ownerName || "Unknown"}</span>
                    </div>
                  </div>

                  <div className="card-actions justify-end mt-4">
                    <Link
                      to={`/crops/${crop._id}`}
                      className="btn btn-primary w-full gap-2"
                    >
                      View Details
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

          <div className="text-center">
            <Link to="/all-crops" className="btn btn-primary btn-lg gap-2">
              View All Crops
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
        </>
      )}
    </div>
  );
};

export default LatestCrops;

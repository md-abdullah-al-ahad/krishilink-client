import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCropById } from "../utils/api";

const CropDetails = () => {
  const { id } = useParams();
  const [crop, setCrop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCrop = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCropById(id);
        setCrop(data);
      } catch (err) {
        console.error("Error fetching crop:", err);
        setError(err.message || "Failed to load crop details");
      } finally {
        setLoading(false);
      }
    };

    fetchCrop();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-base-300 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-96 bg-base-300 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-base-300 rounded w-3/4"></div>
                <div className="h-6 bg-base-300 rounded w-1/2"></div>
                <div className="h-24 bg-base-300 rounded"></div>
                <div className="h-6 bg-base-300 rounded w-2/3"></div>
                <div className="h-6 bg-base-300 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <svg
            className="w-24 h-24 mx-auto text-error mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-error mb-2">
            Error Loading Crop
          </h2>
          <p className="text-base-content/70 mb-6">{error}</p>
          <Link to="/all-crops" className="btn btn-primary">
            Back to All Crops
          </Link>
        </div>
      </div>
    );
  }

  if (!crop) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <svg
            className="w-24 h-24 mx-auto text-base-content/30 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-2xl font-bold mb-2">Crop Not Found</h2>
          <p className="text-base-content/70 mb-6">
            The crop you're looking for doesn't exist.
          </p>
          <Link to="/all-crops" className="btn btn-primary">
            Back to All Crops
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="breadcrumbs text-sm mb-6">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/all-crops">All Crops</Link>
            </li>
            <li>{crop.name}</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="card bg-base-100 shadow-xl overflow-hidden">
            <figure className="h-96">
              <img
                src={crop.image}
                alt={crop.name}
                className="w-full h-full object-cover"
              />
            </figure>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-4xl font-bold">{crop.name}</h1>
                <div className="badge badge-secondary badge-lg">
                  {crop.type}
                </div>
              </div>
              <div className="flex items-center gap-2 text-primary text-3xl font-bold">
                <svg
                  className="w-8 h-8"
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
                  ₹{crop.pricePerUnit}/{crop.unit}
                </span>
              </div>
            </div>

            <div className="divider"></div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-lg">
                <svg
                  className="w-6 h-6 text-primary"
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
                <div>
                  <span className="text-base-content/60">
                    Available Quantity:
                  </span>
                  <span className="font-semibold ml-2">
                    {crop.quantity} {crop.unit}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-lg">
                <svg
                  className="w-6 h-6 text-primary"
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
                <div>
                  <span className="text-base-content/60">Location:</span>
                  <span className="font-semibold ml-2">{crop.location}</span>
                </div>
              </div>
            </div>

            <div className="divider"></div>

            <div className="card bg-base-200">
              <div className="card-body">
                <h3 className="card-title text-lg mb-2">
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
                  Seller Information
                </h3>
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <span className="text-base-content/60">Name:</span>
                    <span className="font-semibold">
                      {crop.owner?.ownerName || "Unknown"}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-base-content/60">Email:</span>
                    <a
                      href={`mailto:${crop.owner?.ownerEmail}`}
                      className="link link-primary"
                    >
                      {crop.owner?.ownerEmail || "N/A"}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">
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
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
              Description
            </h2>
            <p className="text-base-content/80 leading-relaxed text-lg whitespace-pre-line">
              {crop.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropDetails;

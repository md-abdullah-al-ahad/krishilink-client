import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getMyInterests } from "../utils/api";

const MyInterests = () => {
  const { user } = useAuth();
  const [interests, setInterests] = useState([]);
  const [filteredInterests, setFilteredInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("status");

  useEffect(() => {
    document.title = "My Interests - KrishiLink";
  }, []);

  const fetchMyInterests = async () => {
    if (!user?.email) return;

    try {
      setLoading(true);
      const data = await getMyInterests(user.email);
      setInterests(data || []);
      setFilteredInterests(data || []);
    } catch (error) {
      console.error("Error fetching interests:", error);
      setInterests([]);
      setFilteredInterests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyInterests();
  }, [user]);

  useEffect(() => {
    if (sortBy === "status") {
      const sorted = [...interests].sort((a, b) => {
        const statusOrder = { pending: 1, accepted: 2, rejected: 3 };
        return statusOrder[a.status] - statusOrder[b.status];
      });
      setFilteredInterests(sorted);
    } else {
      setFilteredInterests([...interests]);
    }
  }, [sortBy, interests]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <div className="badge badge-warning">Pending</div>;
      case "accepted":
        return <div className="badge badge-success">Accepted</div>;
      case "rejected":
        return <div className="badge badge-error">Rejected</div>;
      default:
        return <div className="badge">{status}</div>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-base-200 to-base-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="h-12 bg-base-300 rounded-xl w-64 mb-4 animate-pulse"></div>
          <div className="h-6 bg-base-300 rounded-lg w-96 mb-8 animate-pulse"></div>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-32 bg-base-100 rounded-xl shadow-xl animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-base-200 to-base-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
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
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            My Interests
          </h1>
          <p className="text-base-content/70 text-lg">
            Track your inquiries and connections with crop sellers
          </p>
        </div>

        {interests.length === 0 ? (
          <div className="card bg-base-100 shadow-2xl border border-base-300 py-20">
            <div className="text-center">
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-base-content/60 mb-3">
                No Interests Yet
              </h2>
              <p className="text-base-content/50 text-lg mb-8 max-w-md mx-auto">
                Start exploring crops and express your interest to connect with
                farmers
              </p>
              <Link
                to="/all-crops"
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Browse Available Crops
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Stats and Filter Bar */}
            <div className="flex flex-col md:flex-row justify-between items-stretch gap-4 mb-8">
              <div className="stats shadow-lg bg-base-100 border border-base-300">
                <div className="stat">
                  <div className="stat-figure text-primary">
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
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div className="stat-title">Total Interests</div>
                  <div className="stat-value text-primary">
                    {filteredInterests.length}
                  </div>
                  <div className="stat-desc">Crops you're interested in</div>
                </div>
              </div>

              <div className="card bg-base-100 shadow-lg border border-base-300 w-full md:w-auto">
                <div className="card-body p-4">
                  <label className="label pb-2">
                    <span className="label-text font-medium flex items-center gap-2">
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
                          d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
                        />
                      </svg>
                      Sort by
                    </span>
                  </label>
                  <select
                    className="select select-bordered w-full md:w-64 focus:select-primary transition-all"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="status">Status (Pending First)</option>
                    <option value="date">Date Added</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block card bg-base-100 shadow-2xl border border-base-300 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="table">
                  <thead className="bg-base-200">
                    <tr>
                      <th className="text-base font-bold">Crop Details</th>
                      <th className="text-base font-bold">Owner Information</th>
                      <th className="text-base font-bold">Quantity</th>
                      <th className="text-base font-bold">Your Message</th>
                      <th className="text-base font-bold">Status</th>
                      <th className="text-base font-bold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInterests.map((interest, index) => (
                      <tr
                        key={interest._id}
                        className="hover:bg-base-200/50 transition-colors"
                      >
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar placeholder">
                              <div className="bg-primary/10 text-primary rounded-lg w-12 h-12">
                                <span className="text-xl font-bold">
                                  {interest.cropName.charAt(0)}
                                </span>
                              </div>
                            </div>
                            <div>
                              <Link
                                to={`/crops/${interest.cropId}`}
                                className="font-bold text-lg hover:text-primary transition-colors"
                              >
                                {interest.cropName}
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="flex flex-col gap-1">
                            <p className="font-semibold flex items-center gap-2">
                              <svg
                                className="w-4 h-4 text-base-content/50"
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
                              {interest.ownerName}
                            </p>
                            <a
                              href={`mailto:${interest.ownerEmail}`}
                              className="link link-primary text-sm flex items-center gap-1 hover:gap-2 transition-all"
                            >
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
                                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                              </svg>
                              {interest.ownerEmail}
                            </a>
                          </div>
                        </td>
                        <td>
                          <span className="font-bold text-lg text-primary">
                            {interest.quantity}
                          </span>
                        </td>
                        <td>
                          {interest.message ? (
                            <div className="max-w-xs">
                              <p
                                className="line-clamp-2 text-sm"
                                title={interest.message}
                              >
                                "{interest.message}"
                              </p>
                            </div>
                          ) : (
                            <span className="text-base-content/40 italic text-sm">
                              No message provided
                            </span>
                          )}
                        </td>
                        <td>{getStatusBadge(interest.status)}</td>
                        <td>
                          <Link
                            to={`/crops/${interest.cropId}`}
                            className="btn btn-sm btn-primary gap-1"
                          >
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
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
              {filteredInterests.map((interest, index) => (
                <div
                  key={interest._id}
                  className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-all duration-300"
                  style={{
                    animation: `fadeInUp 0.3s ease-out ${index * 0.05}s both`,
                  }}
                >
                  <div className="card-body p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="avatar placeholder">
                          <div className="bg-primary/10 text-primary rounded-lg w-12 h-12">
                            <span className="text-xl font-bold">
                              {interest.cropName.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div>
                          <Link
                            to={`/crops/${interest.cropId}`}
                            className="font-bold text-lg hover:text-primary transition-colors line-clamp-1"
                          >
                            {interest.cropName}
                          </Link>
                        </div>
                      </div>
                      {getStatusBadge(interest.status)}
                    </div>

                    <div className="space-y-3">
                      <div className="bg-base-200 rounded-lg p-3">
                        <p className="text-sm text-base-content/60 mb-1 flex items-center gap-2">
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
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          Owner
                        </p>
                        <p className="font-semibold">{interest.ownerName}</p>
                        <a
                          href={`mailto:${interest.ownerEmail}`}
                          className="link link-primary text-sm flex items-center gap-1 mt-1"
                        >
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
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          {interest.ownerEmail}
                        </a>
                      </div>

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
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                          />
                        </svg>
                        <span className="text-sm text-base-content/60">
                          Quantity:
                        </span>
                        <span className="font-bold text-primary">
                          {interest.quantity}
                        </span>
                      </div>

                      {interest.message && (
                        <div className="bg-base-200 rounded-lg p-3">
                          <p className="text-sm text-base-content/60 mb-1 flex items-center gap-2">
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
                                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                              />
                            </svg>
                            Your Message
                          </p>
                          <p className="text-sm italic">"{interest.message}"</p>
                        </div>
                      )}
                    </div>

                    <div className="card-actions justify-end mt-4">
                      <Link
                        to={`/crops/${interest.cropId}`}
                        className="btn btn-primary w-full gap-2 shadow-lg"
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
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        View Crop Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

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
          </>
        )}
      </div>
    </div>
  );
};

export default MyInterests;

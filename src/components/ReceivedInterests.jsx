import { useAuth } from "../hooks/useAuth";
import { updateInterestStatus } from "../utils/api";
import { useState } from "react";

const ReceivedInterests = ({ crop, onInterestUpdated }) => {
  const { user } = useAuth();
  const [updatingId, setUpdatingId] = useState(null);

  const isOwner = user?.email === crop.owner?.ownerEmail;

  if (!isOwner || !crop.interests || crop.interests.length === 0) {
    return null;
  }

  const handleUpdateStatus = async (interestId, status) => {
    try {
      setUpdatingId(interestId);
      await updateInterestStatus(interestId, crop._id, status);
      if (onInterestUpdated) {
        onInterestUpdated();
      }
    } catch (error) {
      console.error("Error updating interest status:", error);
    } finally {
      setUpdatingId(null);
    }
  };

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

  return (
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
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Received Interests ({crop.interests.length})
        </h2>

        <div className="space-y-4">
          {crop.interests.map((interest) => (
            <div
              key={interest._id}
              className="card bg-base-200 border border-base-300"
            >
              <div className="card-body">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg">{interest.userName}</h3>
                    <a
                      href={`mailto:${interest.userEmail}`}
                      className="link link-primary text-sm"
                    >
                      {interest.userEmail}
                    </a>
                  </div>
                  {getStatusBadge(interest.status)}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
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
                    <div>
                      <span className="text-sm text-base-content/60">
                        Quantity:
                      </span>
                      <span className="font-semibold ml-1">
                        {interest.quantity} {crop.unit}
                      </span>
                    </div>
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
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <span className="text-sm text-base-content/60">
                        Total:
                      </span>
                      <span className="font-semibold ml-1 text-primary">
                        ₹
                        {(
                          interest.quantity * crop.pricePerUnit
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {interest.message && (
                  <div className="bg-base-100 rounded-lg p-3 mb-3">
                    <p className="text-sm text-base-content/60 mb-1">
                      Message:
                    </p>
                    <p className="text-base-content/90">{interest.message}</p>
                  </div>
                )}

                {interest.status === "pending" && (
                  <div className="card-actions justify-end gap-2">
                    <button
                      className="btn btn-error btn-sm gap-2"
                      onClick={() =>
                        handleUpdateStatus(interest._id, "rejected")
                      }
                      disabled={updatingId === interest._id}
                    >
                      {updatingId === interest._id ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        <>
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
                          Reject
                        </>
                      )}
                    </button>
                    <button
                      className="btn btn-success btn-sm gap-2"
                      onClick={() =>
                        handleUpdateStatus(interest._id, "accepted")
                      }
                      disabled={updatingId === interest._id}
                    >
                      {updatingId === interest._id ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        <>
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
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          Accept
                        </>
                      )}
                    </button>
                  </div>
                )}

                {interest.status === "accepted" && (
                  <div className="alert alert-success">
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
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>
                      Interest accepted. Contact the buyer to finalize the deal.
                    </span>
                  </div>
                )}

                {interest.status === "rejected" && (
                  <div className="alert alert-error">
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
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Interest rejected.</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReceivedInterests;

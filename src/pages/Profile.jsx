import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, setUser } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "My Profile - KrishiLink";
  }, []);

  const handleEditToggle = () => {
    if (isEditMode) {
      // Cancel edit - reset to original values
      setDisplayName(user?.displayName || "");
      setPhotoURL(user?.photoURL || "");
    }
    setIsEditMode(!isEditMode);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!displayName.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    try {
      setLoading(true);

      // Update Firebase profile
      await updateProfile(auth.currentUser, {
        displayName: displayName.trim(),
        photoURL: photoURL.trim() || null,
      });

      // Update local user state
      setUser({
        ...user,
        displayName: displayName.trim(),
        photoURL: photoURL.trim() || null,
      });

      toast.success("Profile updated successfully!");
      setIsEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-base-200 to-base-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            My Profile
          </h1>
          <p className="text-base-content/70 text-lg">
            Manage your account settings and personal information
          </p>
        </div>

        {/* Main Profile Card */}
        <div className="card bg-base-100 shadow-2xl border border-base-300 mb-6">
          <div className="card-body p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
              {/* Avatar Section */}
              <div className="shrink-0">
                <div className="avatar">
                  <div className="w-40 h-40 rounded-full ring-4 ring-primary ring-offset-base-100 ring-offset-4 shadow-xl">
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || "User"}
                        className="object-cover"
                      />
                    ) : (
                      <div className="bg-linear-to-br from-primary to-secondary text-primary-content flex items-center justify-center text-5xl font-bold">
                        {getInitials(user?.displayName || user?.email)}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Profile Info Section */}
              <div className="grow w-full">
                {isEditMode ? (
                  <form onSubmit={handleSave} className="space-y-6">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium text-base">
                          Display Name
                        </span>
                      </label>
                      <input
                        type="text"
                        className="input input-bordered w-full focus:input-primary transition-all"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Enter your name"
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium text-base">
                          Photo URL
                        </span>
                      </label>
                      <input
                        type="url"
                        className="input input-bordered w-full focus:input-primary transition-all"
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.target.value)}
                        placeholder="https://example.com/photo.jpg"
                      />
                      <label className="label">
                        <span className="label-text-alt text-base-content/60">
                          💡 Optional: Enter a direct image URL for your profile
                          photo
                        </span>
                      </label>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium text-base">
                          Email Address
                        </span>
                      </label>
                      <input
                        type="email"
                        className="input input-bordered w-full bg-base-200 cursor-not-allowed"
                        value={user?.email || ""}
                        disabled
                      />
                      <label className="label">
                        <span className="label-text-alt text-base-content/60">
                          🔒 Email address cannot be changed
                        </span>
                      </label>
                    </div>

                    <div className="divider"></div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg gap-2 shadow-lg hover:shadow-xl transition-all order-1"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span className="loading loading-spinner loading-sm"></span>
                            Saving...
                          </>
                        ) : (
                          <>
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
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Save Changes
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={handleEditToggle}
                        className="btn btn-ghost btn-lg gap-2 order-2"
                        disabled={loading}
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-3xl lg:text-4xl font-bold mb-2">
                        {user?.displayName || "Anonymous User"}
                      </h2>
                      <div className="flex items-center gap-2 text-base-content/70 text-lg">
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
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        {user?.email}
                      </div>
                    </div>

                    <div className="divider"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-linear-to-br from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20">
                        <div className="flex items-center gap-3 mb-2">
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
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <h3 className="font-semibold text-base-content/70">
                            Account Status
                          </h3>
                        </div>
                        <p className="text-2xl font-bold mb-1">
                          {user?.emailVerified ? "Verified" : "Unverified"}
                        </p>
                        <p className="text-sm text-base-content/60">
                          {user?.emailVerified
                            ? "✓ Email verified"
                            : "Email not verified"}
                        </p>
                      </div>

                      <div className="bg-linear-to-br from-secondary/10 to-secondary/5 rounded-xl p-6 border border-secondary/20">
                        <div className="flex items-center gap-3 mb-2">
                          <svg
                            className="w-6 h-6 text-secondary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <h3 className="font-semibold text-base-content/70">
                            Member Since
                          </h3>
                        </div>
                        <p className="text-2xl font-bold mb-1">
                          {user?.metadata?.creationTime
                            ? new Date(
                                user.metadata.creationTime
                              ).toLocaleDateString("en-US", {
                                month: "short",
                                year: "numeric",
                              })
                            : "N/A"}
                        </p>
                        <p className="text-sm text-base-content/60">
                          Joined{" "}
                          {user?.metadata?.creationTime
                            ? new Date(
                                user.metadata.creationTime
                              ).toLocaleDateString()
                            : "recently"}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleEditToggle}
                      className="btn btn-primary btn-lg gap-2 shadow-lg hover:shadow-xl transition-all"
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Edit Profile
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Account Information Card */}
        <div className="card bg-base-100 shadow-2xl border border-base-300">
          <div className="card-body p-6 sm:p-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Account Information
            </h3>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 border-b border-base-300 gap-2">
                <span className="text-base-content/70 font-medium flex items-center gap-2">
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
                      d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                    />
                  </svg>
                  User ID
                </span>
                <span className="font-mono text-sm bg-base-200 px-3 py-2 rounded-lg break-all">
                  {user?.uid?.slice(0, 24)}...
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 border-b border-base-300 gap-2">
                <span className="text-base-content/70 font-medium flex items-center gap-2">
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
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  Authentication Provider
                </span>
                <span className="badge badge-primary badge-lg gap-2">
                  {user?.providerData?.[0]?.providerId === "google.com" ? (
                    <>
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      Google
                    </>
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
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      Email/Password
                    </>
                  )}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 gap-2">
                <span className="text-base-content/70 font-medium flex items-center gap-2">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Last Sign In
                </span>
                <span className="text-sm font-medium bg-base-200 px-3 py-2 rounded-lg">
                  {user?.metadata?.lastSignInTime
                    ? new Date(user.metadata.lastSignInTime).toLocaleString(
                        "en-US",
                        {
                          dateStyle: "medium",
                          timeStyle: "short",
                        }
                      )
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

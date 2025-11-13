import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getMyCrops, updateCrop, deleteCrop } from "../utils/api";
import toast from "react-hot-toast";

const MyPosts = () => {
  const { user } = useAuth();
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCrop, setEditingCrop] = useState(null);
  const [deletingCrop, setDeletingCrop] = useState(null);

  useEffect(() => {
    document.title = "My Posts - KrishiLink";
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const fetchMyCrops = async () => {
    if (!user?.email) return;

    try {
      setLoading(true);
      const data = await getMyCrops(user.email);
      setCrops(data || []);
    } catch (error) {
      console.error("Error fetching crops:", error);
      setCrops([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCrops();
  }, [user]);

  const handleEdit = (crop) => {
    setEditingCrop(crop);
    reset({
      name: crop.name,
      type: crop.type,
      pricePerUnit: crop.pricePerUnit,
      unit: crop.unit,
      quantity: crop.quantity,
      description: crop.description,
      location: crop.location,
      image: crop.image,
    });
  };

  const onEditSubmit = async (data) => {
    try {
      const updateData = {
        name: data.name,
        type: data.type,
        pricePerUnit: parseFloat(data.pricePerUnit),
        unit: data.unit,
        quantity: parseFloat(data.quantity),
        description: data.description,
        location: data.location,
        image: data.image,
      };

      await updateCrop(editingCrop._id, updateData);
      setEditingCrop(null);
      reset();
      fetchMyCrops();
    } catch (error) {
      console.error("Error updating crop:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCrop(deletingCrop._id);
      setDeletingCrop(null);
      fetchMyCrops();
    } catch (error) {
      console.error("Error deleting crop:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-base-200 to-base-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="h-12 bg-base-300 rounded-xl w-64 mb-4 animate-pulse"></div>
          <div className="h-6 bg-base-300 rounded-lg w-96 mb-8 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-96 bg-base-100 rounded-xl shadow-xl animate-pulse"
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
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            My Crop Listings
          </h1>
          <p className="text-base-content/70 text-lg">
            Manage and track your agricultural products
          </p>
        </div>

        {/* Stats and Add Button */}
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
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <div className="stat-title">Total Listings</div>
              <div className="stat-value text-primary">{crops.length}</div>
              <div className="stat-desc">Active crop posts</div>
            </div>
          </div>

          <Link
            to="/add-crop"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add New Crop
          </Link>
        </div>

        {crops.length === 0 ? (
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
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-base-content/60 mb-3">
                No Crop Listings Yet
              </h2>
              <p className="text-base-content/50 text-lg mb-8 max-w-md mx-auto">
                Start listing your crops to connect with buyers and grow your
                business
              </p>
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
                Create Your First Listing
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Desktop Card Grid View */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {crops.map((crop, index) => (
                <div
                  key={crop._id}
                  className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col"
                  style={{
                    animation: `fadeInUp 0.3s ease-out ${index * 0.05}s both`,
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
                      <h3 className="card-title text-xl font-bold mb-3 line-clamp-1">
                        {crop.name}
                      </h3>

                      <div className="space-y-2.5 mb-4">
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
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => handleEdit(crop)}
                        className="btn btn-primary flex-1 gap-1 shadow-md hover:shadow-lg transition-all"
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
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => setDeletingCrop(crop)}
                        className="btn btn-error flex-1 gap-1 shadow-md hover:shadow-lg transition-all"
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Delete
                      </button>
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

        {editingCrop && (
          <div className="modal modal-open">
            <div className="modal-box max-w-4xl bg-base-100 shadow-2xl">
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit Crop Listing
              </h3>
              <form onSubmit={handleSubmit(onEditSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium text-base">
                        Crop Name
                      </span>
                    </label>
                    <input
                      type="text"
                      className={`input input-bordered w-full focus:input-primary transition-all ${
                        errors.name ? "input-error" : ""
                      }`}
                      {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && (
                      <label className="label">
                        <span className="label-text-alt text-error">
                          {errors.name.message}
                        </span>
                      </label>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium text-base">
                        Type
                      </span>
                    </label>
                    <select
                      className={`select select-bordered w-full focus:select-primary transition-all ${
                        errors.type ? "select-error" : ""
                      }`}
                      {...register("type", { required: "Type is required" })}
                    >
                      <option value="Vegetable">🥬 Vegetable</option>
                      <option value="Fruit">🍎 Fruit</option>
                      <option value="Grain">🌾 Grain</option>
                      <option value="Cash Crop">💰 Cash Crop</option>
                      <option value="Other">📦 Other</option>
                    </select>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium text-base">
                        Price per Unit
                      </span>
                    </label>
                    <label className="input-group">
                      <span className="bg-base-200">₹</span>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="25.00"
                        className={`input input-bordered w-full focus:input-primary transition-all ${
                          errors.pricePerUnit ? "input-error" : ""
                        }`}
                        {...register("pricePerUnit", {
                          required: "Price is required",
                          min: {
                            value: 0.01,
                            message: "Price must be greater than 0",
                          },
                        })}
                      />
                    </label>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium text-base">
                        Unit
                      </span>
                    </label>
                    <select
                      className={`select select-bordered w-full focus:select-primary transition-all ${
                        errors.unit ? "select-error" : ""
                      }`}
                      {...register("unit", { required: "Unit is required" })}
                    >
                      <option value="kg">Kilogram (kg)</option>
                      <option value="ton">Ton</option>
                      <option value="bag">Bag</option>
                      <option value="quintal">Quintal</option>
                      <option value="piece">Piece</option>
                    </select>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium text-base">
                        Quantity
                      </span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="500"
                      className={`input input-bordered w-full focus:input-primary transition-all ${
                        errors.quantity ? "input-error" : ""
                      }`}
                      {...register("quantity", {
                        required: "Quantity is required",
                        min: {
                          value: 0.01,
                          message: "Quantity must be greater than 0",
                        },
                      })}
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium text-base">
                        Location
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Rajshahi, Bangladesh"
                      className={`input input-bordered w-full focus:input-primary transition-all ${
                        errors.location ? "input-error" : ""
                      }`}
                      {...register("location", {
                        required: "Location is required",
                      })}
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-base">
                      Image URL
                    </span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://i.ibb.co/xxxxx/image.jpg"
                    className={`input input-bordered w-full focus:input-primary transition-all ${
                      errors.image ? "input-error" : ""
                    }`}
                    {...register("image", {
                      required: "Image URL is required",
                    })}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-base">
                      Description
                    </span>
                  </label>
                  <textarea
                    placeholder="Describe your crop: quality, farming practices, etc."
                    className={`textarea textarea-bordered h-28 w-full focus:textarea-primary transition-all resize-none ${
                      errors.description ? "textarea-error" : ""
                    }`}
                    {...register("description", {
                      required: "Description is required",
                      minLength: {
                        value: 20,
                        message: "Minimum 20 characters",
                      },
                    })}
                  ></textarea>
                </div>

                <div className="modal-action">
                  <button
                    type="button"
                    className="btn btn-ghost btn-lg gap-2"
                    onClick={() => {
                      setEditingCrop(null);
                      reset();
                    }}
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
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg gap-2 shadow-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        Updating...
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
                        Update Crop
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
            <div
              className="modal-backdrop bg-black/50"
              onClick={() => {
                setEditingCrop(null);
                reset();
              }}
            ></div>
          </div>
        )}

        {deletingCrop && (
          <div className="modal modal-open">
            <div className="modal-box bg-base-100 shadow-2xl">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-error">
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
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                Confirm Deletion
              </h3>
              <div className="py-4">
                <p className="mb-4 text-base-content/70">
                  Are you sure you want to permanently delete this crop listing?
                </p>
                <div className="bg-base-200 rounded-xl p-4 border-l-4 border-error">
                  <p className="font-bold text-lg">{deletingCrop.name}</p>
                  <p className="text-sm text-base-content/70 mt-1">
                    Type: {deletingCrop.type}
                  </p>
                </div>
                <div className="alert alert-error mt-4 shadow-lg">
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
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span>
                    This action cannot be undone. All associated interests will
                    also be removed.
                  </span>
                </div>
              </div>
              <div className="modal-action">
                <button
                  className="btn btn-ghost btn-lg gap-2"
                  onClick={() => setDeletingCrop(null)}
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
                <button
                  className="btn btn-error btn-lg gap-2 shadow-lg"
                  onClick={handleDelete}
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Delete Permanently
                </button>
              </div>
            </div>
            <div
              className="modal-backdrop bg-black/50"
              onClick={() => setDeletingCrop(null)}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPosts;

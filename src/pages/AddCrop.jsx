import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { createCrop } from "../utils/api";
import toast from "react-hot-toast";

const AddCrop = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Add New Crop - KrishiLink";
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const cropData = {
        name: data.name,
        type: data.type,
        pricePerUnit: parseFloat(data.pricePerUnit),
        unit: data.unit,
        quantity: parseFloat(data.quantity),
        description: data.description,
        location: data.location,
        image: data.image,
        owner: {
          ownerName: user.displayName || user.email,
          ownerEmail: user.email,
        },
      };

      await createCrop(cropData);
      navigate("/my-posts");
    } catch (error) {
      console.error("Error creating crop:", error);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-base-200 to-base-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            Add New Crop
          </h1>
          <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
            List your crop and connect with potential buyers across the region
          </p>
        </div>

        {/* Form Card */}
        <div className="card bg-base-100 shadow-2xl border border-base-300">
          <div className="card-body p-6 sm:p-8 lg:p-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Basic Information Section */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
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
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Basic Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium text-base">
                        Crop Name <span className="text-error">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Organic Wheat"
                      className={`input input-bordered w-full focus:input-primary transition-all ${
                        errors.name ? "input-error" : ""
                      }`}
                      {...register("name", {
                        required: "Crop name is required",
                      })}
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
                        Type <span className="text-error">*</span>
                      </span>
                    </label>
                    <select
                      className={`select select-bordered w-full focus:select-primary transition-all ${
                        errors.type ? "select-error" : ""
                      }`}
                      {...register("type", {
                        required: "Crop type is required",
                      })}
                    >
                      <option value="">Select type</option>
                      <option value="Vegetable">🥬 Vegetable</option>
                      <option value="Fruit">🍎 Fruit</option>
                      <option value="Grain">🌾 Grain</option>
                      <option value="Cash Crop">💰 Cash Crop</option>
                      <option value="Other">📦 Other</option>
                    </select>
                    {errors.type && (
                      <label className="label">
                        <span className="label-text-alt text-error">
                          {errors.type.message}
                        </span>
                      </label>
                    )}
                  </div>
                </div>
              </div>

              {/* Pricing & Quantity Section */}
              <div className="divider"></div>
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
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
                  Pricing & Quantity
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium text-base">
                        Price per Unit <span className="text-error">*</span>
                      </span>
                    </label>
                    <label className="input-group">
                      <span className="bg-base-200">৳</span>
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
                    {errors.pricePerUnit && (
                      <label className="label">
                        <span className="label-text-alt text-error">
                          {errors.pricePerUnit.message}
                        </span>
                      </label>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium text-base">
                        Unit <span className="text-error">*</span>
                      </span>
                    </label>
                    <select
                      className={`select select-bordered w-full focus:select-primary transition-all ${
                        errors.unit ? "select-error" : ""
                      }`}
                      {...register("unit", {
                        required: "Unit is required",
                      })}
                    >
                      <option value="">Select unit</option>
                      <option value="kg">Kilogram (kg)</option>
                      <option value="ton">Ton</option>
                      <option value="bag">Bag</option>
                      <option value="quintal">Quintal</option>
                      <option value="piece">Piece</option>
                    </select>
                    {errors.unit && (
                      <label className="label">
                        <span className="label-text-alt text-error">
                          {errors.unit.message}
                        </span>
                      </label>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium text-base">
                        Available Quantity <span className="text-error">*</span>
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
                    {errors.quantity && (
                      <label className="label">
                        <span className="label-text-alt text-error">
                          {errors.quantity.message}
                        </span>
                      </label>
                    )}
                  </div>
                </div>
              </div>

              {/* Location Section */}
              <div className="divider"></div>
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
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
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Location
                </h2>
                <div className="form-control">
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
                  {errors.location && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.location.message}
                      </span>
                    </label>
                  )}
                </div>
              </div>

              {/* Image Section */}
              <div className="divider"></div>
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
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
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Crop Image
                </h2>
                <div className="form-control">
                  <input
                    type="url"
                    placeholder="https://i.ibb.co/xxxxx/image.jpg"
                    className={`input input-bordered w-full focus:input-primary transition-all ${
                      errors.image ? "input-error" : ""
                    }`}
                    {...register("image", {
                      required: "Image URL is required",
                      pattern: {
                        value: /^https?:\/\/.+/i,
                        message:
                          "Please enter a valid URL starting with http:// or https://",
                      },
                    })}
                  />
                  {errors.image && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.image.message}
                      </span>
                    </label>
                  )}
                  <label className="label">
                    <span className="label-text-alt text-base-content/60 wrap-break-word">
                      💡 Use direct image URL from ImgBB (e.g.,
                      https://i.ibb.co/xxxxx/image.jpg). The URL should end with
                      .jpg, .png, .gif, etc.
                    </span>
                  </label>
                </div>
              </div>

              {/* Description Section */}
              <div className="divider"></div>
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Description
                </h2>
                <div className="form-control">
                  <textarea
                    className={`textarea textarea-bordered h-36 w-full focus:textarea-primary transition-all resize-none ${
                      errors.description ? "textarea-error" : ""
                    }`}
                    placeholder="Describe your crop: quality, farming practices, harvest date, etc."
                    {...register("description", {
                      required: "Description is required",
                      minLength: {
                        value: 20,
                        message: "Description must be at least 20 characters",
                      },
                    })}
                  ></textarea>
                  {errors.description && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.description.message}
                      </span>
                    </label>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4">
                <button
                  type="button"
                  className="btn btn-ghost btn-lg gap-2 order-2 sm:order-1"
                  onClick={() => navigate(-1)}
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
                  className="btn btn-primary btn-lg gap-2 order-1 sm:order-2 shadow-lg hover:shadow-xl transition-all"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Creating...
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
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Add Crop
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 bg-base-100 px-6 py-3 rounded-full shadow-lg border border-base-300">
            <svg
              className="w-5 h-5 text-info"
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
            <p className="text-sm text-base-content/70">
              Your crop will be visible to all users. Ensure all information is
              accurate.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCrop;

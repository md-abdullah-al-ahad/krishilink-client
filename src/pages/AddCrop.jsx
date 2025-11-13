import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { createCrop } from "../utils/api";
import toast from "react-hot-toast";

const AddCrop = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Add New Crop</h1>
          <p className="text-base-content/70">
            List your crop and connect with potential buyers
          </p>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Crop Name <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Organic Wheat"
                    className={`input input-bordered ${
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
                    <span className="label-text font-semibold">
                      Type <span className="text-error">*</span>
                    </span>
                  </label>
                  <select
                    className={`select select-bordered ${
                      errors.type ? "select-error" : ""
                    }`}
                    {...register("type", {
                      required: "Crop type is required",
                    })}
                  >
                    <option value="">Select type</option>
                    <option value="Vegetable">Vegetable</option>
                    <option value="Fruit">Fruit</option>
                    <option value="Grain">Grain</option>
                    <option value="Cash Crop">Cash Crop</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.type && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.type.message}
                      </span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Price per Unit (₹) <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="e.g., 25"
                    className={`input input-bordered ${
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
                    <span className="label-text font-semibold">
                      Unit <span className="text-error">*</span>
                    </span>
                  </label>
                  <select
                    className={`select select-bordered ${
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
                    <span className="label-text font-semibold">
                      Available Quantity <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="e.g., 500"
                    className={`input input-bordered ${
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

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Location <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Ludhiana, Punjab"
                    className={`input input-bordered ${
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

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    Image URL <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  className={`input input-bordered ${
                    errors.image ? "input-error" : ""
                  }`}
                  {...register("image", {
                    required: "Image URL is required",
                    pattern: {
                      value: /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)(\?.*)?$/i,
                      message: "Please enter a valid image URL",
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
                  <span className="label-text-alt">
                    Tip: Use image hosting services like Imgur or upload to
                    cloud storage
                  </span>
                </label>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    Description <span className="text-error">*</span>
                  </span>
                </label>
                <textarea
                  className={`textarea textarea-bordered h-32 ${
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

              <div className="divider"></div>

              <div className="flex gap-4 justify-end">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-lg gap-2"
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

        <div className="mt-6 text-center text-sm text-base-content/60">
          <p>
            Your crop will be visible to all users. Make sure all information is
            accurate.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddCrop;

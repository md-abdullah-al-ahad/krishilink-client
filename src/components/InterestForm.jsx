import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { expressInterest } from "../utils/api";
import toast from "react-hot-toast";

const InterestForm = ({ crop, onInterestSent }) => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      quantity: 1,
      message: "",
    },
  });

  const quantity = watch("quantity", 1);
  const totalPrice = quantity * crop.pricePerUnit;

  const isOwner = user?.email === crop.owner?.ownerEmail;
  const hasAlreadySentInterest = crop.interests?.some(
    (interest) => interest.userEmail === user?.email
  );

  if (!user) {
    return (
      <div className="card bg-base-200">
        <div className="card-body text-center">
          <p className="text-base-content/70">
            Please login to express interest in this crop
          </p>
        </div>
      </div>
    );
  }

  if (isOwner) {
    return null;
  }

  if (hasAlreadySentInterest) {
    return (
      <div className="card bg-warning/10 border border-warning">
        <div className="card-body">
          <div className="flex items-center gap-3">
            <svg
              className="w-8 h-8 text-warning"
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
            <div>
              <h3 className="font-bold text-lg">Interest Already Sent</h3>
              <p className="text-base-content/70">
                You've already expressed interest in this crop. The seller will
                contact you soon.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const onSubmitForm = (data) => {
    // Validate quantity
    if (data.quantity < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }

    setFormData(data);
    setShowModal(true);
  };

  const confirmSubmit = async () => {
    try {
      const interestData = {
        cropId: crop._id,
        userEmail: user.email,
        userName: user.displayName || user.email,
        quantity: parseInt(formData.quantity),
        message: formData.message,
        status: "pending",
      };

      await expressInterest(interestData);
      setShowModal(false);
      reset();

      if (onInterestSent) {
        onInterestSent();
      }
    } catch (error) {
      console.error("Error expressing interest:", error);
    }
  };

  return (
    <>
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
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            Express Interest
          </h2>

          <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">
                  Quantity ({crop.unit})
                </span>
                <span className="label-text-alt text-base-content/60">
                  Available: {crop.quantity} {crop.unit}
                </span>
              </label>
              <input
                type="number"
                min="1"
                placeholder="Enter quantity"
                className={`input input-bordered ${
                  errors.quantity ? "input-error" : ""
                }`}
                {...register("quantity", {
                  required: "Quantity is required",
                  min: {
                    value: 1,
                    message: "Quantity must be at least 1",
                  },
                  max: {
                    value: crop.quantity,
                    message: `Maximum available is ${crop.quantity} ${crop.unit}`,
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
                <span className="label-text font-semibold">Message</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="Tell the seller about your requirements..."
                {...register("message")}
              ></textarea>
            </div>

            <div className="divider"></div>

            <div className="bg-base-200 rounded-lg p-4">
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold">Total Price:</span>
                <span className="text-primary font-bold text-2xl">
                  ৳{totalPrice.toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-base-content/60 mt-2">
                {quantity} {crop.unit} × ৳{crop.pricePerUnit}/{crop.unit}
              </p>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full btn-lg gap-2"
              disabled={isSubmitting || quantity < 1}
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Submitting...
                </>
              ) : (
                <>
                  Send Interest
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
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Confirm Interest</h3>
            <p className="mb-2">You are about to send interest for:</p>
            <div className="bg-base-200 rounded-lg p-4 mb-4">
              <p className="font-semibold">{crop.name}</p>
              <p>
                Quantity: {formData.quantity} {crop.unit}
              </p>
              <p>
                Total: ৳
                {(formData.quantity * crop.pricePerUnit).toLocaleString()}
              </p>
              {formData.message && (
                <p className="mt-2 text-sm">Message: "{formData.message}"</p>
              )}
            </div>
            <p className="text-sm text-base-content/70 mb-4">
              The seller will be notified and can accept or reject your
              interest.
            </p>
            <div className="modal-action">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={confirmSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Sending...
                  </>
                ) : (
                  "Confirm"
                )}
              </button>
            </div>
          </div>
          <div
            className="modal-backdrop"
            onClick={() => setShowModal(false)}
          ></div>
        </div>
      )}
    </>
  );
};

export default InterestForm;

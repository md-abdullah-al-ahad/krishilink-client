import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import { getAuthErrorMessage } from "../utils/validation";
import { saveUserToDatabase } from "../utils/api";

const Register = () => {
  useEffect(() => {
    document.title = "Register - KrishiLink";
  }, []);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const { createUser, signInWithGoogle, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const password = watch("password", "");

  const onSubmit = async (data) => {
    try {
      const userCredential = await createUser(
        data.email,
        data.password,
        data.name
      );

      if (data.photoURL) {
        await updateUserProfile(data.name, data.photoURL);
      }

      const userData = {
        name: data.name,
        email: data.email,
        photoURL: data.photoURL || "",
        createdAt: new Date().toISOString(),
      };

      await saveUserToDatabase(userData);

      toast.success("Account created successfully! Welcome to KrishiLink 🌱", {
        duration: 3000,
        style: {
          background: "#10b981",
          color: "#fff",
        },
      });

      navigate("/");
    } catch (err) {
      const errorMessage = getAuthErrorMessage(err.code) || err.message;
      toast.error(errorMessage, {
        duration: 4000,
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();

      const userData = {
        name: result.user.displayName || "",
        email: result.user.email,
        photoURL: result.user.photoURL || "",
        createdAt: new Date().toISOString(),
      };

      await saveUserToDatabase(userData);

      toast.success("Welcome to KrishiLink! 🌱", {
        duration: 3000,
        style: {
          background: "#10b981",
          color: "#fff",
        },
      });

      navigate("/");
    } catch (err) {
      const errorMessage = getAuthErrorMessage(err.code) || err.message;
      toast.error(errorMessage, {
        duration: 4000,
      });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-base-200">
      <div className="absolute inset-0 bg-linear-to-br from-green-400/10 via-emerald-500/5 to-teal-600/10"></div>

      <div className="absolute top-20 left-10 w-72 h-72 bg-green-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>

      <div className="relative min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
              Create Your Account
            </h1>
            <p className="text-base-content/60">
              Join the KrishiLink farming community
            </p>
          </div>

          <div className="card bg-base-100 shadow-2xl border border-base-300">
            <div className="card-body p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold flex items-center gap-2">
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
                      Full Name
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className={`input input-bordered w-full focus:input-primary transition-all ${
                      errors.name ? "input-error" : ""
                    }`}
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 3,
                        message: "Name must be at least 3 characters",
                      },
                    })}
                  />
                  {errors.name && (
                    <label className="label">
                      <span className="label-text-alt text-error flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {errors.name.message}
                      </span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold flex items-center gap-2">
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
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        />
                      </svg>
                      Email Address
                    </span>
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className={`input input-bordered w-full focus:input-primary transition-all ${
                      errors.email ? "input-error" : ""
                    }`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <label className="label">
                      <span className="label-text-alt text-error flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {errors.email.message}
                      </span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold flex items-center gap-2">
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
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Photo URL
                      <span className="text-xs opacity-60">(Optional)</span>
                    </span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    className="input input-bordered w-full focus:input-primary transition-all"
                    {...register("photoURL")}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold flex items-center gap-2">
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
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                      Password
                    </span>
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className={`input input-bordered w-full focus:input-primary transition-all ${
                      errors.password ? "input-error" : ""
                    }`}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                        message:
                          "Password must contain uppercase and lowercase letters",
                      },
                    })}
                  />
                  {errors.password && (
                    <label className="label">
                      <span className="label-text-alt text-error flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {errors.password.message}
                      </span>
                    </label>
                  )}
                  {password && (
                    <div className="mt-2 space-y-1">
                      <div
                        className={`text-xs flex items-center gap-1 ${
                          password.length >= 6
                            ? "text-success"
                            : "text-base-content/60"
                        }`}
                      >
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          {password.length >= 6 ? (
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          ) : (
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          )}
                        </svg>
                        At least 6 characters
                      </div>
                      <div
                        className={`text-xs flex items-center gap-1 ${
                          /[A-Z]/.test(password)
                            ? "text-success"
                            : "text-base-content/60"
                        }`}
                      >
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          {/[A-Z]/.test(password) ? (
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          ) : (
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          )}
                        </svg>
                        At least one uppercase letter
                      </div>
                      <div
                        className={`text-xs flex items-center gap-1 ${
                          /[a-z]/.test(password)
                            ? "text-success"
                            : "text-base-content/60"
                        }`}
                      >
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          {/[a-z]/.test(password) ? (
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          ) : (
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          )}
                        </svg>
                        At least one lowercase letter
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full gap-2 text-base shadow-lg hover:shadow-xl transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Creating Account...
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
                          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                        />
                      </svg>
                      Create Account
                    </>
                  )}
                </button>
              </form>

              <div className="divider text-sm opacity-60">OR</div>

              <button
                onClick={handleGoogleSignIn}
                disabled={isSubmitting}
                className="btn btn-outline w-full gap-3 hover:bg-base-200 transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </button>

              <div className="text-center mt-6">
                <p className="text-base-content/60">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="link link-primary font-semibold hover:text-primary-focus"
                  >
                    Login here
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <p className="text-center mt-6 text-sm text-base-content/40">
            By registering, you agree to our Terms of Service
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

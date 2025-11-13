import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import { getAuthErrorMessage } from "../utils/validation";
import { saveUserToDatabase } from "../utils/api";

const Login = () => {
  useEffect(() => {
    document.title = "Login - KrishiLink";
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    try {
      await signIn(data.email, data.password);
      toast.success("Welcome back! 🌱", {
        duration: 3000,
        style: {
          background: "#10b981",
          color: "#fff",
        },
      });
      navigate(from, { replace: true });
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

      // Save user to database (if new user, it will be added; if existing, backend handles it)
      const userData = {
        name: result.user.displayName || "",
        email: result.user.email,
        photoURL: result.user.photoURL || "",
        createdAt: new Date().toISOString(),
      };

      await saveUserToDatabase(userData);

      toast.success("Welcome back! 🌱", {
        duration: 3000,
        style: {
          background: "#10b981",
          color: "#fff",
        },
      });
      navigate(from, { replace: true });
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
              Welcome Back
            </h1>
            <p className="text-base-content/60">
              Continue your farming journey with KrishiLink
            </p>
          </div>

          <div className="card bg-base-100 shadow-2xl border border-base-300">
            <div className="card-body p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                  <label className="label">
                    <span className="label-text-alt link link-hover text-primary opacity-60 cursor-not-allowed">
                      Forgot password?
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full gap-2 text-base shadow-lg hover:shadow-xl transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Signing in...
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
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        />
                      </svg>
                      Sign In
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
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="link link-primary font-semibold hover:text-primary-focus"
                  >
                    Create one now
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <p className="text-center mt-6 text-sm text-base-content/40">
            Protected by Firebase Authentication
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

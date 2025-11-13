import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navLinks = user
    ? [
        { path: "/", label: "Home" },
        { path: "/all-crops", label: "All Crops" },
        { path: "/profile", label: "Profile" },
        { path: "/add-crop", label: "Add Crop" },
        { path: "/my-posts", label: "My Posts" },
        { path: "/my-interests", label: "My Interests" },
      ]
    : [
        { path: "/", label: "Home" },
        { path: "/all-crops", label: "All Crops" },
      ];

  const authLinks = [
    { path: "/login", label: "Login" },
    { path: "/register", label: "Register" },
  ];

  return (
    <div className="navbar bg-base-100/95 shadow-lg sticky top-0 z-50 backdrop-blur-md border-b border-base-200">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-100 mt-3 w-52 p-2 shadow-xl border border-base-200"
          >
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? "active font-semibold bg-primary/10 text-primary"
                      : "hover:bg-base-200"
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <Link
          to="/"
          className="btn btn-ghost text-xl flex items-center gap-2 hover:bg-transparent"
        >
          <img src={logo} alt="KrishiLink" className="h-8 w-8" />
          <span className="font-bold bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            KrishiLink
          </span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "active font-semibold bg-linear-to-r from-green-500/20 to-emerald-500/20 text-primary border border-primary/20"
                    : "hover:bg-base-200 transition-all"
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end flex items-center gap-3">
        {user ? (
          <>
            <div className="hidden sm:flex items-center gap-3 mr-2">
              <div className="avatar placeholder">
                <div className="bg-linear-to-br from-green-500 to-emerald-600 text-white rounded-full w-10 h-10 ring ring-primary ring-offset-2 ring-offset-base-100">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName} />
                  ) : (
                    <span className="text-sm font-semibold">
                      {user.displayName?.charAt(0) || user.email?.charAt(0)}
                    </span>
                  )}
                </div>
              </div>
              <div className="hidden lg:flex flex-col">
                <span className="text-sm font-semibold text-base-content">
                  {user.displayName || "User"}
                </span>
                <span className="text-xs text-base-content/60">
                  {user.email}
                </span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-error btn-sm gap-2 shadow-md hover:shadow-lg transition-all"
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
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="btn btn-ghost btn-sm gap-2 hover:bg-base-200"
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
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Login
            </Link>
            <Link
              to="/register"
              className="btn btn-primary btn-sm gap-2 shadow-md hover:shadow-lg transition-all"
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
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

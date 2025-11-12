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
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive ? "active font-semibold" : ""
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            {!user &&
              authLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive ? "active font-semibold" : ""
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            {user && (
              <li>
                <button onClick={handleLogout} className="text-error">
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl flex items-center gap-2">
          <img src={logo} alt="KrishiLink" className="h-8 w-8" />
          <span className="text-green-700 font-bold">KrishiLink</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "active font-semibold bg-green-100 text-green-700"
                    : "hover:bg-green-50"
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end hidden lg:flex gap-2">
        {user ? (
          <button onClick={handleLogout} className="btn btn-error btn-sm">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="btn btn-ghost btn-sm">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary btn-sm">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

import { Link } from "react-router-dom";
import ThemeController from "./ThemeController";

function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm px-10">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          daisyUI
        </Link>
      </div>
      <div className="flex gap-2 justify-center items-center">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto"
        />
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/:category/lessons">Lessons</Link>
          </li>
          <li>
            <Link to="/category">Categories</Link>
          </li>
        </ul>

        {/* Profile Dropdown */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="User Avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/profile">
                Profile <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
        </div>

        <ThemeController />
      </div>
    </div>
  );
}

export default Navbar;

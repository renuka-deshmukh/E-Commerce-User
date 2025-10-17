import { useContext } from "react";
import { FaSearch, FaUserCircle, FaShoppingCart, FaStore, FaHeart, FaTags, FaGift, FaSignOutAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css"; 
import { AuthContext } from "../context/AuthProvider";

const Navbar = () => {
  const { loggedUser, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
      <div className="container-fluid">
        {/* Logo */}
        <a className="navbar-brand" href="#">
          <img
            src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg"
            alt="Flipkart Logo"
            height="40"
          />
        </a>

        {/* Search Bar */}
        <form className="d-flex mx-auto w-50">
          <div className="input-group">
            <span className="input-group-text bg-light border-0">
              <FaSearch />
            </span>
            <input
              className="form-control border-0 bg-light"
              type="search"
              placeholder="Search for Products, Brands and More"
            />
          </div>
        </form>

        {/* Right Menu */}
        <div className="d-flex align-items-center gap-4">
          {/* Account with Hover Dropdown */}
          <div className="dropdown hover-dropdown">
            <button
              className="btn btn-light d-flex align-items-center"
              type="button"
              id="accountDropdown"
            >
              <FaUserCircle className="me-1" /> 
              {loggedUser ? loggedUser.name : "Account"}
            </button>

            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="accountDropdown">
              {loggedUser ? (
                <>
                  <li>
                    <a className="dropdown-item d-flex align-items-center" href="#"><FaHeart className="me-2 text-danger" /> Wishlist</a>
                  </li>
                  <li>
                    <a className="dropdown-item d-flex align-items-center" href="#"><FaTags className="me-2 text-warning" /> Coupons</a>
                  </li>
                  <li>
                    <a className="dropdown-item d-flex align-items-center" href="#"><FaGift className="me-2 text-success" /> Gift Cards</a>
                  </li>
                  <li>
                    <button 
                      onClick={logout} 
                      className="dropdown-item d-flex align-items-center text-danger border-0 bg-white w-100"
                    >
                      <FaSignOutAlt className="me-2" /> Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li><a className="dropdown-item" href="/login">Login</a></li>
                  <li><a className="dropdown-item" href="/register">Register</a></li>
                </>
              )}
            </ul>
          </div>

          {/* Cart */}
          <div className="d-flex align-items-center cursor-pointer">
            <FaShoppingCart className="me-1" /> Cart
          </div>

          {/* Become a Seller */}
          <div className="d-flex align-items-center cursor-pointer">
            <FaStore className="me-1" /> Become a Seller
          </div>

          {/* More */}
          <div className="fs-5 cursor-pointer">⋮</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <div className="nav-tittle">
        <Link to="/" className="navbar-title">
          Movie<span className="diff-color">DB</span>
        </Link>
        <div className="menu-icon" onClick={toggleMobileMenu}>
          ☰
        </div>
      </div>
      <div className={`link-search ${isMobileMenuOpen ? "mobile-show" : ""}`}>
        <div className="navbar-links">
          <Link to="/" className="nav-links">
            Home
          </Link>
          <Link to="/top-rated" className="nav-links">
            Top Rated
          </Link>
          <Link to="/upcoming" className="nav-links">
            Upcoming
          </Link>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Movies"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

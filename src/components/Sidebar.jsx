import React, { useState } from "react";

const Sidebar = ({ categories, brands, onFilterChange }) => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);

  const handleBrandChange = (brand) => {
    const updatedBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];

    setSelectedBrands(updatedBrands);
    onFilterChange({ brands: updatedBrands, priceRange });
  };

  const handlePriceChange = (e) => {
    const value = Number(e.target.value);
    const name = e.target.name;
    const newRange =
      name === "min"
        ? [value, priceRange[1]]
        : [priceRange[0], value];

    setPriceRange(newRange);
    onFilterChange({ brands: selectedBrands, priceRange: newRange });
  };

  return (
    <div
      className="bg-white p-3 shadow-sm"
      style={{ width: "250px", height: "100vh", overflowY: "auto" }}
    >
      <h5 className="fw-bold mb-3">Filters</h5>

      {/* Categories
      <div className="mb-4">
        <h6 className="fw-semibold">Categories</h6>
        {categories.map((cat) => (
          <p key={cat._id} className="mb-1 small text-muted">
            {cat.cName}
          </p>
        ))}
      </div> */}

      {/* Brands */}
      <div className="mb-4">
        <h6 className="fw-semibold">Brands</h6>
        <div style={{ maxHeight: "120px", overflowY: "auto" }}>
          {brands.length > 0 ? (
            brands.map((brand) => (
              <div key={brand} className="form-check mb-1">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={brand}
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                />
                <label className="form-check-label small" htmlFor={brand}>
                  {brand}
                </label>
              </div>
            ))
          ) : (
            <p className="text-muted small">No brands available</p>
          )}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <h6 className="fw-semibold">Price Range (₹)</h6>
        <div className="d-flex align-items-center gap-2">
          <input
            type="number"
            name="min"
            value={priceRange[0]}
            onChange={handlePriceChange}
            className="form-control form-control-sm"
            style={{ width: "80px" }}
          />
          <span>-</span>
          <input
            type="number"
            name="max"
            value={priceRange[1]}
            onChange={handlePriceChange}
            className="form-control form-control-sm"
            style={{ width: "80px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

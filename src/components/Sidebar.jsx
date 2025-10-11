import { useEffect, useState } from "react";

const Sidebar = ({ brands, onFilterChange }) => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [price, setPrice] = useState(10000);

  useEffect(() => {
    onFilterChange({ brand: selectedBrand, priceRange: [0, price] });
  }, [selectedBrand, price]);

  return (
    <div className="sidebar p-3 border-end">
      <h5>Brand</h5>
      <ul>
        {brands.map((b) => (
          <li key={b}>
            <input
              type="radio"
              name="brand"
              value={b}
              checked={selectedBrand === b}
              onChange={(e) => setSelectedBrand(e.target.value)}
            />{" "}
            {b}
          </li>
        ))}
      </ul>

      <h5 className="mt-3">Price</h5>
      <input
        type="range"
        min={0}
        max={10000}
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      />
      <p>Up to ₹{price}</p>
    </div>
  );
};

export default Sidebar;
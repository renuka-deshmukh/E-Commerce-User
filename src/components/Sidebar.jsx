import { useEffect, useState } from "react";

const Sidebar = ({ brands = [], onFilterChange }) => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [price, setPrice] = useState(10000);

  // Update filters whenever brand or price changes
  useEffect(() => {
    onFilterChange({ brands: selectedBrands, priceRange: [0, price] });
  }, [selectedBrands, price]);

  // Toggle brand selection
  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  return (
    <div className="w-64 bg-white shadow-xl rounded-2xl p-5 border border-gray-200 sticky top-4 h-fit transition-all duration-300">
      <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
        Filters
      </h3>

      {/* Brand Filter */}
      <div className="mb-6">
        <h4 className="text-base font-medium text-gray-700 mb-2">Brands</h4>
        <ul className="space-y-2 max-h-48 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300">
          {brands.length > 0 ? (
            brands.map((brand) => (
              <li
                key={brand}
                className="flex items-center gap-2 text-gray-700 hover:bg-gray-50 rounded-md px-2 py-1 transition-colors"
              >
                <input
                  type="checkbox"
                  id={brand}
                  value={brand}
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                  className="accent-indigo-500 cursor-pointer m-1"
                />
                <label htmlFor={brand} className="cursor-pointer text-sm">
                  {brand}
                </label>
              </li>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No brands available</p>
          )}
        </ul>
      </div>

      {/* Price Filter */}
      <div>
        <h4 className="text-base font-medium text-gray-700 mb-2">
          Price Range
        </h4>
        <input
          type="range"
          min={0}
          max={10000}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full accent-indigo-500 cursor-pointer"
        />
        <p className="text-gray-600 text-sm mt-1">Up to ₹{price}</p>
      </div>
    </div>
  );
};

export default Sidebar;

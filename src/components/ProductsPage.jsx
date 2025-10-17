import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductsGrid from "./ProductsGrid";
import { getProductsByCategory } from "../services/productApi";

const ProductsPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);

  // Fetch products by category
  useEffect(() => {
    if (!category) return;

    getProductsByCategory(category)
      .then((res) => {
        if (res.data.success) {
          setProducts(res.data.products);

          // derive unique brands dynamically
          const uniqueBrands = [
            ...new Set(
              res.data.products.map((p) => p.brandName).filter(Boolean)
            ),
          ];
          setBrands(uniqueBrands);
        }
      })
      .catch((err) => console.error(err));
  }, [category]);

  // Filter products based on selected brands + price
  const filteredProducts = products.filter((p) => {
  const matchBrand =
    selectedBrands.length === 0 || selectedBrands.includes(p.brandName);
  const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
  return matchBrand && matchPrice;
});


  // Toggle brand checkbox
  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  // Price slider change
  const handlePriceChange = (e) => {
    const value = Number(e.target.value);
    setPriceRange([0, value]);
  };

  return (
    <div className="container-fluid my-4">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 bg-white shadow-sm rounded p-3">
          {/* Brand Filter */}
          <h6 className="fw-bold">BRAND</h6>
          <div
            style={{ maxHeight: "200px", overflowY: "auto", fontSize: "14px" }}
          >
            {brands.slice(0, 8).map((brand, i) => (
              <div className="form-check" key={i}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={brand}
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                />
                <label className="form-check-label" htmlFor={brand}>
                  {brand}
                </label>
              </div>
            ))}
            {brands.length > 8 && (
              <p
                className="text-danger fw-bold"
                style={{ cursor: "pointer", fontSize: "13px" }}
              >
                + {brands.length - 8} more
              </p>
            )}
          </div>

          {/* Price Filter */}
          <div className="mt-4">
            <h6 className="fw-bold">PRICE</h6>
            <input
              type="range"
              min="100"
              max="5000"
              value={priceRange[1]}
              onChange={handlePriceChange}
              className="form-range text-danger"
              style={{ accentColor: "#E91E63" }}
            />
            <div className="d-flex justify-content-between">
              <span>₹{priceRange[0]}</span>
              <span>₹{priceRange[1]}+</span>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="col-md-9 col-lg-10">
          <ProductsGrid filteredProducts={products} />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;

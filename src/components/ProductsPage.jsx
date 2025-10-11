import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import { getProductsByCategory } from "../services/productApi";

const ProductsPage = () => {
  const { category } = useParams(); // category = catID
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ brand: "", priceRange: [0, 10000] });

  useEffect(() => {
    getProductsByCategory(category).then((res) => {
      if (res.data.success) setProducts(res.data.products);
    });
  }, [category]);

  const filteredProducts = products.filter((p) => {
    const matchBrand = filters.brand ? p.brandName === filters.brand : true;
    const matchPrice = p.price <= filters.priceRange[1];
    return matchBrand && matchPrice;
  });

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar
        categories={[category]} 
        brands={[...new Set(products.map(p => p.brandName))]} 
        onFilterChange={setFilters}
      />

      {/* Products List */}
      <div className="products-container flex-grow-1 p-3 d-flex flex-wrap">
        {filteredProducts.map((item) => (
          <div key={item.id} className="card m-2" style={{ width: "180px" }}>
            <img
              src={item.pImage || "https://via.placeholder.com/180"}
              alt={item.pName}
              className="card-img-top"
              style={{ height: "180px", objectFit: "contain" }}
            />
            <div className="card-body text-center p-2">
              <p className="card-title mb-1">{item.pName}</p>
              <p className="text mb-0"><b>₹{item.price}</b></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;

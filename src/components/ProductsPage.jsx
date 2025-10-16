import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import { getProductsByCategory } from "../services/productApi";
import axiosInstance from "../services/axiosInstance";

const ProductsPage = () => {
  const { catID } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({ brand: "", priceRange: [0, 10000] });

  useEffect(() => {
    if (!catID) return;
    getProductsByCategory(catID)
      .then((res) => {
        if (res.data.success) setProducts(res.data.products);
      })
      .catch((err) => console.error(err));
  }, [catID]);

  useEffect(() => {
    axiosInstance.get("/category/getAllCategories").then((res) => {
      if (res.data.success) setCategories(res.data.categories);
    });
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchBrand = filters.brand ? p.brandName === filters.brand : true;
    const matchPrice =
      p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1];
    return matchBrand && matchPrice;
  });

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar
        categories={categories}
        brands={[...new Set(products.map((p) => p.brandName))]}
        onFilterChange={setFilters}
      />

      {/* Products List */}
      <div className="products-container flex-grow-1 p-3 d-flex flex-wrap">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
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
          ))
        ) : (
          <p className="m-auto">No products found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;

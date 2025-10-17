import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/productApi";
import { getAllCategories } from "../services/categoryApi";
import { getAllBrands } from "../services/brandApi";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState("-");
  const [brand, setBrand] = useState("-");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // ✅ Fetch product details
        const prodRes = await getProductById(id);
        const prod = prodRes?.data?.product;

        if (!prod) {
          setProduct(null);
          setLoading(false);
          return;
        }

        setProduct(prod);

        // ✅ Fetch categories and brands
        const [catRes, brandRes] = await Promise.all([
          getAllCategories(),
          getAllBrands(),
        ]);

        const foundCat = catRes?.data?.categories?.find(
          (c) => c._id === prod.catID || c.id === prod.catID
        );
        const foundBrand = brandRes?.data?.brands?.find(
          (b) => b._id === prod.brandID || b.id === prod.brandID
        );

        setCategory(foundCat ? foundCat.cName : "-");
        setBrand(foundBrand ? foundBrand.bName : "-");
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchData();
  }, [id]);

  if (loading) return <div className="text-center mt-5 fs-5">Loading...</div>;
  if (!product)
    return (
      <div className="text-center mt-5 fs-5 text-muted">
        Product not found or removed.
      </div>
    );

  return (
    <div className="container my-4">
      <button
        className="btn btn-outline-secondary mb-3"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="row bg-white shadow-sm rounded p-4">
        {/* ---------- LEFT SIDE (Product Images) ---------- */}
        <div className="col-md-5 d-flex flex-column align-items-center">
          <img
            src={product.pImage || "https://via.placeholder.com/400x400"}
            alt={product.pName}
            className="img-fluid mb-3 rounded shadow-sm"
            style={{ maxHeight: 400, objectFit: "contain" }}
          />

          {/* Thumbnails (you can add more images later) */}
          <div className="d-flex justify-content-center gap-2 mt-2">
            {[product.pImage, product.pImage, product.pImage].map((img, i) => (
              <img
                key={i}
                src={img || "https://via.placeholder.com/80x80"}
                alt="thumbnail"
                className="border rounded shadow-sm"
                style={{
                  width: 80,
                  height: 80,
                  objectFit: "cover",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        </div>

        {/* ---------- RIGHT SIDE (Product Info) ---------- */}
        <div className="col-md-7">
          <h4 className="fw-bold">{product.pName}</h4>
          <div className="text-muted mb-2">
            <span className="fw-semibold text-dark">{brand}</span> • {category}
          </div>

          <h3 className="text-success fw-bold">
            ₹{product.price?.toLocaleString() || 0}
          </h3>
          <div className="text-muted small mb-3">Inclusive of all taxes</div>

          <p className="text-secondary" style={{ lineHeight: "1.6" }}>
            {product.pDescription || "No description available."}
          </p>

          <ul className="list-unstyled mb-4">
            <li>🟢 In Stock: {product.quentity || 0} items</li>
            <li>🚚 Free Delivery by <strong>7 Oct</strong></li>
            <li>💳 Pay on Delivery available</li>
          </ul>

          <div className="d-flex gap-3">
            <button className="btn btn-warning btn-lg fw-semibold px-4">
              ADD TO CART
            </button>
            <button className="btn btn-danger btn-lg fw-semibold px-4">
              BUY NOW
            </button>
          </div>
        </div>
      </div>

      {/* ---------- Offers Section ---------- */}
      <div className="mt-4 p-3 bg-light border rounded shadow-sm">
        <h5 className="fw-bold mb-2">Available Offers</h5>
        <ul className="mb-0 text-secondary">
          <li>💳 5% Cashback on Axis Bank Cards up to ₹750</li>
          <li>🏷️ Extra ₹4000 off on special price</li>
          <li>🔁 Exchange offer available up to ₹7,000 off</li>
        </ul>
      </div>
    </div>
  );
};

export default ProductDetails;

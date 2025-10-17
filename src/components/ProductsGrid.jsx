import React from "react";
import { Link } from "react-router-dom";

const ProductsGrid = ({ filteredProducts }) => {
  if (!filteredProducts.length)
    return (
      <div className="text-center my-5">
        <img
          src="https://cdn-icons-png.flaticon.com/512/7486/7486800.png"
          alt="No Products"
          width="100"
          className="mb-3 opacity-75"
        />
        <h5 className="text-muted">No products found</h5>
      </div>
    );

  return (
    <div className="row">
      {filteredProducts.map((item) => (
        <div className="col-6 col-md-4 col-lg-3 mb-4" key={item.id}>
          <Link
            to={`/product/${item.id}`}
            className="text-decoration-none text-dark"
          >
            <div className="card border-0 shadow-sm h-100">
              <div className="position-relative">
                <img
                  src={
                    item.pImage ||
                    "https://via.placeholder.com/220x280"
                  }
                  alt={item.pName}
                  className="card-img-top p-3"
                  style={{ height: "200px", objectFit: "contain" }}
                />
                {item.discount && (
                  <span className="position-absolute top-0 start-0 bg-danger text-white px-2 py-1 small fw-semibold rounded-end">
                    {item.discount}% OFF
                  </span>
                )}
              </div>
              <div className="card-body text-center p-2">
                <h6 className="mb-1" style={{ fontSize: "14px" }}>
                  {item.brandName || "Unknown Brand"}
                </h6>
                <p className="mb-1" style={{ fontSize: "13px" }}>
                  {item.pName}
                </p>
                <div className="d-flex justify-content-center align-items-center mb-1 gap-2">
                  <span className="fw-bold">₹{item.price}</span>
                  {item.oldPrice && (
                    <span className="text-muted text-decoration-line-through small">
                      ₹{item.oldPrice}
                    </span>
                  )}
                </div>
                {item.rating && (
                  <div className="bg-success text-white d-inline-block px-2 py-1 rounded small">
                    ★ {item.rating}
                  </div>
                )}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductsGrid;

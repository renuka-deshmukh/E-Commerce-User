import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/productApi";
import { getAllCategories } from "../services/categoryApi";
import { getAllBrands } from "../services/brandApi";
// import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const prodRes = await getProductById(id);
                console.log("Product API Response:", prodRes.data.product);  // 👈 check structure
                const prod = prodRes.data.product;
                setProduct(prod);

                const catRes = await getAllCategories();
                const brandRes = await getAllBrands();

                const foundCat = catRes.data.categories.find(c => c.id === prod.catID);
                const foundBrand = brandRes.data.brands.find(b => b.id === prod.brandID);

                setCategory(foundCat ? foundCat.cName : "-");
                setBrand(foundBrand ? foundBrand.bName : "-");
            } catch (error) {
                // toast.error("Failed to load product details");
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);


    if (loading) return <div className="text-center mt-5">Loading...</div>;
    if (!product) return <div className="text-center mt-5">Product not found.</div>;

    return (
        <div className="container my-4">
            {/* <button className="btn btn-outline-secondary mb-3" onClick={() => navigate(-1)}>
                ← Back
            </button> */}

            <div className="row bg-white shadow-sm rounded p-4">
                {/* LEFT SIDE - Images */}
                <div className="col-md-5 d-flex flex-column align-items-center">
                    <img
                        src={product.pImage || "https://via.placeholder.com/400x400"}
                        alt={product.pName}
                        className="img-fluid mb-3 rounded"
                        style={{ maxHeight: 400, objectFit: "contain" }}
                    />
                    <div className="d-flex justify-content-center gap-2">
                        {[1, 2, 3].map((i) => (
                            <img
                                key={i}
                                src={product.image || "https://via.placeholder.com/80x80"}
                                alt="thumb"
                                className="border rounded"
                                style={{ width: 80, height: 80, objectFit: "cover", cursor: "pointer" }}
                            />
                        ))}
                    </div>
                </div>

                {/* RIGHT SIDE - Product Info */}
                <div className="col-md-7">
                    <h4 className="fw-bold">{String(product?.pName || "")}</h4>
                    <div className="text-muted mb-2">
                        {String(brand)} • {String(category)}
                    </div>

                    <h3 className="text-success">₹{Number(product?.price) || 0}</h3>
                    <div className="text-muted small mb-3">Inclusive of all taxes</div>

                    <p className="text-secondary">{String(product?.pDescription || "")}</p>

                    <ul className="list-unstyled mb-4">
                        <li>🟢 In Stock: {Number(product?.quentity) || 0} items</li>
                        <li>🚚 Free Delivery by 7 Oct</li>
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

            {/* Offers Section */}
            <div className="mt-4 p-3 bg-light border rounded">
                <h5>Available Offers</h5>
                <ul className="mb-0">
                    <li> 5% Cashback on Axis Bank Cards up to ₹750</li>
                    <li> Extra ₹4000 off on special price</li>
                    <li> Exchange offer available up to ₹7,000 off</li>
                </ul>
            </div>
        </div>
    );
};

export default ProductDetails;

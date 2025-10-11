import React, { useState, useEffect } from "react";
import { getAllCategories } from "../../services/categoryApi";
import { getAllProducts } from "../../services/productApi";
import { getAllBrands } from "../../services/brandApi";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const categoryImages = {
    "Fashion & Accessories": "https://media.istockphoto.com/id/613654620/photo/fashionable-big-red-handbag-on-the-arm-of-the-girl.jpg?s=612x612&w=0&k=20&c=dqLeJBiFSxhj-ZWgbrU5oeSftTCTQo6BEGxGgGMCiIo=",
    "Electronics & Gadgets": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
    "Home & Living": "https://plus.unsplash.com/premium_photo-1676321046449-5fc72b124490?w=500&auto=format&fit=crop&q=60",
    "Watches": "https://images.unsplash.com/photo-1511376777868-611b54f68947",
    "Jewelry": "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3",
    "Kids & Toys": "https://plus.unsplash.com/premium_photo-1684623605109-263925d88106?w=500&auto=format&fit=crop&q=60",
    "Books & Stationery": "https://media.istockphoto.com/id/696967312/photo/pupils-on-class-in-school.webp?a=1&b=1&s=612x612&w=0&k=20&c=IXO3_BSxfBGLFZN4VGSJ4mqEV9FZ-z6VxF6Mt8rtQ9w=",
    "Sports & Outdoors": "https://images.unsplash.com/photo-1606902965551-dce093cda6e7?w=500&auto=format&fit=crop&q=60",
    "Sunglasses & Eyewear": "https://images.unsplash.com/photo-1611558709798-e009c8fd7706?w=500&auto=format&fit=crop&q=60",
    "Snacks": "https://images.unsplash.com/photo-1604908176997-3335a19fc5a5",
    "Beverages": "https://images.unsplash.com/photo-1606788075761-94d3b0db67a2",
  };

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);

  // Fetch all data
  useEffect(() => {
    async function fetchData() {
      try {
        const [catRes, prodRes, brandRes] = await Promise.all([
          getAllCategories(),
          getAllProducts(),
          getAllBrands(),
        ]);

        if (catRes.data.success) setCategories(catRes.data.categories || []);
        if (prodRes.data.success) setProducts(prodRes.data.products || []);
        if (brandRes.data.success) setBrands(brandRes.data.brands || []);
      } catch (err) {
        console.error("Error fetching data ❌", err);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="m-3">
      {/* ---------- Categories Section ---------- */}
      <div className="categories-bar bg-white shadow-sm py-3 rounded">
        <div className="container d-flex justify-content-between flex-wrap">
          {categories.map((category, index) => (
            <div
              key={category.id || index}
              className="text-center category-item mx-2 mb-2"
            >
              <img
                src={
                  categoryImages[category.cName] ||
                  "https://via.placeholder.com/80"
                }
                alt={category.cName}
                className="category-img mb-1"
                style={{
                  width: 60,
                  height: 60,
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
              <div className="small fw-medium mt-2">{category.cName}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Carousel ---------- */}
      <div
        id="carouselExampleIndicators"
        className="carousel slide mt-4"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner rounded-3 shadow-sm">
          <div className="carousel-item active">
            <img
              src="https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/23e03b46ba21c41a.jpeg?q=90"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://rukminim1.flixcart.com/fk-p-flap/1620/270/image/904dfee80ce47718.jpeg?q=90"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://rukminim1.flixcart.com/fk-p-flap/1620/270/image/e0b5fd2b1715a3fe.jpeg?q=90"
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* ---------- Product Slider ---------- */}
      <div className="container-fluid my-4 p-3 bg-light">
        <h5 className="fw-bold mb-3">Best deals on smartphones</h5>
        <div className="d-flex overflow-auto">
          {products.map((item) => (
            <Link
              to={`/product/${item.id}`}   // 👈 navigate to product details page
              key={item.id}
              className="text-decoration-none text-dark"
            >
              <div
                className="card me-3 border-0"
                style={{ width: "160px", flex: "0 0 auto" }}
              >
                <img
                  src={
                    item.image ||
                    "https://rukminim1.flixcart.com/image/110/110/xif0q/mobile/r/4/p/-original-imahf47e6gzt3ggw.jpeg?q=80"
                  }
                  className="card-img-top p-3"
                  alt={item.pName}
                  style={{ height: "180px", objectFit: "contain" }}
                />
                <div className="card-body text-center p-2">
                  <p className="card-title mb-1" style={{ fontSize: "15px" }}>
                    {item.pName}
                  </p>
                  <p className="text mb-0" style={{ fontSize: "13px" }}>
                    <b> From ₹{item.price}*</b>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {products.map((item) => (
        <Link
          to={`/products/${item.catID}`}   // navigate to ProductsPage for category
          key={item.id}
          className="text-decoration-none text-dark"
        >
          <div className="card me-3 border-0" style={{ width: "160px", flex: "0 0 auto" }}>
            <img
              src={item.pImage || "https://via.placeholder.com/110"}
              className="card-img-top p-3"
              alt={item.pName}
              style={{ height: "180px", objectFit: "contain" }}
            />
            <div className="card-body text-center p-2">
              <p className="card-title mb-1" style={{ fontSize: "15px" }}>{item.pName}</p>
              <p className="text mb-0" style={{ fontSize: "13px" }}><b>₹{item.price}</b></p>
            </div>
          </div>
        </Link>
      ))}



    </div>
  );
};

export default Dashboard;

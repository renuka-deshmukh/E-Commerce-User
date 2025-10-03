import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getAllCategories } from "../../api/category";


const Dashboard = () => {
  const categoryImages = {
    "Fashion & Accessories": "https://media.istockphoto.com/id/613654620/photo/fashionable-big-red-handbag-on-the-arm-of-the-girl.jpg?s=612x612&w=0&k=20&c=dqLeJBiFSxhj-ZWgbrU5oeSftTCTQo6BEGxGgGMCiIo=",
    "Electronics & Gadgets": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
    "Home & Living": "https://plus.unsplash.com/premium_photo-1676321046449-5fc72b124490?w=500&auto=format&fit=crop&q=60",
    "Watches": "https://images.unsplash.com/photo-1511376777868-611b54f68947",
    "Jewelry": "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3",
    "Kids & Toys": "https://plus.unsplash.com/premium_photo-1684623605109-263925d88106?w=500&auto=format&fit=crop&q=60",
    "Books & Stationery": "https://media.istockphoto.com/id/696967312/photo/pupils-on-class-in-school.webp?a=1&b=1&s=612x612&w=0&k=20",
    "Sports & Outdoors": "https://images.unsplash.com/photo-1606902965551-dce093cda6e7?w=500&auto=format&fit=crop&q=60",
    "Sunglasses & Eyewear": "https://images.unsplash.com/photo-1611558709798-e009c8fd7706?w=500&auto=format&fit=crop&q=60",
    "Snacks": "https://images.unsplash.com/photo-1604908176997-3335a19fc5a5",
    "Beverages": "https://images.unsplash.com/photo-1606788075761-94d3b0db67a2"
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAllCategories();
        if (response.data.success) {
          setCategories(response.data.categories || []);
        } else {
          setCategories([]);
        }
      } catch (error) {
        toast.error("Error fetching categories ❌");
        setCategories([]);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <div className="categories-bar bg-white shadow-sm py-3">
        <div className="container d-flex justify-content-between flex-wrap">
          {categories.map((category, index) => (
            <div key={index} className="text-center category-item mx-2 mb-3">
              <img
                src={categoryImages[category] || "https://via.placeholder.com/80"}
                alt={category}
                className="category-img mb-1"
                style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8 }}
              />
              <div className="small fw-medium">{category}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

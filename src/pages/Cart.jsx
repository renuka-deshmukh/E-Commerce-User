import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import {
  increaseQty,
  decreaseQty,
  calculateTotals,
} from "../app/features/cart/cartSlice";

import {
  fetchCart,
  removeCartItem,
  clearCartBackend,
} from "../app/features/cart/cartSlice";

import {
  selectCartItems,
  selectTotalAmount,
  selectTotalQty,
} from "../app/features/cart/cartSelectors";

import "./Cart.css";

const CartPage = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectTotalAmount);
  const qty = useSelector(selectTotalQty);

  const user = JSON.parse(localStorage.getItem("loggedInAdmin"));

  // 🔥 Load cart from backend on refresh
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCart(user.id)).then(() =>
        dispatch(calculateTotals())
      );
    }
  }, [dispatch]);

  const updateTotals = () => dispatch(calculateTotals());

  return (
    <div className="container mt-4 mb-5 cart-container">
      <div className="row">

        {/* LEFT SECTION */}
        <div className="col-lg-8">
          <div className="bg-white p-3 shadow-sm rounded">
            <h4 className="mb-3 fw-semibold">My Cart ({qty} items)</h4>

            {items.map((item) => (
              <div key={item.id} className="cart-item d-flex mb-4 pb-3 border-bottom">

                <img
                  src={item.Product.pImage}
                  className="cart-img"
                  alt={item.Product.pName}
                />

                <div className="ms-3 flex-grow-1">
                  <h5 className="fw-semibold mb-1">{item.Product.pName}</h5>
                  <p className="text-muted small mb-2">
                    Best quality product | Fast Delivery
                  </p>

                  <h6 className="text-success fw-bold">₹ {item.Product.price}</h6>

                  {/* QUANTITY */}
                  <div className="d-flex align-items-center mt-3">
                    <button
                      className="qty-btn"
                      onClick={() => {
                        dispatch(decreaseQty(item.id));
                        updateTotals();
                      }}
                    >
                      -
                    </button>

                    <span className="qty-number">{item.quantity}</span>

                    <button
                      className="qty-btn"
                      onClick={() => {
                        dispatch(increaseQty(item.id));
                        updateTotals();
                      }}
                    >
                      +
                    </button>

                    <button
                      className="btn btn-link text-danger ms-3"
                      onClick={() => {
                        dispatch(removeCartItem(item.id))
                          .then(() => dispatch(fetchCart(user.id)))
                          .then(() => dispatch(calculateTotals()));
                      }}
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* CLEAR CART */}
            {items.length > 0 && (
              <button
                className="btn btn-danger mt-2"
                onClick={() => {
                  dispatch(clearCartBackend(user.id))
                    .then(() => dispatch(fetchCart(user.id)))
                    .then(() => dispatch(calculateTotals()));
                }}
              >
                Clear Cart
              </button>
            )}
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="col-lg-4">
          <div className="bg-white p-3 shadow-sm rounded">
            <h5 className="border-bottom pb-2 fw-semibold">PRICE DETAILS</h5>

            <div className="d-flex justify-content-between my-2">
              <span>Price ({qty} items)</span>
              <span>₹{total}</span>
            </div>

            <div className="d-flex justify-content-between my-2">
              <span>Delivery Charges</span>
              <span className="text-success">FREE</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between fw-bold fs-5">
              <span>Total Amount</span>
              <span>₹{total}</span>
            </div>

            <button className="btn btn-warning w-100 mt-3 fw-semibold">
              PLACE ORDER
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CartPage;

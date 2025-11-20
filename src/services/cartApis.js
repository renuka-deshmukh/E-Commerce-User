import axiosInstance from "../services/axiosInstance";

export const addToCartApi = (data) =>
  axiosInstance.post("/cart/add", data);

export const getCartApi = () =>
  axiosInstance.get(`/cart`);

export const removeCartItemApi = (id) =>
  axiosInstance.delete(`/cart/remove/${id}`);

export const clearCartApi = () =>
  axiosInstance.delete(`/cart/clear`);

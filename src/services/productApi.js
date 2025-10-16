import axiosInstance from "./axiosInstance";

export const getAllProducts = () => axiosInstance.get('/product/getAllProducts');

export const getProductById = (id) => axiosInstance.get(`/product/getProductById/${id}`);

export const getProductsByCategory = (catID, filters = {}) => {
  return axiosInstance.get(`/product/getProductByCategory/category/${catID}`, { params: filters });
};
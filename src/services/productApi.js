import axiosInstance from "./axiosInstance";

export const getAllProducts = () => axiosInstance.get('/product/getAllProducts');

export const getProductById = (id) => axiosInstance.get(`/product/getProductById/${id}`);

export const getProductsByCategory = (category = {}) => 
  axiosInstance.get(`/product/getProductByCategory/category/${category}`);
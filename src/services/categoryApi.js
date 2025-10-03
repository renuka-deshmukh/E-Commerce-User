import axiosInstance from "./api";

export const getAllCategories = () => axiosInstance.get('/category/getAllCategories');


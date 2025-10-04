import axiosInstance from "./axiosInstance";

export const getAllCategories = () => axiosInstance.get('/category/getAllCategories');


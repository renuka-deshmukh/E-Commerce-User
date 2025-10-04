import axiosInstance from "./axiosInstance";

export const getAllBrands = () => axiosInstance.get('/brand/getAllBrands');

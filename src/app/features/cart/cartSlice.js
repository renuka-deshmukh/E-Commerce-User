import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    addToCartApi,
    getCartApi,
    removeCartItemApi,
    clearCartApi,
} from "../../../services/cartApis";


export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async () => {
        const res = await getCartApi();
        return res.data ?? [];
    }
);


export const addToCartBackend = createAsyncThunk(
    "cart/addToCartBackend",
    async ({ productId, quantity }) => {
        const res = await addToCartApi({ product_id: productId, quantity });
        return res.data;
    }
);

export const removeCartItem = createAsyncThunk(
    "cart/removeCartItem",
    async (id) => {
        await removeCartItemApi(id);
        return id;
    }
);

export const clearCartBackend = createAsyncThunk(
    "cart/clearCartBackend",
    async () => {
        await clearCartApi();
        return true;
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        totalQty: 0,
        totalAmount: 0,
    },

    reducers: {
        increaseQty: (state, action) => {
            const item = state.cartItems.find((i) => i.id === action.payload);
            if (item) item.quantity += 1;
        },

        decreaseQty: (state, action) => {
            const item = state.cartItems.find((i) => i.id === action.payload);
            if (item && item.quantity > 1) item.quantity -= 1;
        },

        calculateTotals: (state) => {
            let qty = 0;
            let total = 0;

            const items = Array.isArray(state.cartItems)
                ? state.cartItems
                : [];

            items.forEach((item) => {
                qty += item.quantity;
                total += item.quantity * item.Product.price;
            });

            state.totalQty = qty;
            state.totalAmount = total;
        },
    },

    extraReducers: (builder) => {
        builder

            // Fetch cart
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.cartItems = action.payload || [];
            })

            // Remove item
            .addCase(removeCartItem.fulfilled, (state, action) => {
                state.cartItems = state.cartItems.filter(
                    (item) => item.id !== action.payload
                );
            })

            // Clear cart
            .addCase(clearCartBackend.fulfilled, (state) => {
                state.cartItems = [];
            });
    },
});

export const { calculateTotals, increaseQty, decreaseQty } = cartSlice.actions;

export default cartSlice.reducer;

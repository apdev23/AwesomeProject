import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import request from "../../api/ApiRequest";
import { url } from "../../api/Url";
import Toast from "react-native-toast-message";

export interface ProductItem {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

interface ProductState {
    items: ProductItem[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    items: [],
    loading: false,
    error: null,
};


export const fetchProducts = createAsyncThunk<ProductItem[]>(
    'product/fetchProducts',
    async () => {
        const response = await request({
            method: 'get',
            url: url.productUrl
        });
        return response.data;
    }
);


const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<ProductItem[]>) => {
            state.loading = false;
            state.items = action.payload;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to fetch products.";
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: action.error.message || "Failed to fetch products."
            });
        });
    },
});

export default productSlice.reducer;
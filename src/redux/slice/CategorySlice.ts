import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import request from "../../api/ApiRequest";
import { url } from "../../api/Url";

export interface CategoryState {
    categories: string[];
    loading: boolean;
    error: string | null;
}

const initialState: CategoryState = {
    categories: [],
    loading: false,
    error: null,
};

export const fetchCategories = createAsyncThunk<string[]>(
    'category/fetchCategories',
    async () => {
        const response = await request({
            method: 'get',
            url: url.categories
        });
        return response.data;
    }
);

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchCategories.fulfilled, (state, action: PayloadAction<string[]>) => {
            state.loading = false;
            state.categories = action.payload;
        });
        builder.addCase(fetchCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to fetch categories.";
        });
    },
});

export default categorySlice.reducer;

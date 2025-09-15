import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductItem } from "./ProductSlice";

interface WishlistState {
  items: ProductItem[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<ProductItem>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index >= 0) {
        state.items.splice(index, 1); // Remove if exists
      } else {
        state.items.push(action.payload); // Add if not exists
      }
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

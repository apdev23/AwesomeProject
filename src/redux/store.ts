import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import authReducer from './slice/Auth';
import ProductSlice from './slice/ProductSlice';
import CategorySlice from './slice/CategorySlice';
import cartReducer from "./slice/CartSlice";
import wishlistReducer from "./slice/WishlistSlice";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    wishlist: wishlistReducer,
    whitelist: ['auth', 'product', 'cart','wishlist' ],
};

const rootReducer = combineReducers({
    auth: authReducer,
    product: ProductSlice,
    category: CategorySlice,
    cart: cartReducer,
    wishlist: wishlistReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import request from '../../api/ApiRequest';
import { url } from '../../api/Url';
import Toast from 'react-native-toast-message';

const initialState = {
    user: null,
    isLoggedIn: false,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
        },
        resetAuthState: (state) => {
            state.loading = false;
            state.error = null;
        },
    },
});

export const { loginRequest, logout, loginSuccess, loginFailure, resetAuthState } = authSlice.actions;

export const fetchLogin = (loginData: { username: string; password: string }) => async (dispatch: AppDispatch) => {
    console.log("Starting login request...");
    dispatch(loginRequest());
    try {

        const response = await request({
            method: "POST",
            url: url.loginUrl,
            data: {
                username: loginData.username,
                password: loginData.password
            }
        });
        console.log("Login successful:", response);
        dispatch(loginSuccess(response.data));
    } catch (error: any) {
        console.log("Login failed:", error.data);
        console.log("Error response:", error.response);
        Toast.show({
            type: 'error',
            text1: 'Login Failed',
            text2: error.data || error.message,
        });
        dispatch(loginFailure(error.data || error.message));
    }
};


export default authSlice.reducer;

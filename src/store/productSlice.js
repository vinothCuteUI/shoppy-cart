import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../services/api";

export const fetchProduct = createAsyncThunk("api/productlist", async () => {
    const response = await API.get("/api/product");
    return response.data
})

const productSlice = createSlice({
    name:"product",
    initialState: {
        list:[],
        loading: false,
        error: null
    },
    extraReducers:(builder) => {
        builder.addCase(fetchProduct.pending, (state, action) =>{
            state.list = [];
            state.loading = true;
            state.error = null
        })
        .addCase(fetchProduct.fulfilled, (state, action) =>{
            state.list = action.payload;
            state.loading = false;
            state.error = null
        })
        .addCase(fetchProduct.rejected, (state, action) =>{
            state.list = [];
            state.loading = false;
            state.error = action.payload
        })
    }
})

export default productSlice.reducer
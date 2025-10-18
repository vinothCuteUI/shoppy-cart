import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../services/api";

export const checkout = createAsyncThunk("api/checkout", async (_, {rejectWithValue}) =>{
    try{
        const response = await API.post("api/order/checkout")
        return response.data;
    }
    catch(error){
        return rejectWithValue(error)
    }
})

export const fetchMyOrder = createAsyncThunk("api/fetchmyorder", async (_, {rejectWithValue}) =>{
    try{
        const response = await API.get("api/order/myOrders")
        return response.data;
    }
    catch(error){
        return rejectWithValue(error)
    }
})

export const fetchPlacedOrder = createAsyncThunk("api/fetchPlacedOrder", async (_, {rejectWithValue}) =>{
    try{
        const response = await API.get("api/order/placedOrders")
        return response.data;
    }
    catch(error){
        return rejectWithValue(error)
    }
})

const orderSlice = createSlice({
    name:"order",
    initialState:{
        orderItems:null,
        placedOrder:null,
        checkoutItems:null,
        loading: false,
        error: null
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchMyOrder.pending, (state, action) =>{
            state.loading = true;
            state.error = null
        })
        .addCase(fetchMyOrder.fulfilled, (state, action) => {
            state.orderItems = action.payload.orderItems
            state.loading = false;
            state.error = null
        })
        .addCase(fetchMyOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        })
        .addCase(fetchPlacedOrder.pending, (state, action) =>{
            state.loading = true;
            state.error = null
        })
        .addCase(fetchPlacedOrder.fulfilled, (state, action) => {
            state.placedOrder = action.payload
            state.loading = false;
            state.error = null
        })
        .addCase(fetchPlacedOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        })
        .addCase(checkout.pending, (state, action) =>{
            state.loading = true;
            state.error = null
        })
        .addCase(checkout.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null
            state.checkoutItems = action.payload.order
        })
        .addCase(checkout.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        })
    }
})

export default orderSlice.reducer
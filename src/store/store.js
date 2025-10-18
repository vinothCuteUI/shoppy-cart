import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice"
import cartReducer from "./cartSlice"
import userReducer from "./userSlice"
import orderReducer from "./orderSlice"

const store = configureStore({
    reducer:{
        product: productReducer,
        cart: cartReducer,
        auth: userReducer,
        orders: orderReducer,
    }
})

export default store
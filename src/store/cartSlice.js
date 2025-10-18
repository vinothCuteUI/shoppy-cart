import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../services/api";
import { cleatLocalStorageCart, loadLocalStorageCart, updateLocalStorageCart } from "../utils/cartStorage";

export const fetchCart = createAsyncThunk("api/fetchcart",  async (_, {getState, rejectWithValue}) => {
    try{
        let {auth} = getState();
        if(!auth.user){
            return loadLocalStorageCart()
        }
        let getLocalCart = loadLocalStorageCart();
        const response = await API.get("/api/cart");
        let {cartItems} = response.data;
        if(getLocalCart && getLocalCart.length){
            let mergCart = [...cartItems]
            getLocalCart.forEach(items => {
                let existItem = mergCart.find((m) => m.product._id === items.product._id)
                if(existItem){
                    existItem.quantity += items.quantity
                }else{
                    mergCart.push(items)
                }
            });
            const syncCart = await API.post("/api/cart/sync", {items: mergCart});
            cleatLocalStorageCart()
            return syncCart.data.cartItems;

        }
        cleatLocalStorageCart()
        return cartItems

    }catch(error){
        return rejectWithValue(error)
    }
    
})

export const addToCart = createAsyncThunk( "api/addToCart", async ({product, quantity}, {getState, rejectWithValue}) => {
    try{

        const {auth} = getState()
        if(!auth.user){
            const cart = loadLocalStorageCart();
            const existIndx = cart.findIndex(item => item.product._id === product._id)
            if(existIndx !== -1){
                cart[existIndx].quantity += quantity;
            }else{
                cart.push({product, quantity})
            }
            updateLocalStorageCart(cart)
            return cart
        }
        else{
            const response = await API.post("/api/cart", {productId: product._id, quantity})
            return response.data.cartItems
        }

    }catch(error){
        return rejectWithValue(error)
    }

    
})


export const updateQuantity = createAsyncThunk("api/updateQuantity", async ({productId, quantity}, {getState, rejectWithValue}) => {
    try{
        const {auth} = getState()
        if(!auth.user){
            
            const cart = loadLocalStorageCart()
            const findCartInx = cart.findIndex(item => item.product._id === productId)
            if(findCartInx !== -1){
                cart[findCartInx].quantity = quantity
            }
            updateLocalStorageCart(cart)
            return {item: cart[findCartInx]}
        }
        else{
            const params = new URLSearchParams({
                productId,
                quantity
            });
            const response = await API.put("/api/cart?"+params.toString())

            return response.data
        }

    }catch(error){
        return rejectWithValue(error)
    }

})

export const removeCart = createAsyncThunk("api/removeCart", async (productId, {getState}) => {
    const {auth} = getState()
    if(!auth.user){
        
        const cart = loadLocalStorageCart()
        const filterCart = cart.filter(item => item.product._id !== productId)
        updateLocalStorageCart(filterCart)
        
        return {cartItems: filterCart, message:"Cart items remove successfully"}
    }
    else{
        const response = await API.delete("/api/cart/"+productId)
        return response.data
    }

})

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        cartItems: [],
        loading: false,
        itemLoad: false,
        error: null
    },
    reducers:{
        clearCart: (state) => {
            state.cartItems = []
            localStorage.removeItem("cart")
        },
        setCartFromServer: (state, action)=>{
            state.cartItems = action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchCart.pending ,(state, action)=>{
            state.loading = true;
            state.error = null
        })
        .addCase(fetchCart.fulfilled ,(state, action)=>{
            state.loading = false;
            state.error = null;
            state.cartItems = action.payload
        })
        .addCase(fetchCart.rejected ,(state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(addToCart.pending ,(state, action)=>{
            state.itemLoad = true;
            state.error = null
        })
        .addCase(addToCart.fulfilled ,(state, action)=>{
            state.itemLoad = false;
            state.error = null;
            state.cartItems = action.payload
        })
        .addCase(addToCart.rejected ,(state, action)=>{
            state.itemLoad = false;
            state.error = action.payload;
        })
        .addCase(updateQuantity.pending ,(state, action)=>{
            state.itemLoad = true;
            state.error = null
        })
        .addCase(updateQuantity.fulfilled ,(state, action)=>{
            state.itemLoad = false;
            state.error = null;
            let {item} = action.payload;
            let updateItem = [...state.cartItems]
            let existItem = state.cartItems.findIndex(u => u.product._id === item.product._id)
            if(existItem !== -1){
                updateItem[existItem].quantity = item.quantity
            }
            state.cartItems = [...updateItem]
        })
        .addCase(updateQuantity.rejected ,(state, action)=>{
            state.itemLoad = false;
            state.error = action.payload;
        })
        .addCase(removeCart.pending ,(state, action)=>{
            state.itemLoad = true;
            state.error = null
        })
        .addCase(removeCart.fulfilled ,(state, action)=>{
            state.itemLoad = false;
            state.error = null;
            state.cartItems = action.payload.cartItems
        })
        .addCase(removeCart.rejected ,(state, action)=>{
            state.itemLoad = false;
            state.error = action.payload;
        })
    }

})

export const {clearCart} = cartSlice.actions;
export default cartSlice.reducer
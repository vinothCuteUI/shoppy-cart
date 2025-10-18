import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../services/api";


export const loginUser = createAsyncThunk("api/loginUser", async (loginUserDetails, { rejectWithValue }) => {
    try{
        const response = await API.post("/api/auth/login", loginUserDetails)
        return response.data
    }catch(error){
        return rejectWithValue(error.response.data);
    }
})
export const logOutUser = createAsyncThunk("api/logOutUser", async (_, { rejectWithValue }) => {
    try{
        const user = JSON.parse(localStorage.getItem("user"))
        const response = await API.post("/api/auth/logout/"+user.id)
        return response.data
    }catch(error){
        return rejectWithValue(error.response.data);
    }
})

export const fetchRefreshToken = createAsyncThunk("api/fetchRefreshToken", async (_, { rejectWithValue }) => {
    try{
        const user = JSON.parse(localStorage.getItem("user"))
        const response = await API.post("/api/auth/refreshtoken", {refreshtoken: user.refreshToken})
        return response.data
    }catch(error){
        return rejectWithValue(error.response.data);
    }
})

export const fetchCurrentuser = createAsyncThunk("api/fetchCurrentuser", async (_, { rejectWithValue }) => {
    try{
        const response = await API.get("/api/auth/currentuser")
        return response.data
    }catch(error){
        return rejectWithValue(error.response.data);
    }
})


const userSlice = createSlice({
    name: "user",
    initialState: {
        user: JSON.parse(localStorage.getItem("user")) || null,
        loading: false,
        error: null
    },
    reducers:{
        updateUser:(state, action) =>{
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state, action) => {
            state.loading = true;
            state.error = null
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload
            localStorage.setItem("user", JSON.stringify(action.payload))
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(logOutUser.pending, (state, action) => {
            state.loading = true;
            state.error = null
        })
        .addCase(logOutUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = null;
            localStorage.removeItem("user")
        })
        .addCase(logOutUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(fetchRefreshToken.pending, (state, action) => {
            state.loading = true;
            state.error = null
        })
        .addCase(fetchRefreshToken.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload
            localStorage.setItem("user", JSON.stringify(action.payload))
        })
        .addCase(fetchRefreshToken.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(fetchCurrentuser.pending, (state, action) => {
            state.loading = true;
            state.error = null
        })
        .addCase(fetchCurrentuser.fulfilled, (state, action) => {
            state.loading = false;
        })
        .addCase(fetchCurrentuser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default userSlice.reducer
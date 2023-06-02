import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
import requestedItemService from "./requestedItemService"

const initialState = {
    r_items_all : [],
    r_items: [], // pending
    r_items_accepted: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    item_swaped: false,
    requestSuccess: false,
}


export const acceptRequest = createAsyncThunk("requestedItem/acceptRequest", async(r_item_id, thunkAPI) => {
    try {
        return await requestedItemService.acceptRequest(r_item_id)
    } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
})

export const deniedRequest = createAsyncThunk("requestedItem/deniedRequest", async(r_item_id, thunkAPI) => {
    try {
        return await requestedItemService.deniedRequest(r_item_id)
    } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
})


export const viewAllPendingRequests = createAsyncThunk("requestedItem/viewAllPendingRequests", async(_, thunkAPI) => {
    try{
        console.log("In slice")
        return await requestedItemService.getAllPendingRequests()
    } catch(error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
})


export const viewAllRequests = createAsyncThunk("requestedItem/viewAllRequests", async(_, thunkAPI) => {
    try{
        console.log("In slice")
        return await requestedItemService.getAllRequests()
    } catch(error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
})

export const viewAllAcceptedItem = createAsyncThunk("requestedItem/viewAllAcceptedItem", async(_, thunkAPI) => {
    try{
        console.log("In slice")
        return await requestedItemService.getAllAcceptedRequests()
    } catch(error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
})

export const addRequestedItem = createAsyncThunk("requestedItem/addRequestedItem", async(r_item_user, thunkAPI) => {
    try {
        console.log("In slice",r_item_user)
        return await requestedItemService.addRequestedItem(r_item_user)
    } catch(error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
})

const requestedItemSlice = createSlice({
    name: "requestedItem",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.message = ""
            state.item_swaped = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addRequestedItem.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addRequestedItem.fulfilled, (state, action) => {
                state.isError = false
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
                state.requestSuccess = true
            })
            .addCase(addRequestedItem.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(viewAllPendingRequests.pending, (state) => {
                state.isLoading = true
            })
            .addCase(viewAllPendingRequests.fulfilled, (state, action) => {
                state.isError = false
                state.isLoading = false
                state.isSuccess = true
                state.r_items = action.payload
            })
            .addCase(viewAllPendingRequests.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(acceptRequest.fulfilled, (state, action) => {
                state.isError = false
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
                state.item_swaped = true
            })
            .addCase(acceptRequest.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(viewAllAcceptedItem.pending, (state) => {
                state.isLoading = true
            })
            .addCase(viewAllAcceptedItem.fulfilled, (state, action) => {
                state.isError = false
                state.isLoading = false
                state.isSuccess = true
                state.r_items_accepted = action.payload
            })
            .addCase(viewAllAcceptedItem.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(deniedRequest.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deniedRequest.fulfilled, (state, action) => {
                state.isError = false
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
                state.item_swaped = true
            })
            .addCase(deniedRequest.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(viewAllRequests.pending, (state) => {
                state.isLoading = true
            })
            .addCase(viewAllRequests.fulfilled, (state, action) => {
                state.isError = false
                state.isLoading = false
                state.isSuccess = true
                state.r_items_all = action.payload
                
            })
            .addCase(viewAllRequests.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.message = action.payload
            })
    }
})

export const  { reset } = requestedItemSlice.actions

export default requestedItemSlice.reducer
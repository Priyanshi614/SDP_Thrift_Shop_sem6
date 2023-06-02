import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
import itemService  from "./itemService";

const initialState = {
    items: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    itemAdded: false,   // means change in number of items 
    userItems: []
};

export const getAllItems = createAsyncThunk("item/getAllItems", async (_, thunkAPI) => {
    try{
        return await itemService.getAllItems() 
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

export const getAllUserItems = createAsyncThunk("item/getAllUserItems", async (_, thunkAPI) => {
    try {
        return await itemService.getAllUserItems()
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

export const addItem = createAsyncThunk("item/addItem", async (item, thunkAPI) => {
    try{
        console.log("In addItem itemSlice")
        console.log(item.selectedFile)
        // create a new formdata for the 
        const formdata = new FormData()
        formdata.append("imagefile", item.selectedFile)

        for (var key of formdata.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }

        const fileId = await itemService.addImage(formdata)
        console.log(fileId)
        item.selectedFile = fileId.id
        console.log("Item", item)
        return await itemService.addItem(item) 
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

export const deleteItem = createAsyncThunk("item/deleteItem", async (item, thunkAPI) => {
    try {
        return await itemService.deleteItem(item)
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

const itemSlice = createSlice({
    name: "item",
    initialState ,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
            state.itemAdded = false;
        },
    },
    extraReducers: (builder) => {
        builder 
        .addCase(getAllItems.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getAllItems.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.items = action.payload

        })
        .addCase(getAllItems.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(addItem.pending, (state) => {
            state.isLoading = true
        })
        .addCase(addItem.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = action.payload
            state.itemAdded = true

        })
        .addCase(addItem.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getAllUserItems.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getAllUserItems.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.userItems = action.payload

        })
        .addCase(getAllUserItems.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(deleteItem.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteItem.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.itemAdded = true // means change in number of items
            state.message = action.payload
        })
        .addCase(deleteItem.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
     
    }
})


export const { reset } = itemSlice.actions;
export default itemSlice.reducer;
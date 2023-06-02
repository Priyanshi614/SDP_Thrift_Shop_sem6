import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import itemReducer from '../features/Items/itemSlice' 
import requestedItemReducer from '../features/requestedItem/requestedItemSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    item: itemReducer,
    requestedItem : requestedItemReducer
  },
});

import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "@/redux/features/shopSlice"
import productReducer from '@/redux/features/productSlice'
import carttReducer from '@/redux/features/cartSlice'

export const store = configureStore({
  reducer: {
    shopReducer,
    productReducer,
    carttReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
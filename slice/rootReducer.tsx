import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RootState {
  loading: boolean;
  cartItems: CartItem[];
}

interface CartItem {
  _id: string;
  quantity: number;
}

const initialState: RootState = {
  loading: false,
  cartItems: [],
};

const rootReducerSlice = createSlice({
  name: "rootReducer",
  initialState,
  reducers: {
    showLoading: (state: { loading: boolean }) => {
      state.loading = true;
    },
    hideLoading: (state: { loading: boolean }) => {
      state.loading = false;
    },
    addToCart: (
      state: { cartItems: any[] },
      action: PayloadAction<CartItem>
    ) => {
      state.cartItems.push(action.payload);
    },
    updateCart: (
      state: { cartItems: any[] },
      action: PayloadAction<CartItem>
    ) => {
      const { _id, quantity } = action.payload;
      state.cartItems = state.cartItems.map((item) =>
        item._id === _id ? { ...item, quantity } : item
      );
    },
    deleteFromCart: (
      state: { cartItems: any[] },
      action: PayloadAction<{ _id: string }>
    ) => {
      const { _id } = action.payload;
      state.cartItems = state.cartItems.filter((item) => item._id !== _id);
    },
  },
});

export const {
  showLoading,
  hideLoading,
  addToCart,
  updateCart,
  deleteFromCart,
} = rootReducerSlice.actions;

export default rootReducerSlice.reducer;

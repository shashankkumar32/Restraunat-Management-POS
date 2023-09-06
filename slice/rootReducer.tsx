
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RootState {
  loading: boolean;
  cartItems: CartItem[];
  totalAmount: number; // Initialize totalAmount as a number, not null
}

interface CartItem {
  _id: string;
  quantity: number;
  price: number;
}

const initialState: RootState = {
  loading: false,
  cartItems: [],
  totalAmount: 0, // Initialize totalAmount to 0
};

const rootReducerSlice = createSlice({
  name: "rootReducer",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.loading = true;
    },
    hideLoading: (state) => {
      state.loading = false;
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find((item) => item._id === newItem._id);

      if (existingItem) {
        // Update quantity of an existing item
        existingItem.quantity += newItem.quantity;
        state.totalAmount += newItem.quantity * newItem.price; // Update totalAmount
      } else {
        // Add a new item to the cart
        state.cartItems.push(newItem);
        state.totalAmount += newItem.quantity * newItem.price; // Update totalAmount
      }
    },
    // addToCart: (state, action: PayloadAction<CartItem>) => {
    //   state.cartItems.push(action.payload);
    //   state.totalAmount += action.payload.quantity * action.payload.price; // Update totalAmount
    //   console.log(action.payload.price )
    // }
    
    updateCart: (state, action: PayloadAction<CartItem>) => {
      const { _id, quantity } = action.payload;
      const cartItemIndex = state.cartItems.findIndex((item) => item._id === _id);

      if (cartItemIndex !== -1) {
        const diff = quantity - state.cartItems[cartItemIndex].quantity;
        state.cartItems[cartItemIndex].quantity = quantity;
        state.totalAmount += diff * state.cartItems[cartItemIndex].price; // Update totalAmount
        console.log(state.totalAmount)
      }
    },
    deleteFromCart: (state, action: PayloadAction<{ _id: string }>) => {
      const { _id } = action.payload;
      const cartItemToDelete = state.cartItems.find((item) => item._id === _id);

      if (cartItemToDelete) {
        state.totalAmount -= cartItemToDelete.quantity * cartItemToDelete.price; // Update totalAmount
        state.cartItems = state.cartItems.filter((item) => item._id !== _id);
      }
    },
    resetCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
    },
  },
});

export const { showLoading, hideLoading, addToCart, updateCart, deleteFromCart ,resetCart} = rootReducerSlice.actions;

export default rootReducerSlice.reducer;


// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface RootState {
//   loading: boolean;
//   cartItems: CartItem[];
//   totalAmount:number;
// }

// interface CartItem {
//   _id: string;
//   quantity: number;
//   price:number;
// }

// const initialState: RootState = {
//   loading: false,
//   cartItems: [],
//   totalAmount: 0,
// };

// const rootReducerSlice = createSlice({
//   name: "rootReducer",
//   initialState,
//   reducers: {
//     showLoading: (state: { loading: boolean }) => {
//       state.loading = true;
//     },
//     hideLoading: (state: { loading: boolean }) => {
//       state.loading = false;
//     },
//     addToCart: (
//       state: {
//         totalAmount: any; cartItems: any[] 
// },
//       action: PayloadAction<CartItem>
//     ) => {
//       state.cartItems.push(action.payload);
   
//     },
//     updateCart: (state, action: PayloadAction<CartItem>) => {
//       const { _id, quantity } = action.payload;
//       const cartItemIndex = state.cartItems.findIndex((item) => item._id === _id);

//       if (cartItemIndex !== -1) {
//         state.cartItems[cartItemIndex].quantity = quantity;
//         state.cartItems = [...state.cartItems]; // Create a new array to trigger re-render
      
//         // Recalculate totalAmount
//         state.totalAmount = state.cartItems.reduce(
//           (total, item) => total + item.quantity * item.price,
//           0
//         );
      
//       }

//     },
//     deleteFromCart: (
//       state: {
//         totalAmount: any; cartItems: any[] 
// },
//       action: PayloadAction<{ _id: string }>
//     ) => {
//       const { _id } = action.payload;
//       state.cartItems = state.cartItems.filter((item) => item._id !== _id);
//         // Recalculate totalAmount
//         state.totalAmount = state.cartItems.reduce(
//           (total, item) => total + item.quantity * item.price,
//           0
//         );
//     },
//   },
// });

// export const {
//   showLoading,
//   hideLoading,
//   addToCart,
//   updateCart,
//   deleteFromCart,
// } = rootReducerSlice.actions;

// export default rootReducerSlice.reducer;
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
      state.cartItems.push(action.payload);
      state.totalAmount += action.payload.quantity * action.payload.price; // Update totalAmount
      console.log(action.payload.price )
    },
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
  },
});

export const { showLoading, hideLoading, addToCart, updateCart, deleteFromCart } = rootReducerSlice.actions;

export default rootReducerSlice.reducer;


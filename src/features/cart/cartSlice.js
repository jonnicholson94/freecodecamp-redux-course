
import axios from 'axios'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = 'https://course-api.com/react-useReducer-cart-project'

const initialState = {
    cartItems: [],
    amount: 4,
    total: 0,
    isLoading: true
}

export const getCartItems = createAsyncThunk('cart/getCartItems', async () => {
    try {
        let response = await axios(url)
        console.log(response);
        return response.data
    } catch (err) {
        console.log(err);
    }
})

export const cartSlice = createSlice({
    name: 'cart',
    initialState, 
    reducers: {
        clearCart: (state) => {
            state.cartItems = []
        },
        removeItem: (state, action) => {
            const itemId = action.payload
            state.cartItems = state.cartItems.filter((item) => item.id !== itemId)
        }, 
        increaseItem: (state, { payload }) => {
            const cartItem = state.cartItems.find((item) => item.id === payload )
            cartItem.amount = cartItem.amount + 1
        },
        decreaseItem: (state, { payload }) => {
            const cartItem = state.cartItems.find((item) => item.id === payload)
            cartItem.amount = cartItem.amount - 1
        },
        calculateTotal: (state) => {
            let amount = 0 
            let total = 0 

            state.cartItems.forEach((item) => {
                amount += item.amount 
                total += item.amount * item.price
            })

            state.amount = amount 
            state.total = total
        }
    },
    extraReducers: {
        [getCartItems.pending]: (state) => {
            state.isLoading = true
        },
        [getCartItems.fulfilled]: (state, action) => {
            state.cartItems = action.payload 
            state.isLoading = false
        },
        [getCartItems.rejected]: (state) => {
            state.isLoading = false
        }
    }
})

export const { clearCart, removeItem, increaseItem, decreaseItem, calculateTotal } = cartSlice.actions
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: [],
    totalQuantity: 0,
    totalAmount: 0
}

export const cartSlice = ({
    name: 'cart',
    initialState: initialState,

    reducers: {
        addItem(state, action) {
            const newItem = action.payload
            const existingItem = state.cartItems.find(item => item.id === newItem.id)
            state.totalQuantity++
            if (!existingItem) {

            } else {

            }
        }


    }
})
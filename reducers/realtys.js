import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    value: [],
}

export const realtysSlice = createSlice({
    name: 'realtys',
    initialState,
    reducers: {
        addRealtyToStore: (state, action) => {
            state.value.push(action.payload);
        },
        deleteRealty: (state, action) => {
            state.value = state.value.filter(realty => realty._id !== action.payload);
        },
    }
})

export const { addRealtyToStore, deleteRealty } = realtysSlice.actions;
export default realtysSlice.reducer
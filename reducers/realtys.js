import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    value: [],
}

export const realtysSlice = createSlice({
    name: 'realtys',
    initialState,
    reducers: {
        addRealtyToStore: (state, action) => {
            state.value.unshift(action.payload)
        },
        gitRealtys : (state, action) => {
            state.value = action.payload
        },
        deleteRealty: (state, action) => {
            state.value = state.value.filter(realty => realty._id !== action.payload);
        },
    }
})

export const { addRealtyToStore, deleteRealty , gitRealtys} = realtysSlice.actions;
export default realtysSlice.reducer
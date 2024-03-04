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
        }
    }
})

export const { addRealtyToStore } = realtysSlice.actions;
export default realtysSlice.reducer
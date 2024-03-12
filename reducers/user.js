import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    email: null,
    username: null,
    delay: null,
    financed: null,
    budget: null,
    description: null,
    token: null,
    isConnect: false,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.email = action.payload.email;
      state.value.isConnect = true
    },
    logout: (state) => {
      state.value.token = null;
      state.value.email = null;
      state.value.isConnect = false
    },
    UpdateProfil: (state, action) => {
      state.value.username = action.payload.username;
      state.value.delay = action.payload.delay;
      state.value.budget = action.payload.budget;
      state.value.financed = action.payload.financed;
      state.value.description = action.payload.description;
    }
  },
});


export const { login, logout, UpdateProfil } = userSlice.actions;
export default userSlice.reducer;

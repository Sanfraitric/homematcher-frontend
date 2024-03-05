import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { token: null, mail: null, isConnect : false },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.mail = action.payload.mail;
      state.value.isConnect = true
    },
    logout: (state) => {
      state.value.token = null;
      state.value.mail = null;
      state.value.isConnect = false
    },
  },
});


export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

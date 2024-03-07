import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    token: null,
    email: null,
    isConnect: false,
    firstname: null,
    lastname: null,
    age: null,
    prosituation: null,
    financialCapacity: null,
    desciption: null,
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
      state.value.firstname = action.payload.firstname;
      state.value.lastname = action.payload.lastname;
      state.value.age = action.payload.age;
      state.value.prosituation = action.payload.prosituation;
      state.value.financialCapacity = action.payload.financialCapacity;
      state.value.desciption = action.payload.desciption;
    }
  },
});


export const { login, logout, UpdateProfil } = userSlice.actions;
export default userSlice.reducer;

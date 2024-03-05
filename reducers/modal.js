import { createSlice } from '@reduxjs/toolkit';


const initialState = {
value: { signInModalVisible: false, signUpModalVisible: false, ForgotPasswordModal :false },
}

export const modalSlice = createSlice({
name: 'modal',
initialState,
reducers: {
showSignInModal: (state) => {
state.value.signInModalVisible = true;
},
showSignUpModal: (state) => {
state.value.signUpModalVisible = true;
},
hideSignUpModal: (state) => {
state.value.signUpModalVisible = false;
},
hideSignInModal: (state) => {
state.value.signInModalVisible = false;
},
handleForgotPassword :(state) =>{
    state.value.ForgotPasswordModal =true;
},
closeForgotPassword :(state) =>{
    state.value.ForgotPasswordModal =false;
},
}
})

export const { showSignInModal, showSignUpModal, hideSignUpModal, hideSignInModal, handleForgotPassword, closeForgotPassword } = modalSlice.actions;
export default modalSlice.reducer
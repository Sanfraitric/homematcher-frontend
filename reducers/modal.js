import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    value: { signInModalVisible: false, signUpModalVisible: false },
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
        }
    }
})

export const { showSignInModal, showSignUpModal, hideSignUpModal, hideSignInModal } = modalSlice.actions;
export default modalSlice.reducer
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
//Import Style et Logo
import styles from '../styles/Header.module.css';
import Image from 'next/image';
//FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faRightToBracket, faUser } from '@fortawesome/free-solid-svg-icons';
//Modales de connexion/inscription
import { Modal } from 'antd';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { showSignInModal, showSignUpModal, hideSignUpModal, hideSignInModal } from '../reducers/modal.js';
//Liens
//import Link from 'next/link';
//import { logout } from '../reducers/user'; 

function Header() {
const signInModal = useSelector(state => state.modal.value.signInModalVisible)
const SignUpModal = useSelector(state => state.modal.value.signUpModalVisible)
const dispatch = useDispatch();

const handleShowModalSignIn = () => {
dispatch(showSignInModal());
};

const handleShowModalSignUp = () => {
dispatch(showSignUpModal());

};

const handleCancelSignUp = () => {
dispatch(hideSignUpModal());

};

const handleCancelSignIn = () => {
dispatch(hideSignInModal());

};

return (
<div className={styles.header}>
<div className={styles.logoContainer}>
<Image src="/logo.png" alt="Logo" width={50} height={50} />
<h1 className={styles.h1}>Home Matcher</h1>
</div>
<div className={styles.buttonsContainer}>
<div className={styles.button} onClick={handleShowModalSignIn}>
<FontAwesomeIcon icon={faRightToBracket} className={styles.btn} />
<h2 className={styles.h2} >Se connecter</h2>
</div>
<div className={styles.button} onClick={handleShowModalSignUp}>
<FontAwesomeIcon icon={faPen} className={styles.btn}/>
<h2 className={styles.h2} >S'inscrire</h2>
</div>
<div>
{signInModal && <Modal onCancel={handleCancelSignIn} open={signInModal} footer={null} className={styles.modal}>
<SignIn />
</Modal>}
{SignUpModal && <Modal onCancel={handleCancelSignUp} open={SignUpModal} footer={null} className={styles.modal}>
<SignUp />
</Modal>}
</div>
</div>
</div>
);
};

export default Header;
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
  const user = useSelector((state) => state.user.value);
  const signInModal = useSelector(state => state.modal.value.signInModalVisible)
  const SignUpModal = useSelector(state => state.modal.value.signUpModalVisible)
  const dispatch = useDispatch();
  const router = useRouter();
  console.log(user)

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

  let userSection;
  if (!user.token) {
    userSection = (
      <div className={styles.buttonsContainer}>
        <div className={styles.button} onClick={handleShowModalSignIn}>
          <FontAwesomeIcon icon={faRightToBracket} className={styles.btn} />
          <h2 className={styles.h2} >Se connecter</h2>
        </div>
        <div className={styles.button} onClick={handleShowModalSignUp}>
          <FontAwesomeIcon icon={faPen} className={styles.btn} />
          <h2 className={styles.h2}  >S'inscrire</h2>
        </div>
      </div>
    );
  } else {
    userSection = (
<div className={styles.buttonsContainer}>
      <div className={styles.button} onClick={handleShowModalSignIn}>
        <FontAwesomeIcon icon={faUser} className={styles.btn} />
        <h2 className={styles.h2}  >Mon compte</h2>
      </div>
    </div>
    )
    
  }

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Image src="/logo.png" alt="Logo" width={50} height={50} />
        <h1 className={styles.h1}>Home Matcher</h1>
      </div>
      <div >
        {userSection}
      </div>
      <Modal onCancel={() => handleCancelSignUp()} open={signInModal} footer={null} >
        <SignUp />
      </Modal>
      <Modal onCancel={() => handleCancelSignIn()} open={SignUpModal} footer={null} >
        <SignIn />
      </Modal>

    </header>
  );
};

export default Header;
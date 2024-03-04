import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { useRouter } from 'next/router';

//Import Style et Logo
import styles from '../styles/Header.module.css';
import Image from 'next/image';
//FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
//Modales de connexion/inscription
import { Modal } from 'antd';
import SignUp from './SignUp';
import SignIn from './SignIn';

function Header() {
    const user = useSelector((state) => state.user); 
    const dispatch = useDispatch(); 
    const router = useRouter();
    
    const [signUpModalVisible, setSignUpModalVisible] = useState(false);
    const [signInModalVisible, setSignInModalVisible] = useState(false);
  
    const showSignUpModal = () => {
      setSignUpModalVisible(true);
    };
  
    const showSignInModal = () => {
      setSignInModalVisible(true);
    };
  
    const handleCancelSignUp = () => {
      setSignUpModalVisible(false);
    };
  
    const handleCancelSignIn = () => {
      setSignInModalVisible(false);
    };

    if (user.token) {
      router.push('/home');
    }

    return (
        <div className={styles.header}>
            <div className={styles.logoContainer}>
                <Image src="/logo.png" alt="Logo" width={50} height={50}  />
                <h1 className={styles.h1}>Home Matcher</h1>
            </div>
            <div className={styles.buttonsContainer}>
                <div className={styles.button} onClick={showSignInModal}>
                    <FontAwesomeIcon icon={faRightToBracket} className={styles.btn} /> 
                    <h2 className={styles.h2} >Se connecter</h2>
                </div>
                <div className={styles.button} onClick={showSignUpModal}>
                    <FontAwesomeIcon icon={faPen}  className={styles.btn}/> 
                    <h2 className={styles.h2}  >S'inscrire</h2>
                </div>
            <Modal onCancel={() => handleCancelSignUp()} open={signUpModalVisible} footer={null} >
            <SignUp />
            </Modal>
            <Modal onCancel={() => handleCancelSignIn()} open={signInModalVisible} footer={null} styles={styles.modal} >
            <SignIn />
            </Modal>
            </div>
        </div>
    );
};

export default Header;
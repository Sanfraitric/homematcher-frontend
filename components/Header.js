import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import Link from 'next/link';
import { logout } from '../reducers/user'; 


function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const user = useSelector(state => state.user.value)
    const signInModal = useSelector(state => state.modal.value.signInModalVisible)
    const SignUpModal = useSelector(state => state.modal.value.signUpModalVisible)
    const dispatch = useDispatch();

    const handleLogout = () => {
        let audio = new Audio('/click.wav');
        audio.play();
        dispatch(logout());
        };

    const handleShowModalSignIn = () => {
        dispatch(showSignInModal());
        let audio = new Audio('/click.wav');
        audio.play();
    };

    const handleShowModalSignUp = () => {
        let audio = new Audio('/click.wav');
        audio.play();
        dispatch(showSignUpModal());
    };

    const handleCancelSignUp = () => {
        dispatch(hideSignUpModal());
    };

    const handleCancelSignIn = () => {
        dispatch(hideSignInModal());
    };

const toggleMenu  = () => {
    let audio = new Audio('/click.wav');
    audio.play();
    setIsOpen(!isOpen);
    //console.log(user);
};

    let userSection;
    if (user.token) {
        userSection = (
            <div className={styles.buttonsContainer}>
                <div className={styles.button} onClick={toggleMenu}>
                    <FontAwesomeIcon icon={faUser} className={styles.btn} />
                    <h2 className={styles.h2} >Mon compte</h2>
                    {isOpen && (
                    <div className={styles.dropdownMenu}>
                        <Link className={styles.texte} href="/ProfilPage"><a>Mon compte</a></Link>
                        <Link className={styles.texte} href="/RealtysPage"><a>Mes biens</a></Link>
                        <a className={styles.text} onClick={() => handleLogout()}>Se déconnecter</a>
                    </div>
                )}
                </div>
            </div>
        );
    } else {
        userSection = (
            <div className={styles.buttonsContainer}>
                <div className={styles.button} onClick={handleShowModalSignIn}>
                    <FontAwesomeIcon icon={faRightToBracket} className={styles.icon} />
                    <h2 className={styles.h2} >Se connecter</h2>
                </div>
                <div className={styles.button} onClick={handleShowModalSignUp}>
                    <FontAwesomeIcon icon={faPen} className={styles.icon} />
                    <h2 className={styles.h2} >S'inscrire</h2>
                </div>
            </div>
        );

    }

    return (
        <div className={styles.header}>
            <div className={styles.logoContainer}>
                <Image src="/logo.png" alt="Logo" width={50} height={50} />
                <h1 className={styles.h1}>Home Matcher</h1>
            </div>
            {userSection}
            {signInModal && <Modal onCancel={handleCancelSignIn} open={signInModal} footer={null} className={styles.modal}>
                <SignIn />
            </Modal>}
            {SignUpModal && <Modal onCancel={handleCancelSignUp} open={SignUpModal} footer={null} className={styles.modal}>
                <SignUp />
            </Modal>}
        </div>
    );
};

export default Header;
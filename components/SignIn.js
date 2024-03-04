import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/user.js';
import Image from 'next/image';
import styles from '../styles/SignIn.module.css';
import Link from 'next/link';
import SignUp from './SignUp';
import { Modal } from 'antd';

function SignIn() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const [signInModalVisible, setSignInModalVisible] = useState(false); 
  const [signUpModalVisible, setSignUpModalVisible] = useState(false); 


  const handleCancelSignIn = () => {
      setSignInModalVisible(false);
  };

  const showSignUpModal = () => {
      setSignUpModalVisible(true);
      setSignInModalVisible(false); 
  };

  const handleCancelSignUp = () => {
      setSignUpModalVisible(false);
  };


  const router = useRouter();
  if (user.token) {
    router.push('/home');
  }

  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    fetch('*****************************************', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mail, password }),
    }).then(response => response.json())
      .then(data => {
        data.result && dispatch(login({ token: data.token, firstName: data.firstName, username: data.username }));
      });
  };


  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Se connecter</h2>
      <div className={styles.toConnect}>
        <h4>Vous ne possedez pas encore de compte ?</h4>
        <button onClick={showSignUpModal} className={styles.button}>Créer un compte</button>
      </div>
      <h4>Votre e-mail:</h4>
      <input type="text" className={styles.input} onChange={(e) => setUsername(e.target.value)} value={mail} />
      <h4>Votre mot de passe:</h4>
      <input type="password" className={styles.input} onChange={(e) => setPassword(e.target.value)} value={password} />
      <button className={styles.button} onClick={() => handleSubmit()}>Se connecter</button>
      <Modal onCancel={handleCancelSignUp} visible={signUpModalVisible} footer={null}>
                <SignUp />
            </Modal>
    </div>
  );
}

export default SignIn;


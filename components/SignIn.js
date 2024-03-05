import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/user.js';
import styles from '../styles/SignIn.module.css';
import GoogleLogin from 'react-google-login';
import SignUp from './SignUp';
import { Modal } from 'antd';


function SignIn() {
  const BACKEND_URL= process.env.BACKEND_URL
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.value);
  const [signInModalVisible, setSignInModalVisible] = useState(false);
  const [signUpModalVisible, setSignUpModalVisible] = useState(false);
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  const showSignUpModal = () => {
    setSignUpModalVisible(true);
    setSignInModalVisible(false);
  };

  const handleCancelSignUp = () => {
    setSignUpModalVisible(false);
  };



  const handleSubmit = () => {
    fetch(`${BACKEND_URL}/users/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({  email: signInEmail,password: signInPassword }),
    }).then(response => response.json())
      .then(data => {
        data.result && dispatch(login({ token: data.token, firstName: data.firstName, username: data.username }));
        setSignInEmail('');
        setSignInPassword('');
      });
  };

  const responseGoogle = (response) => {
    console.log(response);
  }

  return (
    <div className={styles.container}>

      <h2 className={styles.title}>Se connecter</h2>
      <div className={styles.toConnect}>
        <h4 className={styles.h4}>Vous n'etes pas encore inscrit ?</h4>
        <button onClick={showSignUpModal} className={styles.connectButton}>Créer un compte</button>
      </div>
      <h4 className={styles.h4}>Votre e-mail:</h4>
      <input type="text" className={styles.input} onChange={(e) => setSignInEmail(e.target.value)} value={signInEmail} />
      <h4 className={styles.h4}>Votre mot de passe:</h4>
      <div className={styles.connect}>
      <input type="password" className={styles.input} onChange={(e) => setSignInPassword(e.target.value)} value={signInPassword} />
      <button className={styles.button} onClick={() => handleSubmit()}>Se connecter</button>
      <h4 className={styles.h4}>ou</h4>
      <GoogleLogin
        clientId="313442107107-r67n8849np3ndu8sqllj4qblsbd0eh7c.apps.googleusercontent.com"
        buttonText="Sign In with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
      </div>
      <Modal onCancel={handleCancelSignUp} visible={signUpModalVisible} footer={null}>
        <SignUp />
      </Modal>
    </div>
  );
}

export default SignIn;


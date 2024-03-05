import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/user';
import styles from '../styles/SignUp.module.css';
import GoogleLogin from 'react-google-login';
import SignIn from './SignIn';
import { Modal } from 'antd';

function SignUp() {
  const BACKEND_URL= process.env.BACKEND_URL
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.value);
  const [signInModalVisible, setSignInModalVisible] = useState(false);
  const [signUpModalVisible, setSignUpModalVisible] = useState(false);
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  const showSignInModal = () => {
    setSignInModalVisible(true);
    setSignUpModalVisible(false);
  };

  const handleCancelSignIn = () => {
    setSignInModalVisible(false);
  };

  const handleSubmit = () => {
    fetch(`${BACKEND_URL}/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: signUpEmail,password: signUpPassword }),
    }).then(response => response.json())
      .then(data => {
        data.result && dispatch(login({ token: data.token, mail }));
        setSignUpEmail('');
        setSignUpPassword('');
      });
  };

  const responseGoogle = (response) => {
    console.log(response);
  }


  return (
    <div className={styles.container}>

        <h2 className={styles.title}>Créer un compte</h2>
        <div className={styles.toConnect}>
          <h4 className={styles.h4}>Vous avez déjà un compte ?</h4>
          <button className={styles.connectButton} onClick={showSignInModal}>Se connecter</button>
        </div>
        <h4 className={styles.h4}>Votre e-mail:</h4>
        <input type="text" className={styles.input} onChange={(e) => setSignUpEmail(e.target.value)} value={signUpEmail} />
        <h4 className={styles.h4}>Votre mot de passe:</h4>
        <input type="password" className={styles.input} onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword} />
      <div className={styles.connect}>
        <button className={styles.button} onClick={() => handleSubmit()}>Créer un compte</button>
        <h4 className={styles.h4}>ou</h4>
        <GoogleLogin
          clientId="313442107107-r67n8849np3ndu8sqllj4qblsbd0eh7c.apps.googleusercontent.com"
          buttonText="Sign Up with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </div>
      <Modal onCancel={handleCancelSignIn} visible={signInModalVisible} footer={null}>
        <SignIn />
      </Modal>
    </div>
  );
}


export default SignUp;

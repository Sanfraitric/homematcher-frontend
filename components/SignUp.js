import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/user';
import styles from '../styles/SignUp.module.css';
import GoogleLogin from 'react-google-login';

function SignUp() {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const router = useRouter();
  if (user.token) {
    router.push('/home');
  }

  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    fetch('***************************************', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mail }),
    }).then(response => response.json())
      .then(data => {
        data.result && dispatch(login({ token: data.token, mail }));
      });
  };

  const responseGoogle = (response) => {
    console.log(response);
  }


  return (
    <div className={styles.container}>
      <div className={styles.createaccount}>
        <h2 className={styles.title}>Créer un compte</h2>
        <div className={styles.toConnect}>
          <h4 className={styles.h4}>Vous avez déjà un compte ?</h4>
          <h5 className={styles.h5}>Se connecter</h5>
        </div>
      <h4 className={styles.h4}>Votre e-mail:</h4>
      <input type="text" className={styles.input} onChange={(e) => setMail(e.target.value)} value={mail} />
      <h4 className={styles.h4}>Votre mot de passe:</h4>
      <input type="password" className={styles.input} onChange={(e) => setPassword(e.target.value)} value={password}  />
      </div>
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
    </div>
  );
}


export default SignUp;

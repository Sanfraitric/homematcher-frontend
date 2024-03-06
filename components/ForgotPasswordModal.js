import React, { useState } from 'react';
import { useDispatch, } from 'react-redux';
import { showSignInModal, showSignUpModal,closeForgotPassword } from '../reducers/modal.js';
import styles from '../styles/ForgotPasswordModal.module.css';


const ForgotPasswordModal = () => {


const[email, setEmail] = useState(null)
const dispatch = useDispatch();



const handleSubmit = ()=>{
    fetch('http://localhost:3000/users/forgotpassword', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email })
})
 .then(response => response.json())
 .then(data => {
   console.log(data);
   
 });
}
const handleConnection =()=>{
    dispatch(showSignInModal());
    dispatch(closeForgotPassword())
}

  return (
      <div className={styles.container}>
      <h2 className={styles.h2}>Réinitialisation du mot de passe</h2>
      <h3 className={styles.h3}>Mot de passe oublié ? </h3>
      <p className={styles.p}>Saisissez votre e-mail relié à votre compte. S'il est reconnu, vous recevrez un e-mail vous permettant de mettre à jour votre mot de passe.</p>
      <h4 className={styles.h4}>Votre e-mail: </h4>
      <input className={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      <button className={styles.button} type="submit" onClick={handleSubmit}> Envoyer</button>
      <div className={styles.foundPassword}>
      <p className={styles.p}>J'ai retrouvé mon mot de passe : </p>
      <button className={styles.connectButton} onClick={()=>handleConnection()} type='button' >Se connecter</button>
      </div>
      </div>
      );
      };

export default ForgotPasswordModal;
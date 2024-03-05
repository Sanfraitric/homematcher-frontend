import React, { useState } from 'react';
import { useDispatch, } from 'react-redux';
import { showSignInModal, showSignUpModal,closeForgotPassword } from '../reducers/modal.js';



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
const seconnceterClick =()=>{
    dispatch(showSignInModal());
    dispatch(closeForgotPassword())
}

  return (
    <div>
      <h2>Réinitialisation du mot de passe</h2>
      <h3>Mot de passe oublié ?</h3>
      <p>Saisissez votre e-mail relié à votre compte. S'il est reconnu, vous recevrez un e-mail vous permettant de mettre à jour votre mot de passe.</p>
      <input
          type="email"
          placeholder="Votre adresse e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}> Envoyer</button>

      <p>J'ai retrouvé mon mot de passe :<button onClick={()=>seconnceterClick()} type='button' >Se connecter</button></p>
    </div>
  );
};

export default ForgotPasswordModal;
import React from 'react';
import { useDispatch } from 'react-redux';
import { showSignInModal } from '../reducers/modal.js';
import styles from '../styles/Home.module.css';
import Header from './Header';

function Home() {
  const dispatch = useDispatch();

  const handleAcheterClick = () => {
    dispatch(showSignInModal());
  };

  const handleVendreClick = () => {
    dispatch(showSignInModal());
  };

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <Header/>
      </div>

      <div className={styles.middleContent}>
        <h1 className={styles.title}>Quel est votre Projet ?</h1>
        <button className={styles.achat} onClick={handleAcheterClick}>Acheter</button>
        <button className={styles.vente} onClick={handleVendreClick}>Vendre</button>
      </div>

      <div className={styles.LleftContent}>
        <h3>Qui sommes nous ?</h3>
        <p>Lorem ipsum</p>
      </div>

      <div className={styles.LmidContent}>
        <img src="helmuthd.jpg" className={styles.carrousel}/>
        <p>Ils nous ont fait confiance</p>
      </div>

      <div className={styles.LrightContent}>
        <h3>Pourquoi choisir HomeMatcher ?</h3>
        <p>Lorem ipsum</p>
      </div>
    </div>
  );
}

export default Home;

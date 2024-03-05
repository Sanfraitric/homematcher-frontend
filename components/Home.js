import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { showSignInModal } from '../reducers/modal.js';
import styles from '../styles/Home.module.css';
import Header from './Header';
import ImageCarrousel from './Carrousel';


function Home() {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleAcheterClick = () => {
    if(!user.token) {
      dispatch(showSignInModal());
    }else {
      router.push('/ProfilPage');
    }
  };

  const handleVendreClick = () => {
    if(!user.token) {
      dispatch(showSignInModal());
    }else {
      router.push('/RealtysPage');
    }
  };
  const images = [
    "appart1.jpg",
    "appart2.jpg",
    "appart3.jpg"
  ]

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <Header/>
      </div>

      <div className={styles.middleContent}>
        <h1 className={styles.title}>Quel est votre Projet ?</h1>
        <button className={styles.achat} onClick={handleAcheterClick}>Acheter</button><br></br>
        <button className={styles.vente} onClick={handleVendreClick}>Vendre</button>
      </div>

      <div className={styles.LleftContent}>
        <h3>Qui sommes nous ?</h3>
        <p>Bienvenue chez HomeMatcher, l'équipe derrière votre partenaire de confiance dans la recherche de votre prochain chez-vous. Nous sommes un collectif passionné d'experts en technologie, en immobilier et en design d'expérience utilisateur, unis par la vision commune de simplifier la quête souvent complexe et stressante du logement parfait.

Fondée en [année de fondation], notre mission chez HomeMatcher est de transformer la façon dont les individus et les familles trouvent leur maison idéale. Nous croyons que la recherche d'un nouveau foyer devrait être une expérience excitante, transparente et personnalisée. Pour réaliser cette vision, nous avons développé une plateforme innovante qui combine intelligence artificielle, données immobilières précises et interfaces intuitives pour offrir à chacun une expérience de recherche sur mesure.</p>
      </div>

      <div className={styles.LmidContent}>
        <ImageCarrousel images={images}/>
        <p>Ils nous ont fait confiance</p>
      </div>

      <div className={styles.LrightContent}>
        <h3>Pourquoi choisir HomeMatcher ?</h3>
        <p>Dans le monde en constante évolution de l'immobilier, il est essentiel 
          de choisir un partenaire qui non seulement comprend
           vos besoins mais s'engage également à les servir sans vous imposer 
           de charges supplémentaires inutiles. Voici pourquoi HomeMatcher est votre choix idéal pour trouver le logement de vos rêves, sans les tracas habituels des frais de dossier :
           <br/>

1. Économies significatives : L'un des avantages immédiats de choisir HomeMatcher réside dans notre engagement à ne pas prélever de frais de dossier pour vos achats de biens. Dans un secteur où ces frais peuvent rapidement s'accumuler, choisir HomeMatcher signifie réaliser des économies substantielles, vous permettant d'investir davantage dans votre futur chez-vous.
<br/>
2. Transparence totale : Nous croyons en une approche transparente de l'immobilier. Chez HomeMatcher, il n'y a pas de coûts cachés ni de surprises de dernière minute. Notre politique de non-prélèvement de frais de dossier témoigne de notre engagement envers une transparence totale et une confiance mutuelle avec nos utilisateurs.</p>
      </div>
    </div>
  );
}

export default Home;

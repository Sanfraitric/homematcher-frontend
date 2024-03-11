import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; 
import { useRouter } from 'next/router';
//Import Style et Logo
import styles from '../styles/HeaderConnected.module.css';
import Image from 'next/image';
//FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBell, faComments, faUser } from '@fortawesome/free-solid-svg-icons';
//Liens
import Link from 'next/link';
import { logout } from '../reducers/user';
import click from "../public/click.wav";

function Header() {

    //Modifier nom de la page en fonction de la page actuelle
    const router = useRouter();
    const pageTitles = {
      MyCriteriasPage: 'Mes critères',
      ProfilPage: 'Mon profil',
      TimeToMatch: 'Time to Match ! - Vendeur',
      AddRealtyPage: 'Ajouter un bien',
      MatchPage: 'Mes matchs',
      NotificationsPage: 'Mes notifications',
      RealtysPage: 'Mes biens',
    };
  
    const lastRouteSegment = router.pathname.split('/').pop();
    const pageTitle = pageTitles[lastRouteSegment] || '';
  
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    //Fonction de déconnexion
    const handleLogout = () => {
        let audio = new Audio(click);
        audio.play();
        dispatch(logout());
        router.push('/')
      };
      
    //Fonction pour retourner à la page d'accueil
      const returnHome = () => {
        let audio = new Audio(click);
        audio.play();
        router.push('/')
      }

    return (
        <div className={styles.header}>
            <div className={styles.logoContainer}>
                <Image src="/logo.png" alt="Logo" width={50} height={50} onClick={returnHome} />
                <h1 className={styles.h1}>Home Matcher</h1>
            </div>
            <div>
                <h3 className={styles.h3}>{pageTitle}</h3>
            </div>
            <div className={styles.buttonsContainer}>
    <Link href="/MyCriteriasPage">
        <div className={styles.button}>
                <FontAwesomeIcon icon={faHeart} className={styles.icon} /> 
                <h2 className={styles.h2} >Matchs</h2>
        </div>
    </Link>
    <Link href="/NotificationsPage">
        <div className={styles.button}>
                <FontAwesomeIcon icon={faBell} className={styles.icon} /> 
                <h2 className={styles.h2} >Notifications</h2>
        </div>
    </Link>
    <Link href="/MatchPage">
        <div className={styles.button}>
                <FontAwesomeIcon icon={faComments}  className={styles.icon}/> 
                <h2 className={styles.h2}>Messagerie</h2>
        </div>
    </Link>
        <div className={styles.button} onClick={() => setIsOpen(!isOpen)}>
                <FontAwesomeIcon icon={faUser}  className={styles.icon}/> 
                <h2 className={styles.h2}>Profil</h2>
                {isOpen && (
                    <div className={styles.dropdownMenu}>
                        <Link className={styles.texte} href="/ProfilPage"><a>Mon compte</a></Link>
                        <Link className={styles.texte} href="/RealtysPage"><a>Mes biens</a></Link>
                        <a className={styles.text} onClick={() => handleLogout()}>Se déconnecter</a>
                    </div>
                )}
        </div>
</div>
</div>
    );
};

export default Header;
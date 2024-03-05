import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
//Import Style et Logo
import styles from '../styles/HeaderConnected.module.css';
import Image from 'next/image';
//FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faThumbsUp, faComments, faUser } from '@fortawesome/free-solid-svg-icons';
//Liens
import Link from 'next/link';
import { logout } from '../reducers/user';


function Header() {
const router = useRouter();
const pageTitle = router.route.split('/').pop();
const [isOpen, setIsOpen] = useState(false);
const dispatch = useDispatch();

const handleLogout = () => {
dispatch(logout());
router.push('/');
};

const returnHome = () => {
    router.push('/');
    console.log('click')
}

return (
<div className={styles.header}>
<div className={styles.logoContainer} onClick={() => returnHome()}>
<Image src="/logo.png" alt="Logo" width={50} height={50} />
<h1 className={styles.h1}>Home Matcher</h1>
</div>
<div>
<h3 className={styles.h3}>{pageTitle}</h3>
</div>
<div className={styles.buttonsContainer}>
<Link href="/timeToMatch">
<div className={styles.button}>
<FontAwesomeIcon icon={faHeart} className={styles.btn} />
<h2 className={styles.h2} >Match</h2>
</div>
</Link>
<Link href="/LikePage">
<div className={styles.button}>
<FontAwesomeIcon icon={faThumbsUp} className={styles.btn} />
<h2 className={styles.h2} >Likes</h2>
</div>
</Link>
<Link href="/MatchPage">
<div className={styles.button}>
<FontAwesomeIcon icon={faComments} className={styles.btn}/>
<h2 className={styles.h2}>Message</h2>
</div>
</Link>
<div className={styles.button} onClick={() => setIsOpen(!isOpen)}>
<FontAwesomeIcon icon={faUser} className={styles.btn}/>
<h2 className={styles.h2}>Profil</h2>
{isOpen && (
<div className={styles.dropdownMenu}>
<Link href="/ProfilPage"><a>Mon compte</a></Link>
<Link href="/RealtysPage"><a>Mes biens</a></Link>
<a onClick={() => handleLogout()}>Se déconnecter</a>
</div>
)}
</div>
</div>
</div>
);
};

export default Header;
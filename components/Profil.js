import styles from '../styles/Profil.module.css';
import HeaderConnected from './HeaderConnected'
import React, { useState } from 'react';

function Profil() {

    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
      setImage(URL.createObjectURL(e.target.files[0]));
    };

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <HeaderConnected/>
            </div>
        <div className={styles.container}>
            <div className={styles.leftContainer}>
                <div className={styles.profilPic}>
                    <input id="fileInput" className={styles.buttonFile} type="file" onChange={handleImageChange} />
                    <label htmlFor="fileInput" className={styles.fileLabel}>Choisir un fichier</label>
                    {image && <img src={image} alt="Profil" />}
                </div>
            </div>
            <div className={styles.rightContainer}>
                <h3 className={styles.h3}>Prénom:</h3>
                <input className={styles.input}/>
                <h3 className={styles.h3}>Nom:</h3>
                <input className={styles.input}/>
                <h3 className={styles.h3}>Age:</h3>
                <input className={styles.input}/>
                <h3 className={styles.h3}>Situation professionnelle:</h3>
                <input className={styles.input}/>
                <h3 className={styles.h3}>Capacité d'achat/prêt:</h3>
                <input className={styles.input}/>
                <h3 className={styles.h3}>Description profil:</h3>
                <input className={styles.input}/>
                <br/>
                </div>
                </div>
                <button className={styles.button}>Mettre à jour mon profil ✓</button>
        </div>
    )
}

export default Profil
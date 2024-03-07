import styles from '../styles/Profil.module.css';
import HeaderConnected from './HeaderConnected'
import React, { useState } from 'react';

function Profil() {

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        setSelectedImage(event.target.value);
    };

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <HeaderConnected/>
            </div>
            <div className={styles.container}>
                <div className={styles.leftContainer}>
                    <div className={styles.profilPic}>
                    {selectedImage && <img src={selectedImage} alt="Profil" className={styles.selectedImage} />}                        <select className={styles.avatarbutton} onChange={handleImageChange}>
                            <option value="">Choisis ton avatar</option>
                            <option value="./avatar1.jpg">Avatar 1</option>
                            <option  value="./avatar2.jpg">Avatar 2</option>
                            <option  value="./avatar3.jpg">Avatar 3</option>
                            <option value="./avatar4.jpg">Avatar 4</option>
                            <option  value="./avatar5.jpg">Avatar 5</option>
                            <option value="./avatar6.jpg">Avatar 6</option>
                            <input type="hidden" classname={styles.input} />
                        </select>
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
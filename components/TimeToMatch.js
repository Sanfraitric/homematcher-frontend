import styles from '../styles/TimeToMatch.module.css';
import Link from 'next/link'
import Header from '../components/Header_Connected'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faRotate, faXmark } from '@fortawesome/free-solid-svg-icons';

function TimeToMatch() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Header />
            </div>
            <div className={styles.landMatch}>
                <div className={styles.test}>
                    <div className={styles.MansonInfo}>
                        <div className={styles.filter}>
                            <p className={styles.filterCase}>Surface de terrain: 650 m²</p>
                            <p className={styles.filterCase}>Surface habitable: 143 m²</p>
                            <p className={styles.filterCase}>Prix: 325 000 €</p>
                            <p className={styles.filterCase}>Nombre de pièces: 6 Pièces</p>
                            <p className={styles.filterCase}>Localisation: Franche-Comté</p>
                            <p className={styles.filterCase}>Terrasse: Oui</p>
                        </div>
                        <div className={styles.mansonImg}>
                            <img className={styles.photos} src="placeholderappart.jpg" />
                        </div>
                    </div>
                    <div>
                        <div className={styles.icons}>
                            <FontAwesomeIcon icon={faXmark} className={styles.btn} />
                            <FontAwesomeIcon icon={faRotate} className={styles.btn} />
                            <FontAwesomeIcon icon={faThumbsUp} className={styles.btn} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default TimeToMatch;
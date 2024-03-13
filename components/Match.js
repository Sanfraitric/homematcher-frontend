import styles from '../styles/Match.module.css';
import HeaderConnected from './HeaderConnected'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faCertificate } from '@fortawesome/free-solid-svg-icons';

function Match() {

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <HeaderConnected/>
            </div>
            <div className={styles.body}>
                <div className={styles.match}>
                    <img src='helmuthd.jpg' className={styles.profilpic}/>
                    <h3 className={styles.username}>Helmut</h3>
                    <p> Vous avez un nouveau message !</p>
                    <FontAwesomeIcon icon={faMessage} className={styles.icon}/>
                </div>
            </div>
        </div>
    )
}

export default Match
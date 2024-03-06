import styles from '../styles/Match.module.css';
import HeaderConnected from './HeaderConnected'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Match() {

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <HeaderConnected/>
            </div>
            <div className={styles.body}>
                <div className={Match}>
                    <img src='helmuthd.jpg' className={styles.profilpic}/>
                    <h3 className={styles.username}>Helmut</h3>
                    <FontAwesomeIcon icon={faUser} className={styles.icon}/>
                </div>
            </div>
        </div>
    )
}

export default Match
import styles from '../styles/Match.module.css';
import Header from '../components/Header_Connected'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Match() {

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <Header/>
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
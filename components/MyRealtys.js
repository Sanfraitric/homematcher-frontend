import styles from '../styles/MyRealtys.module.css';
import Link from 'next/link'
import HeaderConnected from './HeaderConnected';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function MyRealtys() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <HeaderConnected />
      </div>
          <div className={styles.add}>
            <Link href='/AddRealtyPage'>
              <button className={styles.addRealty}> + Ajouter un bien </button>
            </Link>
          </div>
      <div className={styles.firstRealty}>
        <img src='firstrealty.jpg' className={styles.firstpic}/>
        <p>Je sais pas trop quoi écrire mais il me faut une description donc je vais faire crari j'ai des idées me faut un truc long pour voir si ça fait nimp ou pas</p>
        <FontAwesomeIcon icon={faXmark} className={styles.delete}/>
      </div>
     </div>
  );
}

export default MyRealtys;
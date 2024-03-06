import styles from '../styles/MyRealtys.module.css';
import Link from 'next/link'
import HeaderConnected from './HeaderConnected';

function MyRealtys() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <HeaderConnected />
      </div>
      <div className={styles.myRealty}>
       
          <div className={styles.add}>
            <Link href='/AddRealtyPage'>
              <button > Ajouter un bien </button>
            </Link>
          </div>
     
          </div>
        </div>
  );
}

export default MyRealtys;
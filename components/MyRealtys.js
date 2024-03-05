import styles from '../styles/MyRealtys.module.css';
import Header from '../components/Header_Connected'
import Link from 'next/link'
import HeaderConnected from './HeaderConnected';

function MyRealtys() {
  return (
    <div className={styles.main}>
    <HeaderConnected/>
      <main >
        <div className={styles.header}>
        </div>
        <div className={styles.container}>
        <Link href='/AddRealtyPage'>
            <button> Ajouter un bien </button>
        </Link>
        </div>
      </main>
    </div>
  );
}

export default MyRealtys;
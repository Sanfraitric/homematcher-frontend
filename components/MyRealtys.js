import styles from '../styles/MyRealtys.module.css';
import Link from 'next/link'

function MyRealtys() {
  return (
    <div className={styles.main}>
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
import styles from '../styles/MyRealtys.module.css';
import Header from '../components/Header_Connected'
import Link from 'next/link'

function MyRealtys() {
  return (
    <div className={styles.main}>
      < Header />
      <main >
        
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
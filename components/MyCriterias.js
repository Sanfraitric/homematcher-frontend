import styles from '../styles/MyCriterias.module.css'
import { useState } from 'react';
import Buyer from './Buyer';
import Seller from './Seller';

function MyCriterias() {
  const [mode, setMode] = useState('seller');
 

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.btnSell}>
          <button className={styles.button} style={{ backgroundColor: mode === 'buyer' ? '#D32F2F' : '#FF4D4D' }} onClick={() => setMode('buyer')}>Acheteur</button>
          <button className={styles.button} style={{ backgroundColor: mode === 'seller' ? '#D32F2F' : '#FF4D4D' }} onClick={() => setMode('seller')}>Vendeur</button>
        </div>

        {mode === 'seller' ? (
        <Seller/>
        ) : (
        <Buyer />
        )}
      </main>
    </div>
  );

}

export default MyCriterias;
import styles from '../styles/MyRealtys.module.css';
import Link from 'next/link'
import HeaderConnected from './HeaderConnected';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { gitRealtys } from '../reducers/realtys';
import RealtyCard from './RealtyCard';

function MyRealtys() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const myRealty= useSelector((state) => state.realtys.value);

   // Récupération des biens immobiliers
  useEffect(() => {
    fetch('http://localhost:3000/realtys', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${user.token}` // Incluez le token dans l'en-tête Authorization
      },
    })
      .then(response => response.json())
      .then(data => {
        dispatch(gitRealtys(data.realtys))
      });
  }, []);

  const realtys = myRealty.map((data, i) => {
    return <RealtyCard key={i} {...data} />;
  })

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <HeaderConnected/>
      </div>
      <div className={styles.container}>
            <Link href='/AddRealtyPage'>
            <button className={styles.btn}> + Ajouter un bien </button>
          </Link>
    <div className={styles.realtyCard}>
          {realtys}
      </div>
      </div>
    </div>
  );
}

export default MyRealtys;
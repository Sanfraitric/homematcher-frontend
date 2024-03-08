import styles from '../styles/MyRealtys.module.css';
import Link from 'next/link'
import HeaderConnected from './HeaderConnected';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { gitRealtys } from '../reducers/realtys';
import RealtyCard from './RealtyCard';

function MyRealtys() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.value.token);
  const realty = useSelector((state) => state.realtys.value);
  

  useEffect(() => {
    fetch('http://localhost:3000/realtys', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}` // Incluez le token dans l'en-tête Authorization
      },
    })
      .then(response => response.json())
      .then(data => {
        dispatch(gitRealtys(data.realtys))
      });
  }, []);

  const realtys = realty.map((data, i) => {
    return <RealtyCard key={i} {...data} />;
  })
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <HeaderConnected />
      </div>
      <div className={styles.background}>
        <div className={styles.addRealty}>
          <Link href='/AddRealtyPage'>
            <button className={styles.btn}> + Ajouter un bien </button>
          </Link>
        </div>
        <div className={styles.realtyCard}>
          {realtys}
        </div>
      </div>
    </div>
  );
}

export default MyRealtys;
import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/AddRealty.module.css'
import { useDispatch } from 'react-redux';
import { addRealtyToStore } from '../reducers/realtys';
import HeaderConnected from './HeaderConnected';

function AddRealty() {

  const dispatch = useDispatch();

  const addRealty = (newRealty) => {
    dispatch( addRealtyToStore(newRealty))
  }

  // Hooks d'états pour les inputs:
  const [description, setDescription] = useState();
  const [area, setArea] = useState();
  const [rooms, setRooms] = useState();
  const [price, setPrice] = useState();
  const [delay, setDelay] = useState();
  const [budget, setBudget] = useState();
  const [financed, setFinanced] = useState();

  return (
    <div>
    <HeaderConnected/>
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Container avec le titre centré en haut */}
         

          {/* Inputs dans la partie gauche */}
          
          <div className={styles.leftContainer}>
          <input type="text" className={styles.inputText} placeholder='Description:...'  onChange={(e) => setDescription(e.target.value)} value={description}/>
          <input type="text" className={styles.inputText} placeholder='Superficie: ...m²'  onChange={(e) => setArea(e.target.value)} value={area} />
          <input type="text" className={styles.inputText} placeholder='Nombre de pièces: ...' onChange={(e) => setRooms(e.target.value)} value={rooms}/>
          <input type="text" className={styles.inputText} placeholder='Prix de vente souhaité: ... €'  onChange={(e) =>  setPrice(e.target.value)} value={price}/>
         </div>



          {/* Titre "Image" dans la partie du milieu */}
          <div className={styles.middleContainer}>
            <button> Ajouter Image(s)</button>
            <h2>Image</h2>
                       {/* Bouton pour ajouter le bien */}
                       <Link href='/RealtysPage'>
            <button className={styles.button}> Ajouter un bien </button>
            
          </Link>
          </div>

          {/* Titre "Documents" dans la partie droite */}
          <div className={styles.rightContainer}>
            <button> Ajouter Document(s)</button>
            <h2>Documents Obligatoires</h2>
            <div>
              <h2> Profil Acheteur souhaité</h2>
              <input type="text" className={styles.inputText} placeholder='Délai : ... semaines' onChange={(e) => setDelay(e.target.value)} value={delay} />
              <input type="text" className={styles.inputText} placeholder='Budget :... ' onChange={(e) => setBudget(e.target.value)} value={budget}/>
              <input type="text" className={styles.inputText} placeholder='Financement: oui/non ' onChange={(e) => setFinanced(e.target.value)} value={financed}/>
            </div>
            

          </div>

       
        
        </div>
    
      </main>
    </div>
  );
}

export default AddRealty;

import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/MyCriterias.module.css'
//import { useDispatch, useSelector } from 'react-redux';
//import { addRealtyToStore } from '../reducers/realtys';
import HeaderConnected from './HeaderConnected';

function AddRealty() {
  const router = useRouter();
    //Mes constantes d'effet
  const [budget, setBudget] = useState(10000);
  const [area, setArea] = useState('');
  const [type, setType] = useState('');
  const [outdoorSurface, setOutdoorSurface] = useState('');
  const [indoorSurface, setIndoorSurface] = useState('');
  const [rooms, setRooms] = useState('');
  const [outdoor, setOutdoor] = useState('');
// fonction permettant de naviguer vers la page time to match
const goToMatch = () => {
  router.push('/timeToMatch')
}
  //Définir les minimum et maximum pour les inputs
  const minBudget = 0;
  const maxBudget = 1000000;

  const handleBudgetChange = (e) => {
    let newBudget = parseInt(e.target.value);
    newBudget = Math.round(newBudget / 10000) * 10000;
    newBudget = Math.min(Math.max(minBudget, newBudget), maxBudget);
    setBudget(newBudget);
  };

  const minOutdoorSurface = 0;
  const maxOutdoorSurface = 600; 

  const handleOutdoorSurface = (e) => {
  let newOutdoorSurface = parseInt(e.target.value);
  newOutdoorSurface = Math.min(Math.max(minOutdoorSurface, newOutdoorSurface), maxOutdoorSurface);
  setOutdoorSurface(newOutdoorSurface);
};

const minIndoorSurface = 0;
const maxIndoorSurface = 600; 

const handleIndoorSurface = (e) => {
let newIndoorSurface = parseInt(e.target.value);
newIndoorSurface = Math.min(Math.max(minIndoorSurface, newIndoorSurface), maxIndoorSurface);
setIndoorSurface(newIndoorSurface);
};

const minRooms = 1;
const maxRooms = 10; 

const handleRooms = (e) => {
let newRooms = parseInt(e.target.value);
newRooms = Math.min(Math.max(minRooms, newRooms), maxRooms);
setRooms(newRooms);
};

  return (
<div>
  <HeaderConnected />
  <main className={styles.main}>
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.input}>
            <label className={styles.text}>Budget:</label>
                <div className={styles.range}>
                <input type="range" min={minBudget} max={maxBudget} value={budget} onChange={handleBudgetChange} />
                <span>{budget}€</span>
                </div>
        </div>
        <div className={styles.input}>
            <label className={styles.text}>Localisation:</label>
            <select className={styles.inputElement} multiple value={area} onChange={(e) => setArea(e.target.value)}>
                <option value="Paris">Paris</option>
                <option value="Lyon">Lyon</option>
                <option value="Marseille">Marseille</option>
            </select>
        </div>
        <div className={styles.input}>
            <label className={styles.text}>Type de Bien:</label>
            <select className={styles.inputElement} value={type} onChange={(e) => setType(e.target.value)}>
                <option value="Appartement">Appartement</option>
                <option value="Maison">Maison</option>
            </select>
        </div>
        <div className={styles.input}>
            <label className={styles.text}>Surface du terrain:</label>
                <div className={styles.range}>
                <input type="range" min={minOutdoorSurface} max={maxOutdoorSurface} value={outdoorSurface} onChange={handleOutdoorSurface} />
                <span>{outdoorSurface}m²</span>
                </div>
        </div>
        <div className={styles.input}>
            <label className={styles.text}>Surface habitable:</label>
            <div className={styles.range}>
            <input type="range" min={minIndoorSurface} max={maxIndoorSurface} value={indoorSurface} onChange={handleIndoorSurface} />
            <span>{indoorSurface}m²</span>
            </div>
        </div>
        <div className={styles.input}>
            <label className={styles.text}>Nombre de pièces:</label>
            <div className={styles.range}>
            <input type="range" min={minRooms} max={maxRooms} value={rooms} onChange={handleRooms} />
            <span>{rooms}</span>
            </div>
        </div>
        <div className={styles.input}>
            <label className={styles.text}>Terrasse Exterieure:</label>
            <div className={styles.choice}>
            <input type="radio" name="outdoor" value="Oui" checked={outdoor === 'Oui'} onChange={(e) => setOutdoor(e.target.value)} /> Oui
            <input  type="radio" name="outdoor" value="Non" checked={outdoor === 'Non'} onChange={(e) => setOutdoor(e.target.value)} /> Non
            </div>
        </div>
    </div>
      <div className={styles.rightContainer}>
        {/* {matchingRealties.length === 0 ? ( */}
        <p className={styles.text}>Aucun bien ne correspond à vos critères. </p>
        {/* ) : ( */}
          <p className={styles.text}>Un bien correspond à votre recherche !</p>
          <button className={styles.button} onClick={goToMatch}> Trouver mon cocon ❤️</button>
        {/* )} */}
      </div>
    </div>
  </main>
</div>
  );
}

export default AddRealty;
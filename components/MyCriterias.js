import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/MyCriterias.module.css'
import HeaderConnected from './HeaderConnected';
import click from "../public/click.wav";

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

// Naviguer vers la page time to match
  const goToMatch = () => {
  let audio = new Audio(click);
  audio.play();
  router.push('/timeToMatch')
}
//Création Jauge Budget
    const minBudget = 0;
  const maxBudget = 1000000;

  const handleBudgetChange = (e) => {
    let newBudget = parseInt(e.target.value);
    newBudget = Math.round(newBudget / 10000) * 10000;
    newBudget = Math.min(Math.max(minBudget, newBudget), maxBudget);
    setBudget(newBudget);
  };

//Création Jauge Jardin

  const minOutdoorSurface = 0;
  const maxOutdoorSurface = 600; 

  const handleOutdoorSurface = (e) => {
  let newOutdoorSurface = parseInt(e.target.value);
  newOutdoorSurface = Math.min(Math.max(minOutdoorSurface, newOutdoorSurface), maxOutdoorSurface);
  setOutdoorSurface(newOutdoorSurface);
};

//Création Jauge Surface Habitable

const minIndoorSurface = 0;
const maxIndoorSurface = 600; 

const handleIndoorSurface = (e) => {
let newIndoorSurface = parseInt(e.target.value);
newIndoorSurface = Math.min(Math.max(minIndoorSurface, newIndoorSurface), maxIndoorSurface);
setIndoorSurface(newIndoorSurface);
};

//Création Jauge Nombre de Pièces

const minRooms = 1;
const maxRooms = 10; 

const handleRooms = (e) => {
let newRooms = parseInt(e.target.value);
newRooms = Math.min(Math.max(minRooms, newRooms), maxRooms);
setRooms(newRooms);
};

//Pouvoir Cocher Maison ET Appartement
const handleTypeChange = (e) => {
  const { checked, value } = e.target;
  setType(prevType =>
    checked ? [...prevType, value] : prevType.filter(type => type !== value)
  );
};
  return (
<div>
  <main className={styles.main}>
    <div className={styles.header}>
      <HeaderConnected />
    </div>
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
            <div className={styles.choice}>
            <input type="checkbox" name="type" value="Appartement" checked={type.includes('Appartement')} onChange={handleTypeChange} /> Appartement
            <input type="checkbox" name="type" value="Maison" checked={type.includes('Maison')} onChange={handleTypeChange} /> Maison
            </div>
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
            <input type="checkbox" name="outdoor" value="Oui" checked={outdoor === 'Oui'} onChange={(e) => setOutdoor(e.target.value)} /> Oui
            <input  type="checkbox" name="outdoor" value="Non" checked={outdoor === 'Non'} onChange={(e) => setOutdoor(e.target.value)} /> Non
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
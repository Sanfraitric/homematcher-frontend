import styles from '../styles/MyCriterias.module.css'
import { useState } from 'react';

function Buyer() {
    //Mes constantes d'effet
    const [budget, setBudget] = useState(10000);
    const [area, setArea] = useState('');
    const [type, setType] = useState('');
    const [outdoorSurface, setOutdoorSurface] = useState('');
    const [indoorSurface, setIndoorSurface] = useState('');
    const [rooms, setRooms] = useState('');
    const [outdoor, setOutdoor] = useState('');

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

const handleSubmit = () => {
fetch('http://localhost:3000/realtys/filteredRealtys', {
    method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${user.token}` // Incluez le token dans l'en-tête Authorization
          },
          query: JSON.stringify({ 
            budget
        }),
})
}

return(
    <>
    <div className={styles.mycriteres}>
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
          <input type="checkbox" name="outdoor" value="Non" checked={outdoor === 'Non'} onChange={(e) => setOutdoor(e.target.value)} /> Non
        </div>
      </div >
      <div className={styles.btnSell}>
      <button className={styles.button} onClick={handleSubmit} >Rechercher</button>
      </div>
    </div>
    <div className={styles.card}>
      Les cartes des biens dispo
    </div>
  </>
);
}

export default Buyer;
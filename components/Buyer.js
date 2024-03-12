import styles from '../styles/MyCriterias.module.css'
import { useState } from 'react';
import { useSelector } from 'react-redux';
function Buyer() {
  //Mes constantes d'effet
  const [budget, setBudget] = useState(10000);
  const [typeOfRealty, setTypeOfRealty] = useState('');
  const [livingArea, setLivingArea] = useState('');
  const [outdoorArea, setOutdoorArea] = useState('');
  const [rooms, setRooms] = useState('');
  const [terrace, setTerrace] = useState('');
  const [card, setCard] = useState([]);
  const user = useSelector((state) => state.user.value);
  const [index, setIndex] = useState(0);
  console.log(card)
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

  const minOutdoorArea = 0;
  const maxOutdoorArea = 600;

  const handleOutdoorSurface = (e) => {
    let newOutdoorArea = parseInt(e.target.value);
    newOutdoorArea = Math.min(Math.max(minOutdoorArea, newOutdoorArea), maxOutdoorArea);
    setOutdoorArea(newOutdoorArea);
  };

  //Création Jauge Surface Habitable

  const minLivingArea = 0;
  const maxLivingArea = 600;

  const handleIndoorSurface = (e) => {
    let newLivingArea = parseInt(e.target.value);
    newLivingArea = Math.min(Math.max(minLivingArea, newLivingArea), maxLivingArea);
    setLivingArea(newLivingArea);
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
    setTypeOfRealty(prevType =>
      checked ? [...prevType, value] : prevType.filter(type => type !== value)
    );
  };

  const handleSubmit = () => {
    fetch(`http://localhost:3000/realtys/filteredRealtys?budget[$lt]=${budget}&typeOfRealty=${typeOfRealty}&terrace=${terrace}&livingArea[$lt]=${livingArea}&outdoorArea[$lt]=${outdoorArea}&rooms[$lt]=${rooms}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${user.token}` // Incluez le token dans l'en-tête Authorization
      },
    }).then(response => response.json())
      .then(data => {
        setCard(data.realty)
        console.log(data)
      })
  }

  const handlenone = () => {
    if (index < card.length - 1) {
      setIndex(index + 1);
    } else {
      // Quand on est arrivés à la fin du tableau, on reviens au debut 
      setIndex(0);
    }
  };

  return (
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
          <select className={styles.inputElement} multiple value={livingArea} onChange={(e) => setLivingArea(e.target.value)}>
            <option value="Paris">Paris</option>
            <option value="Lyon">Lyon</option>
            <option value="Marseille">Marseille</option>
          </select>
        </div>
        <div className={styles.input}>
          <label className={styles.text}>Type de Bien:</label>
          <div className={styles.choice}>
            <input type="checkbox" name="type" value="Appartement" checked={typeOfRealty.includes('Appartement')} onChange={handleTypeChange} /> Appartement
            <input type="checkbox" name="type" value="Maison" checked={typeOfRealty.includes('Maison')} onChange={handleTypeChange} /> Maison
          </div>
        </div>
        <div className={styles.input}>
          <label className={styles.text}>Surface du terrain:</label>
          <div className={styles.range}>
            <input type="range" min={minOutdoorArea} max={maxOutdoorArea} value={outdoorArea} onChange={handleOutdoorSurface} />
            <span>{outdoorArea}m²</span>
          </div>
        </div>
        <div className={styles.input}>
          <label className={styles.text}>Surface habitable:</label>
          <div className={styles.range}>
            <input type="range" min={minLivingArea} max={maxLivingArea} value={livingArea} onChange={handleIndoorSurface} />
            <span>{livingArea}m²</span>
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
            <input type="checkbox" name="outdoor" value={true} checked={terrace} onChange={(e) => setTerrace(true)} /> Oui
            <input type="checkbox" name="outdoor" value={false} checked={!terrace} onChange={(e) => setTerrace(false)} /> Non
          </div>
        </div >
        <div className={styles.btnSell}>
          <button className={styles.button} onClick={handleSubmit} >Rechercher</button>
        </div>
      </div>
      <div className={styles.card}>
        {card && card.length > 0 ? (
          <div>
            <img src={card[index].imageUrl[index]} />
            <p>{card[index].description}</p>
            <button onClick={handlenone}>Suivant</button>
          </div>
        ) : (
          <p>Aucune donnée à afficher pour le moment.</p>
        )}
      </div>
    </>
  );
}

export default Buyer;
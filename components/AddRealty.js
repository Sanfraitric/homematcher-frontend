import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/AddRealty.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import HeaderConnected from './HeaderConnected';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import ImageCarrousel from './Carrousel';


function AddRealty() {
  const images = [
    'appart1.jpg',
    'appart2.jpg',
    'appart3.jpg'
  ]
  const dispatch = useDispatch();
  const router = useRouter();
  const token = useSelector((state) => state.user.value.token);
  //console.log(token)
  const addRealty = (newRealty) => {
    dispatch(addRealtyToStore(newRealty))
  }

  // Hooks d'états pour les inputs:
  const [description, setDescription] = useState('');
  const [area, setArea] = useState();
  const [rooms, setRooms] = useState();
  const [price, setPrice] = useState();
  const [delay, setDelay] = useState(0);
  const [budget, setBudget] = useState(10000);
  const [financed, setFinanced] = useState('yes');

  const minBudget = 0;
  const maxBudget = 1000000

  const handleBudgetChange = (e) => {
    let newBudget = parseInt(e.target.value);
    // Ajuster le budget pour qu'il progresse par incréments de 10 000
    newBudget = Math.round(newBudget / 10000) * 10000;
    // S'assurer que le budget reste dans la fourchette définie
    newBudget = Math.min(Math.max(minBudget, newBudget), maxBudget);
    setBudget(newBudget);
  };

  const minDelay = 0;
  const maxDelay = 52; // Par exemple, définissez la valeur maximale pour le délai en semaines

  const handleDelayChange = (e) => {
    let newDelay = parseInt(e.target.value);
    // S'assurer que le délai reste dans la fourchette définie
    newDelay = Math.min(Math.max(minDelay, newDelay), maxDelay);
    setDelay(newDelay);
  };

  const handlePhotoChange = (e) => {
    const files = e.target.files;


    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log("Nom du fichier:", file.name);
      console.log("Taille du fichier:", file.size, "octets");
      console.log("Type MIME du fichier:", file.type);
      console.log("Date de dernière modification du fichier:", file.lastModifiedDate);
    }
  }

const handleSubmit = () => {
  fetch('http://localhost:3000/realtys/addRealtys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}` // Incluez le token dans l'en-tête Authorization
    },
    body: JSON.stringify({
      description: "Ceci est une description test",
      location: "Votre location",
      numberOfRooms: 3,
      price: 340000,
      landArea: 100,
      livingArea: 80,
      propertyType: "Maison",
      terrace: true
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data)
    router.push('/RealtysPage')
  })
  .catch(error => console.error('Erreur:', error));
}

  return (
    <div>
    <HeaderConnected/>
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Container avec le titre centré en haut */}


          {/* Inputs dans la partie gauche */}
          
         <div className={styles.leftContainer}>
          
          <input type="text" className={styles.desc} placeholder='Description:...'  onChange={(e) => setDescription(e.target.value)} value={description}/>
          
          <input type="text" className={styles.inputText} placeholder='Superficie: ...m²'  onChange={(e) => setArea(e.target.value)} value={area} />
           
          <input type="text" className={styles.inputText} placeholder='Nombre de pièces: ...' onChange={(e) => setRooms(e.target.value)} value={rooms}/>
          
          <input type="text" className={styles.inputText} placeholder='Prix de vente souhaité: ... €'  onChange={(e) =>  setPrice(e.target.value)} value={price}/>
         </div>
        
        

          {/* Titre "Image" dans la partie du milieu */}
          <div className={styles.middleContainer}>
          <input
           type="file"
           accept="image/*" // Accepte uniquement les fichiers images
           multiple // Permet à l'utilisateur de sélectionner plusieurs fichiers
           onChange={handlePhotoChange}
           className={styles.inputFile}
          />
          <ImageCarrousel images={images} className={styles.carrousel}/>
          {/* Bouton pour ajouter le bien */}
          <button className={styles.button} onClick={handleSubmit}> Ajouter un bien </button>
          </div>

          {/* Titre "Documents" dans la partie droite */}
          <div className={styles.rightContainer}>
            <button className={styles.button}> Ajouter Document(s)</button>
          
            <h2>Documents Obligatoires</h2> 
            <FontAwesomeIcon icon={faQuestion} className={styles.info} title='les documents obligatoires sont...'/>
          
            <div>
              <h2> Profil acheteur souhaité</h2>
              Délai :
              <input
                type="range"
                min={minDelay}
                max={maxDelay}
                value={delay}
                onChange={handleDelayChange}
                className={styles.inputRange}
              />
              <span>{delay} semaine(s)</span>
              <div>
                Budget :
                <input
                  type="range"
                  min={minBudget}
                  max={maxBudget}
                  step={10000} // Incréments de 10 000
                  value={budget}
                  onChange={handleBudgetChange}
                  className={styles.inputRange}
                />
                <span>{budget} €</span>
              </div>
              Financement :
              <input type="radio" id="financed-yes" name="financed" value="yes" checked={financed === "yes"} onChange={() => setFinanced("yes")} />
              <label htmlFor="financed-yes">Oui</label>
              <input type="radio" id="financed-no" name="financed" value="no" checked={financed === "no"} onChange={() => setFinanced("no")} />
              <label htmlFor="financed-no">Non</label>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AddRealty;

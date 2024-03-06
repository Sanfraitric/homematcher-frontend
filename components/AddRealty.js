import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/AddRealty.module.css'
import HeaderConnected from './HeaderConnected';
import React from 'react';


function AddRealty() {


  // Hooks d'états pour les inputs:
  const [description, setDescription] = useState('');
  const [area, setArea] = useState();
  const [rooms, setRooms] = useState();
  const [price, setPrice] = useState();
  const [delay, setDelay] = useState(0);
  const [budget, setBudget] = useState(10000);
  const [financed, setFinanced] = useState('yes');
  const [imageUrl, setImageUrl] = useState('')

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
  const file = e.target.files[0];
  console.log(e.target.files)

  const formData = new FormData()

  formData.append('photoFromFront', file)
 fetch('http://localhost:3000/realtys/upload', {
  method: "POST",
  body: formData
 }).then(response => response.json())
   .then(data => setImageUrl(data.url))
}



const handleAddRealty = () => {
  fetch('http://localhost:3000/realtys/addRealtys', {
    method: "POST",
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({ description, area, rooms, price, delay, budget, financed, imageUrl})
  }).then(response => response.json())
}

// for (let i = 0; i < files.length; i++) {
//   const file = files[i];
//   console.log("Nom du fichier:", file.name);
//   console.log("Taille du fichier:", file.size, "octets");
//   console.log("Type MIME du fichier:", file.type);
//   console.log("Date de dernière modification du fichier:", file.lastModifiedDate);
//   setImageUrl(imageUrl)


  return (
    <div>
    <HeaderConnected/>
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Container avec le titre centré en haut */}
         

          {/* Inputs dans la partie gauche */}
          
         <div className={styles.leftContainer}>
          Description
          <input type="text" className={styles.inputText} placeholder='Description:...'  onChange={(e) => setDescription(e.target.value)} value={description}/>
          Superficie
          <input type="text" className={styles.inputText} placeholder='Superficie: ...m²'  onChange={(e) => setArea(e.target.value)} value={area} />
          Nombre de pièces 
          <input type="text" className={styles.inputText} placeholder='Nombre de pièces: ...' onChange={(e) => setRooms(e.target.value)} value={rooms}/>
          Prix de vente souhaité
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
          <h2>Image</h2>
          {/* Bouton pour ajouter le bien */}
          <Link href='/RealtysPage'>
          <button className={styles.button} onClick={handleAddRealty}> Ajouter un bien </button>
          </Link>
          </div>

          {/* Titre "Documents" dans la partie droite */}
          <div className={styles.rightContainer}>
            <button> Ajouter Document(s)</button>
            <h2>Documents Obligatoires</h2>
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

// const handlePhotoChange = async (e) => {
//   const files = e.target.files;

//   // Vérifier si des fichiers ont été sélectionnés
//   if (files.length > 0) {
//     const file = files[0]; // Nous supposons qu'un seul fichier est sélectionné

//     // Créer un objet FormData pour envoyer le fichier
//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       // Envoyer le fichier vers votre route de téléchargement d'image sur le serveur
//       const response = await fetch('http://localhost:3000/realtys/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       // Analyser la réponse JSON pour obtenir l'URL de l'image
//       const data = await response.json();
//       const imageUrl = data.imageUrl;

//       // Mettre à jour l'URL de l'image dans l'état local du composant
//       setImageUrl(imageUrl);
//     } catch (error) {
//       console.error('Error uploading image:', error);
//     }
//   }
// };


// const handleSubmit = async () => {
//   try {
//     const newRealty = {
//       description,
//       area,
//       rooms,
//       price,
//       delay,
//       budget,
//       financed,
//       imageUrl, // Ajouter l'URL de l'image à l'objet
//       // Autres champs du formulaire...
//     };

//     // Envoyer les données au backend
//     const response = await fetch('http://localhost:3000/realtys/addRealtys', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newRealty),
//     });

//     const data = await response.json();
//     addRealty(data); // Ajouter la nouvelle propriété au store Redux
//   } catch (error) {
//     console.error('Error adding realty:', error);
//   }
// };


// //   const handleSubmit = () => {
// //     fetch('http://.../upload', {
// //  method: 'POST',
// //  body: formData,
// // }).then((response) => response.json())
// //  .then((data) => {
// //    ...
// // });
//   }

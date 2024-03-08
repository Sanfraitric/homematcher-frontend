import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/AddRealty.module.css'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import HeaderConnected from './HeaderConnected';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion, faCheck } from '@fortawesome/free-solid-svg-icons';
import ImageCarrousel from './Carrousel';
import { LoadScript, Autocomplete } from '@react-google-maps/api';
const uniqid = require('uniqid')

function AddRealty() {
  const router = useRouter();
  const token = useSelector((state) => state.user.value.token);

  // Hooks d'états pour les inputs:
  const [description, setDescription] = useState('');
  const [area, setArea] = useState();
  const [rooms, setRooms] = useState();
  const [price, setPrice] = useState();
  const [delay, setDelay] = useState(0);
  const [budget, setBudget] = useState(10000);
  const [financed, setFinanced] = useState('yes');
  const [terrassed, setTerrassed] = useState('yes');
  const [imageUrl, setImageUrl] = useState([])
  const [showDocs, setShowDocs] = useState(false);
  const [filesSelected, setFilesSelected] = useState(false);
  const [realtyId, setRealtyId] = useState()
  const docs = ['Le dossier de diagnostics techniques.', 'La superficie loi Carrez de la maison', 'Un justificatif d’identité, d’adresse et de situation familiale', 'Les règlements de copropriété', 'Les 3 derniers procès-verbaux des assemblées générales de copropriétaires', 'Le carnet d’entretien de la maison', 'Le dernier appel de charges', 'Les données financières et techniques de la maison '];

  const minBudget = 0;
  const maxBudget = 1000000

  const handleBudgetChange = (e) => {
    let newBudget = parseInt(e.target.value);
    newBudget = Math.round(newBudget / 10000) * 10000;
    newBudget = Math.min(Math.max(minBudget, newBudget), maxBudget);
    setBudget(newBudget);
    setRealtyId(uniqid())
  };

  const minDelay = 0;
  const maxDelay = 52;

  const handleDelayChange = (e) => {
    let newDelay = parseInt(e.target.value);
    newDelay = Math.min(Math.max(minDelay, newDelay), maxDelay);
    setDelay(newDelay);
  };


  const handleInfoClick = () => {
    setShowDocs(!showDocs);
  };


  const handleButtonClick = () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  };

  //Documents de droite
  const handleFileSelect = (e) => {
    const files = e.target.files;
    // Traitez les fichiers sélectionnés comme vous le souhaitez
    console.log(files);
  }



const handlePhotoChange = (e) => {
  const file = e.target.files[0];
  console.log(e.target.files)
  const formData = new FormData()
  formData.append('photoFromFront', file)
 fetch('http://localhost:3000/realtys/upload', {
  method: "POST",
  body: formData
 }).then(response => response.json())
   .then(data => imageUrl.push(data.url))
}

  console.log(imageUrl)



const handleAddRealty = () => {
  fetch('http://localhost:3000/realtys/addRealtys', {
    method: "POST",
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    },
    body: JSON.stringify({ description, area, rooms, price, delay, budget, financed, imageUrl, realtyId})
  }).then(response => response.json())  .then(data => {
    console.log(data)
    router.push('/RealtysPage')
  }).catch(error => console.error('Erreur:', error));
}



  return (
    <div>
      <div className={styles.header}>
        <HeaderConnected />
      </div>
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.leftContainer}>
          <h3 classname={styles.h3}> Informations:</h3>
            <LoadScript googleMapsApiKey="AIzaSyCT2rUBJUBCi8pssdiVhICE4ZriXamrsjw" libraries={["places"]} >  
            <Autocomplete onLoad={(autocomplete) => {
              autocomplete.setFields(['address_component']);
              autocomplete.setTypes(['(regions)']); 
              }}
            onPlaceChanged={() => {}}
            >
            <input className={styles.inputText} type="text" placeholder="Ville ou département:" />
            </Autocomplete>
            </LoadScript>
            <input type="text" className={styles.inputDesc} placeholder='Description : ...' onChange={(e) => setDescription(e.target.value)} value={description}/>
            <input type="text" className={styles.inputText} placeholder='Superficie: ...m²'  onChange={(e) => setArea(e.target.value)} value={area} />
            <input type="text" className={styles.inputText} placeholder='Nombre de pièces: ...' onChange={(e) => setRooms(e.target.value)} value={rooms}/>
            <input type="text" className={styles.inputText} placeholder='Prix de vente souhaité: ... €'  onChange={(e) =>  setPrice(e.target.value)} value={price}/>
         </div>
          <div className={styles.middleContainer}>
          <input
           type="file"
           accept="image/*" // Accepte uniquement les fichiers images
           multiple // Permet à l'utilisateur de sélectionner plusieurs fichiers
           onChange={handlePhotoChange}
           className={styles.inputFile}
          />
          <label for="file-upload" className={styles.button}>Ajouter une image</label>
          <ImageCarrousel images={imageUrl} className={styles.carrousel}/>
          {/* Bouton pour ajouter le bien */}
          <Link href='/RealtysPage'>
          <button className={styles.button} onClick={handleAddRealty}> Ajouter un bien </button>
          </Link>
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.mandatoryDocuments}>
            <h2 className={styles.h2}>Documents Obligatoires</h2> 
            <FontAwesomeIcon onClick={handleInfoClick} className={styles.infoButton} icon={faQuestion} />
            {showDocs && 
            <div>
            <ul>
              {docs.map((doc, index) => (
              <li key={index}>{doc}</li>
              ))}
            </ul>
            </div>
            }
              <div className={styles.downloadDocuments}>
                <input type="file" id="fileInput" multiple onChange={handleFileSelect} style={{ display: 'none' }} />
                 <button className={styles.button} onClick={handleButtonClick}>Documents à fournir</button>
                {filesSelected && <FontAwesomeIcon className={styles.downloadIcon} icon={faCheck} color="green" />}
              </div>
          </div>
          <div className={styles.whiteContainer}>
            <div className={styles.infoAcheteur}>
           <h3 classname={styles.h3}> Profil acheteur souhaité:</h3>
              <div classname={styles.inputRangeContainer}>
                <p classename={styles.p}>Délai :</p>
                <input type="range" min={minDelay} max={maxDelay} value={delay} onChange={handleDelayChange} className={styles.inputRange}/>
                <span>{delay} semaine(s)</span>
              </div>
              <div classname={styles.inputRangeContainer}>
                <p classename={styles.p}> Budget : </p>
                <input type="range" min={minBudget} max={maxBudget} step={10000} value={budget} onChange={handleBudgetChange} className={styles.inputRange} />
                <span>{budget} €</span>
              </div>
              <div classname={styles.inputRangeContainer}>
                <p classename={styles.p}>Financement :</p>
                <div classname={styles.radioContainer}>
                  <input type="radio" id="financed-yes" name="financed" value="yes" checked={financed === "yes"} onChange={() => setFinanced("yes")} />
                  <label htmlFor="financed-yes">Oui</label>
                  <input type="radio" id="financed-no" name="financed" value="no" checked={financed === "no"} onChange={() => setFinanced("no")} />
                  <label htmlFor="financed-no">Non</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
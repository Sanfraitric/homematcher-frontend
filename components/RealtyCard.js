import styles from '../styles/RealtyCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRealty } from '../reducers/realtys';
import ImageCarrousel from './Carrousel';



function RealtyCard(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.value.token);

  const deleteCard = (id) => {
    fetch(`http://localhost:3000/realtys/delete/${id}`, { // Utilisez l'ID de la propriété immobilière dans l'URL de l'API
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      if (data.result) {
        dispatch(deleteRealty(id)); // Supprimez la propriété immobilière en utilisant l'ID
      }
    })
    .catch(error => console.error('Erreur:', error));
  };

  return (
    <div className={styles.card}>
       <ImageCarrousel images={props.imageUrl} className={styles.carrousel}/>
      <p>Description du bien :{props.description}</p>
      <p>Prix du bien : {props.price}</p>
      <p>Surface habitable :{props.livingArea}</p>
      <p>Surface du terrain :{props.outdoorArea}</p>
      <p>Nombre de pièces :{props.rooms}</p>
      <p>Localisation : {props.location}</p>
      <p>Profil acheteur souhaité pour le bien : <br/>
        Délai (semaines) : {props.delay} <br/>
        Budget : {props.budget} <br/>
        Financement : {props.financed} <br/>
        </p>
      <FontAwesomeIcon icon={faTimes} className={styles.delete} onClick={()=>deleteCard(props._id)} />
    </div>
  );
}

export default RealtyCard;
import styles from '../styles/RealtyCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRealty } from '../reducers/realtys';

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
      <img src='appart1.jpg' className={styles.image}/>
      <p>{props.description}</p>
      <p>{props.area}</p>
      <p>{props.rooms}</p>
      <p>{props.price}</p>
      <p>{props.delay}</p>
      <p>{props.budget}</p>
      <p>{props.financed}</p>
      <FontAwesomeIcon icon={faTimes} className={styles.delete} onClick={()=>deleteCard(props._id)} />
    </div>
  );
}

export default RealtyCard;
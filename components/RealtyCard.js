import styles from '../styles/RealtyCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
function RealtyCard(props) {
    const token = useSelector((state) => state.user.value.token);

    const deleteCard = () => {
        fetch('http://localhost:3000/realtys/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}` // Incluez le token dans l'en-tête Authorization
    },
  })
    }
    return(
        <div className={styles.card}>
         <img src='appart1.jpg' className={styles.image}/>
         <p>{props.description}</p>
         <FontAwesomeIcon icon={faXmark} className={styles.delete} onClick={deleteCard}/>
        </div>
    );
}
export default RealtyCard;
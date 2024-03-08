import styles from '../styles/RealtyCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRealty } from '../reducers/realtys';

function RealtyCard(props) {
  const dispatch = useDispatch();
    const token = useSelector((state) => state.user.value.token);
    const myRealty= useSelector((state) => state.realtys.value);

    const deleteCard = () => {
        fetch('http://localhost:3000/realtys/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}` // Incluez le token dans l'en-tête Authorization
    },
  }).then(response => response.json())
  .then(data => {
    data.result && dispatch(deleteRealty(props._id));
  });

    }
    return(
        <div className={styles.container}>
         <img src='appart1.jpg' className={styles.image}/>
         <p className={styles.p}>{props.description}</p>
         <FontAwesomeIcon icon={faXmark} className={styles.delete} onClick={deleteCard}/>
        </div>
    );
}
export default RealtyCard;
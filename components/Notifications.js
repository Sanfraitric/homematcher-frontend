import React, { useEffect, useState } from 'react';
import styles from '../styles/Notifications.module.css';
import HeaderConnected from './HeaderConnected'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComments, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

function Likes() {
    const user = useSelector((state) => state.user.value);
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/users/notifications/messages', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${user.token}` // Incluez le token dans l'en-tête Authorization
            },
        }).then(response => response.json())
            .then(data => {
                setNotifications(data.notificationMessages)
            })
    }, [])
    console.log(notifications)

const notification = notifications.map((data, i) => {
    return (
        <div key={i} className={styles.notifications}>
            <span >{data}</span>
            <FontAwesomeIcon icon={faTrash} onClick={()=>handleDelete()} className={styles.crossIcon} />
        </div>
    );
});


const handleDelete = async (index) => {
    try {
        const response = await fetch(`http://localhost:3000/users/notifications/${index}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${user.token}`
            }
        });
        if (response.ok) {
            const updatedNotifications = [...notifications];
            updatedNotifications.splice(index, 1);
            setNotifications(updatedNotifications);
        } else {
            console.error('La suppression de la notification a échoué');
        }
    } catch (error) {
        console.error('Erreur lors de la suppression de la notification :', error);
    }
};

return (
    <div className={styles.main}>
        <div className={styles.header}>
            <HeaderConnected />
        </div>

        <div className={styles.notificationContainer}>
            {notification}
       
        </div>

    </div>
)
}

export default Likes;
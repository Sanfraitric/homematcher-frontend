import React, { useEffect, useState } from 'react';
import styles from '../styles/Notifications.module.css';
import HeaderConnected from './HeaderConnected'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComments, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

function Likes() {
    const user = useSelector((state) => state.user.value);
    const [notifications, setNotifications] = useState([])
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3000/notification/messages', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${user.token}` // Incluez le token dans l'en-tête Authorization
            },
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                setNotifications(data.notifications)

            })
    }, [])


    const notification = notifications.map((data, i) => {
        return (
            <div key={i} className={styles.notifications} onClick={() => handleNotificationClick(data)}>
                <span >{data.notificationMessage}</span>
                <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete()} className={styles.crossIcon} />
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

    const handleNotificationClick = (data) => {
        setShowModal(true);
        const userId = data.by;
        console.log(userId);
        fetch(`http://localhost:3000/users/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${user.token}`
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Une erreur s\'est produite lors de la récupération de l\'utilisateur');
            }
        })
        .then(userData => {
            console.log(userData);
            setSelectedNotification(userData.result);
            console.log(selectedNotification);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        });
    };
    
    

    const closeModal = () => {
        setShowModal(false);
    };

    const Modal = ({ username, onClose }) => {
        return (
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <h2>Notification</h2>
                    <p>Username: {selectedNotification.username}</p>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        );
    };
    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <HeaderConnected />
            </div>

            <div className={styles.notificationContainer}>
                {notification}

            </div>
            {showModal && (
                <Modal  onClose={closeModal} />
            )}
        </div>
    )
}

export default Likes;
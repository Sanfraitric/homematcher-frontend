import React, { useState } from 'react';
import styles from '../styles/Notifications.module.css';
import HeaderConnected from './HeaderConnected'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComments, faTrash } from '@fortawesome/free-solid-svg-icons';

function Like({ type }) {

    const [isVisible, setVisible] = useState(true);

    const handleDelete = () => {
        setVisible(false);
    }

    let message;
    switch (type) {
        case 'message':
            message = (
            <>
            <div className={styles.notification}>
                <FontAwesomeIcon icon={faComments} className={styles.icon} />
                <h3 className={styles.text}>Vous avez un message à consulter !</h3>
            </div>
            </>
            );
            break;
        case 'matches':
            message = (
                <>
                <div className={styles.notification}>
                    <FontAwesomeIcon icon={faHeart} className={styles.icon} />
                    <h3 className={styles.text} >Vous avez des matchs à consulter !</h3>
                </div>
            </>
                );
            break;
        default:
            message = (
        <div>
                <h3 className={styles.text}>Vous n'avez pas de nouvelle notification.</h3>
        </div>
            );
    }

    return isVisible ? (
        <div className={styles.notification}>
            <h3 className={styles.text}>{message}</h3>
            <FontAwesomeIcon icon={faTrash} className={styles.icon} onClick={handleDelete}/>
        </div>
    ) : null;
}

function Likes() {
    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <HeaderConnected/>
            </div>
            <div className={styles.container}>
                <Like type="message" />
            </div>
            <div className={styles.container}>
                <Like type="matches" />
            </div>
        </div>
    )
}

export default Likes;
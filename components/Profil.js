import styles from '../styles/Profil.module.css';
import HeaderConnected from './HeaderConnected'

function Profil() {
    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <HeaderConnected/>
            </div>
            <div className={styles.profil}>
                <img src="helmuthd.jpg" className={styles.profilpic}/>
            </div>
            <div className={styles.inputs}>
                <h3 className={styles.prenom}>Prénom:</h3>
                <input className={styles.prenominput}/>
                <h3 className={styles.nom}>Nom:</h3>
                <input className={styles.nominput}/>
                <h3 className={styles.age}>Age:</h3>
                <input className={styles.ageinput}/>
                <h3 className={styles.situapro}>Situation professionnelle:</h3>
                <input className={styles.situaproinput}/>
                <h3 className={styles.achatprêt}>Capacité d'achat/prêt:</h3>
                <input className={styles.achatprêtinput}/>
                <h3 className={styles.desc}>Description profil:</h3>
                <input className={styles.descinput}/>
                <br/>
                <button className={styles.MAJProfil}>Mettre à jour mon profil</button>
            </div>
            <div className={styles.toBeChanged}>

            </div>
        </div>
    )
}

export default Profil
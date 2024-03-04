import styles from '../styles/Home.module.css';

function Home() {

  return (
    <div className={styles.main}>

      <div className={styles.header}>
        <h1>Header</h1>
      </div>

      <div className={styles.middleContent}>
        <h1 className={styles.title}>Quel est votre Projet ?</h1>
        <button className={styles.achat}>Acheter</button>
        <button className={styles.vente}>Vendre</button>
      </div>
      
      <div className={styles.LleftContent}>
        <h3>Qui sommes nous ?</h3>
        <p>Lorem ipsum</p>
      </div>

      <div className={styles.LmidContent}>
        <img src="helmuthd.jpg" className={styles.carrousel}/>
        <p>Ils nous ont fait confiance</p>
      </div>

      <div className={styles.LrightContent}>
        <h3>Pourquoi choisir HomeMatcher ?</h3>
        <p>Lorem ipsum</p>
      </div>

    </div>
  );
}

export default Home;

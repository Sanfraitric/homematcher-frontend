import styles from '../styles/MyCriterias.module.css'
import {  useState } from 'react';
import {  useSelector } from 'react-redux';

function Seller() {
    
    const [financed, setFinanced] = useState('yes');
    const [budget, setBudget] = useState();
    const [delay, setDelay] = useState(0);
    const myRealty= useSelector((state) => state.realtys.value);
const handleFiltre = () => {
    setBudget(myRealty[0].budget)
    setDelay(myRealty[0].delay)
    setFinanced(myRealty[0].financed)
}



 
   //Délai
   const minDelay = 0;
   const maxDelay = 52; 
 
   const handleDelayChange = (e) => {
   let newDelay = parseInt(e.target.value);
   newDelay = Math.min(Math.max(minDelay, newDelay), maxDelay);
   setDelay(newDelay);
   //console.log(delay)
 };

    //Budget
    const minBudget = 0;
    const maxBudget = 1000000
  
    const handleBudgetChange = (e) => {
      let newBudget = parseInt(e.target.value);
      newBudget = Math.round(newBudget / 10000) * 10000;
      newBudget = Math.min(Math.max(minBudget, newBudget), maxBudget);
      setBudget(newBudget);
      //console.log(budget)
    };

    const realtys = myRealty.map((data, i) => {
        console.log(data)
        return <img className={styles.image} onClick={handleFiltre} src={data.imageUrl[0]}/>;
      });

    return (
        <>
            <div className={styles.encardDePhoto}>
                {realtys}
            </div>
            <div className={styles.mycriteres}>

             <div className={styles.inputConfiguration}>
                <p className={styles.p}>Délai maximum:</p>
                <input type="range" min={minDelay} max={maxDelay} value={delay} onChange={handleDelayChange} className={styles.inputRange}/>
                <span>{delay} semaine(s)</span>
                </div>
            <div className={styles.inputConfiguration}>
                <p className={styles.p}> Budget maximum: </p>
                <input type="range" min={minBudget} max={maxBudget} step={10000} value={budget} onChange={handleBudgetChange} className={styles.inputRange} />
                <span>{budget} €</span>
              </div> 
            <p className={styles.p}>Financement :</p>
                <div >
                        <input type="radio" id="financed-yes" name="financed" value="yes" checked={financed === "yes"} onChange={() => setFinanced("yes")} />
                        <label htmlFor="financed-yes">Oui</label>
                        <input type="radio" id="financed-no" name="financed" value="no" checked={financed === "no"} onChange={() => setFinanced("no")} />
                        <label htmlFor="financed-no">Non</label>
                        </div>
                <div className={styles.btnSell}>
                    <button className={styles.button}>Recherche</button>
                </div>
            </div>
            <div className={styles.card}>
                Présentation des profils acheteurs
            </div>
        </>
    );
}

export default Seller;
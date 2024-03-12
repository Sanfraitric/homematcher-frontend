import styles from '../styles/MyCriterias.module.css'
import { useState } from 'react';
import { useSelector } from 'react-redux';

function Seller() {

    const [financed, setFinanced] = useState(false);
    const [budget, setBudget] = useState();
    const [delay, setDelay] = useState(0);
    const [card, setCard] = useState([]);
    const [index, setIndex] = useState(0);
    const myRealty = useSelector((state) => state.realtys.value);
    const user = useSelector((state) => state.user.value);

    const handleFiltre = (imageUrl) => {
        const realtyClicked = myRealty.find(realty => realty.imageUrl[0] === imageUrl);
        setBudget(realtyClicked.budget);
        setDelay(realtyClicked.delay);
        setFinanced(realtyClicked.financed);
        console.log(realtyClicked)
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
        return <img className={styles.image} onClick={() => handleFiltre(data.imageUrl[0])} src={data.imageUrl[0]} />;
    });

    const handleSubmit = () => {
        fetch(`http://localhost:3000/users/filteredUsers?budget[$gt]=${budget}&delay[$lt]=${delay}&financed=${financed}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${user.token}` // Incluez le token dans l'en-tête Authorization
            },
        }).then(response => response.json())
            .then(data => {
                setCard(data.users)
                console.log(data)
                
            })
    }
    console.log(card)
    const handlenone = () => {
        if (index < card.length - 1) {
            setIndex(index + 1);
        } else {
            // Quand on est arrivés à la fin du tableau, on reviens au debut 
            setIndex(0);
        }
    };

    return (
        <>
            <div className={styles.encardDePhoto}>
                {realtys}
            </div>
            <div className={styles.mycriteres}>

                <div className={styles.inputConfiguration}>
                    <p className={styles.p}>Délai maximum:</p>
                    <input type="range" min={minDelay} max={maxDelay} value={delay} onChange={handleDelayChange} className={styles.inputRange} />
                    <span>{delay} semaine(s)</span>
                </div>
                <div className={styles.inputConfiguration}>
                    <p className={styles.p}> Budget minimum: </p>
                    <input type="range" min={minBudget} max={maxBudget} step={10000} value={budget} onChange={handleBudgetChange} className={styles.inputRange} />
                    <span>{budget} €</span>
                </div>
                <p className={styles.p}>Financement :</p>
                <div >
                    <input type="radio" id="financed-yes" name="financed" value={true} checked={financed === true} onChange={() => setFinanced(true)} />
                    <label htmlFor="financed-yes">Oui</label>
                    <input type="radio" id="financed-no" name="financed" value={false} checked={financed === false} onChange={() => setFinanced(false)} />
                    <label htmlFor="financed-no">Non</label>
                </div>
                <div className={styles.btnSell}>
                    <button onClick={handleSubmit} className={styles.button}>Recherche</button>
                </div>
            </div>
            <div className={styles.card}>
            {card && card.length > 0 ? (
                    <div>
                        <p>{card[index].description}</p>
                        <button onClick={handlenone}>Suivant</button>
                    </div>
                ) : (
                    <p>Aucune donnée à afficher pour le moment.</p>
                )}
            </div>
        </>
    );
}

export default Seller;
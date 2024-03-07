import styles from '../styles/Profil.module.css';
import HeaderConnected from './HeaderConnected'
import React, { useState, useEffect } from 'react';
import AvatarCarrousel from './AvatarCarrousel';
import '../styles/CarrouselAvatar.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { UpdateProfil } from '../reducers/user';

function Profil(props) {
    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();    const [selectedAvatar, setSelectedAvatar] = useState('');

    const handleSelectAvatar = (avatar) => {
    setSelectedAvatar(avatar);
    }

    const [selectedImage, setSelectedImage] = useState(null);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [age, setAge] = useState('');
    const [prosituation, setProsituation] = useState('');
    const [financialCapacity, setFinancialCapacity] = useState('');
    const [desciption, setDesciption] = useState('');
console.log(firstname)
console.log(user)
    const handleImageChange = (event) => {
        setSelectedImage(event.target.value);
    };

    useEffect(() => {
        fetch('http://localhost:3000/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${user.token}` // Incluez le token dans l'en-tête Authorization
          },
        })
          .then(response => response.json())
          .then(data => {
        //console.log(data)
        data.result && dispatch(UpdateProfil({
            firstname: data.user.firstname,
            lastname: data.user.lastname,
            age: data.user.age,
            prosituation: data.user.prosituation,
            financialCapacity: data.user.financialCapacity,
            desciption: data.user.desciption,
        })
        );
        setFirstname(data.user.firstname);
        setLastname(data.user.lastname);
        setAge(data.user.age);
        setProsituation(data.user.prosituation);
        setFinancialCapacity(data.user.financialCapacity);
        setDesciption(data.user.desciption);
          });
      }, []);

const handleSubmit = () => {
    fetch('http://localhost:3000/users/update', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${user.token}` // Incluez le token dans l'en-tête Authorization
          },
          body: JSON.stringify({ 
            firstname,
            lastname,
            age,
            prosituation,
            financialCapacity,
            desciption,
        }),
    }).then(response => response.json()).then(data => {
        console.log(data)
       // data.result && dispatch(UpdateProfil(
    
    })
}

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <HeaderConnected/>
            </div>
            <div className={styles.container}>
                <div className={styles.leftContainer}>
                    <div className={styles.profilPic}>
                    {selectedImage && <img src={selectedImage} alt="Profil" className={styles.selectedImage} />}                        <select className={styles.avatarbutton} onChange={handleImageChange}>
                            <option value="">Choisis ton avatar</option>
                            <option value="./avatar1.jpg">Avatar 1</option>
                            <option  value="./avatar2.jpg">Avatar 2</option>
                            <option  value="./avatar3.jpg">Avatar 3</option>
                            <option value="./avatar4.jpg">Avatar 4</option>
                            <option  value="./avatar5.jpg">Avatar 5</option>
                            <option value="./avatar6.jpg">Avatar 6</option>
                            <input type="hidden" classname={styles.input} />
                        </select>
                    </div>
                </div>
            <div className={styles.rightContainer}>
                <h3 className={styles.h3}>Prénom:</h3>
                <input className={styles.input} onChange={(e) => setFirstname(e.target.value)}  value={firstname}/>
                <h3 className={styles.h3}>Nom:</h3>
                <input className={styles.input} onChange={(e) => setLastname(e.target.value)}  value={lastname}/>
                <h3 className={styles.h3}>Age:</h3>
                <input className={styles.input} onChange={(e) => setAge(e.target.value)} value={age}/>
                <h3 className={styles.h3}>Situation professionnelle:</h3>
                <input className={styles.input} onChange={(e) => setProsituation(e.target.value)} value={prosituation}/>
                <h3 className={styles.h3}>Capacité d'achat/prêt:</h3>
                <input className={styles.input} onChange={(e) => setFinancialCapacity(e.target.value)} value={financialCapacity}/>
                <h3 className={styles.h3}>Description profil:</h3>
                <input className={styles.input} onChange={(e) => setDesciption(e.target.value)} value={desciption}/>
                <br/>
                </div>
                </div>
                <button className={styles.button} onClick={handleSubmit}>Mettre à jour mon profil ✓</button>
        </div>
    )
}


export default Profil
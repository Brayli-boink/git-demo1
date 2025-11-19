import './foundhome.css'
import { Link } from 'react-router'
import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { ref, onValue } from "firebase/database";

export default function FoundHome() {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        const petsRef = ref(db, "foundPets");

        onValue(petsRef, (snapshot) => {
            const data = snapshot.val() || {};

            const petList = Object.entries(data).map(([id, pet]) => ({
                id,
                ...pet
            }));

            setPets(petList);
        });
    }, []);



    
    return (
        <div className="found-home-wrapper">
            {pets.length === 0 ? (
                <p className="empty-text">No found pets reported yet.</p>
            ) : (
                pets.slice(0, 4).map((pet) => (
                    <div className="pet-component" key={pet.id}>
                        
                        <img
                            src={
                                pet.petPhoto || '/src/assets/paw-print 4.png'}
                                alt={pet.petName || "Pet"}
                        />

                        <p>Name: <span className="font-normal">{pet.petName || "N/A"}</span></p>
                        <p>Species: <span className="font-normal">{pet.species || "N/A"}</span></p>
                        <p>Breed: <span className="font-normal">{pet.breed || "N/A"}</span></p>

                        <Link to={`/foundsingleview/${pet.id}`}>
                            <p id="single-view">Further Details</p>
                        </Link>
                    </div>
                ))
            )}
        </div>
    );
}
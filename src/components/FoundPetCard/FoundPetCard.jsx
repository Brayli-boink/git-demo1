import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { ref, onValue } from "firebase/database";

function FoundPetCard() {

    const [pets, setPets] = useState([]);

    useEffect(() => {
        const petsRef = ref(db, "foundPets"); 
        onValue(petsRef, (snapshot) => {
            const data = snapshot.val() || {};
            const petList = Object.entries(data).map(([id, pet]) => ({ id, ...pet }));
            setPets(petList);
        });
    }, []);

    return (
        <div className="lost-pets-wrapper flex flex-wrap gap-4 justify-center">
            {pets.length === 0 ? (
                <p>No found pets reported yet.</p>
            ) : (
                pets.map((pet) => (
                    <div key={pet.id} className="w-full sm:w-56 md:w-60 h-60 flex justify-center py-2 bg-[rgba(255,255,255,0.21)] border border-white rounded-xl shadow-md z-100">
                        <div className="flex flex-col gap-2 justify-between items-center">
                            <div className="w-24 h-24">
                                <img 
                                    src={pet.petPhoto || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} 
                                    alt={pet.petName || "Pet"} 
                                    className="w-full h-full object-cover rounded-full"
                                />
                            </div>
                            <div className="flex flex-col mt-2 text-center">
                                <p className="font-semibold">Name: <span className="font-normal">{pet.petName || "N/A"}</span></p>
                                <p className="font-semibold">Species: <span className="font-normal">{pet.species || "N/A"}</span></p>
                                <p className="font-semibold">Breed: <span className="font-normal">{pet.breed || "N/A"}</span></p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Link to={`/foundSingleView/${pet.id}`} className="text-sm cursor-pointer hover:text-[#A60530]">
                                    Further details <i className="fa-solid fa-arrow-right"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default FoundPetCard;
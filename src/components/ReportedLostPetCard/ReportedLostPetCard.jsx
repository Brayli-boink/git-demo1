import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase-config";
import { onValue, ref, remove } from "firebase/database";
import { Link } from "react-router";

function ReportedLostPetCard() {

    const [user, setUser] = useState();
    const [pets, setPets] = useState([]); // array of pets

    useEffect(() => {
        onAuthStateChanged(auth, (u) => {
            if (u) {
                setUser(u);

                onValue(ref(db, `lostPets`), (snapshot) => {
                    const data = snapshot.val() || {};
                    const userPets = Object.entries(data)
                        .filter(([id, pet]) => pet.lostPoster === u.uid)
                        .map(([id, pet]) => ({ id, ...pet }));
                    setPets(userPets);
                });
            } else {
                setUser(null);
                setPets([]);
            }
        });
    }, []);

    function deletePet(petId) {
    if (window.confirm("Are you sure you want to delete this pet report?")) {
        remove(ref(db, `lostPets/${petId}`))
            .then(() => {
                // Update local state so UI removes the deleted pet
                setPets(pets.filter(pet => pet.id !== petId));
            })
            .catch((error) => console.error("Error deleting pet:", error));
    }
}

    return (
  <div className="flex flex-wrap gap-4">
    {pets.length === 0 ? (
      <p className="text-center w-full">No lost pets reported yet.</p>
    ) : (
      pets.map((pet) => (
        <div
          key={pet.id}
          className="w-full sm:w-56 md:w-60 h-auto flex justify-center py-2 bg-[rgba(255,255,255,0.21)] border border-white rounded-xl shadow-md z-100"
        >
          <div className="flex flex-col gap-6 items-center">
            <div className="w-24 h-24">
              <img
                src={pet.photo || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                alt={pet.petName}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col text-center">
              <p className="font-semibold">{pet.petName}</p>
              <p className="font-semibold">{pet.species}</p>
              <p className="font-semibold">{pet.breed}</p>
            </div>
            <div className="flex gap-2">
                <Link 
                to={`/reportLostPet`} 
                className="px-8 py-2 text-[#A60530] bg-[#FFCC6D] rounded-full">
                Edit
                </Link>
              <button onClick={() => deletePet(pet.id)}
              className="px-8 py-2 text-[#F2C879] bg-[#A60530] rounded-full cursor-pointer">Delete</button>
            </div>
          </div>
        </div>
      ))
    )}
  </div>
    );
}

export default ReportedLostPetCard;
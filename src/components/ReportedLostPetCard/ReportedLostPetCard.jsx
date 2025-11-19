import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase-config";
import { onValue, ref, remove } from "firebase/database";
import { Link } from "react-router";

function ReportedLostPetCard() {

    const [user, setUser] = useState();
    const [pets, setPets] = useState([]); // array of pets
    const [showDeletePopup, setShowDeletePopup] = useState(false);
const [selectedPetId, setSelectedPetId] = useState(null);

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

    function openDeletePopup(petId) {
    setSelectedPetId(petId);
    setShowDeletePopup(true);
}

function confirmDelete() {
    remove(ref(db, `lostPets/${selectedPetId}`))
        .then(() => {
            setPets(pets.filter(p => p.id !== selectedPetId));
        })
        .catch(err => console.error("Error deleting pet:", err));
    setShowDeletePopup(false);
}

function cancelDelete() {
    setShowDeletePopup(false);
}

    return (
      <>
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
                src={pet.petPhoto || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
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
                to={`/editLostPet/${pet.id}`}  
                className="px-8 py-2 text-[#A60530] bg-[#FFCC6D] rounded-full">
                Edit
                </Link>
              <button onClick={() => openDeletePopup(pet.id)}
              className="px-8 py-2 text-[#F2C879] bg-[#A60530] rounded-full cursor-pointer">Delete</button>
            </div>
          </div>
        </div>
      ))
    )}
  </div>
  {/* DELETE POPUP */}
    {showDeletePopup && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
        <div className="bg-white p-6 rounded-2xl shadow-lg w-80 text-center z-[10000]">
          <h2 className="text-lg font-semibold mb-4">Delete Pet Report?</h2>
          <p className="text-gray-700 mb-6">Are you sure you want to delete this report?</p>

          <div className="flex justify-between gap-3">
            <button
              onClick={cancelDelete}
              className="flex-1 py-2 rounded-xl bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>

            <button
              onClick={confirmDelete}
              className="flex-1 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    )}
  </>
    );  
}

export default ReportedLostPetCard;
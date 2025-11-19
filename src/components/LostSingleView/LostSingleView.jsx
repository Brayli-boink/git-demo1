import './lostsingleview.css'
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { auth, db } from "../../firebase-config";
import { ref, onValue, remove, set, get } from "firebase/database";
import { onAuthStateChanged } from 'firebase/auth';

export default function LostSingleView() {

  const { id } = useParams(); 
    const navigate = useNavigate();
    const [pet, setPet] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    // Listen for auth state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);

    // Fetch pet data
    useEffect(() => {
        const lostRef = ref(db, `lostPets/${id}`);
        const foundRef = ref(db, `foundPets/${id}`);

        get(foundRef).then(snapshot => {
            if (snapshot.exists()) setPet(snapshot.val());
            else {
                get(lostRef).then(snapLost => {
                    if (snapLost.exists()) setPet(snapLost.val());
                    else navigate("/lostPets");
                });
            }
        });
    }, [id, navigate]);

    if (!pet) return <p>Loading...</p>;

    async function handleFound() {
        if (!pet) return;

        if (!currentUser) {
            alert("You must be logged in to mark as found.");
            navigate("/login");
            return;
        }

        // Create finder info from logged-in user
        const userRef = ref(db, `user/${currentUser.uid}`);
        const userSnap = await get(userRef);
        let userData;
        if (!userSnap.exists()) {
            userData = {
                name: currentUser.displayName || "N/A",
                email: currentUser.email || "N/A",
                contact: "N/A"
            };
            await set(userRef, userData);
        } else {
            userData = userSnap.val();
            userData.name = userData.name || "N/A";
            userData.email = userData.email || "N/A";
            userData.contact = userData.contact || "N/A";
        }

        // Move pet to foundPets with finder info
        const newPetData = {
            ...pet,
            status: "FOUND",
            dateFound: new Date().toISOString().split("T")[0],
            finderLastName: userData.lName,
            finderFirstName: userData.fName,
            finderEmail: userData.email,
            finderContact: userData.contactNumber
        };

        try {
            await set(ref(db, `foundPets/${id}`), newPetData);
            await remove(ref(db, `lostPets/${id}`));

            alert(`${pet.petName} has been marked as FOUND!`);
            navigate("/foundPets");
        } catch (error) {
            console.error("Error marking pet as found:", error);
            alert("Something went wrong. Please try again.");
        }
    }

    return (
        <>
        <div id='lost-single-container'>
            <div className='home-header'>
                <div id='text'>
                    <h1> Lost Pets </h1>
                    <p>Here you can see all the pets that have been reported missing. Check the list to see if you’ve spotted any of them, or learn more about each pet by tapping on their details.</p>
                </div>
                <img src='/src/assets/—Pngtree—happy dog and cat with_15913340 2.png' alt='homepage-illustration' id='img-header'/>
            </div>

            <div id='lost-pet'>
                <div id="pet-photo-container">
                <img src={pet.petPhoto || '/src/assets/—Pngtree—happy dog and cat with_15913340 2.png'} alt={pet.petName}/>
                </div>
                <div id='lost-details'>
                    <div id='deets-left'>
                        <p>Pet Name: {pet.petName || "N/A"}</p>
                        <p>Species: {pet.species || "N/A"}</p>
                        <p>Breed: {pet.breed || "N/A"}</p>
                        <p>Color/Markings: {pet.color || "N/A"}</p>
                        <p>Gender: {pet.gender || "N/A"}</p>
                        <p>Age/Approximate Age: {pet.age || "N/A"}</p>

                        <div id='extra-deets'>
                            <p>Date Lost: {pet.dateLost || "N/A"}</p>
                            <p>Last Seen: {pet.lastSeenLocation || "N/A"}</p>
                            <p>Additional Details: {pet.addDetails || "N/A"}</p>
                        </div>
                    </div>
                    <div id='deets-right'>
                        <p>Owner: {pet.ownerName || "N/A"}</p>
                        <p>Contact Number: {pet.conNum || "N/A"}</p>
                        <p>Email Address: {pet.email || "N/A"}</p>    
                    </div>
                </div>
                <button id='lost-click' onClick={handleFound}
                >MARK AS FOUND</button>
                <p id='warning'>Each reported found pets will be labeled as <span>‘FOUND’</span>.</p>
            </div>
            <button id='back-found-single' onClick={() => navigate(-1)}> BACK </button>
        </div>
        </>
    )
}


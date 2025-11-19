import './foundsingleview.css'
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { db } from "../../firebase-config";
import { ref, onValue } from "firebase/database";

export default function FoundSingleView() {

    const { id } = useParams(); 
    const navigate = useNavigate();
    const [pet, setPet] = useState(null);

    useEffect(() => {
        const petRef = ref(db, `foundPets/${id}`);
        onValue(petRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setPet(data);
            } else {
                navigate("/foundPets");
            }
        });
    }, [id, navigate]);

    if (!pet) return <p>Loading...</p>;

    return (
        <>
        <div id='found-single-container'>
            <div className='home-header'>
                <div id='text'>
                    <h1> Found Pets </h1>
                    <p>Here you can see all the pets that have been reported missing. Check the list to see if you’ve spotted any of them, or learn more about each pet by tapping on their details.</p>
                </div>
                <img src='/src/assets/—Pngtree—happy dog and cat with_15913340 2.png' alt='homepage-illustration' id='img-header'/>
            </div>

            <div id='found-pet'>
                <div id="pet-photo-container">
                <img src={pet.petPhoto || '/src/assets/—Pngtree—happy dog and cat with_15913340 2.png'} alt={pet.petName}/>
                </div>
                <div id='found-details'>
                    <div id='deets-left'>
                        <p>Pet Name: {pet.petName || "N/A"}</p>
                        <p>Species: {pet.species || "N/A"}</p>
                        <p>Breed: {pet.breed || "N/A"}</p>
                        <p>Color/Markings: {pet.color || "N/A"}</p>
                        <p>Gender: {pet.gender || "N/A"}</p>
                        <p>Age/Approximate Age: {pet.age || "N/A"}</p>

                        <div id='extra-deets'>
                            <p>Date found: {pet.dateFound ? pet.dateFound.split("T")[0] : "N/A"}</p>
                            <p>Last Seen: {pet.lastSeenLocation || "N/A"}</p>
                            <p>Additional Details: {pet.addDetails || "N/A"}</p>
                        </div>
                    </div>
                    <div id='deets-right'>
                        <p>Owner: {pet.ownerName || "N/A"}</p>
                        <p>Contact Number: {pet.conNum || "N/A"}</p>
                        <p>Email Address: {pet.email || "N/A"}</p><br /><br />
                        <p>FOUNDER INFORMATION:</p>
                        <p>Name: {pet.finderFirstName + " " + pet.finderLastName || "N/A"}</p>
                        <p>Email: {pet.finderEmail || "N/A"}</p>
                        <p>Contact Number: {pet.finderContact || "N/A"}</p>
                    </div>
                </div>
                <p id='warning'>This pet is already marked as <span>‘FOUND’</span>.</p>
            </div>
            <button id='back-found-single' onClick={() => navigate(-1)}> BACK </button>
        </div>
        </>
    )
}

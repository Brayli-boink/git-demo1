import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { auth, db } from "../../firebase-config";
import { get, onValue, ref, set } from "firebase/database";

function ReportLostPetForm() {

const navigate = useNavigate();

const [petName, setPetName] = useState();
const [species, setSpecies] = useState();
const [breed, setBreed] = useState();
const [color, setColor] = useState();
const [gender, setGender] = useState();
const [dateLost, setDateLost] = useState();
const [lastSeenLocation, setLastSeenLocation] = useState();
const [addDetails, setAddDetails] = useState();
const [ownerName, setOwnerName] = useState();
const [conNum, setConNum] = useState();
const [email, setEmail] = useState();
const [age, setAge] = useState();
const [picture, setPicture] = useState();

    const [user, setUser] = useState(); // holds the users
    const [userData, setUserData] = useState(); // holds user

    useEffect(() => {
            onAuthStateChanged(auth, (u) => {
                if (u) {
                    setUser(u);
                    onValue(ref(db, `user/${u.uid}`), (snapshot) => {
                        setUserData(snapshot.val());
                    })
                }
                else {
                    setUser(null);
                    setUserData(null);
                }
            })
        }, []);

    
        function uploadLostPet() {
    if (!user) return; // ensure user is logged in

    let storeLostPet = {
        lostPoster: user.uid,
        status: "lost",
        petName: petName,
        species: species,
        breed: breed,
        color: color,
        gender: gender,
        dateLost: dateLost,
        lastSeenLocation: lastSeenLocation,
        addDetails: addDetails,
        ownerName: ownerName,
        conNum: conNum,
        email: email,
        age: age,
        petPhoto: picture
    };

    const petId = Math.random().toString(36).substr(2, 9); // e.g., "k3j4h9a1x"

    set(ref(db, `/lostPets/${petId}`), storeLostPet)
        .then(() => {
            navigate("/reportedLostPets");
        })
        .catch((error) => {
            console.error("Error uploading lost pet:", error);
        });
}
        function verifyPetName(evt){
            let tempPetName = evt.target.value;
            let errPetName = document.querySelector("#errPetName");
            errPetName.innerHTML = "";
            setPetName(null);

            if (tempPetName.trim().length === 0) {
                errPetName.innerHTML = "Blank spaces are not allowed!";
             }
            else if(tempPetName.trim().length < 2){
                errPetName.innerHTML = "Pet name must be at least 2 letters!";
            }
            else{
                setPetName(tempPetName);
            }
        }

        function verifySpecies(evt){
            let tempSpecies = evt.target.value;
            let errSpecies = document.querySelector("#errSpecies");
            errSpecies.innerHTML = "";
            setSpecies(null);

            if (tempSpecies.trim().length === 0) {
                errSpecies.innerHTML = "Blank spaces are not allowed!";
             }
            else if(tempSpecies.trim().length < 2){
                errSpecies.innerHTML = "Species must be at least 2 letters!";
            }
            else{
                setSpecies(tempSpecies);
            }
        }

        function verifyBreed(evt){
            let tempBreed = evt.target.value;
            let errBreed = document.querySelector("#errBreed");
            errBreed.innerHTML = "";
            setBreed(null);

            if (tempBreed.trim().length === 0) {
                errBreed.innerHTML = "Blank spaces are not allowed!";
             }
            else if(tempBreed.trim().length < 2){
                errBreed.innerHTML = "Breed must be at least 2 letters!";
            }
            else{
                setBreed(tempBreed);
            }
        }

        function verifyColor(evt){
            let tempColor = evt.target.value;
            let errColor = document.querySelector("#errColor");
            errColor.innerHTML = "";
            setColor(null);

            if (tempColor.trim().length === 0) {
                errColor.innerHTML = "Blank spaces are not allowed!";
             }
            else if(tempColor.trim().length < 2){
                errColor.innerHTML = "Color must be at least 2 letters!";
            }
            else{
                setColor(tempColor);
            }
        }

        function verifyGender(evt) {
            let tempGender = evt.target.value;
            let errGender = document.querySelector("#errGender");
            errGender.innerHTML = "";
            setGender(null);

            if (!tempGender) {
                errGender.innerHTML = "Please select a gender!";
            } else {
                setGender(tempGender);
            }
        }

        function verifyDateLost(evt){
            let tempDate = evt.target.value;
            let errDate = document.querySelector("#errDateLost");
            errDate.innerHTML = "";
            setDateLost(null);

            if (!tempDate) {
                errDate.innerHTML = "PLease select a date!";
                return;
             }

            const selectedDate = new Date(tempDate);
            const today = new Date();
            selectedDate.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate > today) {
            errDate.innerHTML = "Date cannot be in the future!";
            return;
            }
            else{
            setDateLost(tempDate);
            }
        }

        function verifyLastSeenLocation(evt) {
            let tempLocation = evt.target.value;
            let errLocation = document.querySelector("#errLastSeenLocation");
            errLocation.innerHTML = "";
            setLastSeenLocation(null);

             if (tempLocation.trim().length === 0) {
                errLocation.innerHTML = "Blank spaces are not allowed!";
             }
            else if(tempLocation.trim().length < 2){
                errLocation.innerHTML = "Location must be at least 2 letters!";
            }
            else{
                setLastSeenLocation(tempLocation);
            }
        }

        function verifyAdditionalDetails(evt) {
            let tempAddDetails = evt.target.value;
            let errAddDetails = document.querySelector("#errAdditionalDetails");
            errAddDetails.innerHTML = "";
            setAddDetails(null);

             if (tempAddDetails.trim().length === 0) {
                errAddDetails.innerHTML = "Blank spaces are not allowed!";
             }
            else if(tempAddDetails.trim().length < 2){
                errAddDetails.innerHTML = "Additional details must be at least 2 letters!";
            }
            else{
                setAddDetails(tempAddDetails);
            }
        }

        function verifyOwnerName(evt) {
            let tempOwnerName = evt.target.value;
            let errOwnerName = document.querySelector("#errOwnerName");
            errOwnerName.innerHTML = "";
            setOwnerName(null);

             if (tempOwnerName.trim().length === 0) {
                errOwnerName.innerHTML = "Blank spaces are not allowed!";
             }
            else if(tempOwnerName.trim().length < 2){
                errOwnerName.innerHTML = "Owner name must be at least 2 letters!";
            }
            else{
                setOwnerName(tempOwnerName);
            }
        }

        function verifyContactNumber(evt){
            let tempNumber = evt.target.value;
            let errNumber = document.querySelector("#errConNum");
            errNumber.innerHTML = "";
            setConNum(null);
            
            if (!tempNumber || tempNumber.trim() === "") {
            errNumber.innerHTML = "Blank spaces are not allowed!";
            }
            else if (!/^[0-9]+$/.test(tempNumber)) {
                errNumber.innerHTML = "Valid number cannot contain letters or symbols!";
            }
            else if (!tempNumber.startsWith("09")){
                errNumber.innerHTML = "Valid number must start with (09)";
            }
            else if (tempNumber.trim().length !== 11) {
                errNumber.innerHTML = "Valid number must be exactly 11 digits!";
            }
            else{
                setConNum(tempNumber);
            }
        }

        function verifyEmail(evt){
            let tempEmail = evt.target.value;
            let errEmail = document.querySelector("#errEmail");
            errEmail.innerHTML = "";
            setEmail(null);

            if(tempEmail.trim().length <= 0){
                errEmail.innerHTML = "Blank spaces are not allowed!";
            }else if(!tempEmail.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
                errEmail.innerHTML = "Invalid email address!";
            }
            else{
                setEmail(tempEmail);
            }
        }

        function verifyAge(evt){
            let tempAge = evt.target.value;
            let errAge = document.querySelector("#errAge");
            errAge.innerHTML = "";
            setAge(null);

            if(tempAge.trim().length <= 0){
                errAge.innerHTML = "Blank spaces are not allowed!";
                return;
            }
            if (!/^\d+$/.test(tempAge)) {
                errAge.innerHTML = "Age must be a number!";
                return;
            }
            else{
                setAge(tempAge);
            }
        }
        
        function verifyPetPhoto(evt) {
            let tempPhoto = evt.target.value;
            let errPhoto = document.querySelector("#errPicture");
            errPhoto.innerHTML = "";
            setPicture(null);

            if (tempPhoto.trim().length === 0) {
                errPhoto.innerHTML = "Blank spaces are not allowed!";
                return;
            }
            else if (!tempPhoto.startsWith("https://")) {
                errPhoto.innerHTML = "URL must start with https://";
                return;
            }
            else if (!tempPhoto.toLowerCase().endsWith(".jpg") && 
            !tempPhoto.toLowerCase().endsWith(".png")) {
                errPhoto.innerHTML = "Invalid picture format. Must end with png or jpg";
                return;
            }    
            setPicture(tempPhoto);
    }



        


    return (
        <div className="w-full sm:w-[95%] md:w-[85%] h-auto flex flex-col bg-[rgba(255,255,255,0.21)] rounded-3xl border border-white  shadow-md">
            <div className='flex gap-4'>
                <div className="flex flex-col w-2/4 h-full px-4 py-4 rounded-t-3xl rounded-b-3xl">
                    
                    <p className='text-2xl sm:text-3xl font-semibold text-[#A60530]'>A. Pet Information</p>
                    
                    <p className='text-lg text-[#583523]' required > Pet Name <span className="text-red-600"> *</span></p>
                    <input type="text" placeholder='The name of the lost pet' className='w-full px-3 py-2 rounded-full border' 
                    onInput={(evt)=>verifyPetName(evt)} value={petName}/>
                    <p className="text-[13px] text-red-600 mt-[5px] h-[10px]" id="errPetName"></p>
                    
                    <p className='text-lg text-[#583523]'>Species<span className="text-red-600"> *</span></p>
                    <input type="text" placeholder='Select type (Dog, Cat, Bird, etc.) ⏷' className='w-full px-3 py-2 rounded-full border' 
                    onInput={(evt)=>verifySpecies(evt)} value={species}/>
                    <p className="text-[13px] text-red-600 mt-[5px] h-[10px]" id="errSpecies"></p>
                    
                    <p className='text-lg text-[#583523]'>Breed<span className="text-red-600"> *</span></p>
                    <input type="text" placeholder='Breed of the pet (e.g., Aspin, Shih Tzu, Persian)' className='w-full px-3 py-2 rounded-full border'
                    onInput={(evt)=>verifyBreed(evt)} value={breed}/>
                    <p className="text-[13px] text-red-600 mt-[5px] h-[10px]" id="errBreed"></p>

                    <p className='text-lg text-[#583523]'>Color/Markings<span className="text-red-600"> *</span></p>
                    <input type="text" placeholder='Description of pet’s color, patterns, or unique marks' className='w-full h-18 px-3 py-1    rounded-2xl border'
                    onInput={(evt)=>verifyColor(evt)} value={color}/>
                    <p className="text-[13px] text-red-600 mt-[5px] h-[10px]" id="errColor"></p>
                    
                    <p className='text-lg text-[#583523]'>Gender<span className="text-red-600"> *</span></p>
                    <div className='flex gap-2'>
                        <input type="radio" name="gender"  value="Male" onChange={(evt)=>verifyGender(evt)} checked={gender === "Male"}/>
                        <p className="text-lg text-[#583523]">Male</p>
                    </div>
                    <div className='flex gap-2'>
                        <input type="radio" name="gender" value="Female" onChange={(evt)=>verifyGender(evt)} checked={gender === "Female"} />
                        <p className="text-lg text-[#583523]">Female</p>
                    </div>
                    <p className="text-[13px] text-red-600 mt-[5px] h-[10px]" id="errGender"></p>

                    <p className='text-2xl sm:text-3xl font-semibold text-[#A60530]'>B.Lost Details</p>
                    
                    <p className='text-lg text-[#583523]'>Date Lost<span className="text-red-600"> *</span></p>
                    <input type="date" className='w-full px-3 py-2 rounded-full border'
                    onInput={(evt)=>verifyDateLost(evt)} value={dateLost}/>
                    <p className="text-[13px] text-red-600 mt-[5px] h-[10px]" id="errDateLost"></p>
                    
                    <p className='text-lg text-[#583523]'>Last Seen Location<span className="text-red-600"> *</span></p>
                    <input type="text" placeholder='Address or description of the last location' className='w-full px-3 py-2 rounded-full border'
                    onInput={(evt)=>verifyLastSeenLocation(evt)} value={lastSeenLocation}/>
                    <p className="text-[13px] text-red-600 mt-[5px] h-[10px]" id="errLastSeenLocation"></p>
                    
                    <p className='text-lg text-[#583523]'>Additional Details<span className="text-red-600"> *</span></p>
                    <input type="text" placeholder='Any extra information about how the pet got lost, possible behavior, etc.' className='w-full h-12 px-3 py-2 rounded-full border'
                    onInput={(evt)=>verifyAdditionalDetails(evt)} value={addDetails}/>
                    <p className="text-[13px] text-red-600 mt-[5px] h-[10px]" id="errAdditionalDetails"></p>
                    
                    <p className='text-2xl sm:text-3xl font-semibold text-[#A60530]'>C. Owner Information</p>
                    
                    <p className='text-lg text-[#583523]'>Owner Name<span className="text-red-600"> *</span></p>
                    <input type="text" placeholder='Name of the Owner' className='w-full px-3 py-2 rounded-full border' 
                    onInput={(evt)=>verifyOwnerName(evt)} value={ownerName}/>
                    <p className="text-[13px] text-red-600 mt-[5px] h-[10px]" id="errOwnerName"></p>
                    
                    <p className='text-lg text-[#583523]'>Contact Number<span className="text-red-600"> *</span></p>
                    <input type="text" placeholder='Contact number of the owner' className='w-full px-3 py-2 rounded-full border' 
                    onInput={(evt)=>verifyContactNumber(evt)} value={conNum}/>
                    <p className="text-[13px] text-red-600 mt-[5px] h-[10px]" id="errConNum"></p>
                    
                    <p className='text-lg text-[#583523]'>Email Address<span className="text-red-600"> *</span></p>
                    <input type="text" placeholder='Email address of the owner' className='w-full px-3 py-2 rounded-full border' 
                    onInput={(evt)=>verifyEmail(evt)} value={email}/>
                    <p className="text-[13px] text-red-600 mt-[5px] h-[10px]" id="errEmail"></p>
                
                </div>
                <div className="w-2/4 h-full px-2 py-4 flex flex-col items-start justify-items-start  rounded-t-3xl rounded-b-3xl">
                    {/* <p className='text-3xl font-semibold text-[#A60530] hidden block'>A. Pet Information</p> */}
                    
                    <p className='text-lg text-[#583523]'>Age/Approximate Age<span className="text-red-600"> *</span></p>
                    <input type="text" placeholder='Pet’s age' className='w-full px-3 py-2 rounded-full border'
                    onInput={(evt)=>verifyAge(evt)} value={age}/>
                    <p className="text-[13px] text-red-600 mt-[5px] h-[10px]" id="errAge"></p>
                    
                    <p className='text-lg text-[#583523]'>Photo of Pet<span className="text-red-600"> *</span></p>
                    <input type="text" placeholder='Upload a clear image of the lost pet (JPG or PNG)' className='w-full px-3 py-2 rounded-full border' 
                    onInput={(evt)=>verifyPetPhoto(evt)} value={picture}/>
                    <p className="text-[13px] text-red-600 mt-[5px] h-[10px]" id="errPicture"></p>
                
                </div>
            </div>
            <div className='w-full flex flex-col gap-2 items-center py-4 rounded-3xl'>
                {petName && species && breed && color && gender && dateLost &&
                        lastSeenLocation && addDetails && ownerName && conNum && email && age && picture ? (
                <button onClick={uploadLostPet} 
                className="w-64 py-4 text-xl font-semibold text-[#FFCC6D] uppercase bg-[#A60530] rounded-full cursor-pointer flex items-center justify-center" >
                    Report Lost Pet</button>
                        ):(
                <button  disabled
                className="block w-64 text-xl sm:text-2xl font-semibold bg-[#7a0424] text-[#F2C879] py-2 rounded-full uppercase cursor-not-allowed"> 
                Report Lost Pet
                </button>              
                        )}
                <div className='w-[75%] text-center'>
                    <p className='text-sm italic text'>Note: This form will be saved and automatically be uploaded in the Lost Pets Page. You can also edit or delete  this form in your Reported Lost Pets. </p>
                </div>
            </div>
        </div>
    )
}

export default ReportLostPetForm;
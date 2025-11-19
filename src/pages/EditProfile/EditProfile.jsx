import {  useNavigate } from 'react-router';
import './editprofile.css'
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { get, ref, set } from 'firebase/database';
import { auth, db } from '../../firebase-config';

export default function EditProfile() {

    const navigate = useNavigate();

    const [user, setUser] = useState(); 
    const [userData, setUserData] = useState();
    const [fName, setFName] = useState();
    const [lName, setLName] = useState();
    const [username, setUsername] = useState();
    const [contactNumber, setContactNumber] = useState();
    const [email, setEmail] = useState();
    const [photoURL, setPhotoURL] = useState(""); // profile picture
   
    
        useEffect(()=>{
            onAuthStateChanged(auth, (u)=>{
                setUser(u);
                get(ref(db, `user/${u.uid}`)).then((snapshot)=>{
                const data = snapshot.val();  
                setUserData(data);           
                setFName(data.fName);
                setLName(data.lName);   
                setUsername(data.username);
                setContactNumber(data.contactNumber);
                setEmail(data.email);
                setPhotoURL(data.photoURL || '/src/assets/user 2.png');
                })      
            })
        },[]);

    function updateUserData() {
                let storeUserInformation = {
                fName: fName,
                lName: lName,
                username: username,
                contactNumber: contactNumber,
                email: email,
                photoURL: photoURL
            }
                set(ref(db, `/user/${user.uid}`), storeUserInformation).then(()=>{
                navigate("/profile");
            })
        }

    function handlePhotoURL() {
    const url = prompt("Enter image URL (must start with https://):");
        if (!url) return; 

            if (!url.startsWith("https://")) {
            alert("Invalid URL. It must start with https://");
            return;
        }
            else if (!url.toLowerCase().endsWith(".jpg") && 
            !url.toLowerCase().endsWith(".png")) {
            alert("Invalid picture format. Must end with png or jpg");
            return;
            }
    setPhotoURL(url);
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

        function verifyFName(evt){
            let tempFName = evt.target.value;
            let errFName = document.querySelector("#errFName");
            errFName.innerHTML = "";
            setFName(null);

            if (tempFName.trim().length === 0) {
                errFName.innerHTML = "Blank spaces are not allowed!";
             }
            else if (!/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(tempFName)) {
                errFName.innerHTML = "First name must contain only letters!";
            }
            else if(tempFName.trim().length < 2){
                errFName.innerHTML = "First name must be at least 2 letters!";
            }
            else{
                setFName(tempFName);
            }
        }

        function verifyLName(evt){
            let tempLName = evt.target.value;
            let errLName = document.querySelector("#errLName");
            errLName.innerHTML = "";
            setLName(null);

            if (tempLName.trim().length === 0) {
                errLName.innerHTML = "Blank spaces are not allowed!";
             }
            else if (!/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(tempLName)) {
                errLName.innerHTML = "Last name must contain only letters!";
            }
            else if(tempLName.trim().length < 2){
                errLName.innerHTML = "Last name must be at least 2 letters!";
            }
            else{
                setLName(tempLName);
            }
        }

        function verifyUsername(evt) {
            let tempUser = evt.target.value.trim();
            let errUser = document.querySelector("#errUsername");
            errUser.innerHTML = "";
            setUsername(null); 

            if (tempUser.length <= 0) {
                errUser.innerHTML = "Blank spaces are not allowed!";
            } 
            else if (tempUser.length < 5) {
                errUser.innerHTML = "Username must be at least 5 characters!";
            } 
            else if (!tempUser.match(/^[A-Za-z]/)) {
                errUser.innerHTML = "Username must start with a letter!";
            } 
            else if (!tempUser.match(/^[A-Za-z][A-Za-z0-9._]{4,19}$/)) {
                errUser.innerHTML = "Username can only contain letters, numbers, dots, or underscores!";
            } 
            else if (tempUser.endsWith(".") || tempUser.endsWith("_")) {
                errUser.innerHTML = "Username cannot end with a dot or underscore!";
            } 
            else {
                setUsername(tempUser);
            }
        }
        function verifyContactNumber(evt){
            let tempNumber = evt.target.value;
            let errNumber = document.querySelector("#errContactNumber");
            errNumber.innerHTML = "";
            setContactNumber(null);

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
                setContactNumber(tempNumber);
            }
        }
       
    return (
        <>
        <div className="edit-container">
            <h1>Edit your Profile</h1>

             <div className="profile-pic-section">
        <img src={photoURL} alt="user-icon" className="rounded-full w-32 h-32 sm:w-36 sm:h-36 object-cover" />
        <button type="button" onClick={handlePhotoURL} id='edit-photo'>
          Upload photo
        </button>
      </div>

                {user && userData &&
                    <div id='edit-form'>
                        <p> First Name </p>
                        <input type="text" defaultValue={userData.fName} onChange={(e)=> {setFName(e.target.value); verifyFName(e);}} />
                        <p className="errorMsg" id="errFName"></p>                        <p> Last Name </p>
                        <input type="text" defaultValue={userData.lName} onChange={(e)=> {setLName(e.target.value); verifyLName(e)}} />
                        <p className="errorMsg" id="errLName"></p>
                        <p> Username </p>
                        <input type="text" defaultValue={userData.username} onChange={(e)=> {setUsername(e.target.value); verifyUsername(e);}}/>
                        <p className="errorMsg" id="errUsername"></p>
                        <p> Contact Number </p>
                        <input type="text" defaultValue={userData.contactNumber} onChange={(e)=> {setContactNumber(e.target.value); verifyContactNumber(e);}}/>
                        <p className="errorMsg" id="errContactNumber"></p>
                        <p> Email </p>
                        <input type="text" defaultValue={userData.email} onChange={(e)=>setEmail(e.target.value)} readOnly/>
                    </div>
                }
                
            <div id='action-buttons'> 
                {fName && lName && contactNumber && username ? (
                <button id='save-btn' onClick={updateUserData}>
                Save</button>
                ) : (
                <button id='save-btn-disabled'>
                Save
                </button>
)}
                <button onClick={()=> navigate(-1)} id='cancel-btn'>Cancel</button>
            </div>
        </div> 
        </>
    )
}
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
                })      
            })
        },[]);

    function updateUserData() {
                let storeUserInformation = {
                fName: fName,
                lName: lName,
                username: username,
                contactNumber: contactNumber,
                email: email
            }
                set(ref(db, `/user/${user.uid}`), storeUserInformation).then(()=>{
                navigate("/profile");
            })
        }
       
    return (
        <>
        <div className="edit-container">
            <h1>Edit your Profile</h1>
            <img src="/src/assets/user 2.png" alt="user-icon" id='profile-pic' />
            <button id='edit-photo'>Edit Photo</button>

                {user && userData &&
                    <div id='edit-form'>
                        <p> First Name </p>
                        <input type="text" defaultValue={userData.fName} onChange={(e)=>setFName(e.target.value)} />
                        <p> Last Name </p>
                        <input type="text" defaultValue={userData.lName} onChange={(e)=>setLName(e.target.value)} />
                        <p> Username </p>
                        <input type="text" defaultValue={userData.username} onChange={(e)=>setUsername(e.target.value)}/>
                        <p> Contact Number </p>
                        <input type="text" defaultValue={userData.contactNumber} onChange={(e)=>setContactNumber(e.target.value)}/>
                        <p> Email </p>
                        <input type="text" defaultValue={userData.email} onChange={(e)=>setEmail(e.target.value)} readOnly/>
                    </div>
                }
                
            <div id='action-buttons'> 
                <button id='save-btn' onClick={updateUserData}>Save</button>
                <button onClick={()=> navigate(-1)} id='cancel-btn'>Cancel</button>
            </div>
        </div> 
        </>
    )
}
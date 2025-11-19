import { Link, useNavigate } from "react-router";
import pawPrint from '../../assets/paw-print 4.png'
import { useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase-config";
import { ref, set } from "firebase/database";

function Register() {

    const [fName, setFName] = useState();
    const [lName, setLName] = useState();
    const [username, setUsername] = useState();
    const [contactNumber, setContactNumber] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    

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

        function verifyPassword(evt){
            let tempPass = evt.target.value;
            let errPass = document.querySelector("#errPassword");
            errPass.innerHTML = "";
            setPassword(null);

            if(tempPass.length <= 0){
                errPass.innerHTML = "Blank spaces are not allowed!";
            }
            else if(tempPass.length < 8){
                errPass.innerHTML = "Password must be at least 8 characters!";
            }
            else if(!tempPass.match(/[A-Z]/)){
                errPass.innerHTML = "Password must contain at least 1 uppercase letter!";
            }
            else if(!tempPass.match(/[a-z]/)){
                errPass.innerHTML = "Password must contain at least 1 lowercase letter!";
            }
            else if(!tempPass.match(/[0-9]/)){
                errPass.innerHTML = "Password must contain at least 1 number!";
            }
            else if(!tempPass.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/)){
                errPass.innerHTML = "Password must contain at least 1 special character!";
            }
            else{
                setPassword(tempPass);
            }
        }

        function verifyConfirmPassword(evt){
            let tempConfirmPass = evt.target.value;
            let errConfirmPass = document.querySelector("#errConfirmPassword");
            errConfirmPass.innerHTML = "";
            setConfirmPassword(null);

            
            if (!tempConfirmPass || tempConfirmPass.trim() === "") {
            errConfirmPass.innerHTML = "Blank spaces are not allowed!";
            }
            else if (tempConfirmPass !== password) {
            errConfirmPass.innerHTML = "Passwords do not match!";
            }
            else {
            setConfirmPassword(tempConfirmPass);
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

        function registerUser() {
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            const user = userCredential.user;

            const storeUserInformation = {
            fName: fName,
            lName: lName,
            username: username,
            contactNumber: contactNumber,
            email: email
        };
            set(ref(db, `/user/${user.uid}`), storeUserInformation)
            // .then(() => auth.signOut()) // Sign out after saving data
            // .then(() => navigate("/login")); // Redirect to login
        })
            .catch((error) => {
            alert(error.message);
            setEmail("");
            setPassword("");
            setConfirmPassword("");
        });
    }

        
    return (
        <div className="flex justify-center items-center w-full h-auto mt-8">
            <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[50%] max-w-2xl flex flex-col items-center gap-8 p-8 bg-[rgba(255,255,255,0.21)] rounded-3xl shadow-2xl">
                <div className="flex flex-col items-center">
                    <img src={pawPrint} alt="Paw print logo" className="w-16 h-16 z-100" />
                    <div className="flex flex-col gap-1 items-center">
                        <p className="text-4xl sm:text-5xl font-semibold">Welcome to</p>
                        <p className="text-4xl sm:text-5xl font-bold text-[#A60530]">SafePaws</p>
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-full sm:w-[80%] md:w-[70%]">
                    <p className="text-base sm:text-lg text-center">To help all our pet owners in this community, even you, by joining us. </p>
                    <div>
                        <p>First Name</p>
                        <input type="text" placeholder="First Name" className="border rounded-full px-6 py-2 w-full text-sm sm:text-base"
                        onInput={(evt)=>verifyFName(evt)} value={fName}/>
                        <p className="text-[13px] text-red-600 mt-[5px] h-[10px]" id="errFName"></p>
                    </div>

                    <div>
                        <p>Last Name</p>
                        <input type="text" placeholder="Last Name" className="border rounded-full px-6 py-2 w-full text-sm sm:text-base"
                        onInput={(evt)=>verifyLName(evt)} value={lName}/>
                        <p className="text-[13px] text-red-600 mt-[5px] h-[10px]" id="errLName"></p>
                    </div>

                    <div>
                        <p>Username</p>
                        <input type="text" placeholder="Username" className="border rounded-full px-6 py-2 w-full text-sm sm:text-base"
                        onInput={(evt)=>verifyUsername(evt)} value={username}/>
                        <p className="text-[13px] text-red-600 mt-[5px] h-[10px]" id="errUsername"></p>
                    </div>

                    <div>
                        <p>Contact Number</p>
                        <input type="email" placeholder="Contact Number" className="border rounded-full px-6 py-2 w-full text-sm sm:text-base"
                        onInput={(evt)=>verifyContactNumber(evt)} value={contactNumber}/>
                        <p className="text-[13px] text-red-600 mt-[5px] h-[10px]" id="errContactNumber"></p>
                    </div>

                    <div>
                        <p>Email</p>
                        <input type="email" placeholder="Email" className="border rounded-full px-6 py-2 w-full text-sm sm:text-base"
                        onInput={(evt)=>verifyEmail(evt)} value={email}/>
                        <p className="text-[13px] text-red-600 mt-[5px] h-[10px]" id="errEmail"></p>
                    </div>

                    <div className="relative"> <p>Password</p>
                        <input
                        type={showPassword ? "text" : "password"}
                        placeholder="e.g., Admin@123"
                        className="border rounded-full px-6 py-2 w-full text-sm sm:text-base pr-12"
                        onInput={(evt) => verifyPassword(evt)}
                        value={password}/>
                        <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-[59%] -translate-y-1/2 text-gray-600">
                        {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        <circle cx="12" cy="12" r="3" strokeWidth="1.8"></circle>
                        </svg>
                        ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                        d="M3 3l18 18M10.58 10.58A3 3 0 0113.4 13.4M7.94 7.94A7.003 7.003 0 0112 7c4.477 0 8.268 2.943 9.542 7a12.297 12.297 0 01-1.26 2.63M6.7 6.7C4.31 8.24 2.75 10.46 2.458 12c.64 2.04 2.05 3.9 4.01 5.2A11.76 11.76 0 0012 19c1.62 0 3.17-.31 4.57-.88" />
                        </svg>
                        )}
                    </button> <p className="text-[13px] text-red-600 mt-[5px] h-[10px]" id="errPassword"></p>
                    </div>

                    <div>
                        <p>Confirm Password</p>
                        <input type="password" placeholder="Confirm Password" className="border rounded-full px-6 py-2 w-full text-sm sm:text-base"
                        onInput={(evt)=>verifyConfirmPassword(evt)} value={confirmPassword}/>
                        <p className="text-[13px] text-red-600 mt-[5px] h-[10px]" id="errConfirmPassword"></p>
                    </div>
                    
                    <div className="block w-full mt-2">
                    {email && fName && lName && username && password && confirmPassword ? (
                    <button
                    onClick={registerUser}
                    className="block w-full text-center text-xl sm:text-2xl font-semibold bg-[#A60530] text-[#F2C879] py-2 rounded-full uppercase cursor-pointer"> 
                    Sign Up
                    </button>
                    ) : (
                    <button onClick={registerUser}
                    disabled
                    className="block w-full text-xl sm:text-2xl font-semibold bg-[#7a0424] text-[#F2C879] py-2 rounded-full uppercase cursor-not-allowed"
                    >
                    Sign Up
                    </button>
                    )}
                    </div>

                    <div className="flex justify-center gap-1">
                        <p>Already have an account?</p>
                        <Link to="/login" className="cursor-pointer hover:text-[#FF0000] text-[#A60530] hover:decoration-[#FF0000] underline decoration-[#A60530]">Sign-in</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;
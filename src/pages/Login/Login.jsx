import { Link, useNavigate } from "react-router";
import pawPrint from '../../assets/paw-print 4.png'
import { useState } from "react";
import { auth } from "../../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [emailValid, setEmailValid] = useState(false);
    const [password, setPassword] = useState();
    const [passwordValid, setPasswordValid] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    function loginUser() {
    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            setTimeout(() => {
                navigate("/homepage");
            }, 3000);
        })
        .catch((error) => {
            let message = "";

            switch (error.code) {
                case "auth/invalid-email":
                    message = "Invalid email address format.";
                    break;

                case "auth/user-disabled":
                    message = "This account has been disabled. Please contact support.";
                    break;

                case "auth/user-not-found":
                    message = "No account found with this email.";
                    break;

                case "auth/missing-password":
                    message = "Password field is empty.";
                    break;

                case "auth/wrong-password":
                    message = "Invalid user credentials.";
                    break;

                case "auth/too-many-requests":
                    message = "Too many failed login attempts. Please try again later.";
                    break;

                default:
                    message = "Invalid user credentials.";
                    break;
            }

            // show the error
            setResponseMessage(message);
            setEmail("");
            setPassword("");
            setEmailValid(false);
            setPasswordValid(false);

            // hide the error after 3 seconds
            setTimeout(() => {
                setResponseMessage("");
            }, 2500);

            console.error("Oops:", error.message);
        });
}

        function verifyEmail(evt){
            let tempEmail = evt.target.value;
            let errEmail = document.querySelector("#errEmail");
            errEmail.innerHTML = "";
            // setEmail(null);

            if(tempEmail.trim().length <= 0){
                errEmail.innerHTML = "Blank spaces are not allowed!";
                setEmailValid(false);
            }else if(!tempEmail.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
                errEmail.innerHTML = "Invalid email address!";
                setEmailValid(false);
        }else{
            setEmailValid(true);
        }
    }
    
        function verifyPassword(evt){
            let tempPass = evt.target.value;
            let errPass = document.querySelector("#errPassword");
            errPass.innerHTML = "";
            // setPassword(null);

            if(tempPass.length <= 0){
                errPass.innerHTML = "Blank spaces are not allowed!";
                setPasswordValid(false);
            }
            else if(tempPass.length < 8){
                errPass.innerHTML = "Password must be at least 8 characters!";
                setPasswordValid(false);
            }else{
                setPasswordValid(true);
            }
        }

    return (
        <div className="flex justify-center items-center w-full h-auto mt-8">
            <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[50%] max-w-2xl flex flex-col items-center gap-8 p-8 bg-[rgba(255,255,255,0.21)] rounded-3xl shadow-2xl">
                <div className="flex flex-col items-center">
                    <img src={pawPrint} alt="Paw print logo" className="w-16 h-16 z-100" />
                    <p className="text-4xl sm:text-5xl text-black font-semibold">Welcome back to</p>
                    <p className="text-4xl sm:text-5xl font-bold text-[#A60530]">SafePaws!</p>
                </div>
                <div className="flex flex-col gap-4 w-full sm:w-[80%] md:w-[70%]">
                    <p className="text-base sm:text-lg text-center">To help all our pet owners in this community, even you, by joining us.</p>
                    <div>
                        {responseMessage && (
                            <div className="mb-4 px-4 py-2 text-center font-semibold rounded-sm bg-[#A60530] text-[#F2C879] border-2 border-[#ff6a92]">
                                {responseMessage}
                            </div>
                        )}
                        <p>Email</p>
                        <input type="text" placeholder="Enter your email" value={email} className="border rounded-full px-6 py-2 w-full text-sm sm:text-base"
                            onChange={(e) => setEmail(e.target.value)} onInput={verifyEmail}/>
                            <p className="text-[13px] text-red-600 mt-[5px] h-[10px]" id="errEmail"></p>
                    </div>
                    {/*  <div>
                        <p>Password</p>
                        <input type="password" placeholder="Enter your password" value={password} className="border rounded-full px-6 py-2 w-full text-sm sm:text-base"
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
 */}
                    <div className="relative">
                        <p>Password</p>

                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            className="border rounded-full px-6 py-2 w-full text-sm sm:text-base pr-12"
                            onChange={(e) => { setPassword(e.target.value); verifyPassword(e);}} 
                        />
                        <p className="text-[13px] text-red-600 mt-[5px] h-[10px]" id="errPassword"></p>

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-[60%] -translate-y-1/2 text-gray-600"
                        >
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
                        </button>
                    </div>
                    <button
    onClick={loginUser}
    disabled={!emailValid || !passwordValid}  // disabled if either is invalid
    className={`block w-full text-center text-xl sm:text-2xl font-semibold py-2 rounded-full uppercase
        ${!emailValid || !passwordValid
            ? "block w-full text-xl sm:text-2xl font-semibold bg-[#7a0424] text-[#F2C879] py-2 rounded-full uppercase cursor-not-allowed"
            : "block w-full text-center text-xl sm:text-2xl font-semibold bg-[#A60530] text-[#F2C879] py-2 rounded-full uppercase cursor-pointer"
        }`}
>
    Sign In
</button>

                    {/* <div className="flex justify-center">
                        <Link to="/forgotpassword" className="cursor-pointer hover:text-[#A60530]">Forgot Password</Link>
                    </div> */}
                    <div className="flex justify-center gap-1">
                        <p>Don't have an account yet?</p>
                        <Link to="/register" className="cursor-pointer hover:text-[#FF0000] text-[#A60530] hover:decoration-[#FF0000] underline decoration-[#A60530]">Sign-up</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
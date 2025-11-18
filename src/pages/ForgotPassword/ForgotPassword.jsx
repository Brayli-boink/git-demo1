import { Link } from 'react-router'
import './forgotpassword.css'
import { useNavigate } from 'react-router';
import { useState } from 'react';

export default function ForgotPassword() {
     const navigate = useNavigate();
     const [email, setEmail] = useState ();

     function resetMessage(){
        alert("Ough ulul");
        navigate("/login");
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

    return (
        <>
            <div className='forgot-container'>
                <h1> Forgot your Password? </h1>
                <div id='forgot-input'>
                    <p> Email </p>
                    <input type='text' id='email' placeholder='Enter your email'onInput={(evt)=>verifyEmail(evt)}/>
                    <p className="text-[13px] text-red-600 mt-[5px] h-[10px]" id="errEmail"></p>
                </div>
                {email ? (
                <button onClick={resetMessage} id="reset">
                Reset Password
                </button>
                )
                :
                (
                <button disabled id="reset-disabled">
                Reset Password
                </button>
                )}
                <button onClick={(()=>navigate(-1))} id="cancel">Cancel</button>
            </div>
        </>
    )
}
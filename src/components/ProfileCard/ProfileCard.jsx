import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { auth, db } from "../../firebase-config";
import { onValue, ref } from "firebase/database";

function ProfileCard() {

    const [user, setUser] = useState(); // holds the users
    const [userData, setUserData] = useState(); // holds user data
    const navigate = useNavigate();

    const handleLogOut = () => {
        auth.signOut().then(() => {
            setTimeout(() => navigate("/login"), 0);
        })
            .catch((error) => {
                alert(error.message);
            });
    };

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

    return (
        <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[50%] flex flex-col items-center gap-2 p-8 bg-[rgba(255,255,255,0.21)] rounded-3xl shadow-lg z-100">
            <div className="flex flex-col items-center">
                <p className="text-4xl sm:text-5xl font-bold text-[#A60530]">User Profile</p>
            </div>
            <div className="flex flex-col justify-center items-center gap-10">
                <div className="w-32 sm:w-36 h-32 sm:h-36">
                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" className=" w-full h-full rounded-full" />
                </div>
                {user && userData &&
                    <div className="flex flex-col justify-center items-start text-lg bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl shadow-md w-full max-w-md">
                        <p className="text-2xl font-semibold text-[#A60530] mb-3 text-center w-full">Profile Details</p>
                        <div className="space-y-2 text-[#222] w-full">
                            <p><span className="font-semibold text-[#A60530]">First Name:</span> {userData.fName}</p>
                            <p><span className="font-semibold text-[#A60530]">Last Name:</span> {userData.lName}</p>
                            <p><span className="font-semibold text-[#A60530]">Username:</span> {userData.username}</p>
                            <p><span className="font-semibold text-[#A60530]">Email:</span> {userData.email}</p>
                            <p><span className="font-semibold text-[#A60530]">Contact Number:</span> {userData.contactNumber}</p>
                            <p><span className="font-semibold text-[#A60530]">Reported Lost Pets:</span> —</p>
                            <p><span className="font-semibold text-[#A60530]">Reported Found Pets:</span> —</p>
                        </div>
                    </div>
                }
                <div className="flex flex-col gap-4 w-full items-center">
                    <Link to="/editprofile" className="px-12 py-2 text-lg sm:text-xl font-bold text-[#A60530] border border-white bg-[rgba(244,244,244,0.12)] rounded-full shadow-lg cursor-pointer hover:bg-[rgba(204,204,204,0.12)]">Edit Profile</Link>
                    <button
                        onClick={handleLogOut}
                        className="px-12 py-2 mt-4 text-lg sm:text-xl font-bold text-[#F2C879] bg-[#A60530] rounded-full shadow-lg transition-colors duration-200 cursor-pointer"
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </div>

    )
}

export default ProfileCard;
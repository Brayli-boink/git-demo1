import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import Navbar2 from "./components/Navbar2/Navbar2";
import AboutUs from "./pages/AboutUs/AboutUs";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import ReportedLostPets from "./pages/ReportedLostPets/ReportedLostPets";
import LostPets from "./pages/LostPets/LostPets";
import ContactUs from "./pages/ContactUs/ContactUs";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Home from "./pages/Home/Home";
import Homepage from "./pages/Homepage/Homepage";
import EditProfile from "./pages/EditProfile/EditProfile";
import ReportedFoundPets from "./pages/ReportedFoundPets/ReportedFoundPets";
import FoundPets from "./pages/FoundPets/FoundPets";
import ReportLostPet from "./pages/ReportLostPet/ReportLostPet";
import LostSingleView from "./components/LostSingleView/LostSingleView";
import FoundSingleView from "./components/FoundSingleView/FoundSingleView";
import circles from './assets/Circles.png'
import ReportFoundPet from "./pages/ReportFoundPet/ReportFoundPet";
import EditLostPet from "./pages/EditLostPet/EditLostPet";
import EditFoundPet from "./pages/EditFoundPet/EditFoundPet";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase-config";


function App() {

    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
      onAuthStateChanged(auth,(u)=>{
        setUser(u);
        setLoading(false);
      })
    },[user])

    if(loading) return(<></>)

  return (
    <>
      <div className="w-full min-h-screen bg-[#F2C879] bg-[linear-gradient(20deg,rgba(242,200,121,0.2)_0%,rgba(166,5,48,0.2)_60%)] bg-blend-normal relative overflow-hidden">
        <img
          src={circles}
          alt="Background pattern"
          className="absolute inset-0 w-full h-full object-cover opacity-50 z-0 pointer-events-none"
          style={{ objectPosition: "top right" }}
        />
        <div className="w-[90%] mx-auto py-8">
          <BrowserRouter>
            <Navbar2 />
            <Routes>
              {/* public routes */}
              {!user &&
              <>
              <Route path="/" element={<Home />}/>
              <Route path="/home" element={<Home />}/>
              <Route path="/about" element={<AboutUs />}/>
              <Route path="/register" element={<Register />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/contactus" element={<ContactUs />}/>
              <Route path="/forgotpassword" element={<ForgotPassword />}/>
              <Route path="*" element={<Navigate to="/home"/>}/>
              </>
              }

              {user &&
              <>
              <Route path="/contactus" element={<ContactUs />}/>
              <Route path="/about" element={<AboutUs />}/>
              <Route path="/profile" element={<Profile />}/>
              <Route path="/reportedLostPets" element={<ReportedLostPets />}/>
              <Route path="/reportLostPet" element={<ReportLostPet/>}/>
              <Route path="/lostPets" element={<LostPets />}/>
              <Route path="/reportedFoundPets" element={<ReportedFoundPets />}/>
              <Route path="/foundPets" element={<FoundPets />}/>
              {/* <Route path="/editLostPet" element={<EditLostPet />}/> */}
              <Route path="/editLostPet/:id" element={<EditLostPet />}/>
              <Route path="/reportFoundPet" element={<ReportFoundPet />}/>
              <Route path="/editFoundPet" element={<EditFoundPet />}/>
              <Route path="/homepage" element={<Homepage />}/>
              <Route path="/editprofile" element={<EditProfile />}/>
              {/* <Route path="/lostSingleSiew" element={<LostSingleView />}/>  */}
              {/* <Route path="/foundSingleView" element={<FoundSingleView />}/> */}
              <Route path="/lostSingleView/:id" element={<LostSingleView />}/> 
              <Route path="/foundSingleView/:id" element={<FoundSingleView />} /> 
              <Route path="*" element={<Navigate to="/homepage"/>}/>
              </>
              }
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
}


export default App

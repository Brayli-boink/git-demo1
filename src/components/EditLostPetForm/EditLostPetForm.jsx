import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { db } from "../../firebase-config";
import { ref, onValue, set } from "firebase/database";


function EditLostPetForm() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [pet, setPet] = useState({
    petName: "",
    species: "",
    breed: "",
    color: "",
    gender: "",
    age: "",
    dateLost: "",
    lastSeenLocation: "",
    addDetails: "",
    ownerName: "",
    conNum: "",
    email: "",
    petPhoto: ""
  });

  const [errors, setErrors] = useState({
  petName: "",
  species: "",
  breed: "",
  color: "",
  gender: "",
  age: "",
  dateLost: "",
  lastSeenLocation: "",
  addDetails: "",
  ownerName: "",
  conNum: "",
  email: "",
  petPhoto: ""
});

  useEffect(() => {
    const petRef = ref(db, `lostPets/${id}`);
    onValue(petRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setPet(data);
      else navigate("/reportedLostPets");
    });
  }, [id, navigate]);



function verifyPetName(evt){
    let value = evt.target.value;
    setPet({ ...pet, petName: value });
    if (value.length === 0) setErrors(prev => ({ ...prev, petName: "Blank spaces are not allowed!" }));
    else if (value.length < 2) setErrors(prev => ({ ...prev, petName: "Pet name must be at least 2 letters!" }));
    else setErrors(prev => ({ ...prev, petName: "" }));
  }

  function verifySpecies(evt){
    let value = evt.target.value;
    setPet({ ...pet, species: value });
    if (value.length === 0) setErrors(prev => ({ ...prev, species: "Blank spaces are not allowed!" }));
    else if (value.length < 2) setErrors(prev => ({ ...prev, species: "Species must be at least 2 letters!" }));
    else setErrors(prev => ({ ...prev, species: "" }));
  }

  function verifyBreed(evt){
    let value = evt.target.value;
    setPet({ ...pet, breed: value });
    if (value.length === 0) setErrors(prev => ({ ...prev, breed: "Blank spaces are not allowed!" }));
    else if (value.length < 2) setErrors(prev => ({ ...prev, breed: "Breed must be at least 2 letters!" }));
    else setErrors(prev => ({ ...prev, breed: "" }));
  }

  function verifyColor(evt){
    let value = evt.target.value;
    setPet({ ...pet, color: value });
    if (value.length === 0) setErrors(prev => ({ ...prev, color: "Blank spaces are not allowed!" }));
    else if (value.length < 2) setErrors(prev => ({ ...prev, color: "Color must be at least 2 letters!" }));
    else setErrors(prev => ({ ...prev, color: "" }));
  }

  function verifyGender(evt){
    let value = evt.target.value;
    setPet({ ...pet, gender: value });
    if (!value) setErrors(prev => ({ ...prev, gender: "Please select a gender!" }));
    else setErrors(prev => ({ ...prev, gender: "" }));
  }

  function verifyDateLost(evt){
    let value = evt.target.value;
    setPet({ ...pet, dateLost: value });
    if (!value) setErrors(prev => ({ ...prev, dateLost: "Please select a date!" }));
    else {
      const selectedDate = new Date(value);
      const today = new Date();
      selectedDate.setHours(0,0,0,0);
      today.setHours(0,0,0,0);
      if (selectedDate > today) setErrors(prev => ({ ...prev, dateLost: "Date cannot be in the future!" }));
      else setErrors(prev => ({ ...prev, dateLost: "" }));
    }
  }

  function verifyLastSeenLocation(evt){
    let value = evt.target.value;
    setPet({ ...pet, lastSeenLocation: value });
    if (value.length === 0) setErrors(prev => ({ ...prev, lastSeenLocation: "Blank spaces are not allowed!" }));
    else if (value.length < 2) setErrors(prev => ({ ...prev, lastSeenLocation: "Location must be at least 2 letters!" }));
    else setErrors(prev => ({ ...prev, lastSeenLocation: "" }));
  }

  function verifyAdditionalDetails(evt){
    let value = evt.target.value;
    setPet({ ...pet, addDetails: value });
    if (value.length === 0) setErrors(prev => ({ ...prev, addDetails: "Blank spaces are not allowed!" }));
    else if (value.length < 2) setErrors(prev => ({ ...prev, addDetails: "Additional details must be at least 2 letters!" }));
    else setErrors(prev => ({ ...prev, addDetails: "" }));
  }

  function verifyOwnerName(evt){
    let value = evt.target.value;
    setPet({ ...pet, ownerName: value });
    if (value.length === 0) setErrors(prev => ({ ...prev, ownerName: "Blank spaces are not allowed!" }));
    else if (value.length < 2) setErrors(prev => ({ ...prev, ownerName: "Owner name must be at least 2 letters!" }));
    else setErrors(prev => ({ ...prev, ownerName: "" }));
  }

  function verifyContactNumber(evt){
    let value = evt.target.value;
    setPet({ ...pet, conNum: value });
    if (!value  || !value.trim() === "") setErrors(prev => ({ ...prev, conNum: "Blank spaces are not allowed!" }));
    else if (!/^[0-9]+$/.test(value)) setErrors(prev => ({ ...prev, conNum: "Number cannot contain letters or symbols!" }));
    else if (!value.startsWith("09")) setErrors(prev => ({ ...prev, conNum: "Valid number must start with (09)" }));
    else if (value.length !== 11) setErrors(prev => ({ ...prev, conNum: "Valid number must be exactly 11 digits!" }));
    else setErrors(prev => ({ ...prev, conNum: "" }));
  }

  function verifyEmail(evt){
    let value = evt.target.value;
    setPet({ ...pet, email: value });
    if (value.length === 0) setErrors(prev => ({ ...prev, email: "Blank spaces are not allowed!" }));
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
      setErrors(prev => ({ ...prev, email: "Invalid email address!" }));
    else setErrors(prev => ({ ...prev, email: "" }));
  }

  function verifyAge(evt){
    let value = evt.target.value;
    setPet({ ...pet, age: value });
    if (value.length === 0) setErrors(prev => ({ ...prev, age: "Blank spaces are not allowed!" }));
    else if (!/^\d+$/.test(value)) setErrors(prev => ({ ...prev, age: "Age must be a number!" }));
    else setErrors(prev => ({ ...prev, age: "" }));
  }

  function verifyPetPhoto(evt){
    let value = evt.target.value;
    setPet({ ...pet, petPhoto: value });
    if (value.length === 0) setErrors(prev => ({ ...prev, petPhoto: "Blank spaces are not allowed!" }));
    else if (!value.startsWith("https://")) setErrors(prev => ({ ...prev, petPhoto: "URL must start with https://" }));
    else if (!value.toLowerCase().endsWith(".jpg") && !value.toLowerCase().endsWith(".png")) setErrors(prev => ({ ...prev, petPhoto: "Invalid picture format. Must end with png or jpg" }));
    else setErrors(prev => ({ ...prev, petPhoto: "" }));
  }

function handleEdit() {
    const petRef = ref(db, `lostPets/${id}`);
    set(petRef, pet)
      .then(() => {
        alert("Pet info updated successfully!");
        navigate("/reportedLostPets");
      })
      .catch((error) => {
        console.error("Error updating pet:", error);
        alert("Failed to update pet. Try again.");
      });
  }

  const isFormValid = Object.values(errors).every(err => err === "");

    return (
        <div className="w-full sm:w-[95%] md:w-[85%] h-auto flex flex-col bg-[rgba(255,255,255,0.21)] rounded-3xl border border-white  shadow-md">
            <div className='flex gap-4'>
                <div className="flex flex-col w-2/4 h-full px-4 py-4 rounded-t-3xl rounded-b-3xl">
                    <p className='text-2xl sm:text-3xl font-semibold text-[#A60530]'>A. Pet Information</p>
                    
                    <p className='text-lg text-[#583523]' required > Pet Name <span className="text-red-600"> *</span></p>
                    <input type="text" placeholder='The name of the found pet' className='w-full px-3 py-2 rounded-full border' 
                    value={pet.petName}
                    onChange={verifyPetName}/>
                    <p className="text-[13px] text-red-600 mt-[5px] h-[10px]"> {errors.petName}</p>
                    
                    <p className='text-lg text-[#583523]'>Species<span className="text-red-600"> *</span></p>
                    <input type="text" placeholder='Select type (Dog, Cat, Bird, etc.) ⏷' className='w-full px-3 py-2 rounded-full border' 
                    value={pet.species}
                    onChange={verifySpecies}/>
                    <p className="text-[13px] text-red-600 mt-[5px] h-[10px]">{errors.species}</p>
                    
                    <p className='text-lg text-[#583523]'>Breed<span className="text-red-600"> *</span></p>
                    <input type="text" placeholder='Breed of the pet (e.g., Aspin, Shih Tzu, Persian)' className='w-full px-3 py-2 rounded-full border'
                    value={pet.breed}
                    onChange={verifyBreed}/>
                    <p className="text-[13px] text-red-600 mt-[5px] h-[10px]"> {errors.breed}</p>

                    <p className='text-lg text-[#583523]'>Color/Marking<span className="text-red-600"> *</span></p>
                    <input type="text" placeholder='Description of pet’s color, patterns, or unique marks' className='w-full h-18 px-3 py-1    rounded-2xl border'
                    value={pet.color}
                    onChange={verifyColor}/>
                    <p className="text-[13px] text-red-600 mt-[5px] h-[10px]">{errors.color}</p>
                    
                    <p className='text-lg text-[#583523]'>Gender<span className="text-red-600"> *</span></p>
                    <div className='flex gap-2'>
                    <input type="radio" name="gender"  value="Male"
                    checked={pet.gender === "Male"}
                    onChange={verifyGender}/>
                        <p className="text-lg text-[#583523]">Male</p>
                    </div>
                    <div className='flex gap-2'>
                    <input type="radio" name="gender" value="Female"
                    checked={pet.gender === "Female"}
                    onChange={verifyGender} />
                        <p className="text-lg text-[#583523]">Female</p>
                    </div>
                    <p className="text-[13px] text-red-600 mt-[5px] h-[10px]" >{errors.gender}</p>

                    <p className='text-2xl sm:text-3xl font-semibold text-[#A60530]'>B.Found Details</p>
                    
                    <p className='text-lg text-[#583523]'>Date Lost<span className="text-red-600"> *</span></p>
                    <input type="date" className='w-full px-3 py-2 rounded-full border'
                    value={pet.dateLost}
                    onChange={verifyDateLost}/>
                    <p className="text-[13px] text-red-600 mt-[5px] h-[10px]" >{errors.dateLost}</p>
                    
                    <p className='text-lg text-[#583523]'>Last Seen Location<span className="text-red-600"> *</span></p>
                    <input type="text" placeholder='Address or description of the last location' className='w-full px-3 py-2 rounded-full border'
                    value={pet.lastSeenLocation}
                    onChange={verifyLastSeenLocation}/>
                    <p className="text-[13px] text-red-600 mt-[5px] h-[10px]" >{errors.lastSeenLocation}</p>
                    
                    <p className='text-lg text-[#583523]'>Additional Details<span className="text-red-600"> *</span></p>
                    <input type="text" placeholder='Any extra information about how the pet got lost, possible behavior, etc.' className='w-full h-12 px-3 py-2 rounded-full border'
                    value={pet.addDetails}
                    onChange={verifyAdditionalDetails}/>
                    <p className="text-[13px] text-red-600 mt-[5px] h-[10px]" >{errors.addDetails}</p>
                    
                    <p className='text-2xl sm:text-3xl font-semibold text-[#A60530]'>C. Owner Information</p>
                    
                    <p className='text-lg text-[#583523]'>Owner Name<span className="text-red-600"> *</span></p>
                    <input type="text" placeholder='Name of the Owner' className='w-full px-3 py-2 rounded-full border' 
                    value={pet.ownerName}
                    onChange={verifyOwnerName}/>
                    <p className="text-[13px] text-red-600 mt-[5px] h-[10px]" >{errors.ownerName}</p>
                    
                    <p className='text-lg text-[#583523]'>Contact Number<span className="text-red-600"> *</span></p>
                    <input type="text" placeholder='Contact number of the owner' className='w-full px-3 py-2 rounded-full border' 
                    value={pet.conNum}
                    onChange={verifyContactNumber}/>
                    <p className="text-[13px] text-red-600 mt-[5px] h-[10px]" >{errors.conNum}</p>
                    
                    <p className='text-lg text-[#583523]'>Email Address<span className="text-red-600"> *</span></p>
                    <input type="text" placeholder='Email address of the owner' className='w-full px-3 py-2 rounded-full border' 
                    value={pet.email}
                    onChange={verifyEmail}/>
                    <p className="text-[13px] text-red-600 mt-[5px] h-[10px]" >{errors.email}</p>
                
                    </div>
                    <div className="w-2/4 h-full px-2 py-4 flex flex-col items-start justify-items-start  rounded-t-3xl rounded-b-3xl">
                    {/* <p className='text-3xl font-semibold text-[#A60530] hidden block'>A. Pet Information</p> */}
                    
                    <p className='text-lg text-[#583523]'>Age/Approximate Age<span className="text-red-600"> *</span></p>
                    <input type="text" placeholder='Pet’s age (if known)' className='w-full px-3 py-2 rounded-full border'
                    value={pet.age}
                    onChange={verifyAge}/>
                    <p className="text-[13px] text-red-600 mt-[5px] h-[10px]" >{errors.age}</p>
                    
                    <p className='text-lg text-[#583523]'>Photo of Pet<span className="text-red-600"> *</span></p>
                    <input type="text" placeholder='Upload a clear image of the found pet (JPG or PNG)' className='w-full px-3 py-2 rounded-full border' 
                    value={pet.petPhoto}
                    onChange={verifyPetPhoto}/>
                    <p className="text-[13px] text-red-600 mt-[5px] h-[10px]">{errors.petPhoto}</p>
                </div>
            </div>
            <div className='w-full flex flex-col gap-2 items-center py-4 rounded-3xl'>
                <button
  onClick={handleEdit}
  disabled={!isFormValid}
  className={`w-64 py-4 text-xl font-semibold uppercase rounded-full flex items-center justify-center ${
    isFormValid
      ? "bg-[#A60530] text-[#FFCC6D] cursor-pointer"
      : "bg-[#7a0424] text-[#F2C879] cursor-not-allowed"
  }`}
>
  Edit Lost Pet
</button>
                <div className='w-[75%] text-center'>
                    <p className='text-sm italic text'>Note: This form will be saved and automatically be uploaded in the Lost Pets Page. You can also edit or delete  this form in your Reported Lost Pets. </p>
                </div>
            </div>
        </div>
    )
}

export default EditLostPetForm;
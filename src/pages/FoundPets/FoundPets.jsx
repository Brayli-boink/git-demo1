import Header from "../../components/Header/Header";
import FoundPetCard from "../../components/FoundPetCard/FoundPetCard";
import { Link } from "react-router";
import SearchBar from "../../components/SearchBar/searchBar";

function FoundPets() {
    return (
        <div className="flex flex-col gap-4 justify-center items-center w-full h-auto mt-8">
            <div className="flex flex-col items-center gap-8 p-8 w-full bg-[rgba(255,255,255,0.21)] border border-white rounded-3xl shadow-lg">
            <SearchBar />
            <Header title={"Found Pets"} subtitle={"This page shows all the pets that people have found. You can view details about each pet and contact the person who found them to get in touch."}/>
               <div className="w-full sm:w-[90%] h-auto flex justify-center items-center ">
                    <div className="flex flex-wrap justify-center gap-6">
                        <FoundPetCard />
                        <FoundPetCard />
                        <FoundPetCard />
                        <FoundPetCard />

                        <FoundPetCard />
                        <FoundPetCard />
                        <FoundPetCard />
                        <FoundPetCard />
                    </div>
                </div>
            </div>
            <Link to="/reportedFoundPets"
            className="px-10 py-4 text-xl font-bold text-[#A60530] border border-white bg-[rgba(244,244,244,0.12)] rounded-full shadow-lg cursor-pointer hover:bg-[rgba(204,204,204,0.12)] z-100">
            Report a Found Pet
            </Link>
        </div>
    )
}

export default FoundPets;
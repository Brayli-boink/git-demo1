import { Link } from "react-router";
import Header from "../../components/Header/Header";
import LostPetCard from "../../components/LostPetCard/LostPetCard";
import SearchBar from "../../components/SearchBar/searchBar";

function LostPets() {
    return (
        <div className="flex flex-col gap-4 justify-center items-center w-full h-auto mt-8">
            <div className="flex flex-col items-center gap-8 p-8 w-full bg-[rgba(255,255,255,0.21)] border border-white rounded-3xl shadow-lg z-100">
                <SearchBar />
                <Header title={"Lost Pets"} subtitle={"Here you can see all the pets that have been reported missing. Check the list to see if you’ve spotted any of them, or learn more about each pet by tapping on their details. "}/>
                <div className="w-full sm:w-[90%] h-auto flex justify-center items-center ">
                    <div className="flex flex-wrap justify-center gap-6">
                        <LostPetCard />
                        <LostPetCard />
                        <LostPetCard />
                        <LostPetCard />

                        <LostPetCard />
                        <LostPetCard />
                        <LostPetCard />
                        <LostPetCard />
                    </div>
                </div>
            </div>
            <Link to="/reportedLostPets"
            className="px-10 py-4 text-xl font-bold text-[#A60530] border border-white bg-[rgba(244,244,244,0.12)] rounded-full shadow-lg cursor-pointer hover:bg-[rgba(204,204,204,0.12)] z-100">
            Report a Lost Pet
            </Link>
        </div>
    )
}

export default LostPets;
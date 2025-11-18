import { Link } from "react-router";
import Header from "../../components/Header/Header";
import ReportedFoundPetCard from "../../components/ReportedFoundPetCard/ReportedFoundPetCard";

function ReportedFoundPets() {
    return (
        <div className="flex flex-col gap-4 justify-center items-center w-full h-auto mt-8">
            <div className="flex flex-col items-center gap-8 p-8 w-full bg-[rgba(255,255,255,0.21)] border border-white rounded-3xl shadow-lg z-100">
                <Header title={"Your Reported Found Pets"} subtitle={"This page shows all the pets you’ve reported as lost. You can view their details, update information, or delete a report. It helps you keep track of all your reports in one place."} />
                <div className="w-full sm:w-[90%] h-auto flex justify-center items-center ">
                    <div className="flex flex-wrap justify-center gap-6">
                        <ReportedFoundPetCard />
                        
                    </div>
                </div>
            </div>
            <Link to="/reportFoundPet" className="px-10 py-4 text-xl font-bold text-[#A60530] border border-white bg-[rgba(244,244,244,0.12)] rounded-full shadow-lg cursor-pointer hover:bg-[rgba(204,204,204,0.12)]">Report a Found Pet</Link>
        </div>
    )
}

export default ReportedFoundPets;
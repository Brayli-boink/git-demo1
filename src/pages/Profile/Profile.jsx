import { useNavigate } from "react-router";
import ProfileCard from "../../components/ProfileCard/ProfileCard";

function Profile() {

    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-4 justify-center items-center w-full h-auto mt-8">
            <ProfileCard/>
        </div>
    )
}

export default Profile;
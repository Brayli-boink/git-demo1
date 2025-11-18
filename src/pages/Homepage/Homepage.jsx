import FoundHome from '../../components/FoundHome/FoundHome'
import LostHome from '../../components/LostHome/LostHome'
import HomeHeader from '../../components/HomeHeader/HomeHeader'
import ReportLostPet from '../ReportLostPet/ReportLostPet'
import Notification from '../../components/Notification/Notification'
import Announcement from '../../components/Announcement/Announcement'
import './homepage.css'
import { useNavigate } from 'react-router'
import { auth } from '../../firebase-config'
import { Link } from 'react-router'

export default function Homepage() {

    const navigate = useNavigate();

      const handleLogOut = ()=> {
        auth.signOut().then(() => {
                setTimeout(() => navigate("/login"), 0);
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <>
            <div className='homepage-container'>

                <HomeHeader />

                <div className='space-between'>
                    <p className='left-part'> Found Pets </p>
                    <p className='right-part'> View All </p>
                </div>

                <div className = 'found-component'>
                    <FoundHome />
                    <FoundHome />
                    <FoundHome />
                    <FoundHome />
                </div>

                <div className='space-between'>
                    <p className='left-part'> Lost Pets </p>
                    <p className='right-part'> View All </p>
                </div>

                <div className = 'lost-component'>
                    <LostHome />
                    <LostHome />
                    <LostHome />
                    <LostHome />
                </div>
            </div>
            <div id='button-pets'>
                <Link to="/reportedLostPets" id='reported-pets'> Your Reported Pets </Link>
                <Link to ="/reportedFoundPets" id='found-pets'> Your Found Pets </Link>
            </div>
        </>
    )
}
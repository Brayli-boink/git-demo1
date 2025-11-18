import { useNavigate } from 'react-router';
import pawPrint from '../../assets/paw-print 4.png'

function AboutUs() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-4 justify-center items-center w-full h-auto mt-8">
            <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[60%] flex flex-col items-center gap-6 p-8 border border-[#F5F5F5] bg-[rgba(255,255,255,0.21)] rounded-3xl z-100">
                <p className="text-4xl sm:text-5xl font-bold text-[#A60530]">About Us</p>
                <div className="flex flex-col justify-center items-center gap-6 text-center">
                    <div className="flex">
                        <p className="text-lg sm:text-xl">At SafePaws, we believe that every pet deserves a safe return home. Our system was created to help pet owners and rescuers work together in finding lost and found pets across the Philippines.</p>
                    </div>
                    <p className="text-lg sm:text-xl">Through a simple, community-driven platform, users can report missing or found animals, share details, and communicate directly to reunite pets with their rightful families.</p>
                    <p className="text-lg sm:text-xl">SafePaws aims to promote compassion, responsibility, and unity among pet lovers, making sure that no paw is ever left behind.</p>
                    <div className="text-xl sm:text-2xl text-center font-bold flex flex-wrap justify-center items-center gap-1 leading-tight">
                        <p className='text-black'>“Reuniting</p>
                        {/* <span >hearts</span> */}
                        <p className="text-[#A60530]">hearts</p>
                        <p className='text-black'>, one paw at a time.”</p>
                    </div>
                    <img src={pawPrint} alt="Paw print logo" className="w-16 h-16" />
                </div>
            </div>
        </div>
    )
}

export default AboutUs;
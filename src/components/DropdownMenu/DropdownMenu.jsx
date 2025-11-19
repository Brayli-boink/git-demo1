import './dropdown-menu.css'
import { Link } from 'react-router';

function DropdownMenu() {
    return (
        <div className="flex flex-col dropdownMenu">
            <ul className="flex flex-col gap-4">
                <Link to="/reportLostPet">Report Lost Pet</Link>
                {/* <Link to="/reportFoundPet">Report Found Pet</Link> */}
                <Link to="/lostPets">Lost Pets</Link>
                <Link to="/foundPets">Found Pets</Link>
            </ul>
        </div>
    )
}

export default DropdownMenu;
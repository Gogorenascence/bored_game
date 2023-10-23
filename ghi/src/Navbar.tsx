import React, { useEffect, useState, useContext} from "react";
import { NavLink } from "react-router-dom";

function Navbar() {

    const [showMenu, setShowMenu] = useState(false);

    const handleShowMenu = () => {
        setShowMenu(!showMenu);
    }

    return (
        <nav className="navbar">
            <div className="navmain">
                <div className="nav-header">
                    <img src="bored-game-logo.svg" alt="logo" />
                    <i className="fa fa-bars" aria-hidden="true" onClick={() => handleShowMenu()}></i>
                </div>
                <ul className={showMenu? "show-menu": "menu"}>
                {/* <ul className="show-menu"> */}
                    <li>
                        <NavLink to="/" className="link">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/sessions" className="link">Sessions</NavLink>
                    </li>
                    <li>
                        <NavLink to="/games" className="link">Games</NavLink>
                    </li>
                    <li>
                        <NavLink to="/gameobjects" className="link">Game Objects</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;
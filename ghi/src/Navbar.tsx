import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
// import audioFile from "./Audio/Home.mp3";

function Navbar() {
  interface dropDownMenu {
    show: boolean;
    section: string;
  }

  const audioFile = require("./Audio/Home.mp3");

  const navBar = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useOutsideAlerter(navBar);

  const [showMenu, setShowMenu] = useState(false);
  const [showDropdownMenu, setShowDropdownMenu] = useState<dropDownMenu>({
    show: false,
    section: "",
  });

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleShowDropdownMenu = (show: boolean, section: string) => {
    setShowDropdownMenu({ show: show, section: section });
  };

  function useOutsideAlerter(ref: React.RefObject<HTMLDivElement | null>) {
    useEffect(() => {
      // Function for click event
      function handleOutsideClick(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          handleShowDropdownMenu(false, "none");
        }
      }
      // Adding click event listener
      document.addEventListener("click", handleOutsideClick);
      return () => document.removeEventListener("click", handleOutsideClick);
    }, [ref]);
  }

  const handlePlayClick = () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsAudioPlaying(!isAudioPlaying);
    }
  };

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 800) {
        // If window size is >= 800px and menu is open, close the menu
        setShowMenu(false);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [showMenu]);

  return (
    <nav className="navbar" ref={navBar}>
      <div className="navmain">
        <div className="nav-header">
          <img src="bored-game-logo.svg" alt="logo" />
          <i
            className="fa fa-bars"
            aria-hidden="true"
            onClick={() => handleShowMenu()}
          ></i>
        </div>
        <ul className={showMenu ? "show-menu" : "menu"}>
          {/* <ul className="show-menu"> */}
          <li>
            <NavLink
              to="/"
              className="link"
              onClick={() => handleShowDropdownMenu(true, "home")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <div
              className="link pointer"
              onClick={() =>
                handleShowDropdownMenu(
                  !showDropdownMenu.show || true,
                  "sessions"
                )
              }
            >
              Sessions
            </div>
            {showDropdownMenu.show &&
            showDropdownMenu.section === "sessions" ? (
              <div className="dropdown-content">
                <NavLink to="/sessions/all" className="dropdown-link">
                  All Sessions
                </NavLink>
                <NavLink to="/sessions/friends" className="dropdown-link">
                  Friends sessions
                </NavLink>
              </div>
            ) : null}
          </li>
          <li className="list-item">
            <div
              className="link pointer"
              onClick={() => handleShowDropdownMenu(true, "games")}
            >
              Games
            </div>
            {showDropdownMenu.show && showDropdownMenu.section === "games" ? (
              <div className="dropdown-content">
                <NavLink to="/games/1" className="dropdown-link">
                  All Games
                </NavLink>
                <NavLink to="/games/popular" className="dropdown-link">
                  Popular Games
                </NavLink>
              </div>
            ) : null}
          </li>
          <li>
            <div
              className="link pointer"
              onClick={() => handleShowDropdownMenu(true, "gameobjects")}
            >
              Game Objects
            </div>
          </li>
          <button className="play-button" onClick={() => handlePlayClick()}>
            {isAudioPlaying ? "Pause" : "AMBIENCE"}
          </button>
          <audio ref={audioRef} src={audioFile}></audio>
          <li className="user-log-signin">
            <div className="link pointer">Log In</div>
            <div className="link pointer">Sign Up</div>
          </li>
        </ul>
        <div className="nav-right">
          <p className="nav-button">Log In</p>
          <p className="nav-button">Sign Up</p>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

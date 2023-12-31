import React, { useEffect, useState, useRef, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext, Token } from "./Context/AuthContext";


function Navbar() {

    interface dropDownMenu {
        show: boolean;
        section: string
    }  

    const {
        signUpError,
        setSignUpError,
        loginError,
        setLoginError,
        setToken,
        getToken,
        getUsers,
        signUpCred,
        setSignUpCred,
        loginCred,
        setLoginCred,
        signUpCredCheck,
        passwordCon,
        setPasswordCon,
        signup,
        login,
        logout,
        account,
        getAccountData,
      } = useContext(AuthContext)!;

    const [showLogin, setShowLogin] = useState(false)
    const [showSignup, setShowSignup] = useState(false)
    
    const navBar = useRef<HTMLDivElement>(null);

    useOutsideAlerter(navBar)

    const [showMenu, setShowMenu] = useState(false);
    const [showDropdownMenu, setShowDropdownMenu] = useState<dropDownMenu>({
        show: false,
        section: ""
     });

    const handleShowMenu = () => {
        setShowMenu(!showMenu);
    }

    const handleShowDropdownMenu = (show: boolean, section: string) => {
        setShowDropdownMenu({show: show, section: section});
    }

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

    useEffect(() => {
        function handleResize() {
          if (window.innerWidth > 800) {
            // If window size is >= 800px and menu is open, close the menu
            setShowMenu(false);
          }
        }
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, [showMenu]);

    useEffect(() => {
        getAccountData();
        getUsers();
        getToken()
            .then((token: Token | null) => {
                if (token) {
                    setToken(token);
                }
            });
    }, [signUpCred]);

    const resetLoginCred = () => {
        setLoginCred({
            username: "",
            password: "",
        });
    }

    const Login = async(event: Event) => {
        event.preventDefault();
        const token = await login();
        if (token) {
            resetLoginCred();
            setShowLogin(false);
        }
    }

    return (

        <nav className="navbar" ref={navBar}>
            <div className="navmain">
                <div className="nav-header">
                    <NavLink to="/" className="logo-link"><img className="logo-nav" src="Bored_Games-removebg-preview.png" alt="bored-game-logo.svg"/></NavLink>
                    <i className="fa fa-bars" aria-hidden="true" onClick={() => handleShowMenu()}></i>
                </div>
                <ul className={showMenu ? "show-menu" : "menu"}>
                    <li >
                        <NavLink to="/" className="link" onClick={() => handleShowDropdownMenu(true, "home")}>Home</NavLink>
                    </li>
                    <li>
                        <div className="link pointer" onClick={() => handleShowDropdownMenu(!showDropdownMenu.show || true, "sessions")}>Sessions</div>
                        {
                        showDropdownMenu.show && showDropdownMenu.section === "sessions" ?
                        <div className="dropdown-content">
                            <NavLink to="/sessions/all" className="dropdown-link">All Sessions</NavLink>
                            <NavLink to="/sessions/friends" className="dropdown-link">Friends sessions</NavLink>
                        </div> 
                        : null
                        }
                    </li>
                    <li className="list-item">
                        <div className="link pointer" onClick={() => handleShowDropdownMenu(true, "games")}>Games</div>
                        {
                        showDropdownMenu.show && showDropdownMenu.section === "games" ?
                        <div className="dropdown-content">
                            <NavLink to="/games/1" className="dropdown-link">All Games</NavLink>
                            <NavLink to="/games/popular" className="dropdown-link">Popular Games</NavLink>
                        </div> 
                        : null
                        }
                    </li>
                    <li>
                        <div className="link pointer" onClick={() => handleShowDropdownMenu(true, "gameobjects")}>Game Objects</div>
                    </li>
                    <li className="user-log-signin">
                        <div className="link pointer" onClick={() => setShowLogin(true)}>Log In</div>
                        <div className="link pointer" onClick={() => setShowSignup(true)}>Sign Up</div>
                    </li>
                </ul>
                {
                showLogin ?
                <div className="medium-modal">
                    <button onClick={() => setShowLogin(false)}>x</button>
                </div> 
                : null
                }
                {
                showSignup ?
                <div className="medium-modal">
                    <button onClick={() => setShowSignup(false)}>x</button>
                </div> 
                : null
                }
                <div className="nav-right">
                    <p className="nav-button" onClick={() => setShowLogin(true)}>Log In</p>
                    <p className="nav-button" onClick={() => setShowSignup(true)}>Sign Up</p>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;

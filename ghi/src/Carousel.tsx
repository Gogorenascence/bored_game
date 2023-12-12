import React, { useState, useEffect } from "react";
import { Game } from "./Games/GameInterface";
import { useNavigate } from "react-router-dom";

const Carousel: React.FC<{ games: Game[]}> = ({ games }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const goToPrevious = () => {
        const isFirstGame = currentIndex === 0
        const newIndex = isFirstGame ? games.length -1 : currentIndex - 1
        setCurrentIndex(newIndex)
    }

    const goToNext = () => {
        const isLastGame = currentIndex === games.length - 1
        const newIndex = isLastGame ? 0 : currentIndex + 1
        setCurrentIndex(newIndex)
    }

    const goToGame = (gameIndex: number) => {
        setCurrentIndex(gameIndex)
    }

    const navigate = useNavigate()

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (!isHovered) {
            // Slide to the next image every 5 seconds (adjust as needed)
            intervalId = setInterval(goToNext, 3000);
        }

        return () => {
            // Clear the interval when the component unmounts or when isHovered changes
            clearInterval(intervalId);
        };
    }, [currentIndex, isHovered]);

    return (
    <div className="carousel" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <div className="left-arrow" onClick={goToPrevious}>
            &#129172;
        </div>
        <div className="right-arrow" onClick={goToNext}>
            &#129174;
        </div>
        <img className="carousel-image pointer"
          src={games[currentIndex]?.picture_url[1]}
          alt="Game Image" 
          onClick={() => navigate(`game/${games[currentIndex].id}`)}/>
        <div className="carousel-dot-container">
            {games.map((game, gameIndex) => (
                <>
                    <div key={game.id} 
                        className={currentIndex === gameIndex ? "carousel-dot active" : "carousel-dot"} 
                        onClick={() => goToGame(gameIndex)}>
                    </div>
                </>
            ))}
        </div>
    </div>
    );
};

export default Carousel;
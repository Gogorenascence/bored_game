import React, { useState } from "react";
import { Game } from "./Games/GameInterface";
import { useNavigate } from "react-router-dom";

const Carousel: React.FC<{ games: Game[]}> = ({ games }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

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

    return (
    <div className="carousel">
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
                    <div key={gameIndex} 
                        className={ currentIndex !== gameIndex ? "carousel-dot" : "hidden" } 
                        onClick={() => goToGame(gameIndex)}>
                        &#9675;
                    </div>
                    <div key={gameIndex} 
                        className={ currentIndex === gameIndex ? "carousel-dot" : "hidden" } 
                        onClick={() => goToGame(gameIndex)}>
                        &#9679;
                    </div>
                </>
            ))}
        </div>
    </div>
    );
};

export default Carousel;
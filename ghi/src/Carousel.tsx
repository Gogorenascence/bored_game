import React, { useState } from "react";
import { Game } from "./Games/GameInterface";

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

    return (
    <div className="carousel">
        <div className="left-arrow" onClick={goToPrevious}>
            &#129172;
        </div>
        <div className="right-arrow" onClick={goToNext}>
            &#129174;
        </div>
        <img className="carousel-image" src={games[currentIndex]?.picture_url[1]} alt="Game Image"/>
        <div className="carousel-dot-container">
            {games.map((game, gameIndex) => (
                <div key={gameIndex} className="carousel-dot" onClick={() => goToGame(gameIndex)}>&#9675;</div>
            ))}
        </div>
    </div>
    );
};

export default Carousel;
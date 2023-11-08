import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Game } from "./GameInterface";

function GameDetails() {
    const { id } = useParams<{ id: string }>();
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);

    useEffect(() => {
        const fetchGameDetails = async () => {
          try {
            const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/games/${id}/`);
            const data = await response.json();
            setSelectedGame(data);
          } catch (error) {
            console.error("Error fetching game details:", error);
          }
        };
    
        fetchGameDetails();
      }, [id])

    return (
        <div className="game-details">
            {selectedGame ? (
            <div>
                <h1>{selectedGame.name}</h1>
                <p>Publisher: {selectedGame.publisher}</p>
            </div>
            ) : (
                <div>...Loading</div>
            )}
        </div>
    );
};

export default GameDetails;

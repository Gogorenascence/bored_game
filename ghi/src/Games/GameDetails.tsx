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
            <div className="description-container">
              <img
                className="description-image"
                src={selectedGame.picture_url[1]}
                alt={selectedGame.name}
              />
              <div className="description-content">
                <h1 className="description-name">{selectedGame.name}</h1>
                <ul className="description-list">
                  <li><p className="description-p">Published by:</p> {selectedGame.publisher}</li>
                  <li><p className="description-p">Players:</p> {selectedGame.min_players}-{selectedGame.max_players}</li>
                  <li><p className="description-p">Play Time:</p> {selectedGame.min_game_length}-{selectedGame.max_game_length}</li>
                  <li><p className="description-p">Game genre:</p> {selectedGame.genre}</li>
                  <li><p className="description-p">Games themes:</p> {selectedGame.theming + ' '}</li>
                  <li><p className="description-p">Game Mechanics:</p> {selectedGame.game_mechanics + ' '}</li>
                  <li><p className="description-p">Description:</p> {selectedGame.description.replaceAll('&quot;', '"').replaceAll('&mdash;', '—').replaceAll('&pound;', '£')}</li>
                </ul>
              </div>
            </div>
            ) : (
                <div>...Loading</div>
            )}
        </div>
    );
};

export default GameDetails;

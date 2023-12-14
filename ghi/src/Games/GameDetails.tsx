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

    const smoothScrollTo = (target: string) => {
      const element = document.querySelector(target);
          if (element) {
          element.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
          });
      }
  };

  console.log(selectedGame)

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
                <div className="game-details-grid">
                  <div className="game-details-left">
                    <div className="game-details-top-left">              
                      <img
                        className="description-image-overlay darken"
                        src={selectedGame.picture_url[1]}
                        alt={selectedGame.name}
                      />
                      <h3 className="description-overlay-top">
                        &#128100;&#xfe0e; {selectedGame.min_players}-{selectedGame.max_players}
                      </h3>
                      <h3 className="description-overlay-bottom">
                        &#9203;&#xfe0e; {selectedGame.min_game_length}-{selectedGame.max_game_length} mins
                      </h3>
                    </div>
                    <div className="game-details-bottom-left">
                      <h3>
                        BGG Rating: {selectedGame.bgg_rating.toFixed(2)}
                      </h3>
                      <h3>
                        Rating: {selectedGame.ratings.length > 1 ? selectedGame.ratings[0].toFixed(2) : "N/A"}
                      </h3>
                      <h3 className="pointer" onClick={() => smoothScrollTo("#comments")}>
                        Comments
                      </h3>
                    </div>
                  </div>
                  <div className="game-details-right">
                    <div className="game-details-top-right">
                      <h2 className="detail-headings">
                        Published by
                      </h2>
                      <p className="details-text">
                        {selectedGame.publisher}
                      </p>
                    </div>
                    <div className="game-details-bottom-right">
                      <h2 className="detail-headings">
                        Genre
                      </h2>
                      <p className="details-text">
                        {selectedGame.genre}
                      </p>
                      <h2 className="detail-headings">
                        Themes
                      </h2>
                        {selectedGame.theming.map((theme) =>
                        (
                          <p className="details-text" key={theme}>{theme}</p>
                        ))}
                      <h2 className="detail-headings">
                        Mechanics 
                      </h2>
                      {selectedGame.game_mechanics.map((mechanic, mechanicIndex) => 
                      (
                        <p className="details-text" key={mechanicIndex}>{mechanic}</p>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="large-detail-headings">
                    Description
                  </h2> 
                  <p className="details-description details-text">
                    {
                    selectedGame.description
                    .replaceAll('&quot;', '"')
                    .replaceAll('&mdash;', '—')
                    .replaceAll('&pound;', '£')
                    .replaceAll('&ldquo;', '“')
                    .replaceAll('&rdquo;', '”')
                    }
                  </p>
                </div>
                <div className="recomended-games"><h2 className="large-detail-headings">Recomended Games</h2></div>
                <div className="comments" id="comments"><h2 className="large-detail-headings">Comments</h2></div>
              </div>
            </div>
            ) : (
                <div>...Loading</div>
            )}
        </div>
    );
};

export default GameDetails;

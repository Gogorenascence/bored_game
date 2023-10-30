import React, { useState, useEffect} from "react";

interface Games {
        name: string,
        publisher: string,
        max_players: number,
        min_players: number,
        genre: string,
        game_length: number,
        interaction: string,
        picture_url: string[],
        websites: string[],
        theming: string,
        rules: string,
        formats: string[],
        ratings: number[],
        comments: string[],
        created: {},
        updated: {}
      }

function AllGames() {

    const [games, setGames] = useState<Games[]>([])

    const getAllGames = async() =>{
        const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/games/`);
        const data = await response.json();
        console.log(data);
        setGames(data);
    };

    useEffect(() => {
        getAllGames();        
    }, []);

    return(
        <div className="main-content">
        <h1>All Games</h1>
            <div className="game-list5">
                {games.map(game => {
                    return (
                        <div className="game-item">
                            <p>{game.name}</p>
                        </div>
                )
            })}
            </div>
        </div>
    )
}
export default AllGames;
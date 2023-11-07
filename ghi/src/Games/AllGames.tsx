import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";

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
        type pageParams = {
            pageNumber: string;
        };
        
        const [games, setGames] = useState<Games[]>([])
        const {pageNumber} = useParams<pageParams>()
        let totalPages = 0
        const [allPages, setAllPages] = useState<number[]>([])

    const getAllGames = async() =>{
        const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/games/`);
        const data = await response.json();
        console.log(data);
        console.log(pageNumber);
        const pageCount = parseInt(pageNumber!, 10)*50-50
        setGames(data.slice(pageCount, pageCount+50));
        totalPages = Math.ceil(data.length / 50);
        let tempPages = [];
        for (let i=1; i <= totalPages; i++) {
            console.log(i);
            tempPages.push(i);
        }
        setAllPages(tempPages);
    };

    console.log(allPages)

    useEffect(() => {
        getAllGames();
        window.scrollTo(0, 0);       
    }, [pageNumber]);

    return(
        <div className="main-content">
        <h1>All Games</h1>
            <div className="game-list5">
                {games.map(game => {
                    return (
                        <div className="game-item-container">
                            <h4 className="boardgame-title">{game.name}</h4>
                            <div className="game-item">
                                <img className="boardgame-image" src={game.picture_url[1]} alt={game.picture_url[0]}/>
                            </div>
                        </div>
                )
            })}
            </div>
            <div className="pagination">
                <h4>Previous</h4>
            	<div className="page-numbers">
                {allPages.map(page => {
                    return (
                        <NavLink to={`/games/${page}`}>
                            <h4 key={page}>{page}</h4>
                        </NavLink>
                    )
                })}                 
                </div>
                <h4>Next</h4>
            </div>
        </div>
    )
}
export default AllGames;
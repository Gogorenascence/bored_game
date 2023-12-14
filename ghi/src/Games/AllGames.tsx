import React, { useState, useEffect } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import {Game} from "./GameInterface" 

   
    function AllGames() {
        type pageParams = {
            pageNumber: string;
        };
        
        const navigate = useNavigate();

        const [games, setGames] = useState<Game[]>([])
        
        const {pageNumber} = useParams<pageParams>()
        const currentPage = pageNumber ? parseInt(pageNumber, 10) : 1
        let totalPages = 0
        const [allPages, setAllPages] = useState<number[]>([])

        console.log(allPages)

    const getAllGames = async() =>{
        const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/games/`);
        const data = await response.json();
        const startIndex = (currentPage - 1) * 50
        const endIndex = startIndex + 50
        setGames(data.slice(startIndex, endIndex));
        totalPages = Math.ceil(data.length / 50);
        let tempPages = [];
        for (let i=1; i <= totalPages; i++) {
            tempPages.push(i);
        }
        setAllPages(tempPages);
    };

    useEffect(() => {
        getAllGames();
        window.scrollTo(0, 0);       
    }, [pageNumber]);

    const onGameClick = (game: Game) => {
        navigate(`/game/${game.id}`);
    };

    return(
        <div className="main-content">
        <h1>All Games</h1>
            <div className="game-list5">
                {games.map(game => {
                    return (
                        <div className="game-item-container">
                            <h4 className="boardgame-title">{game.name}</h4>
                            <div className="game-item">
                                <img className="boardgame-image pointer" 
                                    src={game.picture_url[1]} 
                                    alt={game.picture_url[0]} 
                                    onClick={() => onGameClick(game)}
                                    />
                            </div>
                        </div>
                )
            })}
            </div>
            <div className="pagination">
                <NavLink to={`/games/${currentPage > 1 ? currentPage - 1 : 1}`}>
                    <h4 className="page-nav prev">❮</h4>
                </NavLink>
            	<div className="page-numbers">
                {allPages.map(page => {
                    return (
                        <NavLink to={`/games/${page}`} key={page}>
                            <h4 className="page-number">{page}</h4>
                        </NavLink>
                    )
                })}                 
                </div>
                <NavLink to={`/games/${currentPage < allPages.length ? currentPage +1 : allPages.length}`}>
                    <h4 className="page-nav next">❯</h4>
                </NavLink>
            </div>
        </div>
    )
}
export default AllGames;

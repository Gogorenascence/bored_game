import { NavLink } from "react-router-dom"
import React, { useEffect, useState } from "react"
import Carousel from "./Carousel"
import { Game } from "./Games/GameInterface"

function MainPage() {
    

    const [topTenGamesThisMonth, setTopTenGamesThisMonth] = useState([])
    const [topTenGamesToday, setTopTenGamesToday] = useState([])
    const [topTenGamesAllTime, setTopTenGamesAllTime] = useState<Game[]>([])

    const getGames = async() => {
        const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/games/`)
        const gameData = await response.json()
        setTopTenGamesAllTime(gameData.slice(0, 10))
        setTopTenGamesToday(gameData.slice(10, 20)) //logic needs to be updated
        setTopTenGamesThisMonth(gameData.slice(20, 30)) //logic needs to be updated
    }

    useEffect(() => {
        getGames()
    }, [])

    console.log(topTenGamesAllTime)
    
    return (
        <div className="main-content">
            <h1 className="section-title">Most Popular Games</h1>
            <div className="three-container">
                <div>
                    <h3 className="game-label">All Time</h3>
                    <div className="game-window-1">
                        <Carousel games={topTenGamesAllTime}/>
                    </div>
                </div>
                <div>
                    <h3 className="game-label">Monthly</h3>
                    <div className="game-window-1">
                    <Carousel games={topTenGamesThisMonth}/>
                    </div>
                </div>
                <div>
                    <h3 className="game-label">Daily</h3>
                    <div className="game-window-1">
                    <Carousel games={topTenGamesToday}/>
                    </div>
                </div>
            </div>
            <div className="featured-container">
                <div>
                    <h1 className="section-title">Featured Games</h1>
                    <div className="featured-games">
                        <p>{topTenGamesAllTime[0]?.name}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MainPage
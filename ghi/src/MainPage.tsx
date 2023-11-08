import { NavLink } from "react-router-dom"
import React, { useEffect, useState } from "react"
import Carousel from "./Carousel"
import { Game } from "./Games/GameInterface"

function MainPage() {
    

    const [monthlyGames, setMonthlyGames] = useState([])
    const [dailyGames, setDailyGames] = useState([])
    const [topTenAllTimeGames, setTopTenAllTimeGames] = useState<Game[]>([])

    const getGames = async() => {
        const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/games/`)
        const gameData = await response.json()
        setTopTenAllTimeGames(gameData.slice(0, 10))
        setDailyGames(gameData)
        setMonthlyGames(gameData)
    }

    useEffect(() => {
        getGames()
    }, [])

    console.log(topTenAllTimeGames)
    
    return (
        <div className="main-content">
            <h1 className="section-title">Most Popular Games</h1>
            <div className="three-container">
                <div>
                    <h3 className="game-label">All Time</h3>
                    <div className="game-window-1">
                        <Carousel games={topTenAllTimeGames}/>
                    </div>
                </div>
                <div>
                    <h3 className="game-label">Monthly</h3>
                    <div className="game-window-1">
                        <p>{topTenAllTimeGames[0]?.name}</p>
                    </div>
                </div>
                <div>
                    <h3 className="game-label">Daily</h3>
                    <div className="game-window-1">
                        <p>{topTenAllTimeGames[0]?.name}</p>
                    </div>
                </div>
            </div>
            <div className="featured-container">
                <div>
                    <h1 className="section-title">Featured Games</h1>
                    <div className="featured-games">
                        <p>{topTenAllTimeGames[0]?.name}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MainPage
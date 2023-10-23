import { NavLink } from "react-router-dom"
import React, { useEffect, useState } from "react"


function MainPage() {
    
    interface Game {
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

    const [monthlyGames, setMonthlyGames] = useState([])
    const [dailyGames, setDailyGames] = useState([])
    const [allTimeGames, setAllTimeGames] = useState<Game[]>([])

    const getGames = async() => {
        const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/games/`)
        const gameData = await response.json()
        setAllTimeGames(gameData)
        setDailyGames(gameData)
        setMonthlyGames(gameData)
    }

    useEffect(() => {
        getGames()
    }, [])

    console.log(allTimeGames)
    
    return (
        <div className="main-content">
            <div className="three-container">
                <div className="game-window-1">
                    <p>{allTimeGames[0]?.name}</p>
                </div>
                <div className="game-window-1">
                    <p>{allTimeGames[0]?.name}</p>
                </div>
                <div className="game-window-1">
                    <p>{allTimeGames[0]?.name}</p>
            </div>
            </div>
            <div className="featured-container">
                <div className="featured-games">
                    <p>{allTimeGames[0]?.name}</p>
                </div>
            </div>
        </div>
    )
}
export default MainPage
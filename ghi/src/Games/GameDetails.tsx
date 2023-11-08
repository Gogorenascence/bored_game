import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Game } from "./GameInterface"



const GameDetails: React.FC<{game: Game}> = ({game}) => {

    game = game

    return (
        <h1>game.name</h1>
    )
}

export default GameDetails
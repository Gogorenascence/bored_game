import React from "react";

const Dice = () => {

    return (
        <div className="dice">
            <div className="d6 d6-front">⚀</div>
            <div className="d6 d6-bottom">⚁</div>
            <div className="d6 d6-left">⚂</div>
            <div className="d6 d6-right">⚃</div>
            <div className="d6 d6-top">⚄</div>
            <div className="d6 d6-back">⚅</div>
        </div>
    );
}; 

export default Dice;
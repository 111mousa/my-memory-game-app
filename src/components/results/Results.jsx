import React, { useEffect, useState } from 'react'
import './results.css'

const Results = ({players,player1,player2})=> {
    const [playerOneResult,setPlayerOneResult] = useState(0)
    const [playerTwoResult,setPlayerTwoResult] = useState(0)

    
useEffect(() => {
const calculateResults = () => {
let playerOneScore = 0;
let playerTwoScore = 0;

players?.forEach((player) => {
    if (player.name === player1 && player.result === "success") {
    playerOneScore++;
    } else if (player.name === player2 && player.result === "success") {
    playerTwoScore++;
    }
});

setPlayerOneResult(playerOneScore);
setPlayerTwoResult(playerTwoScore);
};

calculateResults();
}, [players, player1, player2]);
    return (
        <div className='results-container'>
            <table class="table-atyle">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Text</th>
                    <th>Result</th>
                </tr>
            </thead>
            <tbody>
                {players?.map((player)=>(<tr>
                    <td>{player.name}</td>
                    <td>{player.text}</td>
                    <td>{player.result}</td>
                </tr>))}

            </tbody>
        </table>
        <div className="results-container">
            <div className="player-result">
                <span className="player-name">{player1}</span>
                <span className="result">Result: {playerOneResult}</span>
            </div>
            <div className="player-result">
                <span className="player-name">{player2}</span>
                <span className="result">Result: {playerTwoResult}</span>
            </div>
            <div className="winner">
                <span className="winner-label"> Winner :</span>
                <span className="winner-name">{(playerOneResult === playerTwoResult)?"Same Same":(playerOneResult > playerTwoResult) ? player1 : player2}</span>
            </div>
        </div>
    </div>
    )
}

export default Results;

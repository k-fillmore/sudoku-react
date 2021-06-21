import {React, useState} from 'react'
import "./board.css"

function Board() {
    const [game,setGame] = useState([
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0]

    ])
    
    return (
        <div className="game-container">
        <div className="grid-container">
            {game.map((row, yindex) => {
                return(
                <>
                <div className="grid-row">
                {row.map((col) => {
                   return( 
                   <>
                   <div className="grid-cell">
                    <input type="text" maxlength="1" name='cell-input[{{ i+j*9 }}]' className="def-txt-input" value={col}></input>
                    </div>
                    </>
                    )  
                })}
               </div>
               </>
                )
            })}
            
        </div>
        </div>
    )
}

export default Board

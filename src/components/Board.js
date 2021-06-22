import {React, useState} from 'react'
import { isCompositeComponentWithType } from 'react-dom/test-utils';
import "./board.css"
import {v4 as uuid} from "uuid"

function Board() {
    
    let [game,setGame] = useState([
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
    const handleChange = (row, column, event) => {
        let copy = [...game];
        copy[row][column] = parseInt(event.target.value);
        return copy;
    }


    return (
        <div key={uuid()} className="game-container">
        <div key={uuid()} className="grid-container">
            {game.map((row, yindex) => {
                return(
                <div key={uuid()} className="grid-row">
                {row.map((col, xindex) => {
                   return( 
                   <div key={uuid()} className="grid-cell">
                    <input key={uuid()} type="text" maxLength="1" value={col} onClick={e => e.target.value = ''} onChange={e => setGame([...game] = handleChange(yindex,xindex,e))}></input>
                    </div>
                    )  
                })}
               </div>
               
                )
            })}
            
        </div>
        </div>
    )
}

export default Board

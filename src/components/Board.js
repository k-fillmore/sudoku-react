import {React, useState} from 'react'
import { isCompositeComponentWithType } from 'react-dom/test-utils';
import "./board.css"
import {v4 as uuid} from "uuid"
import {Button} from 'react-bootstrap'

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
    let [solved, setSolved] = useState(false);
    let [resetBoard, setResetBoard] = useState(game.map(pos => pos.slice()))
    const [unsolvedBoard, setUnsolvedBoard] = useState(game.map(pos => pos.slice()))
    const [solvedBoard, setSolvedBoard] = useState(solve(unsolvedBoard))

    const handleChange = (row, column, event) => {
        let copy = [...game];
        copy[row][column] = parseInt(event.target.value);
        return copy;
    }
    function possible(board, y, x, n) {
        for (let i = 0; i < 9; i++) {
          if (board[y][i] === n || board[i][x] === n) {
            return false;
          }
        }
      
        const xSquare = Math.floor(x / 3) * 3;
        const ySquare = Math.floor(y / 3) * 3;
      
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (board[ySquare+i][xSquare+j] === n) {
              return false;
            }
          }
        }
      
        return true;
      }
      
      function solve(board) {
        
        for (let y = 0; y < 9; y++) {
          for (let x = 0; x < 9; x++) {
            if (board[y][x] === 0) {
              for (let n = 1; n <= 9; n++) {
                if (possible(board, y, x, n)) {
                  board[y][x] = n;
                  
                  if (solve(board)) return board;
                }
              }
              
              board[y][x] = 0;
              return false;
            }
          }
        }
        
        return board;
      }

    function compareBoards(board,solvedBoard){
        if (JSON.stringify(board) === JSON.stringify(solvedBoard)){
            return true
        }else return false;
    }

    function clearBoard(){
        setGame([...game] = resetBoard)
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
            <div className="actionButtons">
                {console.log(game)}
                {console.log(unsolvedBoard)}
                {console.log(solvedBoard)}
            <Button onClick={() => console.log(compareBoards(game, solvedBoard))}>Solve</Button>
            <Button>New Puzzle</Button>
            <Button onClick={() => clearBoard()}>Clear</Button>
            </div>
        </div>
        
        </div>
    )
}

export default Board

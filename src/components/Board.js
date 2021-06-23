import { React, useState, useEffect } from "react";
import { isCompositeComponentWithType } from "react-dom/test-utils";
import "./board.css";
import { v4 as uuid } from "uuid";
import { Button } from "react-bootstrap";
import { puzzles } from "./puzzles.js";
import { solver } from "./solver.js";

function Board() {
  const randomId = Math.floor(Math.random() * 90);
  const [puzzleId, setPuzzleId] = useState(randomId);
  const [originalGame, setOriginalGame] = useState(puzzles(puzzleId));
  function clone(array) {
    let clone = array.map(function (arr) {
      return arr.slice();
    });
    return clone;
  }
  let [game, setGame] = useState(clone(originalGame));
  let [solvedBoard, setSolvedBoard] = useState(solver(clone(originalGame)));

  useEffect(() => {
    setOriginalGame(puzzles(puzzleId));
    setGame(puzzles(puzzleId));
    setSolvedBoard(solver(puzzles(puzzleId)))
  }, [puzzleId]);

  const handleChange = (row, column, event) => {
    if(event.target.value === " "){event.target.value = 0}
    let copy = [...game];
    copy[row][column] = parseInt(event.target.value);
    return copy;
  };

  function compareBoards(board, solvedBoard) {
    if (JSON.stringify(board) === JSON.stringify(solvedBoard)) {
      return true;
    } else return false;
  }

  function isCorrectBorder(x,y,col){
    if (solvedBoard[y][x] === col){
      return("valid-border readWrite")
    } else if(solvedBoard[y][x] !== col & col !== ""){
      return("invalid-border readWrite")
    } else{
      return("readWrite")
    }
  }

  function clearBoard() {
    setGame(clone(originalGame));
  }
  function input(y, x, col) {
    if(game[y][x]===0){col=""}
    if (originalGame[y][x] === 0) {
      {console.log(isCorrectBorder(x,y,col))}
      return (
        <input
          key={uuid()}
          className={isCorrectBorder(x,y,col)}
          type="text"
          maxLength="1"
          value={col}
          onClick={(e) => (e.target.value = "")}
          onChange={(e) => setGame(([...game] = handleChange(y, x, e)))}
        ></input>
      );
    } else if (originalGame[y][x] > 0) {
      return (
        <input
          key={uuid()}
          className="readOnly"
          readOnly={true}
          type="text"
          maxLength="1"
          value={col}
        ></input>
      );
    }
  }

  return (
    <div key={uuid()} className="game-container">
      <div key={uuid()} className="grid-container">
        {game.map((row, yindex) => {
          return (
            <div key={uuid()} className="grid-row">
              {row.map((col, xindex) => {
                return (
                  <div key={uuid()} className="grid-cell">
                    {input(yindex, xindex, col)}
                  </div>
                );
              })}
            </div>
          );
        })}
        <div className="actionButtons">
          
          <Button onClick={() => setGame(clone(solvedBoard))}>Solution</Button>
          <Button
            onClick={() => {
              setPuzzleId(randomId);
            }}
          >
            New Puzzle
          </Button>
          <Button onClick={() => clearBoard()}>Reset</Button>
        </div>
      </div>
    </div>
  );
}
/* <Button onClick={() => console.log(compareBoards(game, solvedBoard))}>
            Check
          </Button>*/
export default Board;

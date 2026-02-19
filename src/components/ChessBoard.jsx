import React, { useState } from "react";
import { initialBoard } from "../utils/initialBoard";
import { pieceSymbols } from "../utils/piece";
import { isValidMove } from "../utils/moveLogic";
import { isCheckmate, isKingInCheck } from "../utils/checkLogic";

export default function ChessBoard() {
  const [board, setBoard] = useState(() => initialBoard.map(row => [...row]));
  const [selected, setSelected] = useState(null);
  const [turn, setTurn] = useState("white");
  const [validMove, setValidMove] = useState([]);

  const currentColor = turn;
  const inCheck = isKingInCheck(board, currentColor);
  const checkmate = isCheckmate(board, currentColor);

  const restartGame = () => {
    setBoard(initialBoard.map(row => [...row]));
    setSelected(null);
    setTurn("white");
  };

  const handleClick = (r, c) => {
  if (selected) {
    if (selected.r === r && selected.c === c) {
      setSelected(null);
      return;
    }

    const valid = isValidMove(board, selected, { r, c }, turn);

    if (valid) {
      const newBoard = board.map(row => [...row]);
      const piece = newBoard[selected.r][selected.c];
      
      newBoard[r][c] = piece;
      newBoard[selected.r][selected.c] = "";

      if (piece === "P" && r === 0) newBoard[r][c] = "Q"; // Pawn promotion for white
      if (piece === "p" && r === 7) newBoard[r][c] = "q"; // Pawn promotion for black
      
      if (!isKingInCheck(newBoard, turn)) {
      setBoard(newBoard);

      setTurn(prev => (prev === "white" ? "black" : "white"));
      }
    }

    setSelected(null);
    setValidMove([]);


  } else {
    if (board[r][c]) {
      setSelected({ r, c });

      const moves = [];
      for (let tr = 0; tr < 8; tr++) {
        for (let tc = 0; tc < 8; tc++) {
          if (isValidMove(board, { r, c }, { r: tr, c: tc }, turn)) {
            moves.push({ r: tr, c: tc });
          }
        }
      }
      setValidMove(moves);
    }
  }
};

  return (
    <div>
      <h2>Turn: {turn.toUpperCase()}</h2>

      {inCheck && !checkmate && <h3> ⚠️ Check!</h3>}
      {checkmate && <h3> 🏁 Checkmate! Game Over</h3>}
      <button onClick={restartGame}>Restart Game</button>

      <div className="board">
        {board.map((row, rIndex) =>
          row.map((piece, cIndex) => (
            <div
              key={`${rIndex}-${cIndex}`}
              onClick={() => handleClick(rIndex, cIndex)}
              className={`square ${(rIndex + cIndex) % 2 === 0 ? "white" : "black"} 
              ${selected?.r === rIndex && selected?.c === cIndex ? "selected" : ""}`}
            >
              { piece && (
                <span className={piece === piece.toUpperCase() ? "white-piece" : "black-piece"}>
                  {pieceSymbols[piece]}
                </span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
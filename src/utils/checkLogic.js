import { isValidMove } from "./moveLogic";

function findKing(board, color) {
  const king = color === "white" ? "K" : "k";

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (board[r][c] === king) {
        return { r, c };
      }
    }
  }

  return null;
}

export function isInCheck(board, color) {
  const king = color === "white" ? "K" : "k";

  // Find the king's position
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (board[r][c] === king)  
        return  { r, c }; 
        }
    }
    return null;
    }

export function isKingInCheck(board, color) {
  const kingPos = findKing(board, color);
  if (!kingPos) return false; // Not in check, so can't be checkmate

  const opponent = color === "white" ? "black" : "white";

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (!piece) continue;

      const isOpponentPiece =
        (opponent === "white" && piece === piece.toUpperCase()) ||
        (opponent === "black" && piece === piece.toLowerCase());

      if (isOpponentPiece) {
        if (isValidMove(board, { r, c }, kingPos, opponent)) {
          return true; 
        }
      }
    }
  }

  return false; 
}

export function isCheckmate(board, color) {
    if (!isKingInCheck(board, color)) return false; // Not in check, so can't be checkmate

    // Check if any move can get the king out of check
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = board[r][c];
        if (!piece) continue;

        const isOwnPiece =
          (color === "white" && piece === piece.toUpperCase()) ||
          (color === "black" && piece === piece.toLowerCase());

          if (!isOwnPiece) continue;

        for (let tr = 0; tr < 8; tr++) {
          for (let tc = 0; tc < 8; tc++) {
            if (isValidMove(board, { r, c }, { r: tr, c: tc }, color)) {
              const newBoard = board.map(row => [...row]);
              newBoard[tr][tc] = newBoard[r][c];
              newBoard[r][c] = "";
              if (!isKingInCheck(newBoard, color)) {
                return false; // Found a move that gets the king out of check
              }
            }
          }
        }
      }
    }

    return true; // No moves can get the king out of check, it's checkmate
  }
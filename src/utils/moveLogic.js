export function isValidMove(board, from, to, turn) {
  const piece = board[from.r][from.c];
  if (!piece) return false;

  // Prevent moving opponent pieces
  if (turn === "white" && piece === piece.toLowerCase()) return false;
  if (turn === "black" && piece === piece.toUpperCase()) return false;

  const target = board[to.r][to.c];

  // Prevent capturing own piece
  if (target) {
    if (
      (piece === piece.toUpperCase() && target === target.toUpperCase()) ||
      (piece === piece.toLowerCase() && target === target.toLowerCase())
    ) {
      return false;
    }
  }

  switch (piece.toLowerCase()) {
    case "p":
      return validatePawn(board, from, to, piece);
    case "r":
      return validateRook(board, from, to);
    case "n":
      return validateKnight(from, to);
    case "b":
      return validateBishop(board, from, to);
    case "q":
      return validateQueen(board, from, to);
    case "k":
      return validateKing(from, to);
    default:
      return false;
  }
}

function validatePawn(board, from, to, piece) {
  const direction = piece === "P" ? -1 : 1;
  const startRow = piece === "P" ? 6 : 1;

  // forward move
  if (from.c === to.c && board[to.r][to.c] === "") {
    if (to.r === from.r + direction) return true;

    if (
      from.r === startRow &&
      to.r === from.r + 2 * direction &&
      board[from.r + direction][from.c] === ""
    ) {
      return true;
    }
  }

  // capture
  if (
    Math.abs(from.c - to.c) === 1 &&
    to.r === from.r + direction &&
    board[to.r][to.c] !== ""
  ) {
    return true;
  }

  return false;
}

function validateRook(board, from, to) {
  if (from.r !== to.r && from.c !== to.c) return false;
  return isPathClear(board, from, to);
}

function validateBishop(board, from, to) {
  if (Math.abs(from.r - to.r) !== Math.abs(from.c - to.c)) return false;
  return isPathClear(board, from, to);
}

function validateKnight(from, to) {
  const dr = Math.abs(from.r - to.r);
  const dc = Math.abs(from.c - to.c);
  return (dr === 2 && dc === 1) || (dr === 1 && dc === 2);
}

function validateQueen(board, from, to) {
  return validateRook(board, from, to) || validateBishop(board, from, to);
}

function validateKing(from, to) {
  const dr = Math.abs(from.r - to.r);
  const dc = Math.abs(from.c - to.c);
  return dr <= 1 && dc <= 1;
}

function isPathClear(board, from, to) {
  const dr = Math.sign(to.r - from.r);
  const dc = Math.sign(to.c - from.c);

  let r = from.r + dr;
  let c = from.c + dc;

  while (r !== to.r || c !== to.c) {
    if (board[r][c] !== "") return false;
    r += dr;
    c += dc;
  }
  return true;
}
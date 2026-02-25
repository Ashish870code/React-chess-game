# React Chess Game ♟️

Live link:- https://lets-playchess.netlify.app

![React](https://img.shields.io/badge/React-17.0.2-blue?logo=react)
![NPM](https://img.shields.io/badge/npm-9.8.0-red?logo=npm)

A fully playable **2-player local chess game** built with **React**.  
Supports all basic chess rules including valid moves, pawn promotion, check & checkmate detection.

---

## 🎯 Features

- Chessboard with **8x8 squares** and correctly oriented white (bottom) / black (top) pieces.  
- **All pieces move legally** according to chess rules.  
- **Pawn promotion** to queen when reaching last rank.  
- **Check and checkmate detection**.  
- **Highlight valid moves** when a piece is selected.  
- **Restart game button** to reset the board anytime.  
- Fully **responsive board and pieces** scaled appropriately.  

---

## 📸 Screenshots / GIFs

### Game Start
![Chess Board Start](./screenshots/start.png)

### Pawn Promotion
![Pawn Promotion](./screenshots/promotion.png)

### Check / Checkmate
![Checkmate](./screenshots/Checkmate.png)

> You can replace these images with actual screenshots from your game.

---

## 🛠 Tech Stack

- **Frontend:** React, JavaScript, CSS  

- **No backend** (all logic handled on frontend)  

---

## 📂 File Structure

src/ ├── components/ │   └── ChessBoard.jsx ├── utils/ │   ├── initialBoard.js │   ├── moveLogic.js │   ├── piece.js │   └── checkLogic.js ├── App.jsx ├── App.css └── index.jsx

---

## 🚀 Setup & Run

1. Clone the repository:

```bash
git clone <your-repo-url>
cd <repo-folder>

2. Install Dependencies & Start Server

npm install
npm run dev

3. Open Your Browser


# Live

link:- https://lets-playchess.netlify.app

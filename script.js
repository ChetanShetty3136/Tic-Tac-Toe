const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let running = true;

const winningPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

statusText.textContent = `Player ${currentPlayer}'s turn`;

cells.forEach(cell => cell.addEventListener("click", cellClicked));
restartBtn.addEventListener("click", restartGame);

function cellClicked(){
    let index = this.dataset.index;

    if(board[index] !== "" || !running){
        return;
    }

    board[index] = currentPlayer;
    this.textContent = currentPlayer;

    checkWinner();
}

function changePlayer(){
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner(){
    let roundWon = false;

    for(let pattern of winningPatterns){
        let [a, b, c] = pattern;

        if(board[a] !== "" && board[a] === board[b] && board[b] === board[c]){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `Player ${currentPlayer} Wins!`;
        running = false;
    } else if(!board.includes("")){
        statusText.textContent = "Draw!";
        running = false;
    } else {
        changePlayer();
    }
}

function restartGame(){
    currentPlayer = "X";
    board = ["", "", "", "", "", "", "", "", ""];
    running = true;
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
}
const Player = (playerName, playerMark) => {
    const name = playerName;
    const mark = playerMark;
    const getName = () => name;
    const getMark = () => mark;
    return {getName, getMark};
};

const gameBoard = (() => {
    const size = 3;
    const board = document.querySelector('.board');
    const resetBtn = document.querySelector('#reset');

    const makeBoard = () => {
        gameController.init();
        while (board.firstChild) board.removeChild(board.lastChild);
        board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        board.style.gridTemplateRows = `repeat(${size}, 1fr)`;
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const boardspace = document.createElement('div');
                boardspace.id = `${i}${j}`;
                boardspace.classList.add('boardspace');
                boardspace.addEventListener('click', event => {
                    gameController.makeMove(event.target.id);
                })
                board.appendChild(boardspace);
            }
        }
    }

    resetBtn.addEventListener('click', makeBoard);

    return {
        size,
        makeBoard,
    }
})();

const gameController = (() => {
    const playerX = Player('player 1', 'X'); //to allow input later
    const playerO = Player('player 2', 'O');
    let playerXTurn = true;
    let rowCheckX = Array(gameBoard.size).fill(0);
    let colCheckX = Array(gameBoard.size).fill(0);
    let diagCheckX = 0;
    let antidiagCheckX = 0;
    let rowCheckO = Array(gameBoard.size).fill(0);
    let colCheckO = Array(gameBoard.size).fill(0);
    let diagCheckO = 0;
    let antidiagCheckO = 0;
    let winner = false;

    const init = () => {
        playerXTurn = true;
        rowCheckX = Array(gameBoard.size).fill(0);
        colCheckX = Array(gameBoard.size).fill(0);
        diagCheckX = 0;
        antidiagCheckX = 0;
        rowCheckO = Array(gameBoard.size).fill(0);
        colCheckO = Array(gameBoard.size).fill(0);
        diagCheckO = 0;
        antidiagCheckO = 0;
        winner = false;
    }

    const makeMove = id => {
        if (! document.getElementById(id).textContent && ! winner) {
            checkMove(parseInt(id[0]), parseInt(id[1]))
            if (playerXTurn) {
                document.getElementById(id).textContent = playerX.getMark();
                if (winner == true) console.log(`what a win for ${playerX.getName()}`);
                playerXTurn = false;
            }
            else {
                document.getElementById(id).textContent = playerO.getMark();
                if (winner == true) console.log(`what a win for ${playerO.getName()}`);
                playerXTurn = true;
            }
        }
    };

    const checkMove = (row, col) => {
        if (playerXTurn) {
            rowCheckX[row] += 1;
            colCheckX[col] += 1;
            if (row == col) diagCheckX += 1;
            if ((row + col) == 2) antidiagCheckX += 1;

            if (rowCheckX[row] == gameBoard.size) winner = true;
            else if (colCheckX[col] == gameBoard.size) winner = true;
            else if (diagCheckX == gameBoard.size) winner = true;
            else if (antidiagCheckX == gameBoard.size) winner = true;
        }
        else {
            rowCheckO[row] += 1;
            colCheckO[col] += 1;
            if (row == col) diagCheckO += 1;
            if ((row + col) == 2) antidiagCheckO += 1;

            if (rowCheckO[row] == gameBoard.size) winner = true;
            else if (colCheckO[col] == gameBoard.size) winner = true;
            else if (diagCheckO == gameBoard.size) winner = true;
            else if (antidiagCheckO == gameBoard.size) winner = true;
        }
    }

    return {
        init,
        makeMove
    };
})();

gameBoard.makeBoard();
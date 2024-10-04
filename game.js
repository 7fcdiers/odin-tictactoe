function Player(name, order) {

    const symbol = (order === 1) ? "X" : "O";
    const value = (order === 1) ? 1 : -1;

    return {
        name,
        order,
        symbol,
        value
    };

};

const BoardDisplay = function () {

    //cache Dom

    const game = document.getElementById("game-grid");
    const result = document.getElementById("result");
    const p1 = document.getElementById("player1");
    const p2 = document.getElementById("player2");

    function newBoard(board) {
        console.log(board)
        for (i = 0; i <= board.length - 1; i++) {
            const row = board[i];
            for (j = 0; j <= row.length - 1; j++) {
                makeCell(i, j);
            }
        }
    }

    function getPlayersName() {
        const player1 = p1.value;
        const player2 = p2.value;

        if(p1.value === "" || p2.value === ""){
            alert("Merci de renseigner les noms des 2 joueurs !")
            return false;
        }

        return {
            player1,
            player2
        };
    }

    function makeCell(i, j) {
        const cell = document.createElement('div');
        cell.id = `${i}${j}`;
        cell.className = "cell";
        const row = i + 1;
        const column = j + 1;
        cell.style = `grid-row: ${row}; grid-column: ${column};`
        cell.addEventListener("click", Run.updateBoard);
        game.appendChild(cell);
    }

    function updateCell(i, j, currentPlayer) {
        const cell = getCell(i, j);
        removeEvent(cell);
        cell.textContent = currentPlayer.symbol;
        cell.classList.add("cell-p" + currentPlayer.order);
    }

    function getCell(i, j) {
        return document.getElementById(`${i}${j}`);
    }

    function removeEvent(cell) {
        cell.removeEventListener("click", Run.updateBoard);
    }

    function showResult(message) {
        console.log(message);
        result.textContent = message;
    }

    function inactivateBoard(board) {
        for (i = 0; i <= board.length - 1; i++) {
            for (j = 0; j <= board.length - 1; j++) {
                if (board[i][j] === 0) {
                    const cell = getCell(i, j);
                    removeEvent(cell);
                }
            }
        }
    }

    function resetDisplay() {
        for(i=0; i<=2; i++){
            for(j=0; j<=2; j++){
                const cell = getCell(i,j);
                cell.remove();
            }
        }
    }

    return {
        newBoard,
        updateCell,
        showResult,
        getPlayersName,
        inactivateBoard,
        resetDisplay
    }

};

const Run = (function () {

    //global variables
    let board = [];
    let player1;
    let player2;
    let currentPlayer;
    let turn = 0;

    //Cache general dom
    const btnStart = document.querySelector("#start");
    const btnReset = document.querySelector("#reset");
    const display = new BoardDisplay();

    //bin events
    btnStart.addEventListener("click", start);
    btnReset.addEventListener("click", reset);

    function newBoard() {
        board = [];
        for (i = 0; i <= 2; i++) {
            board.push([0, 0, 0]);
        }
    }

    function start() {
        if(setPlayers()){
            newBoard();
            display.newBoard(board);
            turn = 1;
        }
    }

    function reset() {
        display.resetDisplay();
        start();
    }

    const updateBoard = (event) => {
        const [i, j] = (event.target.id).split("");
        board[i][j] = currentPlayer.value;
        display.updateCell(i, j, currentPlayer);
        if (isWinner(currentPlayer)) {
            hasWon(currentPlayer);
        } else if (turn == 9) {
            draw();
        } else {
            currentPlayer = (currentPlayer === player1) ? player2 : player1;
            turn += 1;
        }
    }

    function setPlayers() {
        const players = display.getPlayersName();
        if(!players){
            return false;
        }
        player1 = Player(players.player1, 1);
        player2 = Player(players.player2, 2);
        currentPlayer = player1;
        return true;
    }

    function isWinner(player) {

        const totValues = [];
        totValues.push(board[0][0] + board[1][1] + board[2][2]);
        totValues.push(board[0][2] + board[1][1] + board[2][0]);
        for (i = 0; i <= 2; i++) {
            totValues.push(board[i].reduce((tot, val) => tot + val, 0));
            totValues.push(board.reduce((tot, val) => tot + val[i], 0))
        }
        const winningValue = 3 * player.value;
        if (totValues.includes(winningValue)) {
            return true;
        }
        return false;
    }

    function hasWon(player) {
        display.inactivateBoard(board)
        display.showResult(player.name + " has won !");
    }


    function draw() {
        display.showResult("It's a draw !");
    }

    return {
        updateBoard
    }

})();
function gameboard () {
    
    const board = [[0,0,0],[0,0,0],[0,0,0]];

    const init = () => {
        return board
    }

    const update = (player, position) => {
        const pos = position.split('');
        board[pos[0]][pos[1]] = player.value;
    }

    const playable = (position) => {
        const pos = position.split('');
        console.log(pos);
        return board[pos[0]][pos[1]] === 0;
    }

    const getboard = () => {
        return board;
    }

    const iswinner = (player) => {
        
        const totValues = [];
        totValues.push(board[0][0] + board[1][1] + board[2][2]);
        totValues.push(board[0][2] + board[1][1] + board[2][0]);
  
        for(i=0; i <= 2; i++) {
            totValues.push(board[i].reduce((tot, val) => tot + val,0));
            totValues.push(board.reduce((tot,val) => tot + val[i],0))
        }
        console.log(totValues)
        const winningValue = 3 * player.value;
        if(totValues.includes(winningValue)) {
            return true;
        }

        return false;
    }

    return { init, update, playable, getboard, iswinner } ;
};

function Player (i)  {
    const name = prompt("Player " + i + " name ?");
    const symbol = (i === 1) ? "X" : "O";
    const value =  (i === 1) ? 1 : -1;

    return { name, symbol, value };

};

const Run = (function() {

    const play = (player) => {
        let position = prompt(player.name + ": choix ?");
        console.log(player.name + " : " + position );
        while(!board.playable(position)){
            console.log("Choix " + position + " non valide.");
            position = prompt(player.name + ": choix ?");
        }
        board.update(player,position);
    }
    
    const start = () => {
        const playerOne = Player(1);
        const playerTwo = Player(2);    

        console.log(playerOne.name + " vs " + playerTwo.name);
        
        const board = gameboard();
        board.init();
        let playerTurn = playerTwo;
        let turn = 0
        while(!board.iswinner(playerTurn) && turn <= 9){
            playerTurn = (playerTurn === playerOne)? playerTwo : playerOne;
            play(playerTurn);
            turn += 1;
        }

        if(board.iswinner(playerTurn)){
            console.log("Winner is : " + playerTurn.name)
        }
        else {
            console.log("Draw");
        }

    }
    
    return { start };

})();

// Run.start();



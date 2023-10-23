const gameBoard= function(){
    
    let gameState = [ 2,2,2,2,2,2,2,2,2];
    
    const winningState =[[0,1,2], [3,4,5], [6,7,8], 
                         [0,3,6], [1,4,7], [2,5,8],
                            [0,4,8], [2,4,6]]

    //DOM elements
    const gridBox = document.querySelector('.grid-box');
    const gridBody = document.querySelector('.body');



    //render();


    

    function render(){      
        

        gameState.forEach((item, index) =>{
            const gridItem = document.createElement('button');
            gridItem.classList.add('grid-item');
            gridItem.dataset.key = index;
            if(gameState[gridItem.dataset.key] ==='x'){
                const playerChoice = gridItemContent(gameState[gridItem.dataset.key]);
                gridItem.appendChild(playerChoice);
            }
    
            else if(gameState[gridItem.dataset.key] ==='o'){
                const playerChoice = gridItemContent(gameState[gridItem.dataset.key]);
                gridItem.appendChild(playerChoice);
            }
            gridBox.appendChild(gridItem);
    
        })
        gridBox.style.display= 'flex';
    }

    function gridItemContent(value){
        switch(value){
            case 'x':
                const optionX =createCellOption(value);
                return optionX
                break;
            
            case 'o':
                const optionO =createCellOption(value);
                return optionO;
                break;

            default:
                break;    
        }

    }

    function updateScreen(){
        const cell = document.querySelectorAll('.grid-item');

        gameState.forEach((state,index) => {
            cell.forEach(cellName => {
                if(index === parseInt(cellName.dataset.key)){
                    if(cellName.childElementCount === 0){
                        if(state ==='x'){
                            const playerChoice = gridItemContent(gameState[index]);
                            cellName.appendChild(playerChoice);
                        }
                
                        else if(state ==='o'){
                            const playerChoice = gridItemContent(gameState[index]);
                            cellName.appendChild(playerChoice);
                        }
                    }

                }
            })
        })
    }

    function createCellOption(value){
        const content = document.createElement('img');
        content.setAttribute('src', `media/${value}.png`);
        content.classList.add('game-option');

        return content;
    };



    const getGridCellNo=()=> {
        gridBox.addEventListener('click', (event) => {
            console.log(event.target.dataset.key);
            return event.target.dataset.key;            
        });

        //return event.target.dataset.key;
          
    }

    const getGridCellState= ()=>{
        let cellContentCount;
        const cell = document.querySelectorAll('.grid-item');

        // cell.forEach(item => item.addEventListener('click', (event)=>{
        //     console.log(event.target)
        //     return event.target.childElementCount;
        // } ));
        gridBox.addEventListener('click', (event)=>{
            console.log(event.target.dataset.key)
            return event.target.childElementCount;
        });
        
    }


    function getGameState(){
        return gameState;
    }

    function setGameState(position,value){
        gameState[position]= value;
    }

    function checkPosition(){
        let winner =''
        if(gameState){
            console.log(gameState);
            winningState.forEach((state) => {
                if(gameState[state[0]] === gameState[state[1]] && gameState[state[1]] === gameState[state[2]] && gameState[state[0]] !== 2){
                    console.log('Winning state: '+gameState[state[0]]);
                    winner = gameState[state[0]];
                }
                else{
                    //console.log(state);
                }
            })
        }
        return winner;
    }


    function disableScreen(name){
        const winner = document.querySelector('.winnerMessage');
        const winnerMessage = document.querySelector('.winnerMsg');
        const cell = document.querySelectorAll('.grid-item');
        winnerMessage.textContent = `The is Winner is  ${name}`;

        winner.style.display='block';
        cell.disabled =true;

    }
    return {getGridCellNo, getGridCellState ,render, getGameState, setGameState, updateScreen, checkPosition, disableScreen}
}


function createPlayer(playerName, playerChoice, playerStatus) {

    const getName = ()=> playerName;
    const getPlayerChoice  =() => playerChoice;
    const getStatus =() => playerStatus;


    return{playerName, playerChoice, playerStatus, getName, getPlayerChoice, getStatus};
} 

const playerController = function(){
    const player1 = document.querySelector('#player1');
    const player2_label = document.querySelector('.header-items label');
    const player2 = document.querySelector('#player2');
    const player2_input = document.querySelector('#player2_input');
    let checkedValue = document.querySelector("input[name='item']:checked")

    let players= [];
    let playerId;
    const grid = gameBoard();

    // checkedValue.addEventListener('change', ()=>{
    //     console.log(checkedValue.value);
    // })

    

    player2.addEventListener('change', ()=> {
        changePlayer2Layout(player2.value);
    });

    function changePlayer2Layout(value){
        switch(value){
            case 'computer':
                playerId = value;
                player2_label.style.display ='block';
                player2_input.style.display = 'none';
                break;
            
            case 'human':
                player2_label.style.display ='none';
                player2_input.style.display = 'block';
                playerId = value;
                
                break;
            
            case 'neither':
                console.log('doing nothing')
                playerId=  'computer';
                break;

        }
    } 
    function createPlayer1(){
        
        if(player1.value && checkedValue){
            const firstPlayer = createPlayer(player1.value, checkedValue.value, 'Player 1');
            console.log(checkedValue.value)
            players.push(firstPlayer);
        }
    }  
    
    function createPlayer2(){
        console.log(checkedValue.value);
        const player2Value = checkedValue.value ==='x' ?  'o' : 'x';

        if(playerId === 'human'){
            const secondPlayer = createPlayer(player2_input.value, player2Value , 'Player 2');
            players.push(secondPlayer);
        }

        else if(playerId === 'computer'){
            const secondPlayer = createPlayer(playerId, player2Value, 'Player 2');
            players.push(secondPlayer);
        
        }
        
    }
    let currentPlayer;
    const setCurrentPlayer =() => {
        currentPlayer = players[0];
    }
    
    function switchPlayers(){
        if(currentPlayer === players[0]){
            currentPlayer = players[1];
            return currentPlayer;
        }

        else{
            currentPlayer = players[0];
            return currentPlayer;
        }
    }

    function getWinner(value){
        const winner =players.filter(player => player.playerChoice === value);
        console.log(`Winner is ${winner}`);
        grid.disableScreen(winner[0].getName());
    }

    const getCurrentPlayer =()=> currentPlayer;

    const getPlayers= ()=> players;

    function playRound( key){

        //const activePlayer = getCurrentPlayer();
        // console.log(grid.getGameState())
        // console.log(activePlayer);

        if(grid.getGameState().includes(2)){
            if(getCurrentPlayer().getName() !== 'computer'){
                // let cellCheck = grid.getGridCellState();
                // console.log(`cell check : ${cellCheck}`)
                if(grid.getGameState()[key] === 2){
                    grid.setGameState(key, getCurrentPlayer().getPlayerChoice());
                    grid.updateScreen()
                    const winningPlayer = grid.checkPosition();
                    console.log(winningPlayer);
                    if(winningPlayer){
                        getWinner(winningPlayer);
                    }
                    switchPlayers();
                    
                    if(getCurrentPlayer().getName() === 'computer'){
                        setTimeout(3000, computerPlay());
                        
                    }
                }
            }
            //grid.checkPosition();
            // else {
            //     setTimeout(3000, computerPlay(getCurrentPlayer()));
            // }
        }


}

    function computerPlay(){
        let randomSpace = Math.round(Math.random() *9);
        let cellState = grid.getGameState()[randomSpace];
            if(cellState === 2){
                grid.setGameState(randomSpace, getCurrentPlayer().getPlayerChoice());
                grid.updateScreen();
                const winningPlayer =grid.checkPosition();
                if(winningPlayer){
                    getWinner(winningPlayer);
                }
                switchPlayers();
            }
            else{
                computerPlay();
        }

    }
    return{setCurrentPlayer, getCurrentPlayer, getPlayers, switchPlayers, createPlayer1, createPlayer2, playRound, computerPlay}

}

const screenController = function(){
    const startBtn = document.querySelector('.start-btn');
    const headerItem = document.querySelector('.header-content');
    const cellSpace = document.querySelector('.grid-box');

    const playerCall = playerController();
    const gridBoard = gameBoard();
    startBtn.addEventListener('click', ()=>
    {   
        headerItem.style.display = 'none';
        playerCall.createPlayer1();
        playerCall.createPlayer2();
        playerCall.setCurrentPlayer();
        gridBoard.render();
        

    })
    
    function clickHandler(e){
        let cellKey = parseInt(e.target.dataset.key);

        
        if(cellKey >=0){
            playerCall.playRound(/*playerCall.getCurrentPlayer(),*/ cellKey);
        }
        
    }
    cellSpace.addEventListener('click', clickHandler)

    //cellSpace.forEach(cell => cell.addEventListener('click', clickHandler));

    

}()
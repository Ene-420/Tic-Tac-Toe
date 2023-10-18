
const gameBoard = function(){

    let gameState = [2,2,2,2,2,2,2,2,2];
    const winningState =[[0,1,2], [3,4,5], [6,7,8], 
                         [0,3,6], [1,4,7], [2,5,8],
                            [0,4,8], [2,4,6]]
   
    
    //render();

    
    const item = document.querySelectorAll('.grid-item');
    
    
    function play(image){
        item.forEach((gridItem) => {
            gridItem.addEventListener('click', enterOption(image))
        });
    }
    // item.forEach((gridItem) => {
    //     gridItem.addEventListener('click', ()=>
    //     {
    //         console.log(gridItem.childElementCount);
    //     })
    // });


     function startGame(){
        render();
     }
    function render(){
        const body = document.querySelector('.body');
        const fillGrid = document.querySelector('.grid-box');

        let countIncrement = 0;
            for(let i=0; i< 3; i++){
                
                const gridContainer = document.createElement('div');
                gridContainer.classList.add('grid-container');

                for(let x= 0; x<3; x++){
                    const gridItem = document.createElement('div');
                    gridItem.classList.add('grid-item');
                    gridItem.dataset.key = i+x+countIncrement;
                    // gridItem.addEventListener('click',enterOption(gridItem));
                    gridContainer.appendChild(gridItem);
                }
                countIncrement +=2;
                fillGrid.appendChild(gridContainer);    
            }

            body.style.display= 'flex';
    }


    function enterOption(event, image){
        if(event.target.childElementCount>0){
            console.log(event.target.childElementCount);
            console.log('Cell already filled');
        }
        else{
            console.log(event.target.childElementCount);
            const playerChoice = document.createElement('img');
            playerChoice.setAttribute('src', `media/${image}.png`);
            playerChoice.classList.add('game-option');
            event.target.appendChild(playerChoice);

            event.target.dataset.source= image;
            gameState[parseInt(event.target.dataset.key)] = event.target.dataset;
            
            checkPosition();
        } 
    }

    function checkPosition(){
        if(gameState){
            console.log(gameState);
            winningState.forEach((state) => {
                if(gameState[state[0]] === gameState[state[1]] && gameState[state[1]] === gameState[state[2]] && gameState[state[0]] !== 2){
                    console.log('We have a winner');
                    disableScreen();
                }
                else{
                    console.log(state);
                }
            })
        }
    }
    
    function computerPLay(image){

    }

    function enableScreen(){
        item.disabled = false;
    }

    function disableScreen(){
        item.disabled = true;
    }
return{
    startGame, play, enableScreen
};
    
}()

const player = function(){
    const player1 = document.querySelector('#player1');
    player2_label = document.querySelector('.header-items label');
    const player2 = document.querySelector('#player2');
    const player2_input = document.querySelector('#player2_input');
    const checkedValue = document.querySelector("input[type='radio'][name='item']:checked")

    
    function getPlayer1(){
        if(player1.value){
            return player1.value;
        }
        else return null;
        //(player1.value.length > 0) ? return player1.value : return null;
    }

    function getCharacter(){
        if(checkedValue.value){
            return checkedValue.value;
        }

        else return null;
    }
    function getPlayer2(){
        switch (player2.value){
            case 'computer':
                return player2.value;
                break;
            
            case 'human':
                player2_label.style.display ='none';
                player2_input.style.display = 'block';

                if(player2_input.value){
                    return player2_input.value;
                }
                else return null;
                break;
            
            case 'neither':
                return 'computer';
                break;
        }
    }

    return {getPlayer1, getPlayer2, getCharacter};
}


const playerController =function(){

    const playerDetails = player();

    const players = [{
        name: playerDetails.getPlayer1(),
        status: 'player1'
    },
    {
        name: playerDetails.getPlayer2(),
        status: 'player2'
    }
]
    let currentPlayer= players[0];

    function switchPlayer(){
    switch(currentPlayer['status']){
        case 'player1':
            currentPlayer = players[1];
            break;
        
        case 'player2':
            currentPlayer = players[0];
            break;
        }
    }

    const getCurrentPlayer = () => currentPlayer;
    
    return{getCurrentPlayer, switchPlayer};
    


}
//const fillGrid = document.querySelector('.grid-box');
let gameState = [2,2,2,2,2,2,2,2,2];
const winningState =[[0,1,2], [3,4,5], [6,7,8], 
                     [0,3,6], [1,4,7], [2,5,8],
                        [0,4,8], [2,4,6]]

// let countIncrement = 0;
// for(let i=0; i< 3; i++){
    
//     const gridContainer = document.createElement('div');
//     gridContainer.classList.add('grid-container');

//     for(let x= 0; x<3; x++){
//         const gridItem = document.createElement('div');
//         gridItem.classList.add('grid-item');
//         gridItem.dataset.key = i+x+countIncrement;
//         gridContainer.appendChild(gridItem);
//     }
//     countIncrement +=2;
//     fillGrid.appendChild(gridContainer);    
// }


const gridContent = document.querySelectorAll('.grid-item');

// gridContent.forEach((gridBox) =>{
//     gridBox.addEventListener('click', ()=>{

//         if(gridBox.childElementCount>0){
//             console.log(gridBox.childElementCount);
//             console.log('Cell already filled');
//         }
//         else{
//             const playerChoice = document.createElement('img');
//             playerChoice.setAttribute('src', 'media/o.png');
//             playerChoice.classList.add('game-option');
//             gridBox.appendChild(playerChoice);

//             gridBox.dataset.source= 'O';
//             gameState[parseInt(gridBox.dataset.key)] = '0';
//             console.log(gridBox.dataset.key);
//             checkPosition();
//         }
        
//     })
    
// })
const gridBox = document.querySelector('.grid-box');

gridBox.addEventListener('click', (event)=>{
    console.log(event.target);
}
)

// const player= function(name, x){

// }


function checkWinner(){
    
}

const screenController = function(){

}()
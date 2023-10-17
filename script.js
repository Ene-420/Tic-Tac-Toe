const fillGrid = document.querySelector('.grid-box');


for(let i=0; i< 3; i++){
    
    const gridContainer = document.createElement('div');
    gridContainer.classList.add('grid-container');

    for(let x= 0; x<3; x++){
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridItem.dataset.key = `${i}${x}`;
        gridContainer.appendChild(gridItem);
    }
    
    fillGrid.appendChild(gridContainer);
    
    

}

const gridContent = document.querySelectorAll('.grid-item');
let cellPosition =[];
gridContent.forEach((gridBox) =>{
    gridBox.addEventListener('click', ()=>{

        if(gridBox.childElementCount>0){
            console.log(gridBox.childElementCount);
            console.log('Cell already filled');
        }
        else{
            const playerChoice = document.createElement('img');
            playerChoice.setAttribute('src', 'media/o.png');
            playerChoice.classList.add('game-option');
            gridBox.appendChild(playerChoice);

            gridBox.dataset.source= 'O';
            console.log(gridBox.dataset.key);

            const cellDetails = {
                source: gridBox.dataset.source,
                key:gridBox.dataset.key
            }
            cellPosition.push(cellDetails);

            checkPosition();
        }
        
    })
    
})

function checkPosition(){
    if(cellPosition){
        console.log(cellPosition);
    }
}


function checkWinner(){
    
}
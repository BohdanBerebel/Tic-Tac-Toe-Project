const module = (function(){

    const playground = document.querySelector("#playground");
    const playerOneName = document.querySelector("#playerOne");
    const playerTwoName = document.querySelector("#playerTwo");
    const score = document.querySelector("#score");
    const results = document.querySelector("#results");
    const playerOneButtonInput = document.querySelector("#playerOneButtonInput");
    const playerTwoButtonInput = document.querySelector("#playerTwoButtonInput");
    const playerOneInput = document.querySelector("#nameOne");
    const playerTwoInput = document.querySelector("#nameTwo");
    const hideButtonOne = document.querySelector("#playerOneButtonInput + button");
    const hideButtonTwo = document.querySelector("#playerTwoButtonInput + button");
    
    const nextRoundButton = document.createElement("button");
    nextRoundButton.textContent = "To the next round";

    const rows = 3;
    const columns = 3;
    const cellsArray = [];
    
    const playerOne = createPlayer("Player One", "X");
    const playerTwo = createPlayer("Player Two", "O");
    
    playerOneName.textContent = playerOne.getName();
    playerTwoName.textContent = playerTwo.getName();
    score.textContent = `${playerOne.getScore()} : ${playerTwo.getScore()}`

    let activePlayer = playerOne;

    const showActivePlayer = () => activePlayer.getName();

    playerOneButtonInput.addEventListener("click", (e) => {
        if (!!playerOneInput.value == true) {
        playerOneName.textContent = playerOneInput.value;
        playerOne.alterName(playerOneInput.value);
        playerOneInput.value = "";
        }        
    })

    playerTwoButtonInput.addEventListener("click", (e) => {
        if (!!playerTwoInput.value == true) {
        playerTwoName.textContent = playerTwoInput.value;
        playerTwo.alterName(playerTwoInput.value);
        playerTwoInput.value = ""; 
        }       
    })

    hideButtonOne.addEventListener("click", (e) => {
        hideButtonOne.parentElement.hidden = "true";       
    })

    hideButtonTwo.addEventListener("click", (e) => {
        hideButtonTwo.parentElement.hidden = "true";       
    })

    nextRoundButton.addEventListener("click", (e) => {
        reset();

    })

    let sequentNumber = 0;

    for ( i = 0; i < rows; i++ ) {
        cellsArray.push([]);        
        for (j = 0; j < columns; j++ ) {
            cellsArray[i].push([...document.querySelectorAll(".cell")][sequentNumber]);
            sequentNumber++;
        }
    }

    for ( i = 0; i < rows; i++ ) {
        for (j = 0; j < columns; j++ ) {
            cellsArray[i][j].value = (Cell());
        }
    }

    function reset() {
        for ( i = 0; i < rows; i++ ) {
            for (j = 0; j < columns; j++ ) {
                cellsArray[i][j].value = null;
                cellsArray[i][j].value = (Cell());
                cellsArray[i][j].textContent = "";
            }
        }
        results.innerHTML = "";
        activePlayer = playerOne;
    }

    // const Gameboard = {
    
    //     gameboard: [],
        
    //     createGameboard: function() {
    //         for ( i = 0; i < rows; i++ ) {
    //             this.gameboard.push([])
    //             for (j = 0; j < columns; j++ ) {
    //                 this.gameboard[i].push(Cell());
    //             }
    //         }
    //     },

    // };    

    // Gameboard.createGameboard();

    function Cell() {
        let value = 0;

        const getValue = () => value;

        const changeValue = () => value = showActivePlayer();

        return {
        getValue,
        changeValue,
        }
    }

    function createPlayer(name, symbol) {

        let score = 0;
        
        const getName = () => {
            // console.log(name);
            return name;
        };
    
        const alterName = (newName) => name = newName;   
        
        const addPoint = () => score++;

        const getSymbol = () => symbol;

        const getScore = () => score;

        return {getName, alterName, addPoint, getSymbol, getScore};
    }

    function switchActivePlayer() {
        activePlayer = activePlayer == playerOne ? playerTwo : playerOne;
    }

    function checkWInner() {
        let first, second, third;

        for (i = 0; i < rows; i++) {
            [first, second, third] = [cellsArray[i][0].value.getValue(), cellsArray[i][1].value.getValue(), cellsArray[i][2].value.getValue()];
            if (first == second && second == third && !!first == true) return first;
        }
    
        for (i = 0; i < columns; i++) {
            [first, second, third] = [cellsArray[0][i].value.getValue(), cellsArray[1][i].value.getValue(), cellsArray[2][i].value.getValue()];
            if (first == second && second == third && !!first == true) return first;
        }
    
        [first, second, third] = [cellsArray[0][0].value.getValue(), cellsArray[1][1].value.getValue(), cellsArray[2][2].value.getValue()];
        if (first == second && second == third && !!first == true) return first;
        
        [first, second, third] = [cellsArray[0][2].value.getValue(), cellsArray[1][1].value.getValue(), cellsArray[2][0].value.getValue()];
        if (first == second && second == third && !!first == true) return first;

    }    

    function checkIfDraw() {
        
        return cellsArray.every((element) => {

           return element.every((cell) => {

                return !!cell.textContent
            })
        })
    }
    
    function makeChoice(cell) {
        if (cell.value.getValue() == 0) {

            cell.value.changeValue(activePlayer.getName());
            cell.textContent = activePlayer.getSymbol();
            
            if (checkWInner()) {
                activePlayer.addPoint();
                score.textContent = `${playerOne.getScore()} : ${playerTwo.getScore()}`
                results.textContent = `Congratulations! ${checkWInner()} won!`;
                results.appendChild(nextRoundButton);
                return true;
            }

            if (checkIfDraw()) {
                results.textContent = `Ups... It's a draw!`;
                results.appendChild(nextRoundButton);
                return true;
            }

            switchActivePlayer();
            return false;
        }
        alert("The cell has already been occupied. Opt for another.");
    }
    
    playground.addEventListener("click", (e) => {
        // console.dir(e.target)
        if (checkWInner()) return;
        makeChoice(e.target);
    })
    
    return

})();

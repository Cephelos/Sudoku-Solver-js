import Two from 'https://cdn.skypack.dev/two.js@latest';
import Board from './solver.js';
export class Renderer {

    // board variables
    boxSize = 50;
    boardSize = 450;
    boardGroup;

    // text offsets
    xOffset = 10;
    yOffset = 12;

    // button variables
    buttonZoneX = 500;
    buttonZoneY = 0;
    buttonZoneXSize = 200;
    buttonZoneYSize = 450;
    buttonSize = 50;
    buttonYOffset = 100;
    buttonGroup;
    buttonColor = '#90ee90';
    buttonDownColor = '#50ae50';

    // interaction variables
    selectedCellX;
    selectedCellY;
    mouseCorrectionX = 8;
    mouseCorrectionY = 8;
    notesOn = false;
    keysPressed = new Set();
    hoverColor = '#55ff55';
    invalidColor = 'red';

    // boards
    board1 =       [[0, 6, 0, 0, 0, 0, 0, 0, 0],
                    [0, 1, 0, 2, 0, 0, 0, 0, 9],
                    [0, 0, 4, 0, 0, 0, 0, 6, 1],
                    [4, 7, 0, 0, 2, 0, 0, 0, 0],
                    [5, 0, 0, 0, 4, 0, 0, 0, 0],
                    [0, 0, 0, 9, 1, 6, 0, 0, 0],
                    [0, 0, 0, 0, 0, 9, 2, 0, 0],
                    [3, 0, 8, 0, 0, 0, 7, 0, 0],
                    [0, 0, 0, 8, 0, 0, 0, 4, 0]];

    board2 =       [[0, 0, 3, 2, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 8, 0, 7],
                    [6, 0, 0, 9, 0, 0, 5, 3, 0],
                    [0, 0, 9, 0, 4, 0, 2, 0, 0],
                    [0, 7, 5, 0, 0, 2, 0, 9, 0],
                    [0, 0, 0, 0, 0, 0, 0, 5, 0],
                    [4, 0, 1, 0, 0, 0, 0, 0, 0],
                    [0, 8, 0, 5, 6, 1, 0, 0, 0],
                    [7, 0, 0, 0, 0, 0, 0, 0, 0]];

    board3 =       [[4, 2, 7, 9, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 1, 7],
                    [0, 0, 5, 0, 0, 0, 0, 0, 0],
                    [8, 0, 0, 3, 0, 5, 2, 0, 0],
                    [3, 0, 9, 7, 0, 0, 0, 0, 0],
                    [0, 0, 0, 8, 0, 1, 0, 4, 0],
                    [5, 0, 8, 0, 6, 0, 0, 0, 4],
                    [1, 0, 0, 0, 0, 0, 8, 0, 5],
                    [0, 6, 0, 0, 0, 0, 0, 0, 0]];
                    
    emptyNotesBoard =   [[[], [], [], [], [], [], [], [], []],
                         [[], [], [], [], [], [], [], [], []],
                         [[], [], [], [], [], [], [], [], []],
                         [[], [], [], [], [], [], [], [], []],
                         [[], [], [], [], [], [], [], [], []],
                         [[], [], [], [], [], [], [], [], []],
                         [[], [], [], [], [], [], [], [], []],
                         [[], [], [], [], [], [], [], [], []],
                         [[], [], [], [], [], [], [], [], []]];

    boardList = [this.board1, this.board2, this.board3];




    constructor(two) {
        const newBoard = new Board(this.boardList[getRandomIntInclusive(0, this.boardList.length - 1)]).deepCopy();
        this.board = newBoard;
        this.notesBoard = new Board(this.emptyNotesBoard).deepCopy();
        this.originalBoard = newBoard.deepCopy();
        this.two = two;
        this.elem = document.body;
        if (this.elem === null) {
            throw new Error("Element not found");
        }
        this.two = new Two({ fitted: true }).appendTo(this.elem);
        this.boardGroup = this.two.makeGroup();
        this.buttonGroup = this.two.makeGroup();
    }



    renderBoard() {
        this.boardGroup.remove(this.boardGroup.children);
        const board = this.board.board;
        for (let i = 0; i < this.board.gridSize; i++) {
            for (let j = 0; j < this.board.gridSize; j++) {
                const cell = this.two.makeRectangle(i * this.boxSize + this.boxSize / 2, j * this.boxSize + this.boxSize / 2, this.boxSize, this.boxSize);
                if(Math.floor(i / 3) % 2 === Math.floor(j / 3) % 2){
                    cell.fill = "#ffc800";
                }
                else {
                cell.fill = "#00ffc8";
                }
                cell.stroke = "black";
                cell.linewidth = 2;
                this.boardGroup.add(cell);

                if (j % 3 == 0) {
                    const line = this.two.makeLine(i * this.boxSize, j * this.boxSize, i * this.boxSize + this.boxSize, j * this.boxSize);
                    line.stroke = "black";
                    line.linewidth = 5;
                    this.boardGroup.add(line);
                }
            }
            if (i % 3 == 0) {
                const line = this.two.makeLine(i * this.boxSize, 0, i * this.boxSize, this.boardSize);
                line.stroke = "black";
                line.linewidth = 5;
                this.boardGroup.add(line);
            }
        }
        for (let i = 0; i < this.board.gridSize; i++) {
            for (let j = 0; j < this.board.gridSize; j++) {
                if (board[i][j] !== 0) {
                    const text = this.two.makeText(board[i][j].toString(), i * this.boxSize + this.boxSize / 2, j * this.boxSize + this.boxSize / 2);
                    text.size = 30;
                    text.family = "Arial";
                    if(this.originalBoard.board[i][j] === board[i][j]){
                        text.fill = "black";
                    }
                    else{
                        text.fill = "blue";
                    }
                    this.boardGroup.add(text);
                }
                else if(this.notesBoard.board[i][j].length !== 0){
                    for(let k = 0; k < this.notesBoard.board[i][j].length; k++){
                        let notesText = this.notesBoard.board[i][j][k].toString();
                        this.xOffset = 10*((k%4)+1);
                        this.yOffset = 12;
                        if(k > 3 && k < 8){
                            this.yOffset *= 2;
                        }
                        else if(k >= 8){
                            this.yOffset *= 3;
                        }
                        const text = this.two.makeText(notesText, i * this.boxSize + this.xOffset, j * this.boxSize + this.yOffset);
                        text.size = 15;
                        text.family = "Arial";
                        text.fill = "#5A5A5A";
                        this.boardGroup.add(text);
                    }
                }
            }
        }
        const boardBackground = this.two.makeRectangle(this.boardSize/2+3, this.boardSize/2+3, this.boardSize, this.boardSize);
        boardBackground.noFill();
        boardBackground.stroke = "black";
        boardBackground.linewidth = 6;
        this.boardGroup.add(boardBackground);

        this.two.update();
    }

    renderButtons() {
        this.buttonGroup.remove(this.buttonGroup.children);
        const buttonZone = this.two.makeRectangle(this.buttonZoneX+this.buttonZoneXSize/2, this.buttonZoneY+this.buttonZoneYSize/2, this.buttonZoneXSize, this.buttonZoneYSize);
        buttonZone.fill = 'white';
        buttonZone.noStroke();
        buttonZone.linewidth = 6;
        this.buttonGroup.add(buttonZone);

        const resetButton = this.two.makeRectangle(this.buttonZoneX+this.buttonSize/2, this.buttonSize/2, this.buttonSize, this.buttonSize);
        resetButton.fill = this.buttonColor;
        resetButton.stroke = "black";
        resetButton.linewidth = 2;
        this.buttonGroup.add(resetButton);

        const solveButton = this.two.makeRectangle(this.buttonZoneX+this.buttonSize/2, this.buttonSize/2+this.buttonYOffset, this.buttonSize, this.buttonSize);
        solveButton.fill = this.buttonColor;
        solveButton.stroke = "black";
        solveButton.linewidth = 2;
        this.buttonGroup.add(solveButton);

        const checkButton = this.two.makeRectangle(this.buttonZoneX+this.buttonSize/2, this.buttonSize/2+this.buttonYOffset*2, this.buttonSize, this.buttonSize);
        checkButton.fill = this.buttonColor;
        checkButton.stroke = "black";
        checkButton.linewidth = 2;
        this.buttonGroup.add(checkButton);

        const notesButton = this.two.makeRectangle(this.buttonZoneX+this.buttonSize/2, this.buttonSize/2+this.buttonYOffset*3, this.buttonSize, this.buttonSize);
        notesButton.fill = this.buttonColor;
        notesButton.stroke = "black";
        notesButton.linewidth = 2;
        this.buttonGroup.add(notesButton);

        const notesCheckbox = this.two.makeText("X", this.buttonZoneX+this.buttonSize/2, this.buttonSize/2+this.buttonYOffset*3+7);
        if(this.notesOn){
            notesCheckbox.fill = "black";
        }
        else{
            notesCheckbox.noFill();
        }
        notesCheckbox.size = 70;
        notesCheckbox.family = "Arial";
        this.buttonGroup.add(notesCheckbox);
        
        const newButton = this.two.makeRectangle(this.buttonZoneX+this.buttonSize/2, this.buttonSize/2+this.buttonYOffset*4, this.buttonSize, this.buttonSize);
        newButton.fill = this.buttonColor;
        newButton.stroke = "black";
        newButton.linewidth = 2;
        this.buttonGroup.add(newButton);

        const newCheckbox = this.two.makeText("X", this.buttonZoneX+this.buttonSize/2, this.buttonSize/2+this.buttonYOffset*4+7);
        if(this.newOn){
            newCheckbox.fill = "black";
        }
        else{
            newCheckbox.noFill();
        }
        newCheckbox.size = 70;
        newCheckbox.family = "Arial";
        this.buttonGroup.add(newCheckbox);

        const resetText = this.two.makeText("Reset", this.buttonZoneX+this.buttonSize+30, this.buttonSize/2);
        resetText.size = 20;
        resetText.family = "Arial";
        resetText.fill = "black";
        this.buttonGroup.add(resetText);

        const solveText = this.two.makeText("Solve", this.buttonZoneX+this.buttonSize+30, this.buttonSize/2+this.buttonYOffset);
        solveText.size = 20;
        solveText.family = "Arial";
        solveText.fill = "black";
        this.buttonGroup.add(solveText);

        const checkText = this.two.makeText("Check", this.buttonZoneX+this.buttonSize+32, this.buttonSize/2+this.buttonYOffset*2);
        checkText.size = 20;
        checkText.family = "Arial";
        checkText.fill = "black";
        this.buttonGroup.add(checkText);

        const notesText = this.two.makeText("Notes", this.buttonZoneX+this.buttonSize+30, this.buttonSize/2+this.buttonYOffset*3);
        notesText.size = 20;
        notesText.family = "Arial";
        notesText.fill = "black";
        this.buttonGroup.add(notesText);

        const newText = this.two.makeText("New", this.buttonZoneX+this.buttonSize+25, this.buttonSize/2+this.buttonYOffset*4);
        newText.size = 20;
        newText.family = "Arial";
        newText.fill = "black";
        this.buttonGroup.add(newText);



        this.two.update();
    }

    resetBoard(){
        this.board = this.originalBoard.deepCopy();
        this.renderBoard();
    }

    solveBoard(){
        this.board.solve();
        this.renderBoard();
    }

    checkBoard(){
        const solvedBoard = this.board.deepCopy();
        solvedBoard.solve();
        if(this.board.equals(solvedBoard)){
            alert("Board is solved!");
        }
        else{
            alert("Board is not solved!");
        }
    }

    alert(text){
        const alertBox = this.two.makeRectangle(this.buttonZoneX+this.buttonSize/2, this.buttonSize/2+this.buttonYOffset*5, this.buttonSize, this.buttonSize);
        alertBox.fill = this.buttonColor;
        alertBox.stroke = "black";
        alertBox.linewidth = 2;
        this.buttonGroup.add(alertBox);
        
        const alertText = this.two.makeText(text, this.buttonZoneX+this.buttonSize/2, this.buttonSize/2+this.buttonYOffset*5);
        alertText.size = 20;
        alertText.family = "Arial";
        alertText.fill = "black";
        this.buttonGroup.add(alertText);
    }
    
    

    clickButton(e) {
        for(let cell of this.buttonGroup.children){
            if(cell.fill === this.buttonDownColor){
                if(cell.position.y === this.buttonSize/2){
                    this.resetBoard();
                }
                else if(cell.position.y === this.buttonSize/2+this.buttonYOffset){
                    this.solveBoard();
                }
                else if(cell.position.y === this.buttonSize/2+this.buttonYOffset*2){
                    this.checkBoard();
                }
                else if(cell.position.y === this.buttonSize/2+this.buttonYOffset*3){
                    this.notesOn = !this.notesOn;
                    this.renderButtons();
                }
                else if(cell.position.y === this.buttonSize/2+this.buttonYOffset*4){
                    const newBoard = new Board(this.boardList[getRandomIntInclusive(0, this.boardList.length - 1)]).deepCopy();
                    this.board = newBoard;
                    this.notesBoard = new Board(this.emptyNotesBoard).deepCopy();
                    this.originalBoard = newBoard.deepCopy();
                    this.renderBoard();
                }
            }
            
            
        }
    }


    keyPressed(e) {
        let numPressed = -1;
        this.keysPressed.add(e.keyCode);
        switch (e.keyCode) {
            case 48:
                numPressed = 0;
                break;
            case 49:
                numPressed = 1;
                break;
            case 50:
                numPressed = 2;
                break;
            case 51:
                numPressed = 3;
                break;
            case 52:
                numPressed = 4;
                break;
            case 53:
                numPressed = 5;
                break;
            case 54:
                numPressed = 6;
                break;
            case 55:
                numPressed = 7;
                break;
            case 56:
                numPressed = 8;
                break;
            case 57:
                numPressed = 9;
                break;

            
            default:
                numPressed = -1;
                break;
        }

        if(this.keysPressed.has(16)){
            this.notesOn = true;
            
        }
        if(numPressed !== -1){
            if(this.notesOn && this.originalBoard.board[this.selectedCellX][this.selectedCellY] === 0){
                if(numPressed === 0){
                    this.notesBoard.board[this.selectedCellX][this.selectedCellY] = [];
                }
                else{
                    if(this.notesBoard.board[this.selectedCellX][this.selectedCellY].includes(numPressed)){
                        this.notesBoard.board[this.selectedCellX][this.selectedCellY].splice(this.notesBoard.board[this.selectedCellX][this.selectedCellY].indexOf(numPressed), 1);
                    }
                    else {
                        this.notesBoard.board[this.selectedCellX][this.selectedCellY].push(numPressed);
                        this.notesBoard.board[this.selectedCellX][this.selectedCellY].sort();
                    }
                }
            }
            else if(this.originalBoard.board[this.selectedCellX][this.selectedCellY] === 0){
                    this.board.board[this.selectedCellX][this.selectedCellY] = numPressed;
                    this.notesBoard.board[this.selectedCellX][this.selectedCellY] = [];
            }
        
        }
        this.renderBoard();
        this.renderButtons();
    }
    

    keyUp(e){
        this.keysPressed.delete(e.keyCode);
        if(e.keyCode === 16){
            this.notesOn = false;
        }
        this.renderButtons();
    }

    hoverOverCell(e){
        const board = this.board.board;
        let xPos = e.clientX-this.mouseCorrectionX;
        let yPos = e.clientY-this.mouseCorrectionY;
        let x = Math.floor(xPos / this.boxSize);
        let y = Math.floor(yPos / this.boxSize);
        for(let cell of this.boardGroup.children){
            if(cell.position.x === x * this.boxSize + this.boxSize / 2 && cell.position.y === y * this.boxSize + this.boxSize / 2){
                if(cell.linewidth === 2){
                    cell.fill = this.hoverColor;
                    this.selectedCellX = x;
                    this.selectedCellY = y;
                }
            }
            else{
                
                if(Math.floor(Math.floor(cell.position.x / this.boxSize) / 3) % 2 === Math.floor(Math.floor(cell.position.y / this.boxSize)  / 3) % 2){
                    if(cell.linewidth !== 1 && cell.linewidth !== 6){
                        cell.fill = "#ffc800";
                    }
                }
                else {
                    if(cell.linewidth !== 1 && cell.linewidth !== 6){
                        cell.fill = "#00ffc8";
                    }
                }
            }
        }

        for(let cell of this.buttonGroup.children){
            if(cell.position.x === x * this.buttonSize + this.buttonSize / 2 && cell.position.y === y * this.buttonSize + this.buttonSize / 2){
                if(cell.linewidth === 2){
                    cell.fill = this.buttonDownColor;
                }
            }
            else{
                if(cell.linewidth == 2){
                    cell.fill = this.buttonColor;
                }
            }
        }
        this.two.update();
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  }

export default Renderer;

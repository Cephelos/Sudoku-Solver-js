import Two from 'https://cdn.skypack.dev/two.js@latest';
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




    constructor(board, notesBoard, two) {
        this.board = board;
        this.notesBoard = notesBoard;
        this.originalBoard = board.deepCopy(); // Deep copy
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
        
        const editButton = this.two.makeRectangle(this.buttonZoneX+this.buttonSize/2, this.buttonSize/2+this.buttonYOffset*4, this.buttonSize, this.buttonSize);
        editButton.fill = this.buttonColor;
        editButton.stroke = "black";
        editButton.linewidth = 2;
        this.buttonGroup.add(editButton);

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

        const editText = this.two.makeText("Edit", this.buttonZoneX+this.buttonSize+21, this.buttonSize/2+this.buttonYOffset*4);
        editText.size = 20;
        editText.family = "Arial";
        editText.fill = "black";
        this.buttonGroup.add(editText);



        this.two.update();
    }

    resetBoard(){
        this.board = this.originalBoard;
        this.renderBoard();
    }

    clickButton(e) {
        
        for(let cell of this.buttonGroup.children){
            if(cell.fill === this.buttonDownColor){
                if(cell.position.y === this.buttonSize/2){
                    this.resetBoard();
                }

            }
        }
    }


    keyPressed(e) {
        let numPressed = 0;
        this.keysPressed.add(e.keyCode);
        switch (e.keyCode) {
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
                    this.notesBoard.board[this.selectedCellX][this.selectedCellY].push(numPressed);
                    this.notesBoard.board[this.selectedCellX][this.selectedCellY].sort();
                }
            }
            else if(this.originalBoard.board[this.selectedCellX][this.selectedCellY] === 0){
                this.board.board[this.selectedCellX][this.selectedCellY] = numPressed;
                this.notesBoard.board[this.selectedCellX][this.selectedCellY] = [];
            }
        
        }
        this.renderBoard();
    }
    

    keyUp(e){
        this.keysPressed.delete(e.keyCode);
        if(e.keyCode === 16){
            this.notesOn = false;
        }
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
                    cell.fill = "red";
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
export default Renderer;

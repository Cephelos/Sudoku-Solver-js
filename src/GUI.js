import Two from 'https://cdn.skypack.dev/two.js@latest';
export class Renderer {

    boxSize = 50;
    boardSize = 450;
    boardGroup;





    constructor(board, two) {
        this.board = board;
        this.two = two;
        this.elem = document.body;
        if (this.elem === null) {
            throw new Error("Element not found");
        }
        this.two = new Two({ fitted: true }).appendTo(this.elem);
        this.boardGroup = this.two.makeGroup();
    }
    renderBoard() {
        const board = this.board.getBoard();
        const boardBackground = this.two.makeRectangle(0, 0, this.boardSize, this.boardSize);
        boardBackground.fill = "blue";
        boardBackground.stroke = "black";
        boardBackground.linewidth = 2;
        this.boardGroup.add(boardBackground);
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
            }
        }
        for (let i = 0; i < this.board.gridSize; i++) {
            for (let j = 0; j < this.board.gridSize; j++) {
                if (board[i][j] !== 0) {
                    const text = this.two.makeText(board[i][j].toString(), i * this.boxSize + this.boxSize / 2, j * this.boxSize + this.boxSize / 2);
                    text.size = 30;
                    text.family = "Arial";
                    text.fill = "black";
                    this.boardGroup.add(text);
                }
            }
        }
        this.two.update();
    }

    hoverOverCell(e){
        const board = this.board.getBoard();
        let xPos = e.clientX;
        let yPos = e.clientY;
        let x = Math.floor(xPos / this.boxSize);
        let y = Math.floor(yPos / this.boxSize);
        for(let cell of this.boardGroup.children){
            if(cell.position.x === x * this.boxSize + this.boxSize / 2 && cell.position.y === y * this.boxSize + this.boxSize / 2){
                if(cell.linewidth === 2){
                    cell.fill = "red";
                }
            }
            else{
                
                if(Math.floor(Math.floor(cell.position.x / this.boxSize) / 3) % 2 === Math.floor(Math.floor(cell.position.y / this.boxSize)  / 3) % 2){
                    if(cell.linewidth === 2){
                        cell.fill = "#ffc800";
                    }
                }
                else {
                    if(cell.linewidth === 2){
                        cell.fill = "#00ffc8";
                    }
                }
            }
        }
        this.two.update();
    }
}
export default Renderer;

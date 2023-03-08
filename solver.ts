class Board {

    private board: number[][];
    private gridSize: number = 9;
    private boxSize: number = 3;

    constructor(board: number[][]){
        this.board = board;
    }

    public setBoard(sudokuGrid: number[][]){
        this.board = sudokuGrid;
    }

    public solve(): boolean{
        const emptyCellCoordinate: [number,number] = this.findFirstEmpty();

        const row = emptyCellCoordinate[0];
        const column = emptyCellCoordinate[1];

        if(row === -1 && column === -1){
            return true;
        }

        for(let k = 1; k < 10; k++){
            if(this.checkValid(emptyCellCoordinate, k)){
                this.board[row][column] = k;

                if(this.solve()){
                    return true;
                }

                this.board[row][column] = 0;

            }
        }
        return false;
    }

    private checkValid(coordinates, value): boolean{
        // checks for match in column
        for(let i = 0; i < this.gridSize; i++){
            if(this.board[i][coordinates[1]] === value && coordinates[0] !== i){
                return false;
            }
        }

        // checks for match in row
        for(let i = 0; i < this.gridSize; i++){
            if(this.board[coordinates[0]][i] === value && coordinates[1] !== i){
                return false;
            }
        }

        // checks for match in box
        const boxXCoordinate = Math.floor(coordinates[1] / this.boxSize)* this.boxSize;
        const boxYCoordinate = Math.floor(coordinates[0] / this.boxSize) * this.boxSize;

        for(let i = boxYCoordinate; i < boxYCoordinate + this.boxSize; i++){
            for(let j = boxXCoordinate; j < boxXCoordinate + this.boxSize; j++){
                if(this.board[i][j] === value && i !== coordinates[0] && j !== coordinates[1]){
                    return false;
                }
            
            }
        }
        return true;
    }

    private findFirstEmpty(): [number,number]{
        for(let i = 0; i < this.gridSize; i++){
            for(let j = 0; j < this.gridSize; j++){
                if(this.board[j][i] === 0){
                    return [j,i];
                }
            }
        }
        return [-1,-1];
    }



}



const emptyBoard = new Array(9);
for(let i = 0; i < 9; i++){
    emptyBoard[i] = new Array(9);
}

const b = new Board(emptyBoard);
b.solve();

console.log(b);

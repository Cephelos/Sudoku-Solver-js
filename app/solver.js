class Board {
    constructor(board) {
        this.gridSize = board.length;
        this.boxSize = Math.sqrt(this.gridSize);
        this.board = board;
    }

    deepCopy() {
        
        return new Board(JSON.parse(JSON.stringify(this.board)));;
        

    }

    equals(otherBoard) {
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                if (this.board[i][j] !== otherBoard.board[i][j]) {
                    return false;
                }
            }
        }
        return true;
    }

    solve() {
        const emptyCellCoordinate = this.findFirstEmpty();
        const row = emptyCellCoordinate[0];
        const column = emptyCellCoordinate[1];
        if (row === -1 && column === -1) {
            return true;
        }
        for (let k = 1; k < 10; k++) {
            if (this.checkValid(emptyCellCoordinate, k)) {
                this.board[row][column] = k;
                if (this.solve()) {
                    return true;
                }
                this.board[row][column] = 0;
            }
        }
        return false;
    }
    checkValid(coordinates, value) {
        // checks for match in column
        for (let i = 0; i < this.gridSize; i++) {
            if (this.board[i][coordinates[1]] === value && coordinates[0] !== i) {
                return false;
            }
        }
        // checks for match in row
        for (let i = 0; i < this.gridSize; i++) {
            if (this.board[coordinates[0]][i] === value && coordinates[1] !== i) {
                return false;
            }
        }
        // checks for match in box
        const boxXCoordinate = Math.floor(coordinates[1] / this.boxSize) * this.boxSize;
        const boxYCoordinate = Math.floor(coordinates[0] / this.boxSize) * this.boxSize;
        for (let i = boxYCoordinate; i < boxYCoordinate + this.boxSize; i++) {
            for (let j = boxXCoordinate; j < boxXCoordinate + this.boxSize; j++) {
                if (this.board[i][j] === value && i !== coordinates[0] && j !== coordinates[1]) {
                    return false;
                }
            }
        }
        return true;
    }
    findFirstEmpty() {
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                if (this.board[j][i] === 0) {
                    return [j, i];
                }
            }
        }
        return [-1, -1];
    }
}
export default Board;

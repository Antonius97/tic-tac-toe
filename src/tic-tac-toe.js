const symbols = ["x", "o"];
const matrixSize = 3;

function countSymbolsInArray(arr, symbol) {
    return arr.reduce((sum, el) => sum + (el === symbol), 0);
}

function getLineWinner(row) {
    return symbols.find(symbol => countSymbolsInArray(row, symbol) === matrixSize);
}

class TicTacToe {
    constructor() {
        this._matrix = [...Array(matrixSize)].map(q => [...Array(matrixSize)].fill(""));
        this._turn = 0;
    }

    getCurrentPlayerSymbol() {
        return symbols[this._turn % 2];
    }

    nextTurn(rowIndex, columnIndex) {
        if (this._matrix[rowIndex][columnIndex]) {
            return;
        }

        const symbol = this.getCurrentPlayerSymbol();

        this._matrix[rowIndex][columnIndex] = symbol;

        this._turn++;
    }

    isFinished() {
        const noMoreTurns = this.noMoreTurns();
        const winner = !!this.getWinner();

        return noMoreTurns || winner;
    }

    getWinner() {
        const horizontalWinner = this._matrix.map(row => getLineWinner(row)).find(Boolean);
        const verticalWinner = [...Array(matrixSize)].map((_, j) => getLineWinner(this._matrix.map(row => row[j]))).find(Boolean);

        const mainDiagArr = [...Array(matrixSize)].map((_, i) => this._matrix[i][i]);
        const mainDiagWinner = getLineWinner(mainDiagArr);

        const secondaryDiagArr = [...Array(matrixSize)].map((_, i) => this._matrix[i][matrixSize - i - 1]);
        const secondaryDiagWinner = getLineWinner(secondaryDiagArr);

        return horizontalWinner || verticalWinner || mainDiagWinner || secondaryDiagWinner || null;
    }

    noMoreTurns() {
        return this._matrix.every(row => row.every(Boolean));
    }

    isDraw() {
        const noMoreTurns = this.noMoreTurns();
        const noWinner = !this.getWinner();

        return noMoreTurns && noWinner;
    }

    getFieldValue(rowIndex, colIndex) {
        return this._matrix[rowIndex][colIndex] || null;
    }
}

module.exports = TicTacToe;
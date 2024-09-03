const columns = document.querySelectorAll('.column');
let currentPlayer = 'red';
let boardArray = Array(6).fill(null).map(() => Array(7).fill(null));
let gameOver = false;


columns.forEach(column => {
    column.addEventListener('click', function() {
        if (gameOver) return;

        const columnIndex = parseInt(column.getAttribute('data-column'));
        const emptyCells = Array.from(column.querySelectorAll('.cell:not(.red):not(.yellow)'));
        
        if (emptyCells.length > 0) {
            const cell = emptyCells[0];
            const rowIndex = parseInt(cell.getAttribute('data-row'));

            //Change color of cell
            cell.classList.add(currentPlayer);

            //Deal with game logic
            boardArray[rowIndex][columnIndex] = currentPlayer;
            if (checkWin(rowIndex, columnIndex)) {
                alert(`${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)} wins!`);
                gameOver = true;
            } else {
                currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
            }
        }
    });
});

// Check for a win condition
function checkWin(row, col) {
    const directions = [
        { r: 1, c: 0 },
        { r: 0, c: 1 },
        { r: 1, c: 1 },
        { r: 1, c: -1 }
    ];
    
    const player = boardArray[row][col];

    for (const { r, c } of directions) {
        let count = 1;
        for (let i = 1; i < 4; i++) {
            const newRow = row + i * r;
            const newCol = col + i * c;
            if (newRow < 0 || newRow >= 6 || newCol < 0 || newCol >= 7) break;
            if (boardArray[newRow][newCol] === player) {
                count++;
            } else {
                break;
            }
        }
        for (let i = 1; i < 4; i++) {
            const newRow = row - i * r;
            const newCol = col - i * c;
            if (newRow < 0 || newRow >= 6 || newCol < 0 || newCol >= 7) break;
            if (boardArray[newRow][newCol] === player) {
                count++;
            } else {
                break;
            }
        }
        if (count >= 4) return true;
    }
    return false;
}
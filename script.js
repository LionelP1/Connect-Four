const columns = document.querySelectorAll('.column');
const popup = document.querySelector('.popup');
const popupMessage = document.querySelector('#popupMessage');
const popupCloseButton = document.querySelector('.closeBtn');
const closeSpan = document.querySelector('.close');
const restartButton = document.querySelector('.restart-button');

let currentPlayer = 'red';
let boardArray = Array(6).fill(null).map(() => Array(7).fill(null));
let gameOver = false;

popupCloseButton.addEventListener('click', () => {
    popup.style.display = 'none';
});

closeSpan.addEventListener('click', () => {
    popup.style.display = 'none';
});

restartButton.addEventListener('click', () => {
    currentPlayer = 'red';
    gameOver = false;
    boardArray = Array(6).fill(null).map(() => Array(7).fill(null));
    
    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.remove('red', 'yellow');
    });
    
    popup.style.display = 'none';
});

columns.forEach(column => {
    column.addEventListener('click', function() {
        if (gameOver) return;

        const columnIndex = parseInt(column.getAttribute('data-column'));
        const emptyCells = Array.from(column.querySelectorAll('.cell:not(.red):not(.yellow)'));
        
        if (emptyCells.length > 0) {
            const cell = emptyCells[0];
            const rowIndex = parseInt(cell.getAttribute('data-row'));

            // Change color of cell
            cell.classList.add(currentPlayer);

            // Deal with game logic
            boardArray[rowIndex][columnIndex] = currentPlayer;
            if (checkWin(rowIndex, columnIndex)) {
                // Display the popup
                popupMessage.textContent = `${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)} wins!`;
                popup.style.display = 'block';
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
        { r: 1, c: 0 }, // vertical
        { r: 0, c: 1 }, // horizontal
        { r: 1, c: 1 }, // diagonal down-right
        { r: 1, c: -1 } // diagonal down-left
    ];
    
    const player = boardArray[row][col];

    for (const { r, c } of directions) {
        let count = 1;

        // Check one direction
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

        // Check the opposite direction
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

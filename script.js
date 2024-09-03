const columns = document.querySelectorAll('.column');
let currentPlayer = 'red';
let boardArray=[];

columns.forEach(column => {
    column.addEventListener('click', function() {
        const emptyCells = column.querySelectorAll('.cell:not(.red):not(.yellow)');
        if (emptyCells.length > 0) {
            emptyCells[0].classList.add(currentPlayer);
            currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
        }
    });
});
// generate grid with flexbox
// generate 4 rows of divs in flexbox column
// nested loop probably

const outer = document.querySelector('#outer');

// generate a div
//divRow = document.createElement('div');
const GRID_X = 960;
const GRID_Y = 960;

function generateDivGrid(divRows, divColumns) {
    let divRow;
    let divSquare;

    for (i = 0; i < divRows; i++) {
        divRow = document.createElement('div');
        divRow.classList.add ('row');
        divRow.setAttribute('id', `row${i}`);

        for (j = 0;j < divColumns; j++) {
            divSquare = document.createElement('div');
            divSquare.classList.add ('square');
            divSquare.setAttribute('id', `sq${j}-${i}`);
            divRow.appendChild(divSquare);
        }
        
        outer.appendChild(divRow);   
    }
}

function clearGrid() {
    squares.forEach((square) => square.remove());
    rows.forEach((row) => row.remove());
}

function updateSquareSize(sideLength) {
    squares.forEach((square) => square.style.height = sideLength + "px");
    squares.forEach((square) => square.style.width = sideLength + "px");

    return sideLength;
}

function addSquareClass(square, className) {
    square.classList.add(className);
}

function resetGrid(promptUser) {
    let gridSize = 0;
    if (promptUser) {
        do { // Loop until valid answer
            gridSize = parseInt(prompt("Grid elements per side [MAX 100]:")); 

            if (gridSize === null) gridSize = 16;
        } while (gridSize < 0 || gridSize > 100);
    } else {
        gridSize = 16;
    }
    //squares.forEach((square) => square.classList.remove('hover'));
    clearGrid();

    console.log(gridSize);
    generateDivGrid(gridSize, gridSize);

    // need to re-select
    squares = document.querySelectorAll('.square');

    updateSquareSize(GRID_X / gridSize);
    squares.forEach((square) => square.addEventListener('mouseover', () => addSquareClass(square, 'hover')));


}

let squares;
let rows;
const resetButton = document.querySelector('#reset');

squares = document.querySelectorAll('.square');
rows = document.querySelectorAll('.row');

resetGrid(false);

squares.forEach((square) => square.addEventListener('mouseover', () => addSquareClass(square, 'hover')));
resetButton.addEventListener('click', () => resetGrid(true));


// within each of those 4 divs generate 4 divs
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

    for (i = 0;i < divRows;i++) {
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

generateDivGrid(16, 16);

const squares = document.querySelectorAll('.square')
const rows = document.querySelectorAll('.square')

squares.forEach((square) => square.addEventListener('mouseover', () => {
    square.classList.add('hover')
}));

// within each of those 4 divs generate 4 divs
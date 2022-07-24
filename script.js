// generate grid with flexbox

const outer = document.querySelector('#outer');

const GRID_X = 640;
const GRID_Y = 640;

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

function randomColor() {
    let r = Math.floor((Math.random() * 255)).toString();
    let g = Math.floor((Math.random() * 255)).toString();
    let b = Math.floor((Math.random() * 255)).toString();
    //let a = Math.random().toFixed(2);
    let a = "0.4";

    color = `rgba(${r}, ${g}, ${b}, ${a})`;

 //   console.log(color);
    return color;
}

function darkenColor(color) {
    // rgba(150, 120, 14, 0.xx) 
    // regex : rgba\((\d+),\s(\d+),\s(\d+),\s(.+)\)
    const regexpColor = /rgba\((\d+),\s(\d+),\s(\d+),\s(.+)\)/;
    if (currentColor = color.match(regexpColor)) {
        
        //console.log(currentColor);
        let r = currentColor[1];
        let g = currentColor[2];
        let b = currentColor[3];
        let a = Number(currentColor[4]);

        if (a <= 0.90) {
            a += 0.10;
        } else {
            a = "1.0";
        }

        color = `rgba(${r}, ${g}, ${b}, ${a})`
        return color;
    } 

    return color;

}

function getColorComponents(color) {
    let currentColor;
    const rgbaColor = /rgba\((\d+),\s(\d+),\s(\d+),\s(.+)\)/;
    const rgbColor = /rgb\((\d+),\s(\d+),\s(\d+)\)/;
    let r;
    let g;
    let b;
    let a;

    console.log(color);
    if (currentColor = color.match(rgbaColor)) {
        console.log(currentColor);
        r = Number(currentColor[1]);
        g = Number(currentColor[2]);
        b = Number(currentColor[3]);
        a = Number(currentColor[4]);
    } else if (currentColor = color.match(rgbColor)) {
        r = Number(currentColor[1]);
        g = Number(currentColor[2]);
        b = Number(currentColor[3]);
        a = 1.0;
    } else {
        console.log("Not a valid color");
    }

    console.log(`r is ${r}`);

    return [r, g, b, a];
}

function isGrayscale(color) {
    const components = getColorComponents(color);
    
    if ((components[0] === components[1]) && (components[1] === components[2])) {
        return true;
    }

    return false;
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
    //console.log(square);
    // random color
    //console.log(square.style.backgroundColor);
    // random color if property isn't set
    if (displayMode === "rcmode") {
        if (!square.style.backgroundColor || isGrayscale(square.style.backgroundColor)) {
            square.style.backgroundColor = randomColor(); 
        } else {
            // darken existing (alpha value), if it is
            square.style.backgroundColor = darkenColor(square.style.backgroundColor);
        }
    } else if (displayMode === "bwmode") {
        square.style.backgroundColor = "rgb(0, 0, 0)";
    } else if (displayMode === "gsmode") {
        square.style.backgroundColor = `rgba(0, 0, 0, 0.5)`;
    }
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
let displayMode = "bwmode";

squares = document.querySelectorAll('.square');
rows = document.querySelectorAll('.row');
radioButtons = document.querySelectorAll('input[type="radio"]')

resetGrid(false);

squares.forEach((square) => square.addEventListener('mouseover', () => addSquareClass(square, 'hover')));
resetButton.addEventListener('click', () => resetGrid(true));
radioButtons.forEach((radioButton) => radioButton.addEventListener('click', () => {
    displayMode = radioButton.id;
}));

// within each of those 4 divs generate 4 divs
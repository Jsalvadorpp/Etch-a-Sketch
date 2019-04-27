const sketchContainer = document.querySelector(".sketch-container");
const root = document.documentElement;
const resetButton = document.querySelector("#reset-button");
const newGridButton = document.querySelector("#new-grid-button");
const chooseColorButton = document.querySelector("#choose-color-button-container input");
const randomColorButton = document.querySelector("#random-color-button");
var cellColor = "black"

resetButton.addEventListener("click", () => {
    sketchContainer.childNodes.forEach( cell => cell.style.setProperty("background-color","white"));
});

newGridButton.addEventListener("click", () => {
    let newGridSize = prompt("how many squares per side?");
    createGrid(newGridSize);
});

chooseColorButton.addEventListener("change", event => {
    let newColor = event.target.value;
    console.log(newColor);
    cellColor = newColor;

});

function createGrid(size){

    root.style.setProperty("--columns-size",size);
    removeAllGridCells();

    const gridCell = document.createElement("div");
    gridCell.setAttribute("class","grid-cell");

    for(i=0 ; i<size*size ; i++){
        sketchContainer.appendChild(gridCell.cloneNode(true));
    }
    sketchContainer.childNodes.forEach(cell => cell.addEventListener("mouseenter",changeCellColor));
}

function removeAllGridCells(){

   while(sketchContainer.hasChildNodes()){
       sketchContainer.removeChild(sketchContainer.lastChild);
   }
}

function changeCellColor(){
    this.style.setProperty("background-color",cellColor);
}


createGrid(16);
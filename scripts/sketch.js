const sketchContainer = document.querySelector(".sketch-container");
const root = document.documentElement;

function createGrid(size){

    root.style.setProperty("--columns-size",size);
    removeAllGridCells();

    const gridCell = document.createElement("div");
    gridCell.setAttribute("class","grid-cell");

    for(i=0 ; i<size*size ; i++){
        gridCell.setAttribute("class","grid-cell");
        sketchContainer.appendChild(gridCell.cloneNode(true));
    }
}

function removeAllGridCells(){

   while(sketchContainer.hasChildNodes()){
       sketchContainer.removeChild(sketchContainer.lastChild);
   }
}

createGrid(16);
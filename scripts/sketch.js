const sketchContainer = document.querySelector(".sketch-container");
const root = document.documentElement;
const resetButton = document.querySelector("#reset-button");
const newGridButton = document.querySelector("#new-grid-button");
const chooseColorButton = document.querySelector("#choose-color-button-container input");
const randomColorButton = document.querySelector("#random-color-button");
var cellColor = "black"
var colorMode = "singleColor";

resetButton.addEventListener("click", () => {
    sketchContainer.childNodes.forEach( cell => {
        cell.style.setProperty("background-color","white");
        cell.setAttribute("data-grid-entered","false");
        cell.setAttribute("data-lightness-value","50");
    });
});

newGridButton.addEventListener("click", () => {
    let newGridSize = prompt("how many squares per side?");
    createGrid(newGridSize);
});

chooseColorButton.addEventListener("change", event => {
    let newColor = event.target.value;
    cellColor = newColor;
    colorMode = "singleColor"
    sketchContainer.childNodes.forEach( cell => {
        cell.setAttribute("data-grid-entered","false");
        cell.setAttribute("data-lightness-value","50");
    });
    
});

randomColorButton.addEventListener("click", () => {
    colorMode = "randomColor";
});

function createGrid(size){

    root.style.setProperty("--columns-size",size);
    removeAllGridCells();

    const gridCell = document.createElement("div");
    gridCell.setAttribute("class","grid-cell");
    gridCell.setAttribute("data-grid-entered","false");
    gridCell.setAttribute("data-hue-value","null")
    gridCell.setAttribute("data-lightness-value","50");

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

    if(colorMode == "singleColor"){
        this.style.setProperty("background-color",cellColor);
    }

    if(colorMode == "randomColor"){

       if(this.getAttribute("data-grid-entered") == "false"){

            this.setAttribute("data-grid-entered","true");
            let randomHue = Math.floor(Math.random() * 361);
            this.setAttribute("data-hue-value",randomHue);
            this.style.setProperty("background-color",`hsl(${randomHue},100%,50%)`);

       }else if(this.getAttribute("data-grid-entered") == "true"){

            let gridHue = this.getAttribute("data-hue-value");
            let gridLightness = this.getAttribute("data-lightness-value");

            if (gridLightness != "0"){

                let reduceLightnessBy10 = +gridLightness -10;
                this.style.setProperty("background-color",`hsl(${gridHue},100%,${reduceLightnessBy10}%)`);
                this.setAttribute("data-lightness-value",reduceLightnessBy10);
            }
       }
    }
}

createGrid(16);
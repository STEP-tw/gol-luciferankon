const ALIVE = 1;
const DEAD = 0;
const {
  isWithin
} = require('./utilLib.js');

const initCells = function(height,width){
  let cells = new Array(height).fill(width);
  return cells.map( x => new Array(x).fill(0));
}
//resurrect cells can be named
const updateCellWithInput = function(cells,element){
  let size = cells.length;
  cells[element[0]][element[1]]++;
  return cells;
}
//name it something else like current/initial generation
const generateInitialWorld = function(cells,inputs){
  inputs.reduce(updateCellWithInput,cells);
  return cells;
}
//can be made constant
//or can be made into function
let possibleCombinations = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];

//shouldn't use two verbs in name
const generateAddCoordinates = function(currentPosition){
  return function(delta){
    let rowIndex = currentPosition[0]+delta[0];
    let columnIndex = currentPosition[1]+delta[1];
    return [rowIndex,columnIndex];
  }
}

//make constants 
const checkValidPosition = function(grid){
  return function(position){
    let topLeft = [0,0];
    let bottomRight = [grid.length-1,grid[0].length-1];
    return isWithin(topLeft,bottomRight,position);
  }
}

const generateValidNeighbours = function(grid,currPosition){
  let possibleNeighbours = possibleCombinations.map(generateAddCoordinates(currPosition));
  return possibleNeighbours.filter(checkValidPosition(grid));
}

const checkState = function(grid){
  return function(neighbour,position){
    let state = grid[position[0]][position[1]];
    neighbour[state].push(position);
    return neighbour;
  }
}

const checkNeighbourState = function(grid,position){
  let validNeighbours = generateValidNeighbours( grid , position );
  return validNeighbours.reduce( checkState(grid) , { [ALIVE] : [] , [DEAD] : [] });
}

const checkNextState = function(neighbours,currentState){
  let aliveNeighbours = neighbours[ALIVE].length;
  let cellRules = [0,0,currentState,1,0,0,0,0,0];
  return cellRules[aliveNeighbours];
}

const updateGrid = function(oldGrid){
  let grid = oldGrid.map( x => x.slice() );
  for(let r=0; r < oldGrid.length; r++){
    for(let c=0; c < oldGrid[r].length; c++){
      let neighbours = checkNeighbourState( oldGrid , [r,c]);
      let nextState = checkNextState( neighbours, oldGrid[r][c]);
      grid[r][c] = nextState;
    }
  }
  return grid;
}

module.exports = { 
  initCells,
  generateInitialWorld,
  generateValidNeighbours,
  checkValidPosition,
  generateAddCoordinates,
  checkNeighbourState,
  checkNextState,
  updateGrid,
  updateCellWithInput
};

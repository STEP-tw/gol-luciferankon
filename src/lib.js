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
    return isWithin([0,0],[grid.length-1,grid[0].length-1],position);
  }
}

const generateValidNeighbours = function(grid,currPosition){
  let possibleNeighbours = possibleCombinations.map(generateAddCoordinates(currPosition));
  return possibleNeighbours.filter(checkValidPosition(grid));
}

//object can be named differently
const checkState = function(grid){
  return function(object,position){
    object[grid[position[0]][position[1]]].push(position);
    return object;
  }
}

//validCombinations should be named validNeighbours
const checkNeighbourState = function(grid,position){
  let validCombinations = generateValidNeighbours(grid,position);
  return validCombinations.reduce(checkState(grid),{1:[],0:[]});
}

const checkNextState = function(neighbourStates,currentState){
  let aliveNeighbour = neighbourStates[1].length;
  let rules = [0,0,currentState,1,0,0,0,0,0];
  return rules[aliveNeighbour];
}

const updateGrid = function(oldGrid){
  let grid = oldGrid.map( x => x.slice() );
  for(let r=0; r < oldGrid.length; r++){
    for(let c=0; c < oldGrid[r].length; c++){
      let neighbourStates = checkNeighbourState( oldGrid , [r,c]);
      let nextState = checkNextState( neighbourStates, oldGrid[r][c]);
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

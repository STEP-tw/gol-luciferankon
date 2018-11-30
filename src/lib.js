const ALIVE = 1;
const DEAD = 0;

const {
  isWithin,
  findRelativeWorld,
  findPointInsideBoard
} = require('./utilLib.js');


const initCells = function(height, width){
  let cells = new Array(height).fill(width);
  return cells.map( x => new Array(x).fill(0));
}

const updateCellWithInput = function(cells,element){
  cells[element[0]][element[1]]=1;
  return cells;
}

const generateInitialWorld = function(cells,inputs){
  inputs.reduce(updateCellWithInput,cells);
  return cells;
}

const possibleCombinations = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];

const generateAddCoordinates = function(currentPosition){
  return function(delta){
    let rowIndex = currentPosition[0]+delta[0];
    let columnIndex = currentPosition[1]+delta[1];
    return [rowIndex,columnIndex];
  }
}

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

const generateRelativeWorld = function(grid,currGeneration,bounds){
  currGeneration = findPointInsideBoard(currGeneration,bounds);
  currGeneration = findRelativeWorld(currGeneration,bounds);
  let world = generateInitialWorld(grid,currGeneration);
  return world;
}

const printBoard = function(grid){
  const toRow = function(row){
    return ['',...row,''].join(' | ');
  }
  let line = grid.map(toRow);
  let HL = new Array(4*grid[0].length+2).fill('-').join('');
  line = line.join('\n'+HL+'\n').split('\n');
  return [HL,...line,HL].join('\n');
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
  updateCellWithInput,
  generateRelativeWorld,
  printBoard,
};

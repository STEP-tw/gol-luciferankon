const readline = require("readline-sync").question;

const startGame = function(input){
  let grid = initCell(input.size);
  grid = generateInitialWorld(grid,input.aliveCells);
  console.log(printBoard(grid));
  for(let count=0;count<10;count++){
    grid = updateState(grid);
    console.log(printBoard(grid));
  }
}

const initCell = function(height,width){
  let cells = new Array(height).fill(width);
  return cells.map( x => new Array(x).fill(0));
}

const updateCellWithInput = function(cells,element){
  let size = cells.length;
  cells[element[0]][element[1]]++;
  return cells;
}

const generateInitialWorld = function(cells,inputs){
  inputs.reduce(updateCellWithInput,cells);
  return cells;
}

let possibleCombinations = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];

const generateAddCoordinates = function(currentPosition){
  return function(delta){
    let rowIndex = currentPosition[0]+delta[0];
    let columnIndex = currentPosition[1]+delta[1];
    return [rowIndex,columnIndex];
  }
}

const checkValidPosition = function(grid){
  return function(position){
    return grid[position[0]]!=undefined && grid[position[1]]!=undefined;
  }
}

const generateValidNeighbours = function(grid,currPosition){
  let possibleNeighbours = possibleCombinations.map(generateAddCoordinates(currPosition));
  return possibleNeighbours.filter(checkValidPosition(grid));
}

const checkState = function(grid){
  return function(object,position){
    object[grid[position[0]][position[1]]].push(position);
    return object;
  }
}

const checkNeighbourState = function(grid,position){
  let validCombinations = generateValidNeighbours(grid,position);
  return validCombinations.reduce(checkState(grid),{1:[],0:[]});
}

const checkNextState = function(neighbourStates,currentState){
  let aliveNeighbour = neighbourStates[1].length;
  let rules = [0,0,currentState,1,0,0,0,0,0];
  return rules[aliveNeighbour];
}

const updateState = function(grid){
  let result = grid.map(x=>x.slice());
  for(let rowIndex=0;rowIndex<grid.length;rowIndex++){
    for(let columnIndex=0;columnIndex<grid.length;columnIndex++){
      let neighbourStates = checkNeighbourState(grid,[rowIndex,columnIndex]);
      let nextState = checkNextState(neighbourStates,grid[rowIndex][columnIndex]);
      result[rowIndex][columnIndex] = nextState;
    }
  }
  return result;
}

const printBoard = function(grid){
  let line = grid.map( x => '| '+x.join(' | ')+' |');
  let lineSeparator = new Array((4*grid.length)+1).fill('-').join('');
  return lineSeparator+'\n'+line.join('\n'+lineSeparator+'\n')+'\n'+lineSeparator;
}

module.exports = { 
  initCell,
  generateInitialWorld,
  generateValidNeighbours,
  checkValidPosition,
  generateAddCoordinates,
  checkNeighbourState,
  checkNextState,
  updateState,
  startGame,
  updateCellWithInput
};

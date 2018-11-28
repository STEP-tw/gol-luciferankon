const readline = require("readline-sync").question;

const startGame = function(input){
  let grid = initCell(input.size);
  grid = arrangeCells(grid,input.aliveCells);
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

const arrangeCells = function(cells,inputs){
  inputs.reduce(updateCellWithInput,cells);
  return cells;
}

let possibleCombinations = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];

const generatePossibleNeighbours = function(currentPosition){
  return function(delta){
    let rowIndex = currentPosition[0]+delta[0];
    let columnIndex = currentPosition[1]+delta[1];
    return [rowIndex,columnIndex];
  }
}

const checkValidNeighbour = function(grid){
  return function(position){
    return grid[position[0]]!=undefined && grid[position[1]]!=undefined;
  }
}

const generateValidCombinations = function(grid,currPosition){
  //allDeltas.map(delta => currentPosition.add(delta)).filter(validNeighbour(grid));

  let possibleNeighbours = possibleCombinations.map(generatePossibleNeighbours(currPosition));
  return possibleNeighbours.filter(checkValidNeighbour(grid));
}

const checkState = function(grid){
  return function(object,position){
    object[grid[position[0]][position[1]]].push(position);
    return object;
  }
}

const checkNeighbourState = function(grid,position){
  let validCombinations = generateValidCombinations(grid,position);
  return validCombinations.reduce(checkState(grid),{1:[],0:[]});
}

const checkNextState = function(neighbourStates,currentState){
  let aliveNeighbour = neighbourStates[1].length;
  let state = [[0,0,0,1,0,0,0,0,0],[0,0,1,1,0,0,0,0,0]];
  return state[currentState][aliveNeighbour];
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
  arrangeCells,
  generateValidCombinations,
  checkValidNeighbour,
  generatePossibleNeighbours,
  checkNeighbourState,
  checkNextState,
  updateState,
  startGame,
  updateCellWithInput
};

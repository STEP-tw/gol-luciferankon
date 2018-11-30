const {
  initCells,
  generateInitialWorld,
  updateGrid,
  generateRelativeWorld,
  printBoard
} = require('./lib.js');

const {
  isWithin,
  findHeightWidth,
  makePositionRelative,
  findPointInsideBoard,
  findRelativeWorld
} = require('./utilLib.js');

const nextGeneration = function(currGeneration,bounds) {
  let {height, width} = findHeightWidth(bounds);
  let grid = initCells(height,width);
  let relativeWorld  = generateRelativeWorld( grid, currGeneration, bounds);
  let updatedWorld = updateGrid(relativeWorld);
  let aliveCells = [];
  let relativeTopLeft = bounds.topLeft.map( x => -x);
  for(let i in updatedWorld){
    for(let j in updatedWorld[i]){
      if(updatedWorld[i][j]==1){
        aliveCells.push([+i,+j]);
      }
    }
  }
  return aliveCells.map(makePositionRelative.bind(null,relativeTopLeft));
}

module.exports = { nextGeneration };

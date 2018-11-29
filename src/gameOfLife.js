const {
  initCells,
  generateInitialWorld,
  updateGrid,
  generateRelativeWorld
} = require('./lib.js');

//require this from library
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
  let result = [];
  let relativeTopLeft = bounds.topLeft.map( x => -x);
  for(let i in updatedWorld){
    for(let j in updatedWorld[i]){
      if(updatedWorld[i][j]==1){
        result.push([+i,+j]);
      }
    }
  }
  return result.map(makePositionRelative.bind(null,relativeTopLeft));
}

module.exports = { nextGeneration };

const {
  initCells,
  generateInitialWorld,
  updateGrid
} = require('./lib.js');

//require this from library
const {
  isWithin
} = require('./utilLib.js');

const nextGeneration = function(currGeneration,bounds) {
  //take this into small functions
  let height = bounds.bottomRight[0]-bounds.topLeft[0]+1;
  let width = bounds.bottomRight[1]-bounds.topLeft[1]+1;

  let grid = initCells(height,width);
  let isWithinBound = isWithin.bind(null,bounds.topLeft,bounds.bottomRight);
  currGeneration = currGeneration.filter(isWithinBound);
  let makePositionRelativeWith = makePositionRelative.bind(null,bounds.topLeft);
  currGeneration = currGeneration.map(makePositionRelativeWith);
  let world = generateInitialWorld(grid,currGeneration);
  let updatedWorld = updateGrid(world);
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

//move to util
const makePositionRelative = function(topLeft,position){
  return [position[0]-topLeft[0],position[1]-topLeft[1]];
}

module.exports = { nextGeneration };

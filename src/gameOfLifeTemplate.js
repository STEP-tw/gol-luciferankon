const {
  initCell,
  arrangeCells,
  updateState
} = require('../../game-of-life/src/lib.js');
const nextGeneration = function(currGeneration,bounds) {
  let height = bounds.bottomRight[0]-bounds.topLeft[0];
  let width = bounds.bottomRight[1]-bounds.topLeft[1];
  let grid = initCell(height,width);
  let isWithinBound = isWithin.bind(null,bounds.topLeft,bounds.bottomRight);
  currGeneration = currGeneration.filter(isWithinBound);
  let world = arrangeCells(grid,currGeneration);
  let updatedWorld = updateState(world);
  let result = [];
  for(let i in updatedWorld){
    for(let j in updatedWorld[i]){
      if(updatedWorld[i][j]==1){
        result.push([+i,+j]);
      }
    }
  }
  return result;
}

const isWithin = function(topLeft,bottomRight,position){
  return position[0]>=topLeft[0] && position[0]<=bottomRight[0] && position[1]>=topLeft[1] && position[1]<=bottomRight[1];
}

module.exports = { nextGeneration };

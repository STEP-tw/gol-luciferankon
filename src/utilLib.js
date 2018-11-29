const isWithin = function(topLeft,bottomRight,position){
  return isGreaterOrEqual(position[0],topLeft[0]) &&
         isGreaterOrEqual(bottomRight[0],position[0]) &&
         isGreaterOrEqual(position[1],topLeft[1]) &&
         isGreaterOrEqual(bottomRight[1],position[1]);
}

const isGreaterOrEqual = function(element1, element2){
  return element1 >= element2;
}

const findRelativeWorld = function(currGeneration,bounds){
  let makePositionRelativeWith = makePositionRelative.bind(null,bounds.topLeft);
  return currGeneration.map(makePositionRelativeWith);
}

const findPointInsideBoard = function(currGeneration,bounds){
  let isWithinBound = isWithin.bind(null,bounds.topLeft,bounds.bottomRight);
  return currGeneration.filter(isWithinBound);
}

const makePositionRelative = function(topLeft,position){
  return [position[0]-topLeft[0],position[1]-topLeft[1]];
}

const findHeightWidth = function(bounds){
  let height = bounds.bottomRight[0]-bounds.topLeft[0]+1;
  let width = bounds.bottomRight[1]-bounds.topLeft[1]+1;
  return {height: height, width : width};
}

module.exports = { isWithin, findHeightWidth, findPointInsideBoard, findRelativeWorld,isGreaterOrEqual, makePositionRelative };

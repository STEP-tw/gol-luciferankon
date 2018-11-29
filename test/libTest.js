const { 
  initCells,
  generateInitialWorld,
  generateValidNeighbours,
  checkValidPosition,
  generateAddCoordinates,
  checkNeighbourState,
  checkNextState,
  updateGrid,
  updateCellWithInput
} = require("../src/lib.js");

const assert = require('assert');

describe("initCells",function(){
  //easy test cases are not covered i.e. 0x0, 1x1 1x2 2x2
  it("should return 3X3 array filled with 0",function(){
    assert.deepEqual(initCells(3,3),[[0,0,0],[0,0,0],[0,0,0]]);
  });
  it("should return empty array for 0x0",function(){
    assert.deepEqual(initCells(0,0),[]);
  });
  it("should return 1x1 array filled with 0",function(){
    assert.deepEqual(initCells(1,1),[[0]]);
  });
  it("should return 1x2 array filled with 0",function(){
    assert.deepEqual(initCells(1,2),[[0,0]]);
  });
  it("should return 2X2 array filled with 0",function(){
    assert.deepEqual(initCells(2,2),[[0,0],[0,0]]);
  });
});

//name doesn't tell what it is going to do
//inputs should be changed to something else
//simple things are missing
////function name changed
describe("generateInitialWorld",function(){
  it("should return updated 3X3 array with aliveCells",function(){
    let aliveCells = [];
    assert.deepEqual(generateInitialWorld(initCells(3,3),aliveCells),[[0,0,0],[0,0,0],[0,0,0]]);

    aliveCells = [[0,0]];
    assert.deepEqual(generateInitialWorld(initCells(3,3),aliveCells),[[1,0,0],[0,0,0],[0,0,0]]);

    aliveCells = [[0,0],[1,2]];
    assert.deepEqual(generateInitialWorld(initCells(3,3),aliveCells),[[1,0,0],[0,0,1],[0,0,0]]);
    
    aliveCells = [[0,0],[1,2],[2,2]];
    assert.deepEqual(generateInitialWorld(initCells(3,3),aliveCells),[[1,0,0],[0,0,1],[0,0,1]]);
  });
});

//combinations feels like too generic
//should be changed to neighbours
//function name changed
describe('valid neighbours',function(){
  it('should return valid neighbours for given position',function(){
    assert.deepEqual(generateValidNeighbours(initCells(3,3),[0,0]),[[0,1],[1,0],[1,1]]);
  });
});

//function name changed
//neighbour shpuld be changed to position
describe('check valid position',function(){
  let checkPosition = checkValidPosition(initCells(3,3));
  it('should return true if the position valid',function(){
    assert.deepEqual(checkPosition([0,0]),true);
  });
  it('should return false if the position is not valid',function(){
    assert.deepEqual(checkPosition([0,-1]),false);
    assert.deepEqual(checkPosition([-1,0]),false);
  });
  it.skip('should return false if it is an empty array',function(){
    assert.deepEqual(checkPosition([0,0]),false);
  });
});

//function name changed
//description of the function should be changed
describe('add Co-ordinates',function(){
  let addCoordinates = generateAddCoordinates([0,2]);
  it('should return the sum of the co-ordinates',function(){
    assert.deepEqual(addCoordinates([-1,-1]),[-1,1]);
  });
});

describe("checkNeighbourState",function(){
 it("should return object containing alive and dead cells",function(){
   let grid = [[0,1,0],[1,0,0],[0,1,0]];
   let position = [0,0];
   assert.deepEqual(checkNeighbourState(grid,position),{1:[[0,1],[1,0]],0:[[1,1]]});
   position = [1,0];
   assert.deepEqual(checkNeighbourState(grid,position),{1:[[0,1],[2,1]],0:[[0,0],[1,1],[2,0]]});
   position = [2,2];
   assert.deepEqual(checkNeighbourState(grid,position),{1:[[2,1]],0:[[1,1],[1,2]]});
 });
});

describe('check the next state',function(){
  it('should give 0 if current state is alive and fewer than two neighbour alive',function(){
    assert.deepEqual(checkNextState({1:[[1,0]],0:[[0,1],[1,1]]},1),0);
  });
  it('should give 0 if current state is alive and more than three neighbour alive',function(){
    assert.deepEqual(checkNextState({1:[[1,1],[1,2],[0,1],[2,1]]},1),0);
  });
  it('should give 1 if current state is alive and 2 or 3 neighbour alive',function(){
    assert.deepEqual(checkNextState({1:[[1,1],[1,2],[0,1]]},1),1);
  });
  it('should give 1 if current state is dead and exactly 3 people are alive',function(){
    assert.deepEqual(checkNextState({1:[[1,1],[1,2],[1,0]],0:[[0,1],[2,1]]},1),1);
  });
  it('should give 0 if current state is dead and exactly 3 people are not alive',function(){
    assert.deepEqual(checkNextState({1:[[1,0]],0:[[1,1],[1,2]]},0),0);
  });
  
});

describe("updateGrid",()=>{
  it("should return updated state of the grid ",()=>{
    assert.deepEqual(updateGrid([[0,1],[1,0]]),[[0,0],[0,0]]);
    assert.deepEqual(updateGrid([[0,1,0],[1,0,0],[0,0,0]]),[[0,0,0],[0,0,0],[0,0,0]]);
  });
});

describe("updateCellWithInput",function(){
  it("should return updated grid with one alive cell",function(){
    assert.deepEqual(updateCellWithInput([[0,0],[0,0]],[0,0]),[[1,0],[0,0]]);
    assert.deepEqual(updateCellWithInput([[0,0],[0,0]],[1,0]),[[0,0],[1,0]]);
    assert.deepEqual(updateCellWithInput([[0,0],[0,0]],[1,1]),[[0,0],[0,1]]);
  })

});

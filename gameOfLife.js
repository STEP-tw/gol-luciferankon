const {
  initCells,
  generateInitialWorld,
  updateCellsWithInput
} = require('./src/lib.js');

const {
  nextGeneration
} = require('./src/gameOfLife.js');

let world = initCells(3,4);

let aliveCells = nextGeneration([[0,1],[1,1],[1,2]],{topLeft : [0,0], bottomRight : [3,4]});
let nextGen = generateInitialWorld( world, aliveCells );
console.log(nextGen);


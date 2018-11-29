const {
  initCells,
  generateInitialWorld,
  updateCellsWithInput,
  printBoard
} = require('./src/lib.js');

const {
  nextGeneration
} = require('./src/gameOfLife.js');

const readline = require("readline-sync").question;

const readUserInput = function(){
  let size = readline("enter the size of grid: ").split(' ');
  let aliveCells = readline("enter the aliveCells: ").split(' ');
  aliveCells = aliveCells.map( x => JSON.parse(x));
  return {size : size, aliveCells : aliveCells};
}

let input = readUserInput();
let world1 = initCells(+input.size[0],+input.size[1]);
let aliveCells = nextGeneration( input.aliveCells, {topLeft : [0,0], bottomRight : [input.size[0],input.size[1]]});
let nextGen = generateInitialWorld( world1, aliveCells );
console.log(printBoard(nextGen));


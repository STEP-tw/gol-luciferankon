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
let {aliveCells} = input;
const startGame = function(){
  let world1 = initCells(+input.size[0],+input.size[1]||+input.size[0]);
  aliveCells = nextGeneration( aliveCells, {topLeft : [0,0], bottomRight : [input.size[0],input.size[1] || input.size[0]]});
  let nextGen = generateInitialWorld( world1, aliveCells );
  console.log(aliveCells)
  console.clear();
  console.log(printBoard(nextGen));
}

setInterval(startGame,500)


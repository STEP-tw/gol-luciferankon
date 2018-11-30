const {
  nextGeneration
} = require('./src/gameOfLife.js');

const {
  initCells,
  generateInitialWorld,
  printBoard
} = require('./src/lib.js');

const readline = require("readline-sync").question;

const readUserInput = function(){
  let size = readline("enter the size of grid: ").split(' ');
  let bounds = readline('enter bounds: ').split(' ');
  let aliveCells = readline("enter the aliveCells: ").split(' ');
  aliveCells = aliveCells.map( x => JSON.parse(x));
  bounds = bounds.map( x => JSON.parse(x));
  bounds = { topLeft : bounds[0], bottomRight : bounds[1]};
  return {size : size, aliveCells : aliveCells , bounds : bounds};
}

let input = readUserInput();
let {aliveCells} = input;

const startGame = function(){
  let height = +input.size[0];
  let width = +input.size[1] || height;
  let world = initCells(height,width);
  aliveCells = nextGeneration( aliveCells, {topLeft : [0,0], bottomRight : [height-1,width-1]});
  let nextGen = generateInitialWorld( world, aliveCells );
  console.clear();
  console.log(printBoard(nextGen));
}

setInterval(startGame,500)


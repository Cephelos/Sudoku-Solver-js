import Renderer from "./GUI.js";
import Board from "./solver.js";
import Two from 'https://cdn.skypack.dev/two.js@latest';

const hardBoard =  [[0, 6, 0, 0, 0, 0, 0, 0, 0],
                    [0, 1, 0, 2, 0, 0, 0, 0, 9],
                    [0, 0, 4, 0, 0, 0, 0, 6, 1],
                    [4, 7, 0, 0, 2, 0, 0, 0, 0],
                    [5, 0, 0, 0, 4, 0, 0, 0, 0],
                    [0, 0, 0, 9, 1, 6, 0, 0, 0],
                    [0, 0, 0, 0, 0, 9, 2, 0, 0],
                    [3, 0, 8, 0, 0, 0, 7, 0, 0],
                    [0, 0, 0, 8, 0, 0, 0, 4, 0]];
                    
const emptyNotesBoard = [[[], [], [], [], [], [], [], [], []],
                         [[], [], [], [], [], [], [], [], []],
                         [[], [], [], [], [], [], [], [], []],
                         [[], [], [], [], [], [], [], [], []],
                         [[], [], [], [], [], [], [], [], []],
                         [[], [], [], [], [], [], [], [], []],
                         [[], [], [], [], [], [], [], [], []],
                         [[], [], [], [], [], [], [], [], []],
                         [[], [], [], [], [], [], [], [], []]];
const r = new Renderer(new Board(hardBoard), new Board(emptyNotesBoard), new Two({ width: 800, height: 600 }));


r.renderBoard();
r.renderButtons();
document.addEventListener("mousemove", r.hoverOverCell.bind(r));
document.addEventListener("click", r.clickButton.bind(r));
document.addEventListener("keydown", r.keyPressed.bind(r));
document.addEventListener("keyup", r.keyUp.bind(r));

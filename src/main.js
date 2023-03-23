import Renderer from "./GUI.js";
import Board from "./solver.js";
import Two from 'https://cdn.skypack.dev/two.js@latest';
const emptyBoard = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0]];
const hardBoard =  [[0, 6, 0, 0, 0, 0, 0, 0, 0],
                    [0, 1, 0, 2, 0, 0, 0, 0, 9],
                    [0, 0, 4, 0, 0, 0, 0, 6, 1],
                    [4, 7, 0, 0, 2, 0, 0, 0, 0],
                    [5, 0, 0, 0, 4, 0, 0, 0, 0],
                    [0, 0, 0, 9, 1, 6, 0, 0, 0],
                    [0, 0, 0, 0, 0, 9, 2, 0, 0],
                    [3, 0, 8, 0, 0, 0, 7, 0, 0],
                    [0, 0, 0, 8, 0, 0, 0, 4, 0]];
const r = new Renderer(new Board(hardBoard), new Two({ width: 1000, height: 1000 }));
r.renderBoard();
document.addEventListener("mousemove", r.hoverOverCell.bind(r));

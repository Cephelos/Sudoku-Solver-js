import Renderer from "./GUI.js";
import Two from 'https://cdn.skypack.dev/two.js@latest';


const r = new Renderer(new Two({ width: 800, height: 600 }));


r.renderBoard();
r.renderButtons();
document.addEventListener("mousemove", r.hoverOverCell.bind(r));
document.addEventListener("click", r.clickButton.bind(r));
document.addEventListener("keydown", r.keyPressed.bind(r));
document.addEventListener("keyup", r.keyUp.bind(r));

import { Pendula } from "wasm-pendulum";
import { memory } from "wasm-pendulum/n_pendulum_wasm_bg";
import { scaleLinear, scaleSequential } from "d3-scale";
import { interpolateRainbow } from "d3-scale-chromatic";

let ns = [...Array(25).keys()].map(x => x + 1);
let nPendulums = ns.length;

const pendula = new Pendula(ns, 0.5*Math.PI);

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

var scale = scaleLinear().domain([0,1]).range([0,200])
var color = scaleSequential(interpolateRainbow).domain([0, nPendulums]);

const partialSums = arr => {
    let s = 0;
    return arr.map(x => s += x);
}
let nSums = partialSums(ns)
let nSum = nSums[nSums.length - 1];

function draw() {
    let coordsPtr = pendula.time_step(1/60);
    let coordsArray = new Float64Array(memory.buffer, coordsPtr, 2 * nSum);
    let pendulumIndex = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < nSum; i++) {
        let x1 = 0.5*canvas.width;
        let y1 = 0.5*canvas.height;
        if (i === 0 || nSums.includes(i)) {
            if (i !== 0) pendulumIndex++;
            x1 = 0.5*canvas.width;
            y1 = 0.5*canvas.height;            
        } else {
            x1 = 0.5*canvas.width + scale(coordsArray[2*i - 2]);
            y1 = 0.5*canvas.height + scale(coordsArray[2*i - 1]);
        }
        let x2 = 0.5*canvas.width + scale(coordsArray[2*i]);
        let y2 = 0.5*canvas.height + scale(coordsArray[2*i + 1]);
        ctx.fillStyle = color(pendulumIndex);
        ctx.strokeStyle = color(pendulumIndex);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x2, y2, 3, 0, Math.PI * 2, true);
        ctx.fill();
    }

    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
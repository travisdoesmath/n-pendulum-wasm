import { Pendula } from "wasm-pendulum";
import { memory } from "wasm-pendulum/n_pendulum_wasm_bg";
import { scaleLinear, scaleSequential } from "d3-scale";
import { interpolateRainbow } from "d3-scale-chromatic";


let svgNS = "http://www.w3.org/2000/svg";

let ns = [...Array(10).keys()].map(x => 2*x + 1);
//let ns = [3, 2, 10];
console.log(ns);
let nPendulums = ns.length;

const pendula = new Pendula(ns, 0.5*Math.PI);

let svg = document.getElementById('svg');
let width = +svg.getAttribute('width');
let height = +svg.getAttribute('height');
let g = document.createElementNS(svgNS, 'g');
    g.setAttribute('transform', `translate(${0.5*width},${0.5*height})`)
svg.appendChild(g);

var scale = scaleLinear().domain([0,1]).range([0,200])
var color = scaleSequential(interpolateRainbow).domain([0, nPendulums]);

const partialSums = arr => {
    let s = 0;
    return arr.map(x => s += x);
}
let nSums = partialSums(ns)
let nSum = nSums[nSums.length - 1];

let bobs = [];
let shafts = [];

let pendulumIndex = 0;

async function init() {
    let coordsPtr = pendula.time_step(1/60);
    let coordsArray = new Float64Array(memory.buffer, coordsPtr, 2 * nSum);
    for (let i = 0; i < nSum; i++) {
        let x = scale(coordsArray[2*i]);
        let y = scale(coordsArray[2*i + 1]);

        let shaft = document.createElementNS(svgNS, 'line');
        if (nSums.includes(i)) {
            pendulumIndex++;
        }
        shaft.setAttribute('stroke', color(pendulumIndex));
        shaft.classList.add('shaft')
        g.appendChild(shaft);
        shafts.push(shaft);
    
        let bob = document.createElementNS(svgNS, 'circle');
        // bob.setAttribute('cx', x);
        // bob.setAttribute('cy', y);
        bob.setAttribute('r', 3);
        bob.classList.add('bob');
        bob.setAttribute('fill', color(pendulumIndex));
        g.appendChild(bob);
        bobs.push(bob);
    } 
}   

function update() {
    let coordsPtr = pendula.time_step(1/60);
    let coordsArray = new Float64Array(memory.buffer, coordsPtr, 2 * nSum);

    for (let i = 0; i < nSum; i++) {
        let x = scale(coordsArray[2*i]);
        let y = scale(coordsArray[2*i + 1]);

        let shaft = shafts[i];
        if (i == 0 || nSums.includes(i)) {
            // console.log(i, nSums);
            shaft.setAttribute('x1', 0);
            shaft.setAttribute('y1', 0);
        } else {
            shaft.setAttribute('x1', scale(coordsArray[2*i - 2]));
            shaft.setAttribute('y1', scale(coordsArray[2*i - 1]));
        }

        shaft.setAttribute('x2', x);
        shaft.setAttribute('y2', y);
    
        let bob = bobs[i];
        bob.setAttribute('cx', x);
        bob.setAttribute('cy', y);
    }

    requestAnimationFrame(update);
}

init().then(requestAnimationFrame(update))
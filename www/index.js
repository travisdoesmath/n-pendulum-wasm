import { Pendula } from "wasm-pendulum";
import { memory } from "wasm-pendulum/n_pendulum_wasm_bg";

let ns = [...Array(10).keys()].map(x => x < 2 ? 1 : 2*x-1);
let nPendulums = ns.length;

const pendula = new Pendula(ns, 0.5*Math.PI);
console.log(pendula);
console.log(pendula.coordinates());

pendula.time_step(1/120);

// const pendulum1 = Pendulum.new(n, 0.5*Math.PI);
// const pendulum2 = Pendulum.new(n-1, 0.5*Math.PI);

var svg = d3.select("svg");
var width = +svg.attr("width");
var height = +svg.attr("height");
var g = svg.append("g").attr("transform", "translate(" + width*.5 + "," + height*.5 + ")");
var color = d3.scaleSequential(d3.interpolateRainbow).domain([0, nPendulums]);

var scale = d3.scaleLinear().domain([0,1]).range([0,200])

var update = function() {
    pendula.time_step(1/120);

    let coordsPtr = pendula.coordinates();
    let coordsArray = new Float64Array(memory.buffer, coordsPtr, 2 * d3.sum(ns));

    let coords = [];

    let ptr = 0;

    ns.forEach(n => {
        let coords_ = [];
        let x = 0;
        let y = 0;
        for (let i = ptr; i < ptr + 2*n; i += 2) {
            coords_.push({
                x1: x,
                y1: y,
                x2: coordsArray[i],
                y2: coordsArray[i + 1],
            })
            x = coordsArray[i];
            y = coordsArray[i + 1];
        }
        ptr = ptr + 2*n;
        coords.push(coords_);
    })

    draw(coords.slice(2, ns.length));
}

var draw = function(coords) {
	var pendulum = g.selectAll(".pendulum").data(coords, (d, i) => i)
	
	pendulum.enter()
		.append("g").attr("class","pendulum")
		.attr('stroke', (d, i) => color(i))
		.attr('fill', (d, i) => color(i))

	var shafts = pendulum.selectAll('.shaft').data((d, i) => d)

		shafts.enter().append('line').attr("class", "shaft")
		.merge(shafts)
		.attr("x1", d => scale(d.x1))
		.attr("y1", d => scale(d.y1))	
		.attr("x2", d => scale(d.x2))
		.attr("y2", d => scale(d.y2))	

	var bobs = pendulum.selectAll('.bob').data(d => d)
		
	bobs.enter().append('circle').attr('class', 'bob').attr('r',3)
	.merge(bobs)
		.attr("cx", d => scale(d.x2))
		.attr("cy", d => scale(d.y2))
}

var run = setInterval(() => { update() }, 1000/120);
//update();
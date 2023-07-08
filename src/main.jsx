import "./style.css"
import { Surface } from "./surface/surface"






// Get the 2D rendering context


const surface = Surface({w:800,h:600})


// document.body.appendChild(surface.canvas)


var centerX = 800 / 2;
var centerY = 600 / 2;


const circle = surface.add({
    type: "ellipse",
    backgroundColor: "#ffc",
    border: {
        thickness: 1,
        color: "black"
    },
    x: centerX,
    y: centerY,
    w: 100,
    h: 100,
})

const square = surface.add({
    type: "rect",
    backgroundColor: "#ffc",
    border: {
        thickness: 1,
        color: "black",
        radius:10,
    },
    x: centerX-120,
    y: centerY,
    w: 100,
    h: 100,
})

const line = surface.add({
    type: "line",
    backgroundColor: "#ffc",
    border: {
        thickness: 1,
        color: "black",
    },
    x1: 100,
    y1: 100,
    x2: 200,
    y2: 200,
    w:30
})

const curve = surface.add({
    type: "curve",
    backgroundColor: "#ffc",
    border: {
        thickness: 1,
        color: "black",
    },
    x1: 20,
    y1: 20,
    x2: 20,
    y2: 100,
    x3: 200,
    y3: 100,
    x4: 200,
    y4: 20,
    w:10
})

document.addEventListener("mousemove",e=>{
    if(circle.pointOnShape({x:e.offsetX,y:e.offsetY}))
    {
        circle.backgroundColor = "#cff"
    }
    else
    {
        circle.backgroundColor = "#ffc"
    }
    if(square.pointOnShape({x:e.offsetX,y:e.offsetY}))
    {
        square.backgroundColor = "#cff"
    }
    else
    {
        square.backgroundColor = "#ffc"
    }
    if(line.pointOnShape({x:e.offsetX,y:e.offsetY}))
    {
        line.backgroundColor = "#cff"
    }
    else
    {
        line.backgroundColor = "#ffc"
    }
    if(curve.pointOnShape({x:e.offsetX,y:e.offsetY}))
    {
        curve.backgroundColor = "#cff"
    }
    else
    {
        curve.backgroundColor = "#ffc"
    }
    // line.x2 = e.offsetX
    // line.y2 = e.offsetY
})

const surface2 = Surface({w:800,h:600})

surface2.add({
    surface,
    x:0,
    y:0,
    w:800,
    h:600
})
document.body.appendChild(surface2.canvas)
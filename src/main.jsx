import "./style.css"
import { Surface } from "./surface/surface"






// Get the 2D rendering context


const surface = Surface({w:800,h:600})
document.body.appendChild(surface.canvas)


var centerX = 800 / 2;
var centerY = 600 / 2;


const circle = surface.add({
    shape: "ellipse",
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
    shape: "rect",
    backgroundColor: "#ffc",
    border: {
        thickness: 1,
        color: "black",
        radius: 10,
    },
    x: centerX-120,
    y: centerY,
    w: 100,
    h: 100,
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
    
})

// const canvas2 = Surface({w:800,h:600})

// canvas2.drawSurface({
//     surface:canvas,
//     x:0,
//     y:0,
// })
// canvas2.canvas.$parent(document.body)
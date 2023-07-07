import "./style.css"
import { Surface } from "./surface/surface"






// Get the 2D rendering context


const canvas = Surface({w:800,h:600})
canvas.canvas.$parent(document.body)


var centerX = 800 / 2;
var centerY = 600 / 2;

canvas.drawRect({
    backgroundColor: "#cff",
    border: {
        thickness: 1,
        color: "#ccc",
        radius: 10,
    },
    x: centerX-120,
    y: centerY,
    w: 100,
    h: 100,
})

canvas.drawEllipse({
    backgroundColor: "#ffc",
    border: {
        thickness: 1,
        color: "#ccc"
    },
    x: centerX,
    y: centerY,
    w: 100,
    h: 100,
})

// const canvas2 = Surface({w:800,h:600})

// canvas2.drawSurface({
//     surface:canvas,
//     x:0,
//     y:0,
// })
// canvas2.canvas.$parent(document.body)
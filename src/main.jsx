import "./style.css"
import { Surface } from "./surface/surface"






// Get the 2D rendering context


const canvas = Surface({w:800,h:600})
canvas.canvas.$parent(document.body)


var centerX = 800 / 2;
var centerY = 600 / 2;

const square = {
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
}

const circle = {
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
}

const element = canvas.add(circle)
const element2 = canvas.add(square)


document.addEventListener("mousemove",e=>{
    if(element.pointOnShape({x:e.offsetX,y:e.offsetY}))
    {
        circle.backgroundColor = "#cff"
    }
    else
    {
        circle.backgroundColor = "#ffc"
    }
    if(element2.pointOnShape({x:e.offsetX,y:e.offsetY}))
    {
        square.backgroundColor = "#cff"
    }
    else
    {
        square.backgroundColor = "#ffc"
    }
    canvas.update()
    
})

// const canvas2 = Surface({w:800,h:600})

// canvas2.drawSurface({
//     surface:canvas,
//     x:0,
//     y:0,
// })
// canvas2.canvas.$parent(document.body)
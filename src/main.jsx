import "./style.css"
import { Surface } from "./surface/surface"






// Get the 2D rendering context


const surface = Surface({w:800,h:600})


// document.body.appendChild(surface.canvas)


var centerX = 800 / 2;
var centerY = 600 / 2;

surface.beguinTransaction()


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
    segments:[
        {
            x: 300,
            y: 100,
        },
        {
            x: 400,
            y: 200,
        },
        {
            x: 500,
            y: 100,
        }
    ],
    w:10
})

const curve = surface.add({
    type: "curve",
    backgroundColor: "#ffc",
    border: {
        thickness: 1,
        color: "black",
    },
    segments:[
        {
            px: 20,
            py: 20,
            hx: 100,
            hy: 20,
        },
        {
            px: 100,
            py: 100,
            hx: 100,
            hy: 100,
        },
        {
            px: 200,
            py: 200,
            hx: 100,
            hy: 200,
        }
    ],
    w:10
})




const circleHelper = useHelper(circle)
const squareHelper = useHelper(square)
const lineHelper = useHelper(line)
const curveHelper = useHelper(curve)

surface.endTransaction()

const surface2 = Surface({w:800,h:600, canvas:<canvas></canvas>})

surface2.add({
    surface,
    x:100,
    y:100,
})
surface2.canvas.$parent(document.body)

document.addEventListener("mousemove",e=>{

    surface.beguinTransaction()

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

    circleHelper(e)
    squareHelper(e)
    lineHelper(e)
    curveHelper(e)

    surface.endTransaction()
})

function useHelper(element)
{
    const helper = surface.add({
        type: "ellipse",
        backgroundColor: "#f00",
        border: {
            thickness: 1,
            color: "black"
        },
        x: centerX,
        y: centerY,
        w: 10,
        h: 10,
        cx:5,
        cy:5,
        layer:1
    })
    return function(e)
    {
        const {x,y} = element.getClosestPoint({x:e.offsetX,y:e.offsetY})
        helper.x = x
        helper.y = y
    }
}



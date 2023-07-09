import "./style.css"
import { Surface } from "super-canvas"

const tips = 
<div>
    <p>Hover over the shapes to highlight them</p>
    <p>The red dot is the closest point in the edge of the shape to the mouse position </p>
</div>
tips.$parent(document.body)


const surface = Surface({w:800,h:600})

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

const shape = surface.add({
    type: "shape",
    backgroundColor: "#ffc",
    border: {
        thickness: 1,
        color: "black",
    },
    segments:[
        {
            x: 300,
            y: 20,
        },
        {
            x: 400,
            y: 100,
        },
        {
            x: 500,
            y: 20,
        }
        ,
        {
            x: 400,
            y: 50,
        }
    ],
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
    cap: "square",
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
            x: 20,
            y: 20,
            hx: 100,
            hy: 20,
        },
        {
            x: 100,
            y: 100,
            hx: 100,
            hy: 100,
        }
    ],
    cap: "square",
    w:10
})

const text = surface.add({
    // mandatory
    type: "text",
    text: "hello",  // text
    x:100, // X coordinate
    y:200, // Y coordinate
    // optional
    font: "Arial", // font
    fontSize: 50, // font size (pt)
    verticalAlign: "center", // top | center | bottom
    horizontalAlign: "center",  // start | center | end
    backgroundColor: "#ffc",
    border: {
        thickness: 1,
        color: "black",
    },
})

const circleHelper = useHelper(circle)
const squareHelper = useHelper(square)
const lineHelper = useHelper(line)
const curveHelper = useHelper(curve)
const shapeHelper = useHelper(shape)
const textHelper = useHelper(text)

surface.endTransaction()

const surface2 = Surface({w:800,h:600, canvas:<canvas></canvas>})

surface2.add({
    surface,
    x:100,
    y:100,
})

surface2.canvas.$parent(document.body)

surface2.canvas.addEventListener("mousemove",e=>{

    surface.beguinTransaction()

    hoverColor(e,square)
    hoverColor(e,line)
    hoverColor(e,curve)
    hoverColor(e,shape)
    hoverColor(e,circle)
    hoverColor(e,text)

    circleHelper(e)
    squareHelper(e)
    lineHelper(e)
    curveHelper(e)
    shapeHelper(e)
    textHelper(e)

    surface.endTransaction()
})

function useHelper(element)
{
    const helper = surface.add({
        type: "ellipse",

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
        surface.beguinTransaction()
        helper.backgroundColor = "#f00"
        helper.border = {
            thickness: 1,
            color: "black"
        }
        const {x,y} = element.getClosestPoint({x:e.offsetX,y:e.offsetY})
        helper.x = x
        helper.y = y
        surface.endTransaction()
    }
}

function hoverColor(e, shape)
{
    if(shape.pointOnShape({x:e.offsetX,y:e.offsetY}))
    {
        shape.backgroundColor = "#cff"
    }
    else
    {
        shape.backgroundColor = "#ffc"
    }
}
import "./style.css"
import { Surface } from "super-canvas"

const tips = 
<div>
    <p>Hover over the shapes to highlight them</p>
    <p>The blue dot is the closest point in the edge of the shape to the mouse position </p>
</div>
tips.$parent(document.body)


const surface = Surface({w:900,h:600, canvas:<canvas></canvas>})
surface.canvas.$parent(document.body)

var centerX = 800 / 2;
var centerY = 600 / 2;

// const surface2 = Surface({w:800,h:600, canvas:<canvas></canvas>})

// surface2.add({
//     surface,
//     x:100,
//     y:100,
// })

// surface2.canvas.$parent(document.body)

surface.beginTransaction()




const square = surface.add({
    type: "rect",
    backgroundColor: "#BF4F51",
    border: {
        thickness: 3,
        color: "black",
        radius:10,
    },
    x: 100,
    y: 100,
    w: 100,
    h: 100,
})

const shape = surface.add({
    type: "shape",
    backgroundColor: "#BF4F51",
    border: {
        thickness: 3,
        color: "black",
    },
    x:300,
    y:100,
    segments:[
        {
            x: 0,
            y: 0,
        },
        {
            x: 100,
            y: 80,
        },
        {
            x: 200,
            y: 0,
        }
        ,
        {
            x: 100,
            y: 30,
        }
    ],
})

const line = surface.add({
    type: "line",
    backgroundColor: "#BF4F51",
    border: {
        thickness: 3,
        color: "black",
    },
    x:600,
    y:100,
    segments:[
        {
            x: 0,
            y: 0,
        },
        {
            x: 100,
            y: 100,
        },
        {
            x: 200,
            y: 0,
        }
    ],
    cap: "square",
    w:10
})

const curve = surface.add({
    type: "curve",
    backgroundColor: "#BF4F51",
    border: {
        thickness: 3,
        color: "black",
    },
    x:100,
    y:300,
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
    x:350, // X coordinate
    y:320, // Y coordinate
    // optional
    font: "Arial", // font
    fontSize: 50, // font size (pt)
    verticalAlign: "bottom", // top | center | bottom
    horizontalAlign: "start",  // start | center | end
    backgroundColor: "#BF4F51",
    border: {
        thickness: 3,
        color: "black",
    },
})

const circle = surface.add({
    type: "ellipse",
    backgroundColor: "#BF4F51",
    border: {
        thickness: 3,
        color: "black"
    },
    x: 650,
    y: 300,
    w: 100,
    h: 100,
})

const circleHelper = useHelper(circle)
const squareHelper = useHelper(square)
const lineHelper = useHelper(line)
const curveHelper = useHelper(curve)
const shapeHelper = useHelper(shape)
const textHelper = useHelper(text)

surface.endTransaction()



surface.canvas.addEventListener("mousemove",e=>{

    surface.beginTransaction()

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
        helper.backgroundColor = "#59CBE8"
        helper.border = {
            thickness: 2,
            color: "black"
        }
        const {x,y} = element.getClosestPoint({x:e.offsetX,y:e.offsetY})
        helper.x = x
        helper.y = y
    }
}

function hoverColor(e, shape)
{
    if(shape.pointOnShape({x:e.offsetX,y:e.offsetY}))
    {
        shape.backgroundColor = "#78BE21"
    }
    else
    {
        shape.backgroundColor = "#BF4F51"
    }
}
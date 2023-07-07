import { UseEllipse } from "./shapes/ellipse"
import { useRect } from "./shapes/round-rect"
import { Reactive } from "./lib/reactive"
export { Surface }

const shapeDict = {
    rect: useRect(),
    ellipse: UseEllipse()
}

function Surface({w,h})
{
    const canvas = document.createElement("canvas")
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext("2d");

    const children = []

    function add(data)
    {
        if(data.surface)
        {
            return addSurface(children, ctx, data)
        }
        return addShape(children, ctx, data, update)
    }

    function update()
    {
        ctx.clearRect(0,0,w,h)
        for(const shape of children)
        {
            shape()
        }
    }

    return {canvas, ctx, add, update}
}
function addSurface(children,ctx,data)
{
    function draw()
    {
        drawImage(ctx, data)
    }
    draw()
    children.push(draw)
}

function addShape(children,ctx,data, update)
{
    const shape = shapeDict[data.shape]
    function draw()
    {
        drawShape(ctx, data, shape.draw)
    }
    draw()

    children.push(draw)

    function pointOnShape({x,y})
    {
        return shape.pointOnShape({px:x,py:y,...data})
    }
    data.pointOnShape = pointOnShape

    return Reactive(update,data)

}

function drawImage(ctx, {surface,x=0,y=0,w,h})
{
    if(w != null && h != null)
    {
        ctx.drawImage(surface.canvas,x,y,w,h);
    }
    else
    {
        ctx.drawImage(surface.canvas,x,y);
    }
}

function drawShape(ctx, data, callback)
{
    let fill = false;
    let stroke = false;
    const backgroundColor = data.backgroundColor
    const border = data.border 

    if(backgroundColor != null)
    {
        fill = true;
        ctx.fillStyle = backgroundColor
    }
    if(border != null)
    {
        const {thickness, color} = border
        if(thickness != null && color != null)
        {
            stroke = true
            ctx.lineWidth = thickness;
            ctx.strokeStyle = color;
        }
    }

    callback(ctx, data)

    if(fill)
    {
        ctx.fill()
    }
    if(stroke)
    {
        ctx.stroke()
    }
}
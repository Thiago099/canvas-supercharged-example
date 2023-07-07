import { Ellipse } from "./shapes/ellipse"
import { RoundRect } from "./shapes/round-rect"
export { Surface }


function Surface({w,h})
{
    const canvas = <canvas></canvas> 
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext("2d");
    function drawEllipse(data)
    {
        _shape(ctx, data, Ellipse)
    }

    function drawRect(data)
    {
        _shape(ctx, data, RoundRect)
    }

    function drawSurface(data)
    {
        _image(ctx, data)
    }

    return {canvas, ctx, drawEllipse, drawRect, drawSurface}
}

function _image(ctx, {surface,x=0,y=0,w,h})
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
function _shape(ctx, data, callback)
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
        stroke = true
        const {thickness, color} = border
        ctx.lineWidth = thickness;
        ctx.strokeStyle = color;
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
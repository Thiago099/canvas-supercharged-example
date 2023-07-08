import { Reactive } from "./reactive"
import { drawImage, drawShape, drawLine } from "./basic-functionality"
import { UseEllipse } from "../shapes/ellipse"
import { useRect } from "../shapes/round-rect"
import { useLine } from "../shapes/line"
import { useCurve } from "../shapes/curve"

export { addShape, addSurface }


const shapeDict = {
    rect: useRect(),
    ellipse: UseEllipse()
}
const lineDict = {
    line: useLine(),
    curve: useCurve()
}


function addSurface(children, parents,ctx,data, {properties:{w, h},update})
{
    const { surface:child, w:cw, h:ch, x, y } = data
    child.properties.offset.w = w / cw
    child.properties.offset.h = h / ch
    child.properties.offset.x = x
    child.properties.offset.y = y
    child.properties.parents.push(update)

    function draw()
    {
        drawImage(ctx, data, parents)
    }
    draw()
    children.push(draw)
}

function addShape(children,ctx,data, update,offset)
{
    let entity
    if(data.type in shapeDict)
    {
        entity = useDrawShape(ctx,data)
    }
    else
    {
        entity = useDrawLine(ctx, data)
    }

    children.push(entity.draw)

    function pointOnShape({x,y})
    {
        return entity.shape.pointOnShape({px:(x-offset.x)*offset.w,py:(y-offset.y)*offset.h,...data})
    }
    data.pointOnShape = pointOnShape

    return Reactive(update, data)
}


function useDrawShape(ctx, data)
{
    const shape = shapeDict[data.type]
    function draw()
    {
        drawShape(ctx, data, shape.draw)
    }
    draw()
    return {draw,shape}
}

function useDrawLine(ctx, data)
{
    const shape = lineDict[data.type]
    function draw()
    {
        drawLine(ctx, data, shape.draw)
    }
    draw()

    return {draw,shape}
}
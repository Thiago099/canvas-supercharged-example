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
    const { surface:child, w:cw, h:ch } = data
    child.properties.ratio.w = w / cw
    child.properties.ratio.h = h / ch
    child.properties.parents.push(update)

    function draw()
    {
        drawImage(ctx, data, parents)
    }
    draw()
    children.push(draw)
}

function addShape(children,ctx,data, update,ratio)
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
        return entity.shape.pointOnShape({px:x*ratio.w,py:y*ratio.h,...data})
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
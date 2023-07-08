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
    if(cw != null && ch != null)
    {
        child.properties.offset.w = child.properties.w / cw
        child.properties.offset.h = child.properties.h / ch
    }
    child.properties.offset.x = x
    child.properties.offset.y = y
    child.properties.parents.push(update)

    function draw()
    {
        drawImage(ctx, data, parents)
    }
    children.push({draw, layer:data.layer})
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

    children.push({draw:entity.draw, layer:data.layer})

    function getProps({x,y})
    {
        return {px:(x-offset.x)*offset.w,py:(y-offset.y)*offset.h,...data}
    }

    function pointOnShape(props)
    {
        return entity.shape.pointOnShape(getProps(props))
    }
    function getClosestPoint(props)
    {
        return entity.shape.getClosestPoint(getProps(props))
    }
    data.pointOnShape = pointOnShape
    data.getClosestPoint = getClosestPoint

    return Reactive(update, data)
}


function useDrawShape(ctx, data)
{
    const shape = shapeDict[data.type]
    function draw()
    {
        const dt = {...data}
        if(dt.cx != null)
        {
            dt.x -= dt.cx
        }
        if(dt.cy != null)
        {
            dt.y -= dt.cy
        }
        drawShape(ctx, dt, shape.draw)
    }
    return {draw,shape}
}

function useDrawLine(ctx, data)
{
    const shape = lineDict[data.type]
    function draw()
    {
        drawLine(ctx, data, shape.draw)
    }
    return {draw,shape}
}
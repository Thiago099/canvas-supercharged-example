import { UseEllipse } from "./shapes/ellipse"
import { useRect } from "./shapes/round-rect"

import { addShape,addSurface } from "./lib/add-methods"
export { Surface }


function Surface({w,h})
{
    const canvas = document.createElement("canvas")
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext("2d");

    const ratio = {w:1,h:1}

    const children = []
    const parents = []

    var result = {canvas, ctx, add, update, properties:{parents,w,h,ratio}}

    function add(data)
    {
        if(data.surface)
        {

            return addSurface(children, parents, ctx, data, result)
        }
        return addShape(children, ctx, data, update, ratio)
    }

    function update()
    {
        ctx.clearRect(0,0,w,h)
        for(const shape of children)
        {
            shape()
        }
        for(const surface of parents)
        {
            surface()
        }
    }
    return result
}



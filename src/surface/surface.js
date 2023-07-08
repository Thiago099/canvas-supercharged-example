import { UseEllipse } from "./shapes/ellipse"
import { useRect } from "./shapes/round-rect"

import { addShape,addSurface } from "./lib/add-methods"
export { Surface }


function Surface({w,h, canvas = null})
{
    if(canvas == null)
    {
        canvas = document.createElement("canvas")
    }
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext("2d");

    const offset = {w:1, h:1, x:0, y:0}

    const children = []
    const parents = []

    var obj = {canvas, ctx, add, update, beguinTransaction, endTransaction, properties:{parents,w,h,offset}}

    var isOnTransaction = false

    function beguinTransaction()
    {
        isOnTransaction = true;
    }

    function endTransaction()
    {
        isOnTransaction = false
        update()
    }

    function add(data)
    {
        let result
        if(!data.layer) data.layer = 0
        if(data.surface)
        {
            result = addSurface(children, parents, ctx, data, obj)
            update()
            return result
        }
        result = addShape(children, ctx, data, update, offset)
        update()
        return result
    }

    function update()
    {
        if(isOnTransaction) return
        ctx.clearRect(0,0,w,h)
        for(const shape of children.sort((a,b)=> a.layer - b.layer))
        {
            shape.draw()
        }
        for(const surface of parents)
        {
            surface()
        }
    }
    return obj
}



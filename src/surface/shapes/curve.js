import { calculateDistance } from "./lib/helper";
import closestPoint from "closest-point-on-bezier";
export { useCurve }
function useCurve()
{
    function draw(ctx, {segments})
    {
        ctx.beginPath();
        const {x:p1x, y:p1y, hx:h1x, hy:h1y} = segments[0]
        const {x:p2x, y:p2y, hx:h2x, hy:h2y} = segments[1]
        ctx.moveTo(p1x, p1y);
        ctx.bezierCurveTo(h1x, h1y, h2x, h2y, p2x, p2y);
        for(var i = 1; i < segments.length-1; i ++)
        {
            const {x:cx,y:cy,hx:chx,hy:chy} = segments[i]
            const {x:nx,y:ny,hx:nhx,hy:nhy} = segments[i+1]
            ctx.moveTo(cx, cy);
            const {x,y} = reverse(cx, cy,chx, chy)
            ctx.bezierCurveTo(x, y, nhx, nhy, nx, ny);
        }
            
    }

    function pointOnShape({px,py,segments, w}) {
        const {x:p1x, y:p1y, hx:h1x, hy:h1y} = segments[0]
        const {x:p2x, y:p2y, hx:h2x, hy:h2y} = segments[1]
        const {relative_position, absolute_point:{x,y}} = closestPoint(
            [
                {x:p1x,y:p1y},
                {x:h1x,y:h1y},
                {x:h2x,y:h2y},
                {x:p2x,y:p2y},
            ],
            {x:px,y:py}
        )
        if(calculateDistance(x,y,px,py) < w / 2)
        {
            return true
        }
        for(var i = 1; i < segments.length-1; i ++)
        {
            const {x:cx,y:cy,hx:chx,hy:chy} = segments[i]
            const {x:nx,y:ny,hx:nhx,hy:nhy} = segments[i+1]
            const {x:zx,y:zy} = reverse(cx, cy,chx, chy)
            const {relative_position, absolute_point:{x,y}} = closestPoint(
                [
                    {x:cx,y:cy},
                    {x:zx,y:zy},
                    {x:nhx,y:nhy},
                    {x:nx,y:ny},
                ],
                {x:px,y:py}
            )
            if(calculateDistance(x,y,px,py) < w / 2)
            {
                return true
            }
        }
    }

    function getClosestPoint({px,py,segments, w})
    {
        const {x:p1x, y:p1y, hx:h1x, hy:h1y} = segments[0]
        const {x:p2x, y:p2y, hx:h2x, hy:h2y} = segments[1]
        let { absolute_point } = closestPoint(
            [
                {x:p1x,y:p1y},
                {x:h1x,y:h1y},
                {x:h2x,y:h2y},
                {x:p2x,y:p2y},
            ],
            {x:px,y:py}
        )
        let dist = calculateDistance(absolute_point.x,absolute_point.y,px,py)
        for(var i = 1; i < segments.length-1; i ++)
        {
            const {x:cx,y:cy,hx:chx,hy:chy} = segments[i]
            const {x:nx,y:ny,hx:nhx,hy:nhy} = segments[i+1]
            const {x:zx,y:zy} = reverse(cx, cy,chx, chy)
            const {absolute_point:newPoint} = closestPoint(
                [
                    {x:cx,y:cy},
                    {x:zx,y:zy},
                    {x:nhx,y:nhy},
                    {x:nx,y:ny},
                ],
                {x:px,y:py}
            )
            const newDist = calculateDistance(newPoint.x,newPoint.y,px,py)
            if(newDist < dist)
            {
                dist = newDist
                absolute_point = newPoint
            }
        }
        return absolute_point
    }

    return { draw, pointOnShape, getClosestPoint }
}

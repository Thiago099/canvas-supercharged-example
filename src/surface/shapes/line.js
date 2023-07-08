import { calculateDistance, closestPointOnLine } from "./lib/helper"
export { useLine }
function useLine()
{
    function draw(ctx, {segments})
    {
        ctx.beginPath()
        ctx.moveTo(segments[0].x,segments[0].y)
        for(var i = 1; i < segments.length; i++)
        {
          const {x,y} = segments[i]
          ctx.lineTo(x,y)
        }
    }

    function pointOnShape({px, py, segments, w}) {
      for(var i = 0; i < segments.length-1; i+=1)
      {
        const {x:x1,y:y1} = segments[i]
        const {x:x2,y:y2} = segments[i+1]
        const point = closestPointOnLine(px,py,x1,y1,x2,y2)
        if(calculateDistance(point.x, point.y, px, py)< w/2)
        {
          return true
        }
      }
      return false
    }
    
    function getClosestPoint({px, py, segments})
    {
      let point = null
      let distance = null
      for(var i = 0; i < segments.length-1; i+=1)
      {
        const {x:x1,y:y1} = segments[i]
        const {x:x2,y:y2} = segments[i+1]
        const currentPoint = closestPointOnLine(px,py,x1,y1,x2,y2)
        const currentDistance = calculateDistance(currentPoint.x, currentPoint.y, px, py);

        if(distance == null || currentDistance < distance)
        {
          point = currentPoint
          distance = currentDistance
        }
      }
      return point
    }

    return { draw, pointOnShape, getClosestPoint }
}



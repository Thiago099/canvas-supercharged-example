import { closestPointOnLine, calculateDistance } from "./lib/helper"
export { useShape }
function useShape()
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
        ctx.closePath()
    }

    function pointOnShape({px, py, segments, w})  
    {
      let isInside = false;

      for (let i = 0, j = segments.length - 1; i < segments.length; j = i++) {
        const xi = segments[i].x;
        const yi = segments[i].y;
        const xj = segments[j].x;
        const yj = segments[j].y;

        const intersect =
          yi > py !== yj > py &&
          px < ((xj - xi) * (py - yi)) / (yj - yi) + xi;

        if (intersect) {
          isInside = !isInside;
        }
      }

      return isInside;
    }

    
    function getClosestPoint({px, py, segments})
    {
      let minDistance = Infinity;
      let closestPoint = null;
      segments.push(segments[0])
      
      for (let i = 0; i < segments.length-1; i+=1) {
        const {x:x1,y:y1} = segments[i]
        const {x:x2,y:y2} = segments[i+1]
        const point = closestPointOnLine(px,py,x1,y1,x2,y2);
        const distance = calculateDistance(px,py,point.x,point.y)
      
        if (distance < minDistance) {
          minDistance = distance;
          closestPoint = point;
        }
      }

      return closestPoint
      
    }

    return { draw, pointOnShape, getClosestPoint }
}

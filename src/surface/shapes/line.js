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


function closestPointOnLine(px, py, x1, y1, x2, y2) {
    // Calculate the length of the line segment
    var lineLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    
    // Calculate the normalized direction vector of the line
    var dx = (x2 - x1) / lineLength;
    var dy = (y2 - y1) / lineLength;
    
    // Calculate the vector from the starting point of the line to the mouse position
    var vectorFromStart = { x: px - x1, y: py - y1 };
    
    // Calculate the dot product of the vector from the starting point to the mouse
    // position and the direction vector of the line
    var dotProduct = vectorFromStart.x * dx + vectorFromStart.y * dy;
    
    // Clamp the dot product between 0 and the length of the line segment
    dotProduct = Math.max(0, Math.min(dotProduct, lineLength));
    
    // Calculate the closest point on the line to the mouse position
    var closestPointX = x1 + dotProduct * dx;
    var closestPointY = y1 + dotProduct * dy;
    return { x: closestPointX, y: closestPointY };
  }

  
function calculateDistance(x1, y1, x2, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    var distance = Math.sqrt(dx * dx + dy * dy);
    return distance;
  }
  
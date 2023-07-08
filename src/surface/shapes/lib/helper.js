
export {calculateDistance, closestPointOnLine, reverse}

function calculateDistance(x1, y1, x2, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    var distance = Math.sqrt(dx * dx + dy * dy);
    return distance;
}


function reverse(cx,cy,x,y)
{
  return {x:(x-cx)*-1+cx, y:(y-cy)*-1+cy}
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
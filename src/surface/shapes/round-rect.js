export { useRect }
function useRect()
{
  function draw(
    ctx,
    {x,
    y,
    w,
    h,
    border:{radius}},
  )
  {
    if(radius == 0 || radius == null)
    {
      ctx.beginPath();
      ctx.rect(x,y,w,h)
      return
    }else if (typeof radius === 'number') {
      radius = {tl: radius, tr: radius, br: radius, bl: radius};
    } else {
      radius = {...{tl: 0, tr: 0, br: 0, bl: 0}, ...radius};
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + w - radius.tr, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius.tr);
    ctx.lineTo(x + w, y + h - radius.br);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius.br, y + h);
    ctx.lineTo(x + radius.bl, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  }

  function pointOnShape({px, py,x,y,w,h}){
    return px >= x && px <= x + w && py >= y && py <= y + h
  }

  function getClosestPoint({px, py, x, y, w, h}) {
    // Check if the point is inside the square
    if (px >= x && px <= x + w && py >= y && py <= y + h) {
      const leftDistance = px - x;
      const rightDistance = x + w - px;
      const topDistance = py - y;
      const bottomDistance = y + h - py;
  
      const minDistance = Math.min(leftDistance, rightDistance, topDistance, bottomDistance);
  
      if (minDistance === leftDistance) {
        return { x: x, y: py }; // Closest point on the left edge
      } else if (minDistance === rightDistance) {
        return { x: x + w, y: py }; // Closest point on the right edge
      } else if (minDistance === topDistance) {
        return { x: px, y: y }; // Closest point on the top edge
      } else {
        return { x: px, y: y + h }; // Closest point on the bottom edge
      }
    }
  
    // Find the closest x-coordinate on the edge
    let closestX;
    if (px < x) {
      closestX = x; // Closest x-coordinate on the left edge
    } else if (px > x + w) {
      closestX = x + w; // Closest x-coordinate on the right edge
    } else {
      closestX = px; // Closest x-coordinate
    }
  
    // Find the closest y-coordinate on the edge
    let closestY;
    if (py < y) {
      closestY = y; // Closest y-coordinate on the top edge
    } else if (py > y + h) {
      closestY = y + h; // Closest y-coordinate on the bottom edge
    } else {
      closestY = py; // Closest y-coordinate
    }
  
    return { x: closestX, y: closestY };
  }
  
  
  
  return {draw, pointOnShape, getClosestPoint}
}



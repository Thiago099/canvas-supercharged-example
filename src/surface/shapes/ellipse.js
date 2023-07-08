export { UseEllipse }
function UseEllipse()
{
    function draw(ctx, {x, y, w,h})
    {
        w/=2
        h/=2
    
        ctx.beginPath();
        ctx.ellipse(x+w, y+h, w, h, 0, 0, 2 * Math.PI);
    }

    function pointOnShape({px, py,x,y,w,h}) {
        w/=2;
        h/=2;
        x+=w
        y+=h
        const dx = px - x;
        const dy = py - y;
        return ((dx * dx) / (w * w) + (dy * dy) / (h * h) <= 1);
      }

      function getClosestPoint({px, py,x,y,w,h}) {
        w/=2
        h/=2
        const centerX = x + w;
        const centerY = y + h;
        
        const dx = px - centerX;
        const dy = py - centerY;
        const angle = Math.atan2(dy, dx);
        const closestX = centerX + w * Math.cos(angle);
        const closestY = centerY + h * Math.sin(angle);
        
        return { x: closestX, y: closestY };
      }

    return {draw, pointOnShape, getClosestPoint}
}

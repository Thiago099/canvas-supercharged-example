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

    return {draw, pointOnShape}
}

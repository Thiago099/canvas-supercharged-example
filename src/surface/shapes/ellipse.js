export { Ellipse }

function Ellipse(ctx, {x, y, w,h})
{
    w/=2
    h/=2

    ctx.beginPath();
    ctx.ellipse(x+w, y+h, w, h, 0, 0, 2 * Math.PI);
    ctx.closePath();
}
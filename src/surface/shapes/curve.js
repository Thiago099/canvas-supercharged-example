import closestPoint from "closest-point-on-bezier";
export { useCurve }
function useCurve()
{
    function draw(ctx, {x1, y1, x2, y2, x3, y3, x4, y4})
    {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.bezierCurveTo(x2, y2, x3, y3, x4, y4);
    }

    function pointOnShape({px,py,x1, y1, x2, y2, x3, y3, x4, y4, w}) {
        const {relative_position, absolute_point:{x,y}} = closestPoint(
            [
                {x:x1,y:y1},
                {x:x2,y:y2},
                {x:x3,y:y3},
                {x:x4,y:y4}
            ],
            {x:px,y:py}
        )
        return calculateDistance(x,y,px,py) < w / 2
    }

    return { draw, pointOnShape }
}


function calculateDistance(x1, y1, x2, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    var distance = Math.sqrt(dx * dx + dy * dy);
    return distance;
  }
  
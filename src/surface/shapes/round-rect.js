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
  ) {
    if(radius == 0 || radius == null)
    {
      ctx.beginPath();
      ctx.rect(x,y,w,h)
      ctx.closePath();
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
    ctx.closePath();
  }
  function pointOnShape({px, py,x,y,w,h}){
    return px >= x && px <= x + w && py >= y && py <= y + h
  }
  return {draw, pointOnShape}
}
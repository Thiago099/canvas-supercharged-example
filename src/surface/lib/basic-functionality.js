export {drawImage, drawShape, drawLine}

function drawImage(ctx, {surface,x=0,y=0,w=null,h=null})
{
    if(w != null && h != null)
    {
        ctx.drawImage(surface.canvas,x,y,w,h);
    }
    else
    {
        ctx.drawImage(surface.canvas,x,y);
    }
}

function drawShape(ctx, data, callback)
{
    callback(ctx, data)

    const { backgroundColor } = data
    const { border } = data 


    if(backgroundColor != null)
    {
        ctx.fillStyle = backgroundColor
        ctx.fill()
    }
    if(border != null)
    {
        const {thickness, color} = border
        if(thickness != null && color != null)
        {
            ctx.lineWidth = thickness;
            ctx.strokeStyle = color;
        }
        ctx.stroke()
    }
}

function drawLine(ctx, data, callback)
{
    callback(ctx, data)
    ctx.lineCap = "round";
    const { backgroundColor } = data
    const { border } = data 
    const { w } = data

    if(border != null)
    {
        const { thickness, color } = border
        if(thickness != null && color != null)
        {

            ctx.lineWidth = thickness + w;
            ctx.strokeStyle = color;

            ctx.stroke()
        }
    }

    if(backgroundColor != null)
    {
        ctx.lineWidth = w;
        ctx.strokeStyle = backgroundColor
        ctx.stroke()
    }
}
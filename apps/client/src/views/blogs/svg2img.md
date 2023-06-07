# 关于`SVG`转成图片后使用画布绘制不显示的问题

---

> 使用`data:image/svg+xml;charset=utf-8,${encodeURIComponent(xml)}`方式将以下`svg`代码转换为图片`src`

```xml
<svg
    class="pptx-geometry--line"
    data-colors=""
    height="100%"
    preserveAspectRatio="xMinYMin meet"
    style="display: block"
    viewBox="-0.5 -0.5 1704.535433070866 1"
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
>
    <defs>
        <path
            id="path_602--357219331"
            d="M 0 0 L 1703.535433070866 0"
            stroke-dasharray="4,3"
            stroke-width="1"
            vector-effect="non-scaling-stroke"
        />
    </defs>
    <g>
        <g id="el_600--748942987">
            <use fill="none" stroke="rgba(0,0,0,1)" xlink:href="#path_602--357219331" />
        </g>
    </g>
</svg>
```

> 得到的图片实际高度为`0`  
> 手动将图片设为`1px`，图片的渲染高度将为`1px`，并且可以正常显示  
> 但是如果将图片作为图片源使用`canvas2d`绘制，得到的画布内容为空

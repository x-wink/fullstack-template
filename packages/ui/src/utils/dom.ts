/**
 * 创建内部可拖拽的容器，鼠标超出容器范围依然会触发拖拽
 * @param container 容器
 * @param cb 拖拽回调，参数为鼠标坐标xy，坐标值不会超出容器范围
 * @returns 注销可拖拽容器，取消监听事件
 */
export const createDragContainer = (container: HTMLElement, cb: (x: number, y: number) => void) => {
    let isDragging = false;
    const startDrag = (event: MouseEvent) => {
        if (container.contains(event.target as HTMLElement)) {
            event.preventDefault();
            isDragging = true;
            drag(event);
        }
    };
    const drag = (event: MouseEvent) => {
        if (isDragging) {
            const containerRect = container.getBoundingClientRect();
            const x = event.clientX - containerRect.left;
            const y = event.clientY - containerRect.top;

            cb(Math.min(Math.max(x, 0), containerRect.width), Math.min(Math.max(y, 0), containerRect.height));
        }
    };
    const stopDrag = () => {
        isDragging = false;
    };
    window.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', stopDrag);
    return () => {
        window.removeEventListener('mousedown', startDrag);
        window.removeEventListener('mousemove', drag);
        window.removeEventListener('mouseup', stopDrag);
    };
};
/**
 * 创建在可在容器范围内拖拽的元素，鼠标超出容器范围依然会触发拖拽
 * @param el 元素
 * @param container 容器
 * @param cb 拖拽回调，参数为鼠标坐标xy相对于容器宽高的值，相对值不会超出0~1范围
 * @returns 注销可拖拽元素，取消监听事件
 */
export const createDragableElement = (
    el: HTMLElement,
    container: HTMLElement,
    hooks: { start?: () => void; end?: () => void; move: (x: number, y: number) => void }
) => {
    let isDragging = false;
    const startDrag = (event: MouseEvent) => {
        event.preventDefault();
        isDragging = true;
        hooks.start?.();
    };
    const drag = (event: MouseEvent) => {
        if (isDragging) {
            const containerRect = container.getBoundingClientRect();
            const x = event.clientX - containerRect.left;
            const y = event.clientY - containerRect.top;

            hooks.move(
                Math.min(Math.max(x / containerRect.width, 0), 1),
                Math.min(Math.max(y / containerRect.height, 0), 1)
            );
        }
    };
    const stopDrag = () => {
        isDragging = false;
        hooks.end?.();
    };
    el.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', stopDrag);
    return () => {
        el.removeEventListener('mousedown', startDrag);
        window.removeEventListener('mousemove', drag);
        window.removeEventListener('mouseup', stopDrag);
    };
};

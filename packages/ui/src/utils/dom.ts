export const createDragContainer = (container: HTMLElement, cb: (x: number, y: number) => void): void => {
    let isDragging = false;
    const startDrag = (event: MouseEvent) => {
        if (container.contains(event.target as HTMLElement)) {
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
};

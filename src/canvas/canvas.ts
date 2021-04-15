export const drawToCanvas = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, image: HTMLImageElement): void => {
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0, image.width, image.height);
}
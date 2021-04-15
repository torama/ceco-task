import { drawToCanvas } from "../canvas/canvas";
import { convertPixelsToUint8ClampedArray, convertUint8ClampedArrayToPixelData, substractIdenticalPixelsAndRemoveShadows } from "../pixel-data/pixel-conversion";
import { calculatePixelVolume } from "../pixel-data/pixel-data";
import { RGBA } from "../pixel-data/rgba";
import { store, volumeAdded, volumeSelected } from "../store/store";
import { Nullable } from "../types/nullable";

/**
 * Helps with loading images. This is a workaroud to prevent a callback based 
 * structure of loading images. The calling asynchronous function is able to
 * use the await keyword to wait for the image.
 * 
 * Optimally loading images and calculating the results should be stateless
 * and store driven.
 * 
 * @param img Image element with prefilled src attribute
 */
export const loadImage = async (img: HTMLImageElement) => {
    return new Promise((resolve, reject) => {
        img.onload = async () => {
            resolve(true);
        }
    })
}

/**
 * Compares two images and renders the result in a canvas.
 * The resulting volume will be added to to store for comparison.
 * 
 * Beware: the images to test need to be hosted on the same domain or cross origin restrictions 
 * will come into effect.
 * 
 * @fires volumeAdded will be dispatched after the volume of the resulting image has been calculated
 * 
 * @param testImageUrl relative url to the testimage.
 * @param controlImageUrl relative url to the controlimage.
 */
export const compareImage = async (testImageUrl: string, controlImageUrl: string) => {
    const section: HTMLElement = document.createElement("section");
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    const controlCanvas: HTMLCanvasElement = document.createElement("canvas");
    const resultCanvas: HTMLCanvasElement = document.createElement("canvas");
    
    const context: Nullable<CanvasRenderingContext2D> = canvas.getContext("2d");
    const controlContext: Nullable<CanvasRenderingContext2D> = controlCanvas.getContext("2d");
    const resultContext: Nullable<CanvasRenderingContext2D> = resultCanvas.getContext("2d");

    const relativeVolumeContainer: HTMLDivElement = document.createElement("div");
    relativeVolumeContainer.classList.add("volume-container");

    if(context && controlContext && resultContext) {
        
        context.fillRect(0, 0, canvas.width, canvas.height);

        const image: HTMLImageElement = new Image();
        image.src = testImageUrl;
        await loadImage(image);
        drawToCanvas(canvas, context, image);

        const controlImage: HTMLImageElement = new Image();
        controlImage.src = controlImageUrl;
        await loadImage(controlImage);
        drawToCanvas(controlCanvas, controlContext, controlImage);
        
        let pixels: RGBA[] = convertUint8ClampedArrayToPixelData(context.getImageData(0, 0, canvas.width, canvas.height).data);
        let controlPixels: RGBA[] = convertUint8ClampedArrayToPixelData(controlContext.getImageData(0, 0, canvas.width, canvas.height).data);
        let resultPixels: RGBA[] = substractIdenticalPixelsAndRemoveShadows(pixels,controlPixels);

        resultCanvas.width = image.width;
        resultCanvas.height = image.height;
        resultContext.putImageData(new ImageData(convertPixelsToUint8ClampedArray(resultPixels), image.width, image.height), 0, 0);

        let pixelVolume: number = calculatePixelVolume(resultPixels);

        store.subscribe(() => {
            let currentVolume = store.getState().selectedVolume;
            relativeVolumeContainer.innerHTML = `${Math.round(100 * (pixelVolume / currentVolume)).toString()}%`;
        });

        store.dispatch(volumeAdded(pixelVolume));
        store.dispatch(volumeSelected(pixelVolume));
        selectSection(section);

        section.addEventListener("mouseover", (e: MouseEvent) => {
            store.dispatch(volumeSelected(pixelVolume));
            selectSection(section);
        });

        section.appendChild(resultCanvas);
        section.appendChild(relativeVolumeContainer);
        document.body.appendChild(section);
    }
    else {
        console.error("Context not found!");
    }
}

const selectSection = (section: HTMLElement) => {
        /**
         * That's a bit messy, but a last minute graphical overhaul I wanted to implement
         * to make mousehovering more clear. This could have been resolved using the store
         * and proper components :)
         */
        document.querySelectorAll("section").forEach(sect => {
            sect.classList.remove("selected");
        })
        section.classList.add("selected");
}
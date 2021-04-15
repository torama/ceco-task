import { TRANSPARENT_PIXEL } from "./pixel-data";
import { RGBA } from "./rgba";

/**
 * Converts an array containing RGBA pixels into an Uint8ClampedArray that can be converted into ImageData.
 * 
 * @param pixels PixelArray containing RGBA values
 */
export const convertPixelsToUint8ClampedArray = (pixels: RGBA[]): Uint8ClampedArray => {
    let imageData: number[] = [];

    /**
     * The Uint8ClampedArray contains a list of color values clamped at 255. Every 4 color values 
     * represent the r, g, b and a values of a pixel. Those values will be pushed in order to the 
     * array.
     */
    pixels.forEach((pixel:RGBA) => {
        imageData.push(pixel.r);
        imageData.push(pixel.g);
        imageData.push(pixel.b);
        imageData.push(pixel.a);
    });

    return new Uint8ClampedArray(imageData);
}

/**
 * Converts an Uint8ClampedArray to a RGBA Array.
 * 
 * @param context 2D rendering context of the canvas element
 * @param width Width of the bounding box the pixels have to be extracted from
 * @param height Height of the bounding box the pixels have to be extracted from
 */
export const convertUint8ClampedArrayToPixelData = (canvasImageData: Uint8ClampedArray): RGBA[] => {
    let pixels: RGBA[] = [];

    /**
     * The Uint8ClampedArray contains a list of color values clamped at 255. Every 4 color values 
     * represent the r, g, b and a values of a pixel.
     */
    for (let i = 3; i <= canvasImageData.length; i += 4) {
        pixels.push({
            r: canvasImageData[i-3],
            g: canvasImageData[i-2],
            b: canvasImageData[i-1],
            a: canvasImageData[i]
        });
    }
    return pixels;
}

/**
 * Checks if 2 pixels are identical by comparing their respective r,g,b and a values.
 * 
 * @param a First pixel
 * @param b Pixel to check against
 */
export const pixelEquals = (a: RGBA, b: RGBA): boolean => {
    return a.a == b.a && a.r == b.r && a.g == b.g && a.a == b.a;
}

/**
 * Removes identical pixels between the test image and the control image. 
 * The shadows (absolute black values) will be removed, too.
 * 
 * @param testImagePixels RGBA[] of the test image
 * @param controlImagePixels RGBA[] of the control image
 */
export const substractIdenticalPixelsAndRemoveShadows = (testImagePixels: RGBA[], controlImagePixels: RGBA[]): RGBA[] => {
    return testImagePixels.map((pixel: RGBA, index: number):RGBA => {
        /** Remove pixels of the control image that are identical to the testimage. 
         * After that, the shadows need to be removed because they would add
         * a lot of value to the volume later. The problem here is, that removing the shadow
         * also removes underlying structure of the object, that is obstructed by the shadow.
         * To fix that, an algorithm to check the biggest connected outline in the resulting
         * image should be implemented and only the volume included in that outline should be 
         * used for the calculation. The shadows on the volume itself should be narrowed down
         * using a median between the pixels right next to the shadow. This would increase
         * precision but would still only be an estimation.
         */
        return pixelEquals(pixel, controlImagePixels[index]) ? TRANSPARENT_PIXEL 
            : pixel.r == 0 && pixel.g == 0 && pixel.b == 0 ? TRANSPARENT_PIXEL : pixel;
    });
}
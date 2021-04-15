import { RGBA } from "./rgba";

export const TRANSPARENT_PIXEL: RGBA = {
    r: 0,
    g: 0,
    b: 0,
    a: 0
}

/**
 * Calculates the volume of an image depending on the pixel values. 
 * @param pixels Array of opaque RGBA values.
 */
export const calculatePixelVolume = (pixels: RGBA[]): number => {
    let volume: number = 0;
    pixels.forEach((pixel:RGBA) => {
        /**
         * If the pixel has an alpha value of 255, we consider it in our calculation.
         * As long as only bmp images are compared, this indicator should be enough.
         */
        if(pixel.a === 255) {
            /**
             * Darker areas are higher up in the image, therefore the volume of
             * the object must be higher where darker pixels are present.
             * The closer one of the color values of the pixel gets to 255,
             * the brighter it gets and the smaller the volume is on that specific 
             * location. Therefore the value get's substracted from 255 to reverse 
             * it's power.
             */
            let rValue: number = 255 - pixel.r;
            let gValue: number = 255 - pixel.g;
            let bValue: number = 255 - pixel.b;
            volume += rValue += gValue += bValue;
        }
    })
    return volume;
}
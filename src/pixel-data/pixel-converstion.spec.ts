import { convertPixelsToUint8ClampedArray, convertUint8ClampedArrayToPixelData } from "./pixel-conversion"
import { RGBA } from "./rgba";

const  pixels: RGBA[] = [
    {
        r: 0,
        g: 0,
        b: 0,
        a: 0
    },
    {
        r: 255,
        g: 255,
        b: 255,
        a: 50
    }
];

const pixelArray: number[] = [
    0,0,0,0,255,255,255,50
];

/**
 * Just a few tests. Unfortunately there is not much time for 
 * a lot of them :(
 */
test("pixel-to-uint8-conversion", () => {
    expect(convertPixelsToUint8ClampedArray(pixels)).toEqual(new Uint8ClampedArray(pixelArray));
});

test("uint-to-pixel-conversion", () => {
    expect(convertUint8ClampedArrayToPixelData(new Uint8ClampedArray(pixelArray))).toEqual(pixels);
});
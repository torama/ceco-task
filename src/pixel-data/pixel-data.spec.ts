import { calculatePixelVolume } from "./pixel-data"
import { RGBA } from "./rgba";

const  pixels: RGBA[] = [
    {
        r: 0,
        g: 0,
        b: 0,
        a: 255
    },
    {
        r: 255,
        g: 255,
        b: 255,
        a: 255
    }
];

/**
 * Another simple test, just to have another testsuite :D
 */
test("pixel-volume-calculation", () => {
    expect(calculatePixelVolume(pixels)).toEqual(765);
})
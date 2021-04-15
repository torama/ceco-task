import { compareImage } from "./image/image";

interface TestImage {
    test: string,
    control: string
}

/**
 * Add new Images here if you want, they will be added to 
 * the store and calculated.
 */
const images: TestImage[] = [
    {test:"data/Z25777766_Depth.bmp", control:"data/Z25777766Leer_Depth.bmp"},
    {test:"data/Z25777783_Depth.bmp", control:"data/Z25777783Leer_Depth.bmp"},
    {test:"data/Z25777796_Depth.bmp", control:"data/Z25777796Leer_Depth.bmp"}
]

images.forEach(image => {
    compareImage(image.test, image.control);
})
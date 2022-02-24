import { resolve } from "path/posix";

export function loadImage(src: string): Promise<HTMLImageElement> {
    const image = new Image();
    image.src = src;
    image.crossOrigin = '';
    return new Promise((resolve) => {
        image.onload = () => {
            resolve(image)
        }
    })
}

export function wait(time: number): Promise<null> {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(null);
        }, time)
    })
}
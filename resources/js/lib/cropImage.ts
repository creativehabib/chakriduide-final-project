import { Area } from 'react-easy-crop';

function createImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', error => reject(error));
        image.setAttribute('crossOrigin', 'anonymous'); // Prevent CORS issues
        image.src = url;
    });
}

function getRadianAngle(degreeValue: number) {
    return (degreeValue * Math.PI) / 180;
}

export async function getCroppedImg(
    imageSrc: string,
    pixelCrop: Area,
    rotation: number,
    outputWidth = pixelCrop.width,
    outputHeight = pixelCrop.height
): Promise<Blob> {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) throw new Error('Failed to get 2D context');

    const radians = getRadianAngle(rotation);

    // Calculate the bounding box of the rotated image
    const sin = Math.abs(Math.sin(radians));
    const cos = Math.abs(Math.cos(radians));
    const newWidth = image.width * cos + image.height * sin;
    const newHeight = image.width * sin + image.height * cos;

    // Set canvas to bounding box size
    canvas.width = newWidth;
    canvas.height = newHeight;

    // Move the origin to the center of the canvas
    ctx.translate(newWidth / 2, newHeight / 2);
    ctx.rotate(radians);
    ctx.drawImage(image, -image.width / 2, -image.height / 2);
    ctx.rotate(-radians);
    ctx.translate(-newWidth / 2, -newHeight / 2);

    // Extract cropped area
    const data = ctx.getImageData(pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height);

    // Resize canvas to output dimensions
    canvas.width = outputWidth;
    canvas.height = outputHeight;

    // Paste the cropped image data
    ctx.putImageData(data, 0, 0);

    return new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (!blob) return reject(new Error('Canvas is empty'));
            resolve(blob);
        }, 'image/jpeg', 0.8); // Adjust quality as needed
    });
}

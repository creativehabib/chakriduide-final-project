import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import type { Area } from 'react-easy-crop';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { getCroppedImg } from '@/lib/cropImage';

interface Props {
    imageSrc: string;
    onCancel: () => void;
    onCropComplete: (blob: Blob) => void;
}

export const MediaCropper: React.FC<Props> = ({ imageSrc, onCancel, onCropComplete }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [aspect, setAspect] = useState<number | undefined>(1);
    const [rotation, setRotation] = useState<number>(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

    const onCropCompleteCallback = useCallback((_: Area, croppedPixels: Area) => {
        setCroppedAreaPixels(croppedPixels);
    }, []);

    const handleCrop = async () => {
        if (!croppedAreaPixels) return;
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
        if (croppedImage) {
            onCropComplete(croppedImage);
        }
    };
    return (
        <Dialog open onOpenChange={onCancel}>
            <DialogContent className="w-screen h-screen max-w-none max-h-none p-0 overflow-hidden">
                <div className="flex flex-col h-full w-full">
                    <DialogHeader className="p-4 border-b">
                        <DialogTitle>Crop Image</DialogTitle>
                    </DialogHeader>

                    {/* Aspect Ratio Buttons */}
                    <div className="flex gap-2 justify-center p-4 border-b">
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setRotation((prev) => (prev - 90 + 360) % 360)}
                            >
                                ↺
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setRotation((prev) => (prev + 90) % 360)}
                            >
                                ↻
                            </Button>
                        </div>
                        <Button variant={aspect === undefined ? "default" : "outline"} onClick={() => setAspect(undefined)}>Free</Button>
                        <Button variant={aspect === 1 ? "default" : "outline"} onClick={() => setAspect(1)}>1:1</Button>
                        <Button variant={aspect === 16 / 9 ? "default" : "outline"} onClick={() => setAspect(16 / 9)}>16:9</Button>
                        <Button variant={aspect === 4 / 3 ? "default" : "outline"} onClick={() => setAspect(4 / 3)}>4:3</Button>
                    </div>


                    {/* Cropper */}
                    <div className="relative w-full flex-1 bg-black">
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            rotation={rotation}
                            aspect={aspect}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onRotationChange={setRotation}
                            onCropComplete={onCropCompleteCallback}
                        />
                    </div>
                    <div className="flex items-center justify-between gap-4 w-full max-w-4xl mt-2 space-y-2 px-4">
                        <div className="flex items-center gap-2">
                            <label className=" text-xs uppercase">Zoom</label>
                            <input
                                type="range"
                                min={1}
                                max={3}
                                step={0.1}
                                value={zoom}
                                onChange={(e) => setZoom(Number(e.target.value))}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="text-xs uppercase">Rotation</label>
                            <input
                                type="range"
                                min={0}
                                max={360}
                                step={1}
                                value={rotation}
                                onChange={(e) => setRotation(Number(e.target.value))}
                            />
                        </div>
                    </div>
                    {/* Footer Buttons */}
                    <DialogFooter className="p-4 border-t mt-2">
                        <Button variant="outline" className='cursor-pointer' onClick={onCancel}>Cancel</Button>
                        <Button onClick={handleCrop} className='cursor-pointer'>Crop & Save</Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
};


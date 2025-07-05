import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { MediaItem } from '@/types/globals';
import axios from 'axios';
import toast from 'react-hot-toast';
import React, { useEffect, useRef, useState } from 'react';
import { MediaCropper } from '@/components/media-cropper';
import { ChevronLeft, ChevronRight, EditIcon, Replace, TrashIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import DeleteDialog from '@/components/delete-dialog';
import { formatDateTime } from '@/helper/helpers';

interface MediaDetailsModalProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    media: MediaItem | null;
    mediaList?: MediaItem[];
    setMedia?: (media: MediaItem | null) => void;
    onMediaUpdate?: (updated: MediaItem | null) => void;
}

const MediaDetails = ({
                          open,
                          setOpen,
                          media,
                          mediaList,
                          setMedia,
                          onMediaUpdate,
                      }: MediaDetailsModalProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isCropping, setIsCropping] = useState(false);
    const [editName, setEditName] = useState('');
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [deletingImage, setDeletingImage] = useState<MediaItem | null>(null);

    useEffect(() => {
        setEditName(media?.name || '');
    }, [media]);

    if (!media) return null;

    const handleSaveName = () => {
        if (!media || editName === media.name) return;

        axios.put(`/media/${media.id}`, { name: editName })
            .then((res) => {
                if (onMediaUpdate) {
                    onMediaUpdate({ ...media, name: editName });
                }
                toast.success(res.data.success);
            }).catch((res) => {
                toast.error(res.data.error);
                setEditName(media.name);
            });
    };

    const handleCropImage = () => {
        setIsCropping(true);
    };

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) uploadImage(file);
    };

    const uploadImage = (file: File) => {
        if (!media) return;

        const formData = new FormData();
        formData.append('image', file);
        formData.append('old_path', media.path);

        axios
            .post(`/media/${media.id}/update-image`, formData)
            .then((res) => {
                toast.success(res.data.message);
                const updated = {
                    ...media,
                    path: res.data.path,
                    updated_at: res.data.updated_at,
                };
                onMediaUpdate?.(updated);
            })
            .catch((res) => toast.error(res.data.message));
    };

    const handleCropComplete = (croppedBlob: Blob) => {
        if (!media) return;

        const originalName = media.name || 'cropped';
        const filename = originalName.endsWith('.jpg') || originalName.endsWith('.webp') || originalName.endsWith('.png')
            ? originalName
            : originalName + '.jpg';

        const file = new File([croppedBlob], filename, { type: croppedBlob.type });

        uploadImage(file);
        setIsCropping(false);
    };

    const handleDelete = () => {
        if (!deletingImage) return;

        axios
            .delete(`/media/${deletingImage.id}`)
            .then((res) => {
                onMediaUpdate?.(null);
                toast.success(res.data.success);
            })
            .catch((res) => toast.error(res.data.error))
            .finally(() => {
                setOpenDeleteDialog(false);
                setDeletingImage(null);
            });
    };

    // Navigation Logic
    const getCurrentIndex = () =>
        mediaList?.findIndex((m) => m.id === media.id) ?? -1;

    const getNextMedia = () => {
        const index = getCurrentIndex();
        if (index >= 0 && mediaList && index < mediaList.length - 1) {
            return mediaList[index + 1];
        }
        return null;
    };

    const getPrevMedia = () => {
        const index = getCurrentIndex();
        if (index > 0 && mediaList) {
            return mediaList[index - 1];
        }
        return null;
    };

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="!w-[95vw] !max-w-[95vw] !h-[90vh] p-0 gap-0 rounded flex flex-col overflow-hidden">
                    <DialogHeader className="p-4 shadow-md bg-background border-b ">
                        <DialogTitle className='flex items-center justify-between w-full'>
                            Attachment Details
                            {mediaList && setMedia && (
                                <div className="flex gap-2 mr-10 items-center">
                                    <button
                                        className="text-sm  hover:underline disabled:opacity-50"
                                        disabled={!getPrevMedia()}
                                        onClick={() => setMedia(getPrevMedia())}
                                    >
                                        <ChevronLeft/>
                                    </button>
                                    <button
                                        className="text-sm hover:underline disabled={!getNextMedia()}"
                                        onClick={() => setMedia(getNextMedia())}
                                    >
                                        <ChevronRight className='ml-3'/>
                                    </button>
                                </div>
                            )}
                        </DialogTitle>


                    </DialogHeader>

                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 overflow-hidden">
                        {/* Left: Image Preview */}
                        <div className="flex-col md:flex items-center justify-center overflow-auto p-6 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 space-y-4">
                            <img
                                src={`/storage/${media.path}?t=${media.updated_at}`}
                                alt={media.name || 'Image'}
                                className="max-w-1/2 object-contain rounded-md border border-gray-200 dark:border-gray-700 shadow-sm"
                            />

                            <input
                                type="file"
                                ref={fileInputRef}
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileInputChange}
                            />

                            <div className="flex items-center justify-center gap-4 mt-4">
                                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white text-xs rounded cursor-pointer hover:bg-green-700">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleFileInputChange}
                                    />
                                    <Replace className="w-4 h-4" />
                                    <span className="text-xs uppercase">Replace Image</span>
                                </label>
                                <button
                                    onClick={handleCropImage}
                                    type="button"
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                                >
                                    <EditIcon className="w-4 h-4" />
                                    <span className="uppercase text-xs">Edit Image</span>
                                </button>
                            </div>
                        </div>

                        {/* Right: Metadata */}
                        <div className="bg-slate-100 dark:bg-gray-950 border-t md:border-t-0 md:border-l  overflow-y-auto p-6 space-y-4 text-sm">
                            <div>
                                <p className="font-semibold dark:text-gray-200">File Name</p>
                                <Input
                                    type="text"
                                    className="mb-2"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    onBlur={handleSaveName}
                                />
                            </div>
                            <div>
                                <p className="font-semibold dark:text-gray-200">Size</p>
                                <p className=" dark:text-gray-400">{(media.size / 1024).toFixed(2)} KB</p>
                            </div>
                            <div>
                                <p className="font-semibold  dark:text-gray-200">Type</p>
                                <p className=" dark:text-gray-400">{media.mime_type}</p>
                            </div>
                            <div>
                                <p className="font-semibold  dark:text-gray-200">Dimensions</p>
                                <p className=" dark:text-gray-400">{media.width} × {media.height}</p>
                            </div>
                            <div>
                                <p className="font-semibold  dark:text-gray-200">Created At</p>
                                <p className=" dark:text-gray-400">{formatDateTime(media.created_at)}</p>
                            </div>
                            <div>
                                <p className="font-semibold  dark:text-gray-200">Updated At</p>
                                <p className=" dark:text-gray-400">{formatDateTime(media.updated_at)}</p>
                            </div>

                            <button
                                type="button"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700"
                                onClick={() => {
                                    setDeletingImage(media);
                                    setOpenDeleteDialog(true);
                                }}
                            >
                                <TrashIcon className="w-4 h-4" />
                                Delete Permanently
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <DeleteDialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
                onConfirm={handleDelete}
                title="Confirm Deletion"
                description="This will permanently remove the image from the system."
            />

            {isCropping && media && (
                <MediaCropper
                    imageSrc={`/storage/${media.path}?t=${media.updated_at}`}
                    onCancel={() => setIsCropping(false)}
                    onCropComplete={handleCropComplete}
                />
            )}
        </>
    );
};

export default MediaDetails;

import React, { useState } from 'react';
import MediaManagerModal from '@/components/media-manager';
import { Button } from '@/components/ui/button';
import { ImageIcon } from 'lucide-react';

export type MediaItem = {
    id: number | null | undefined;
    name: string;
    filename: string;
    path: string;
    mime_type: string;
    size: number;
};

interface Props {
    onSelect: (media: Partial<MediaItem> | null) => void;
    initial?: MediaItem;
}

const SetFeaturedImage: React.FC<Props> = ({ onSelect, initial }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<MediaItem | null>(initial || null);

    const handleSelect = (media: MediaItem) => {
        setSelectedImage(media);
        onSelect(media);
        setModalOpen(false);
    };

    React.useEffect(() => {
        setSelectedImage(initial || null);
    }, [initial]);


    return (
        <div className="mb-4 space-y-2">

            <Button
                type={'button'}
                className="cursor-pointer"
                variant={'outline'}
                size={'sm'}
                onClick={() => setModalOpen(true)}
            >
                <ImageIcon />
                {selectedImage ? 'Change Media' : 'Add Media'}
            </Button>

            {selectedImage && (
                <div className="relative group">
                    <img
                        src={`/storage/${selectedImage.path}`}
                        className="max-h-fit w-full rounded shadow object-cover"
                        alt={selectedImage.name}
                    />

                    {/* Remove the button on hover */}
                    <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button type="button" onClick={() => { setSelectedImage(null); onSelect({ id: null });}}
                            className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 cursor-pointer py-1 rounded">
                            Remove
                        </button>
                    </div>
                </div>
            )}

            {modalOpen && (
                <MediaManagerModal onClose={() => setModalOpen(false)} onConfirm={handleSelect} />
            )}
        </div>
    );
};

export default SetFeaturedImage;

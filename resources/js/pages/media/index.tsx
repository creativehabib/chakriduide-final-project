import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { FlashProps, MediaItem } from '@/types/globals';
import MediaUploader from '@/components/media-manager/media-uploader';
import { Button } from '@/components/ui/button';
import { ImageIcon, Loader, SearchIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { fetchMedia } from '@/lib/media';
import { Input } from '@/components/ui/input';
import MediaDetails from '@/components/media-manager/media-details';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Media Library',
        href: '/get-media',
    },
];

const MediaLibrary = () => {
    const [media, setMedia] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
    const [detailsModalOpen, setDetailsModalOpen] = useState(false);
    const { flash, count } = usePage<{flash: FlashProps; count: number}>().props;

    const handleUploadComplete = () => {
        loadMedia(1); // refresh media list
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            loadMedia(1, searchQuery);
        }, 500); // debounce for search input

        return () => clearTimeout(delayDebounce);
    }, [searchQuery]);

    useEffect(() => {
        loadMedia(1); // initial load
    }, []);

    const loadMedia = async (pageNum: number = 1, search: string = '') => {
        setLoading(true);
        try {
            const data = await fetchMedia(pageNum, search);
            if (pageNum === 1) {
                setMedia(data.data);
            } else {
                setMedia(prev => [...prev, ...data.data]);
            }
            setHasMore(data.current_page < data.last_page);
            setPage(data.current_page);
        } finally {
            setLoading(false);
        }
    };

    const loadMore = () => {
        if (hasMore && !loading) {
            loadMedia(page + 1, searchQuery);
        }
    };

    // Show a success message
    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Media Library" />
            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="border overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex justify-between items-center border-b p-4">
                            <h1 className="text-2xl font-bold">Media Library ({ count })</h1>
                            <Button
                                className="cursor-pointer"
                                onClick={() => setDialogOpen(true)}
                                variant="outline"
                            >
                                <ImageIcon /> Add Media
                            </Button>
                            <MediaUploader
                                open={dialogOpen}
                                setOpen={setDialogOpen}
                                onUploadComplete={handleUploadComplete}
                            />
                        </div>

                        <div className="px-4 mt-4 flex justify-end">
                            <div className="relative w-full sm:max-w-xs">
                                <Input
                                    type="text"
                                    placeholder="Search..."
                                    className="pl-10 pr-4"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
                            {media.length === 0 && !loading && (
                                <div className="col-span-full text-center text-gray-500">No media found.</div>
                            )}
                            {media.map((item) => (
                                <div key={item.id} className="border rounded overflow-hidden group relative hover:shadow-md transition-shadow">
                                    <img
                                        src={`/storage/${item.path}?t=${item.updated_at || Date.now()}`}
                                        alt={item.name || 'Image'}
                                        className="object-cover object-center w-full rounded-lg h-40 cursor-pointer"
                                        onClick={() => {
                                            setSelectedMedia(item);
                                            setDetailsModalOpen(true);
                                        }}
                                    />
                                </div>
                            ))}
                        </div>

                        {hasMore && (
                            <div className="text-center mb-4">
                                <Button onClick={loadMore} variant="default" disabled={loading}>
                                    {loading ? <Loader className="animate-spin" /> : 'Load More'}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <MediaDetails
                open={detailsModalOpen}
                setOpen={setDetailsModalOpen}
                media={selectedMedia}
                setMedia={setSelectedMedia}
                mediaList={media}
                onMediaUpdate={(updated) => {
                    if (!updated && selectedMedia) {
                        setMedia(prev => prev.filter(item => item.id !== selectedMedia.id));
                        setSelectedMedia(null);
                        setDetailsModalOpen(false);
                    } else if (updated) {
                        setMedia(prev =>
                            prev.map(item => item.id === updated.id ? updated : item)
                        );
                        setSelectedMedia(updated);
                    }
                }}
            />
        </AppLayout>
    );
};

export default MediaLibrary;

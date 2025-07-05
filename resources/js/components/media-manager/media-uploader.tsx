import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import axios from 'axios';

interface MediaUploaderProps {
    onUploadComplete?: () => void;
    open: boolean;
    setOpen: (open: boolean) => void;
}


export default function MediaUploader({  open, setOpen, onUploadComplete  }: MediaUploaderProps){
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    const closeDialog = () => {
        if (onUploadComplete) {
            onUploadComplete();
            setOpen(false);
        }
    };
    const onDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return;

        setUploading(true);

        const uploads = acceptedFiles.map(file => {
            const formData = new FormData();
            formData.append('image', file);
            return axios.post('/media-upload', formData);
        });

        Promise.allSettled(uploads)
            .then(results => {
                const successes = results.filter(r => r.status === 'fulfilled').length;
                const failures = results.filter(r => r.status === 'rejected').length;

                if (successes) toast.success(`${successes} file(s) uploaded successfully`);
                if (failures) toast.error(`${failures} file(s) failed to upload`);

                closeDialog();
            })
            .catch(err => {
                toast.error('Error uploading files' + (err instanceof Error ? err.message : ''));
            })
            .finally(() => setUploading(false));
    };
    const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: true, maxSize: 128 * 1024 * 1024 });
    // upload form url
    const handleUrlUpload = () => {
        if (!imageUrl) return toast.error('Please provide a valid image URL');

        setUploading(true);

        axios.post('/media-upload-from-url', { url: imageUrl })
            .then((res) => {
                toast.success(res.data.success);
                setImageUrl('');
                closeDialog();
            })
            .catch(err => {
                toast.error('Upload from URL failed '+ (err instanceof Error ? err.message : ''));
            })
            .finally(() => setUploading(false));
    };

    return(
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[1100px]">
                <DialogHeader>
                    <DialogTitle>Media Uploader</DialogTitle>
                    <DialogDescription>
                        Upload images to your media library. You can upload files directly or from a URL.
                    </DialogDescription>
                </DialogHeader>
                    <div className="">
                        <Tabs defaultValue="upload" className="w-full">
                            <TabsList className="">
                                <TabsTrigger value="upload">Upload Media</TabsTrigger>
                                <TabsTrigger value="url">Upload From URL</TabsTrigger>
                            </TabsList>
                            <TabsContent value="upload">
                                <div className="">
                                    {/* Media library content goes here */}
                                    <div
                                        {...getRootProps()}
                                        className="border-dashed border-2 border-gray-300 w-full h-full rounded p-15 text-center cursor-pointer bg-gray-50 dark:bg-gray-900"
                                    >
                                        <input {...getInputProps()} />
                                        <p className="text-lg">Drop files to upload</p>
                                        <p className="text-sm text-muted-foreground my-2">or</p>
                                        <Button disabled={uploading}>
                                            {uploading ? <Loader2 className="animate-spin mr-2" /> : null}
                                            Select Files
                                        </Button>
                                        <p className="text-sm text-gray-500 mt-4">
                                            Supported formats: JPG, PNG, GIF, WEBP. Maximum file size: 128 MB.
                                        </p>
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="url">
                                <div className="max-w-md mx-auto space-y-4">
                                    <p className="text-sm text-muted-foreground">Paste the direct image URL to upload:</p>
                                    <div className="flex w-full max-w-md flex-col sm:flex-row sm:items-center gap-2 mb-4">
                                        <Input
                                            type="url"
                                            placeholder="https://example.com/image.jpg"
                                            value={imageUrl}
                                            autoFocus={true}
                                            onChange={(e) => setImageUrl(e.target.value)}
                                            className="flex-1 text-sm"
                                        />
                                        <Button
                                            onClick={handleUrlUpload}
                                            disabled={uploading || !imageUrl}
                                            className="w-full sm:w-auto"
                                        >
                                            {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            Upload
                                        </Button>
                                    </div>

                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
            </DialogContent>
        </Dialog>
    );
}

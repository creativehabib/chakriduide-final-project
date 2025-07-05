import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import SetFeaturedImage from "@/components/media-image-select";
import SerpPreview from "@/components/project-components/serp-preview";
import { MediaItem } from "@/types/globals";

interface MetaSeoProps {
    data: {
        meta_title: string;
        meta_description: string;
        slug: string;
        index: boolean;
        og_img_id?: number | null;
    };
    setData: (key: string, value: string | boolean | number | null) => void;
    handleOgImageSelect: (mediaId: number) => void;
    initialOgImage?: Partial<MediaItem> | null;
}

export const MetaSeo: React.FC<MetaSeoProps> = ({
                                                    data,
                                                    setData,
                                                    handleOgImageSelect,
                                                    initialOgImage,
                                                }) => {
    const [selectedOgImage] = React.useState<Partial<MediaItem> | null>(initialOgImage || null);

    const handleImageChange = (media: Partial<MediaItem> | null) => {
        handleOgImageSelect(media?.id ?? 0);
    };

    return (
        <Accordion type="single" collapsible className="w-full border rounded">
            <AccordionItem value="seo">
                <AccordionTrigger className="text-lg px-4 py-3 font-semibold">
                    SEO Settings
                </AccordionTrigger>

                <SerpPreview
                    title={data.meta_title}
                    slug={data.slug}
                    description={data.meta_description}
                />

                <AccordionContent className="space-y-5 px-4 py-6">
                    <div>
                        <label htmlFor="meta_title" className="text-sm font-medium block mb-1">
                            Meta Title
                        </label>
                        <input
                            type="text"
                            id="meta_title"
                            value={data.meta_title}
                            onChange={(e) => setData("meta_title", e.target.value)}
                            maxLength={70}
                            className="w-full border rounded px-3 py-2 text-sm"
                            placeholder="Enter meta title..."
                        />
                    </div>

                    <div>
                        <label htmlFor="meta_description" className="text-sm font-medium block mb-1">
                            Meta Description
                        </label>
                        <textarea
                            id="meta_description"
                            value={data.meta_description}
                            onChange={(e) => setData("meta_description", e.target.value)}
                            maxLength={160}
                            placeholder="Enter meta description..."
                            rows={3}
                            className="w-full border rounded px-3 py-2 text-sm"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium block mb-1">SEO Image</label>
                        <SetFeaturedImage
                            onSelect={handleImageChange}
                            initial={selectedOgImage as MediaItem}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium block mb-2">Indexing</label>
                        <div className="space-y-2">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="index"
                                    value="true"
                                    checked={data.index}
                                    onChange={() => setData("index", true)}
                                />
                                <span>Allow indexing</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="index"
                                    value="false"
                                    checked={!data.index}
                                    onChange={() => setData("index", false)}
                                />
                                <span>Do not index</span>
                            </label>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

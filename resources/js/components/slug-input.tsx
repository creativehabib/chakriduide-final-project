import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useSlugChecker } from '@/hooks/slug-check';
import { CheckCircle, Loader2, XCircle } from 'lucide-react';

interface Props {
    name: string;
    data: { slug: string };
    setData: (key: string, value: string) => void;
    postId?: number;
    table?: string; // ✅ Optional table name for checking
}

const SlugInput: React.FC<Props> = ({
                                        name,
                                        data,
                                        setData,
                                        postId,
                                        table = 'blogs', // ✅ Default to 'blogs'
                                    }) => {
    const baseUrl = window.location.origin + '/';
    const [slugEditable, setSlugEditable] = useState(!postId); // Edit = false, New = true
    const [manuallyEdited, setManuallyEdited] = useState(false);

    const generateSlug = (value: string) => {
        return value
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^A-Za-z0-9\u0980-\u09FF\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '')
            .toLowerCase()
            .trim();
    };

    // ✅ Auto-slug only for new posts
    useEffect(() => {
        if (!postId && !manuallyEdited && name) {
            setData('slug', generateSlug(name));
        }
    }, [name, postId, manuallyEdited, setData]);

    const slugStatus = useSlugChecker(
        data.slug,
        table,
        manuallyEdited ? undefined : postId
    );

    const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        const sanitized = generateSlug(input);
        setData('slug', sanitized);
        setManuallyEdited(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-1">
                <label htmlFor="slug" className="text-sm font-medium">Permalink *</label>
                <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    onClick={() => {
                        setSlugEditable(prev => !prev);
                        if (!slugEditable) setManuallyEdited(true);
                    }}
                >
                    {slugEditable ? 'Lock Slug' : 'Edit Slug'}
                </Button>
            </div>

            <div className="flex border rounded overflow-hidden items-center">
                <span className="pl-3 py-2 text-sm">{baseUrl}</span>
                <input
                    type="text"
                    id="slug"
                    value={data.slug}
                    onChange={handleSlugChange}
                    disabled={!slugEditable}
                    className="flex-1 text-sm pr-3 py-2 border-none focus:outline-none bg-transparent"
                    required
                />
            </div>

            <div className="text-xs mt-1">
                Preview:{' '}
                <a
                    href={`${baseUrl}${data.slug}`}
                    target="_blank"
                    className="text-blue-600 hover:underline"
                    rel="noopener noreferrer"
                >
                    {baseUrl}{data.slug}
                </a>
            </div>

            {data.slug && (
                <div className="text-xs mt-1">
                    {slugStatus === 'checking' && (
                        <span className="text-gray-500 flex items-center gap-1">
                            <Loader2 className="animate-spin w-4 h-4" />
                            Checking availability...
                        </span>
                    )}
                    {slugStatus === 'available' && (
                        <span className="text-green-600 flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            Slug available
                        </span>
                    )}
                    {slugStatus === 'taken' && (
                        <span className="text-red-600 flex items-center gap-1">
                            <XCircle className="w-4 h-4" />
                            Slug already taken
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default SlugInput;

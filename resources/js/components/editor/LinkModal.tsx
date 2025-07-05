import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface LinkModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (url: string, openInNewTab: boolean) => void;
    initialUrl?: string;
    initialTargetBlank?: boolean;
}

const LinkModal: React.FC<LinkModalProps> = ({
                                                 open,
                                                 onClose,
                                                 onConfirm,
                                                 initialUrl = '',
                                                 initialTargetBlank = true,
                                             }) => {
    const [url, setUrl] = useState(initialUrl);
    const [openInNewTab, setOpenInNewTab] = useState(initialTargetBlank);

    useEffect(() => {
        setUrl(initialUrl);
        setOpenInNewTab(initialTargetBlank);
    }, [initialUrl, initialTargetBlank, open]);

    const handleSubmit = () => {
        onConfirm(url, openInNewTab);
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Insert Link</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-2">
                    <div>
                        <Label htmlFor="url">URL</Label>
                        <Input
                            id="url"
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://example.com"
                            required
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="newTab"
                            checked={openInNewTab}
                            onCheckedChange={(checked) => setOpenInNewTab(Boolean(checked))}
                        />
                        <Label htmlFor="newTab">Open in new tab</Label>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="button" onClick={handleSubmit}>
                        Insert
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default LinkModal;

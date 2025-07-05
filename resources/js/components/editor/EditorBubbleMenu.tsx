// EditorBubbleMenu.tsx
import React from 'react';
import { Editor } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react';
import {
    Bold, CodeXml, Italic, Link as LinkIcon, Unlink
} from 'lucide-react';

interface EditorBubbleMenuProps {
    editor: Editor | null;
    openLinkModal: () => void;
}

const IconButton: React.FC<{
    onClick: () => void;
    title: string;
    isActive?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
}> = ({ onClick, title, isActive = false, disabled = false, children }) => (
    <button
        type="button"
        onClick={onClick}
        title={title}
        disabled={disabled}
        className={`p-1 hover:bg-gray-200 px-1.5 rounded dark:hover:bg-neutral-700/60 ${
            isActive ? 'bg-gray-300 dark:bg-gray-700' : ''
        }`}
    >
        {children}
    </button>
);

export const EditorBubbleMenu: React.FC<EditorBubbleMenuProps> = ({ editor, openLinkModal }) => {
    if (!editor) return null;

    return (
        <BubbleMenu
            editor={editor}
            tippyOptions={{ duration: 100 }}
            className="bg-white border shadow-md p-1 rounded flex gap-1 dark:bg-neutral-900 dark:border-neutral-700"
        >
            <IconButton
                title="Bold"
                onClick={() => editor.chain().focus().toggleBold().run()}
                isActive={editor.isActive('bold')}
            >
                <Bold size={16} />
            </IconButton>

            <IconButton
                title="Italic"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                isActive={editor.isActive('italic')}
            >
                <Italic size={16} />
            </IconButton>

            <IconButton
                title="Link"
                onClick={openLinkModal}
                isActive={editor.isActive('link')}
            >
                <LinkIcon size={16} />
            </IconButton>

            <IconButton
                title="Unset Link"
                onClick={() => editor.chain().focus().unsetLink().run()}
                disabled={!editor.isActive('link')}
            >
                <Unlink size={16} />
            </IconButton>

            <IconButton
                title="Inline Code"
                onClick={() => editor.chain().focus().toggleCode().run()}
                isActive={editor.isActive('code')}
            >
                <CodeXml size={16} />
            </IconButton>
        </BubbleMenu>
    );
};

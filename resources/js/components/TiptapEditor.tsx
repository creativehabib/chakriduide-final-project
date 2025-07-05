import React, { useCallback, useState, ReactNode, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import TextAlign from '@tiptap/extension-text-align';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import Underline from '@tiptap/extension-underline';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Highlight from '@tiptap/extension-highlight';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import Placeholder from '@tiptap/extension-placeholder';
import Paragraph from '@tiptap/extension-paragraph';

import {
    Bold,
    Code,
    CodeXml,
    Italic,
    RemoveFormatting,
    Strikethrough,
    Undo2,
    Redo2,
    Heading3,
    Heading2,
    Heading1,
    List,
    ListOrdered,
    BetweenVerticalStart,
    Quote,
    BetweenHorizonalStart,
    Unlink,
    LinkIcon,
    Highlighter,
    SuperscriptIcon,
    SubscriptIcon,
    PilcrowIcon,
    AlignJustify,
    AlignCenter,
    AlignRight,
    AlignLeftIcon,
    ImagePlus,
    ImageUp,
    LucideTableCellsSplit,
    LucideTableCellsMerge,
    LucideTable,
    UnderlineIcon,
    BetweenHorizonalEnd, BetweenVerticalEnd, TicketX, Baseline
} from 'lucide-react';

import MediaManagerModal from '@/components/media-manager';
import LinkModal from '@/components/editor/LinkModal';
import { EditorBubbleMenu } from '@/components/editor/EditorBubbleMenu';

const lowlight = createLowlight(common);

interface IconButtonProps {
    onClick: () => void;
    title: string;
    isActive?: boolean;
    disabled?: boolean;
    children: ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, title, isActive = false, disabled = false, children }) => (
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

interface TiptapEditorProps {
    content: string;
    onChange: (content: string) => void;
    editable?: boolean;
}

export const TiptapEditor: React.FC<TiptapEditorProps> = ({ content, onChange, editable = true }) => {
    const [isMediaManagerOpen, setIsMediaManagerOpen] = useState(false);
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');
    const [linkTargetBlank, setLinkTargetBlank] = useState(true);
    const colorInputRef = useRef<HTMLInputElement | null>(null);

    const triggerColorPicker = () => {
        colorInputRef.current?.click();
    };

    const editor = useEditor({
        extensions: [
            StarterKit.configure({codeBlock: false,paragraph: false}),
            Paragraph,
            Placeholder.configure({
                placeholder: 'Type something amazing...',
                showOnlyWhenEditable: true, // শুধু edit করা যায় এমন হলে দেখাবে
                includeChildren: true, // Table/Column এ থাকলেও দেখাবে
            }),
            TextStyle,
            Color,
            FontFamily,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Link.configure({ openOnClick: false, autolink: true, linkOnPaste: true }),
            Image.configure({ inline: true }),
            CodeBlockLowlight.configure({ lowlight }),
            Table.configure({ resizable: true, HTMLAttributes: { class: 'table-auto w-full border-collapse' } }),
            TableCell,
            TableHeader,
            TableRow,
            Underline,
            Subscript,
            Superscript,
            Highlight,
        ],
        content,
        onUpdate: ({ editor }) => onChange(editor.getHTML()),
        editable,
    });

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        editor?.chain().focus().setColor(e.target.value).run();
    };

    const addImageFromUrl = useCallback(() => {
        const url = window.prompt('Enter Image URL:');
        if (url) editor?.chain().focus().setImage({ src: url }).run();
    }, [editor]);

    const openLinkModal = () => {
        const previousUrl = editor?.getAttributes('link')?.href || '';
        const previousTarget = editor?.getAttributes('link')?.target === '_blank';
        setLinkUrl(previousUrl);
        setLinkTargetBlank(previousTarget);
        setIsLinkModalOpen(true);
    };

    const handleLinkConfirm = (url: string, openInNewTab: boolean) => {
        if (!editor) return;
        editor.chain().focus().extendMarkRange('link').setLink({
            href: url,
            target: openInNewTab ? '_blank' : null,
            rel: openInNewTab ? 'noopener noreferrer' : null,
        }).run();
        setIsLinkModalOpen(false);
    };

    if (!editor) return null;

    return (
        <div className="rounded-md">
            <div className="flex flex-wrap gap-2 mb-2 p-2 rounded-md border">
                <IconButton
                    title="Undo"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().chain().focus().undo().run()}
                >
                    <Undo2 size={16} />
                </IconButton>

                <IconButton
                    title="Redo"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().chain().focus().redo().run()}
                >
                    <Redo2 size={16} />
                </IconButton>

                <select
                    className="border rounded px-2 py-1 text-sm bg-background dark:bg-neutral-900 dark:text-white"
                    value={editor.getAttributes('fontFamily').fontFamily || ''}
                    onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
                    style={{ fontFamily: editor.getAttributes('fontFamily').fontFamily || 'inherit' }} // <- apply selected font style
                >
                    <option value="">Select Font</option>
                    <option value="Arial" style={{ fontFamily: 'Arial' }}>Arial</option>
                    <option value="Georgia" style={{ fontFamily: 'Georgia' }}>Georgia</option>
                    <option value="Times New Roman" style={{ fontFamily: 'Times New Roman' }}>Times New Roman</option>
                    <option value="Courier New" style={{ fontFamily: 'Courier New' }}>Courier New</option>
                </select>

                <div className="relative">
                    <IconButton
                        title="Text Color"
                        onClick={triggerColorPicker}
                        isActive={!!editor.getAttributes('textStyle')?.color}
                    >
                        <Baseline size={16} color={editor.getAttributes('textStyle')?.color || 'currentColor'} />
                    </IconButton>

                    <input
                        ref={colorInputRef}
                        type="color"
                        onChange={handleColorChange}
                        className="absolute top-8 left-0 w-8 h-8 opacity-0 cursor-pointer"
                        style={{ pointerEvents: 'all' }}
                    />
                </div>

                {/* Paragraph */}
                <IconButton
                    title="Paragraph"
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    isActive={editor.isActive('paragraph')}
                >
                    <PilcrowIcon size={16} />
                </IconButton>

                {/* Text alignment buttons */}
                <IconButton
                    title="Align Left"
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    isActive={editor.isActive({ textAlign: 'left' })}
                >
                    <AlignLeftIcon size={16} />
                </IconButton>

                <IconButton
                    title="Align Center"
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    isActive={editor.isActive({ textAlign: 'center' })}
                >
                    <AlignCenter size={16} />
                </IconButton>

                <IconButton
                    title="Align Right"
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    isActive={editor.isActive({ textAlign: 'right' })}
                >
                    <AlignRight size={16} />
                </IconButton>

                <IconButton
                    title="Justify"
                    onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                    isActive={editor.isActive({ textAlign: 'justify' })}
                >
                    <AlignJustify size={16} />
                </IconButton>

                {/* Text format buttons */}
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
                    title="Underline"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    isActive={editor.isActive('underline')}
                >
                    <UnderlineIcon size={16} />
                </IconButton>

                <IconButton
                    title="Strike"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    isActive={editor.isActive('strike')}
                >
                    <Strikethrough size={16} />
                </IconButton>

                <IconButton
                    title="Inline Code"
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    isActive={editor.isActive('code')}
                >
                    <CodeXml size={16} />
                </IconButton>



                {/* Headings */}
                <IconButton
                    title="Heading 1"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    isActive={editor.isActive('heading', { level: 1 })}
                >
                    <Heading1 size={16} />
                </IconButton>

                <IconButton
                    title="Heading 2"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    isActive={editor.isActive('heading', { level: 2 })}
                >
                    <Heading2 size={16} />
                </IconButton>

                <IconButton
                    title="Heading 3"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    isActive={editor.isActive('heading', { level: 3 })}
                >
                    <Heading3 size={16} />
                </IconButton>

                {/* Lists */}
                <IconButton
                    title="Bullet List"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    isActive={editor.isActive('bulletList')}
                >
                    <List size={16} />
                </IconButton>

                <IconButton
                    title="Ordered List"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    isActive={editor.isActive('orderedList')}
                >
                    <ListOrdered size={16} />
                </IconButton>

                {/* Blockquote */}
                <IconButton
                    title="Blockquote"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    isActive={editor.isActive('blockquote')}
                >
                    <Quote size={16} />
                </IconButton>

                {/* Code Block */}
                <IconButton
                    title="Code Block"
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    isActive={editor.isActive('codeBlock')}
                >
                    <Code size={16} />
                </IconButton>

                {/* Table */}
                <IconButton
                    title="Insert Table"
                    onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
                >
                    <LucideTable size={16} />
                </IconButton>

                <IconButton title="Add Column Before" onClick={() => editor.chain().focus().addColumnBefore().run()}>
                    <BetweenHorizonalEnd size={16} />
                </IconButton>

                <IconButton title="Add Column After" onClick={() => editor.chain().focus().addColumnAfter().run()}>
                    <BetweenHorizonalStart size={16} />
                </IconButton>

                <IconButton title="Delete Column" onClick={() => editor.chain().focus().deleteColumn().run()}>
                    <TicketX size={16} />
                </IconButton>
                <IconButton
                    title="Add Row Before"
                    onClick={() => editor.chain().focus().addRowBefore().run()}
                >
                    <BetweenVerticalEnd size={16} />
                </IconButton>

                <IconButton
                    title="Add Row After"
                    onClick={() => editor.chain().focus().addRowAfter().run()}
                >
                    <BetweenVerticalStart size={16} />
                </IconButton>

                <IconButton title="Delete Row" onClick={() => editor.chain().focus().deleteRow().run()}>
                    <TicketX size={16} />
                </IconButton>

                <IconButton title="Merge Cells" onClick={() => editor.chain().focus().mergeCells().run()}>
                    <LucideTableCellsMerge size={16} />
                </IconButton>

                <IconButton title="Split Cells" onClick={() => editor.chain().focus().splitCell().run()}>
                    <LucideTableCellsSplit size={16} />
                </IconButton>

                {/* Subscript, Superscript, Highlight */}
                <IconButton
                    title="Subscript"
                    onClick={() => editor.chain().focus().toggleSubscript().run()}
                    isActive={editor.isActive('subscript')}
                >
                    <SubscriptIcon size={16} />
                </IconButton>

                <IconButton
                    title="Superscript"
                    onClick={() => editor.chain().focus().toggleSuperscript().run()}
                    isActive={editor.isActive('superscript')}
                >
                    <SuperscriptIcon size={16} />
                </IconButton>

                <IconButton
                    title="Highlight"
                    onClick={() => editor.chain().focus().toggleHighlight().run()}
                    isActive={editor.isActive('highlight')}
                >
                    <Highlighter size={16} />
                </IconButton>

                {/* Link */}
                <IconButton title="Set Link" onClick={openLinkModal} isActive={editor.isActive('link')}>
                    <LinkIcon size={16} />
                </IconButton>

                <IconButton
                    title="Unset Link"
                    onClick={() => editor.chain().focus().unsetLink().run()}
                    disabled={!editor.isActive('link')}
                >
                    <Unlink size={16} />
                </IconButton>

                {/* Image insertion */}
                <IconButton title="Add Image (URL)" onClick={addImageFromUrl}>
                    <ImageUp size={16} />
                </IconButton>

                <IconButton title="Upload Image" onClick={() => setIsMediaManagerOpen(true)}>
                    <ImagePlus size={16} />
                </IconButton>

                <IconButton title="Clear Formatting" onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}>
                    <RemoveFormatting size={16} />
                </IconButton>
            </div>

            {/* Use the BubbleMenu from a separate file here */}
            <EditorBubbleMenu editor={editor} openLinkModal={openLinkModal} />

            <EditorContent
                editor={editor}
                className="rounded max-h-[400px] overflow-y-auto min-h-[150px] prose dark:prose-invert"
            />

            {isMediaManagerOpen && (
                <MediaManagerModal
                    onClose={() => setIsMediaManagerOpen(false)}
                    onConfirm={(image) => {
                        setIsMediaManagerOpen(false);
                        editor?.chain().focus().setImage({ src: `/storage/${image.path}`, alt: `${image.name}` }).run();
                    }}
                />
            )}

            <LinkModal
                open={isLinkModalOpen}
                onClose={() => setIsLinkModalOpen(false)}
                onConfirm={handleLinkConfirm}
                initialUrl={linkUrl}
                initialTargetBlank={linkTargetBlank}
            />
        </div>
    );
};

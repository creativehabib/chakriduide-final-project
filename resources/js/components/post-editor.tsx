import {
    EditorContent,
    useEditor
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import React from 'react';

interface PostEditorProps {
    content: string;
    onChange: (content: string) => void;
}

export default function PostEditor({ content, onChange }: PostEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link,
            Image,
            TextStyle,
            Color,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    if (!editor) return null;

    const addImage = () => {
        const url = prompt('Enter image URL');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    return (
        <div>
            <div className="flex flex-wrap items-center gap-2 mb-2 border p-2 rounded-md bg-gray-50">
                <button onClick={() => editor.chain().focus().toggleBold().run()} className="font-bold">B</button>
                <button onClick={() => editor.chain().focus().toggleItalic().run()} className="italic">I</button>
                <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</button>
                <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
                <button onClick={() => editor.chain().focus().setTextAlign('left').run()}>Left</button>
                <button onClick={() => editor.chain().focus().setTextAlign('center').run()}>Center</button>
                <button onClick={() => editor.chain().focus().setTextAlign('right').run()}>Right</button>
                <button onClick={() => editor.chain().focus().setColor('#F43F5E').run()} className="text-pink-500">Red</button>
                <button onClick={addImage}>Image</button>
                <button onClick={() => {
                    const url = prompt('Enter link');
                    if (url) editor.chain().focus().setLink({ href: url }).run();
                }}>Link</button>
            </div>
            <div className="border rounded-md p-2 min-h-[200px]">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}

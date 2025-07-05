import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Editor } from 'ckeditor5';

interface CkEditorProps {
    value: string;
    onChange: (value: string) => void;
}

const CkEditor: React.FC<CkEditorProps> = ({ value, onChange }) => {

    return (
        <div className="ckeditor">
            <CKEditor
                editor={ClassicEditor}
                data={value}
                config={{
                    toolbar: [
                        "undo",
                        "redo",
                        "|",
                        "heading",
                        "|",
                        "bold",
                        "italic",
                        "underline",
                        "|",
                        "link",
                        "uploadImage",
                        "insertTable",
                        "blockQuote",
                        "|",
                        "fontColor",
                        "fontBackgroundColor",
                        "|",
                        "bulletedList",
                        "numberedList",
                        "|",
                        "outdent",
                        "indent",
                        "sourceEditing",
                    ],

                    heading: {
                        options: [
                            {
                                model: "paragraph",
                                title: "Paragraph",
                                class: "ck-heading_paragraph",
                            },
                            {
                                model: "heading1",
                                view: "h1",
                                title: "Heading 1",
                                class: "ck-heading_heading1",
                            },
                            {
                                model: "heading2",
                                view: "h2",
                                title: "Heading 2",
                                class: "ck-heading_heading2",
                            },
                            {
                                model: "heading3",
                                view: "h3",
                                title: "Heading 3",
                                class: "ck-heading_heading3",
                            },
                            {
                                model: "heading4",
                                view: "h4",
                                title: "Heading 4",
                                class: "ck-heading_heading4",
                            },
                            {
                                model: "heading5",
                                view: "h5",
                                title: "Heading 5",
                                class: "ck-heading_heading5",
                            },
                            {
                                model: "heading6",
                                view: "h6",
                                title: "Heading 6",
                                class: "ck-heading_heading6",
                            },
                        ],
                    },
                    image: {
                        resizeOptions: [
                            {
                                name: "resizeImage:original",
                                label: "Default image width",
                                value: null,
                            },
                            {
                                name: "resizeImage:50",
                                label: "50% page width",
                                value: "50",
                            },
                            {
                                name: "resizeImage:75",
                                label: "75% page width",
                                value: "75",
                            },
                        ],
                        toolbar: [
                            "imageTextAlternative",
                            "toggleImageCaption",
                            "|",
                            "imageStyle:inline",
                            "imageStyle:wrapText",
                            "imageStyle:breakText",
                            "|",
                            "resizeImage",
                        ],
                    },
                    link: {
                        addTargetToExternalLinks: true,
                        defaultProtocol: "https://",
                    },
                    table: {
                        contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
                    },
                }}
                onChange={(_event, editor: Editor) => {
                    const data = editor.getData();
                    onChange(data);
                }}
            />
        </div>
    );
};
export default CkEditor;


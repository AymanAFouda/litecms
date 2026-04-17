import { useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

export const ArticleBodyEditor = ({ value, onChange, placeholder }) => {
    const editorRef = useRef(null);

    const config = useMemo(() => ({
        height: 600,

        uploader: {
            url: "http://localhost:8080/api/upload",
            method: "POST",
            format: "json",

            insertImageAsBase64URI: false,

            // ❗ still required
            filesVariableName: () => "files",

            // ✅ FORCE correct FormData
            prepareData: function (formData) {
                const newFormData = new FormData();

                formData.forEach((value, key) => {
                    if (value instanceof File) {
                        newFormData.append("files", value); // ✅ force correct name
                    }
                });

                return newFormData;
            },

            isSuccess: (resp) => !resp?.data?.error,

            process: (resp) => {
                const d = resp.data || {};
                return {
                    files: d.files || [],
                    path: d.path || "",
                    baseurl: d.baseurl || "",
                    error: d.error || 0,
                    msg: d.messages?.[0] || ""
                };
            },

            defaultHandlerSuccess: function (data) {
                if (data.files?.length) {
                    data.files.forEach(file => {
                        const url = (data.baseurl || "") + (data.path || "") + file;
                        this.selection.insertImage(url);
                    });
                }
            }
        },

        filebrowser: {
            ajax: {
                url: "http://localhost:8080/api/file-list",
                method: "GET"
            }
        },

        removeButtons: [
            "fullsize",
            "about",
            "ai-commands",
            "ai-assistant",
            "paste",
            "video",
        ],

        placeholder: placeholder || ''

    }), [placeholder]);

    return (
        <JoditEditor
            ref={editorRef}
            tabIndex={1}
            value={value}
            config={config}
            onBlur={(newContent) => onChange?.(newContent)}
        />
    );
};
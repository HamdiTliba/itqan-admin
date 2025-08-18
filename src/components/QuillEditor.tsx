/* QuillEditor.tsx */
"use client";
import { useEffect, useRef } from "react";
import type Quill from "quill";
import "quill/dist/quill.snow.css";

type QuillEditorProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
};

export default function QuillEditor({
  value = "",
  onChange,
  placeholder = "Écrivez ici…",
}: QuillEditorProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);
  const isSettingValue = useRef(false);

  // 🔑 always point to latest onChange
  const onChangeRef = useRef<((v: string) => void) | undefined>(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (quillRef.current) return;
    if (!wrapperRef.current) return;

    // create inner mount node
    const editorEl = document.createElement("div");
    wrapperRef.current.innerHTML = "";
    wrapperRef.current.appendChild(editorEl);

    const init = async () => {
      const { default: QuillCtor } = await import("quill");
      const quill = new QuillCtor(editorEl, {
        theme: "snow",
        placeholder,
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
          ],
        },
      });

      if (value) {
        isSettingValue.current = true;
        quill.clipboard.dangerouslyPasteHTML(value);
        isSettingValue.current = false;
      }

      // ✅ use ref so we always call the latest onChange
      quill.on("text-change", () => {
        if (isSettingValue.current) return;
        const html = quill.root.innerHTML;
        onChangeRef.current?.(html);
      });

      quillRef.current = quill;
    };

    init();

    return () => {
      quillRef.current = null;
      if (wrapperRef.current) wrapperRef.current.innerHTML = "";
    };
  }, []);

  // keep external value in sync
  useEffect(() => {
    const quill = quillRef.current;
    if (!quill) return;
    const current = quill.root.innerHTML;
    if (value !== current) {
      isSettingValue.current = true;
      quill.clipboard.dangerouslyPasteHTML(value || "");
      isSettingValue.current = false;
    }
  }, [value]);

  return (
    <div
      ref={wrapperRef}
      className="min-h-[300px] bg-transparent"
      style={{ backgroundColor: "transparent" }}
    />
  );
}

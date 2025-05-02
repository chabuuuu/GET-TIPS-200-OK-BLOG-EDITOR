"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const FroalaEditor = dynamic(
  () => import("../../components/FroalaEditorComponent"),
  {
    ssr: false,
  }
);

export default function EditorPage() {
  const [editorKey] = useState(0);

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: "2rem" }}>
      <h2>Trình soạn thảo Blog</h2>
      <FroalaEditor
        key={editorKey}
        config={{
          placeholderText: "Viết nội dung blog tại đây...",
          imageUploadURL: "/api/upload",
          imageUploadMethod: "POST",
          toolbarSticky: true,
        }}
      />
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import FroalaEditorComponent from "react-froala-wysiwyg";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/themes/gray.min.css";
import "froala-editor/js/plugins.pkgd.min.js";

const LOCAL_STORAGE_KEY = "blog_draft";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function FroalaWithStorage(props: any) {
  const [model, setModel] = useState<string>("");

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setModel(saved);
    }
  }, []);

  const handleModelChange = (newModel: string) => {
    setModel(newModel);
    localStorage.setItem(LOCAL_STORAGE_KEY, newModel);
  };

  return (
    <div>
      <FroalaEditorComponent
        model={model}
        onModelChange={handleModelChange}
        tag="textarea"
        config={props.config}
      />
    </div>
  );
}

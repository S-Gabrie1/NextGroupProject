"use client";
import React, { useContext, useRef } from "react";
import BundledEditor from "../BundledEditor";
import { DocContext } from "./Context";
import { Editor } from "tinymce";
import { useRouter } from "next/navigation";

export default function TextEditor() {
  const { dataValues, setDataValues } = useContext(DocContext);
  const router = useRouter();
  const editorRef = useRef<Editor | null>(null);

  const saveDocument = async () => {
    if (editorRef.current) {
      const updatedText = editorRef.current.getContent();

      const updatedData = { ...dataValues, text_field: updatedText };

      try {
        const response = await fetch("http://localhost:3000/api/content", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        });

        if (response.ok) {
          const updatedDocument = await response.json();

          // Update the document in the context
          setDataValues(updatedDocument);
          router.refresh()
        } else {
          console.error("Failed to save document:", response.statusText);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };


  return (
    <>
      <BundledEditor
        onInit={(evt: any, editor: Editor | null) => (editorRef.current = editor)}
        initialValue={ dataValues.text_field !== undefined ? dataValues.text_field : "Text Saved !"
        }
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist",
            "anchor",
            "autolink",
            "help",
            "image",
            "link",
            "lists",
            "searchreplace",
            "table",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor backcolor fontsize" +
            "removeformat",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <button
        className="btn border-2 bg-inherit bg-slate-700 text-white p-2 mt-2"
        onClick={saveDocument}
      >
        Save Text
      </button>
    </>
  );
}

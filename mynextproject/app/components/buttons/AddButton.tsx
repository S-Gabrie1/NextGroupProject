"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function AddButton() {
  const [documentName, setDocumentName] = useState("");
  const router = useRouter()
  const userId = localStorage.getItem("userId")
  const handleCreateDocument = async () => {
    
      const requestData = {
        text_field: "some new text",
        date: null,
        userId: userId,
        visibility: 0,
        favourite: 0,
        isDeleted: 0,
        text: documentName,
      };

      try {
        const response = await fetch("/api/content/content", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        if (response.ok) {
          console.log("Document created successfully");
            router.refresh()
        } else {
          console.error("Error creating document");
        }
      } catch (error) {
        console.error("API request failed", error);
      }

  };

  return (
    <div className="mt-3 mb-4 flex flex-col justify-center items-center">
      <input
        type="text"
        name="document_name"
        className="border-2 w-full p-2"
        placeholder="Document Title"
        value={documentName}
        onChange={(e) => setDocumentName(e.target.value)}
      ></input>
      <button
        className="border-2 mt-2 h-9 rounded text-center bg-slate-600 text-neutral-300 flex gap-2 items-center justify-center w-full"
        onClick={handleCreateDocument}
      >
        Create New Document
      </button>
    </div>
  );
}

export default AddButton;
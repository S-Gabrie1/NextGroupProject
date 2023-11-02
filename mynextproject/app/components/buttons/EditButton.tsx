import React, { useContext, useState } from "react";
import { DocContext } from "../Context";
import { Icon } from "@iconify/react";

function EditButton({ docs }: any) {
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const { dataValues, setDataValues } = useContext(DocContext);
  const [visibility, setVisibility] = useState(0); 

  const handleEditDoc = (id: number | null) => {
    const findDoc = docs.find((doc: { id: number | null }) => doc.id === id);
    if (findDoc) {
      setDataValues(findDoc);
      setActiveButton(id);
      setVisibility(findDoc.visibility); 
    }
  };

  const toggleVisibility = async (id: number) => {
    const findDoc = docs.find((doc: { id: number }) => doc.id === id);
    setDataValues(findDoc);
  
    if (findDoc) {
     
      const updatedVisibility = visibility === 0 ? 1 : 0;
      const updatedData = { ...dataValues, visibility: updatedVisibility };
      console.log(findDoc.id);
      try {
        const response = await fetch(`/api/content/${findDoc.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        });
  
        if (response.ok) {
          const updatedDocument = await response.json();
          setVisibility(updatedVisibility);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  const formater = (
    <>
      {docs.map((doc: any) => (
        <div
          key={doc.id}
          className=" h-10 border-2 border-slate-600 rounded flex gap-2 items-center justify-between px-4"
          style={{
            backgroundColor: activeButton === doc.id ? "darkgray" : "beige",
          }}
        >
          <button
            onClick={() => handleEditDoc(doc.id)}
            className=" text-xl text-black"
          >
            {doc.text}
          </button>
          <div className=" text-xl" onClick={() => toggleVisibility(doc.id)}>
          
            <Icon icon="material-symbols:visibility" />
      
      
          </div>
        </div>
      ))}
    </>
  );

  return <div className="flex flex-col gap-2">{formater}</div>;
}

export default EditButton;
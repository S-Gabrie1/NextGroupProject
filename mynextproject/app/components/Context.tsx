"use client";
import { createContext, useState } from "react";

export const DocContext = createContext({
  dataValues: {
    id: null ,
    text_field: "",
    date: "",
    userId: "",
    visibility: 0,
    favourite: 0,
    isDeleted: 0,
    text: ""
  },
  setDataValues: (newData) => {},
 
});

export const DocProvider = ({ children }) => {
  const [dataValues, setDataValues] = useState({
    id: null ,
    text_field: "",
    date: "",
    userId: "",
    visibility: 0,
    favourite: 0,
    isDeleted: 0,
    text: ""
  });


  return (
    <DocContext.Provider
      value={{  dataValues, setDataValues:(newData) => setDataValues((prevData) => ({ ...prevData, ...newData })) }}
    >
      {children}
    </DocContext.Provider>
  );
};




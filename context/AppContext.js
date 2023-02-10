import { createContext, useContext, useEffect, useState } from "react";
import cookieCutter from "cookie-cutter";
import {
  doc,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { app, database } from "../firebaseConfig";
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState("tomorrow_night_eighties");
  const [fontFamily, setFontFamily] = useState("Consolas");
  const [fontSize, setFontSize] = useState(15);
  const [wrap, setWrap] = useState(true);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [alignment, setAlignment] = useState("right");
  const [language, setLanguage] = useState("webdl");
  const [list, setList] = useState([]);
  const [open, setOpen] = useState({});
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [javascript, setJs] = useState("");
  const [title, setTitle] = useState("Title");
  const [id, setId] = useState("");
  const [isExist, setIsExist] = useState(true);

  const [code, setCode] = useState("");
  const [stdIn, setStdIn] = useState("");
  const [output, setOutput] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [headTags, setHeadTags] = useState("");
  const [cssFramework, setCssFramework] = useState("none");

  const dbInstance = collection(database, "codes");

  useEffect(() => {
    setHtml(open?.html);
    setCss(open?.css);
    setJs(open?.javascript);
    setTitle(open?.title);
    open?.id && setId(open.id);
  }, [open]);

  useEffect(() => {
    const lang = cookieCutter.get("editor_lang");
    if (lang) {
      setLanguage(lang);
    }
  }, [language]);

  const getCodes = () => {
    getDocs(dbInstance).then((data) => {
      let codeList = data.docs.map((item) => {
        return { ...item.data(), id: item.id };
      });
      setList([...codeList]);
    });
  };
  const addNew = () => {
    console.log(title, html, css, javascript, "new");
    addDoc(dbInstance, {
      title: !title ? html : title,
      html: html === undefined ? "" : html,
      css: css === undefined ? "" : css,
      javascript: javascript === undefined ? "" : javascript,
      isExist: true,
    }).then(() => {
      setIsExist(true);
      getCodes();
      setOpen({});
    });
  };

  const editCode = (id) => {
    const collectionById = doc(database, "codes", id);

    updateDoc(collectionById, {
      title: !title ? html : title,
      html: html,
      css: css,
      javascript: javascript,
      isExist: true,
    });
  };
  const deleteCode = (id) => {
    const collectionById = doc(database, "codes", id);

    deleteDoc(collectionById).then(() => getCodes());
  };
  function handleBack() {
    setOpen({});
    getCodes();
  }
  const isObjectEmpty = (objectName) => {
    return JSON.stringify(objectName) === "{}";
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        fontFamily,
        setFontFamily,
        fontSize,
        setFontSize,
        wrap,
        setWrap,
        showLineNumbers,
        dbInstance,
        id,
        setId,
        open,
        setOpen,
        list,
        setList,
        css,
        setCss,
        html,
        setHtml,
        javascript,
        setJs,
        title,
        setTitle,
        isExist,
        setIsExist,
        setShowLineNumbers,
        alignment,
        setAlignment,
        language,
        setLanguage,
        code,
        setCode,
        stdIn,
        setStdIn,
        output,
        setOutput,
        getCodes,
        editCode,
        addNew,
        deleteCode,
        isSubmitting,
        setIsSubmitting,
        headTags,
        setHeadTags,
        cssFramework,
        setCssFramework,
        isObjectEmpty,
        handleBack,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useEditor = () => useContext(AppContext);

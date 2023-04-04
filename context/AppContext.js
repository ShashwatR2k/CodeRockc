import { createContext, useContext, useEffect, useState } from "react";
import cookieCutter from "cookie-cutter";
import {
  doc,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { app, database, provider, auth } from "../firebaseConfig";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInAnonymously,
  onAuthStateChanged,
  linkWithCredential,
  signOut,
} from "firebase/auth";

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
  const [pfp, setPfp] = useState("");
  const [isExist, setIsExist] = useState(true);
  const [time, setTime] = useState("");

  const [uid, setUid] = useState("");
  const [code, setCode] = useState("");
  const [stdIn, setStdIn] = useState("");
  const [output, setOutput] = useState("");
  const [credential, setCredential] = useState("");

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

  // useEffect(() => {
  //   linkAnonymous();
  // }, [credential]);

  const getCodes = () => {
    getDocs(dbInstance).then((data) => {
      let codeList = data.docs.reduce((result, item) => {
        if (
          item._document.data.value.mapValue.fields?.userId?.stringValue
            .toString()
            .trim()
            .valueOf() === uid.toString().trim().valueOf() ||
          !item._document.data.value.mapValue.fields?.userId?.stringValue
        ) {
          result.push({ ...item.data(), id: item.id });
        }
        return result;
      }, []);

      codeList.sort(function (a, b) {
        var d1 = new Date(a.time);
        var d2 = new Date(b.time);

        if (d1.getTime() > d2.getTime()) {
          return 1;
        }
        if (d1.getTime() < d2.getTime()) {
          return -1;
        }
        return 0;
      });
      setList([...codeList]);
    });
  };

  const addNew = () => {
    addDoc(dbInstance, {
      title: !title ? html : title,
      html: html === undefined ? "" : html,
      css: css === undefined ? "" : css,
      javascript: javascript === undefined ? "" : javascript,
      isExist: true,
      time: time,
      userId: uid,
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
      time: time,
    });
  };
  const getTime = () => {
    const a = Timestamp.now().toDate().toString();
    setTime(a);
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
  function startLogin() {
    signOut(auth);
    signInWithPopup(auth, provider)
      .then((result) => {
        setCredential(GoogleAuthProvider.credentialFromResult(result));
        const token = credential.accessToken;
        const user = result.user;
        setPfp(user.photoURL);
        setUid(user.uid);
        console.log(pfp);
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setCredential(GoogleAuthProvider.credentialFromError(error));
      });
  }
  function signAnonymous() {
    signInAnonymously(auth)
      .then(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const uid = user.uid;
            // ...
          } else {
            // User is signed out
            // ...
          }
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });
  }
  function linkAnonymous() {
    linkWithCredential(auth.currentUser, credential)
      .then((usercred) => {
        const user = usercred.user;
        console.log("Anonymous account successfully upgraded", user);
      })
      .catch((error) => {
        console.log("Error upgrading anonymous account", error);
      });
  }
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
        pfp,
        time,
        setTime,
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
        getTime,
        startLogin,
        signAnonymous,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useEditor = () => useContext(AppContext);

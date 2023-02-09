import { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import AddButton from "../components/AddButton";
import { useEditor } from "../context/AppContext";
import { app, database } from "../firebaseConfig";
import { collection, addDoc, getDocs, updateDoc } from "firebase/firestore";
import WebD from "../components/WebD";
import { Button } from "@material-ui/core";
import cookieCutter from "cookie-cutter";

const Home = () => {
  const { language } = useEditor();
  const [list, setList] = useState([]);
  const [open, setOpen] = useState({});
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [javascript, setJs] = useState("");
  const [title, setTitle] = useState("Title");
  const [id, setId] = useState("");
  const dbInstance = collection(database, "codes");

  const getCodes = () => {
    getDocs(dbInstance)
      .then((data) => {
        let codeList = data.docs.map((item) => {
          return { ...item.data(), id: item.id };
        });
        setList([...codeList]);
      })
      .finally(() => {});
  };
  useEffect(() => {
    getCodes();
  }, []);

  useEffect(() => {
    console.log(open, isObjectEmpty(open));
    setHtml(open?.html);
    setCss(open?.css);
    setJs(open?.javascript);
    setTitle(open?.name);
    open?.id && setId(open.id);
  }, [open]);

  const isObjectEmpty = (objectName) => {
    return JSON.stringify(objectName) === "{}";
  };
  function handleBack() {
    setOpen({});
  }
  const handleNew = () => {
    console.log(title, html, css, javascript);
    addDoc(dbInstance, {
      name: title === "" || title === undefined ? "MyCode" : title,
      html: html === undefined ? "" : html,
      css: css === undefined ? "" : css,
      javascript: javascript === undefined ? "" : javascript,
      new: false,
    });
  };
  const editCode = (id) => {
    const collectionById = doc(database, "codes", id);

    updateDoc(collectionById, {
      name: title,
      html: html,
      css: css,
      javascript: javascript,
      new: false,
    });
  };

  return (
    <Layout
      title="Home"
      content="Enter code in either language and get the output for the entered code"
    >
      <div class="h-full">
        <div class="flex flex-row w-full justify-center">
          <div class="basis-1/3 w-full">
            {!isObjectEmpty(open) && (
              <Button variant="contained" color="primary" onClick={handleBack}>
                {"Go Back"}
              </Button>
            )}
          </div>
          <div class="basis-1/3 text-white w-full"> {open.name}</div>
          <div class="basis-1/3 w-full justify-end">
            {" "}
            <AddButton setOpen={setOpen} />
          </div>
        </div>

        {!isObjectEmpty(open) && (
          <div class="h-full">
            {!isObjectEmpty(open) ? (
              <WebD
                html={html}
                setHtml={setHtml}
                css={css}
                setCss={setCss}
                javascript={javascript}
                setJs={setJs}
                title={title}
                setTitle={setTitle}
                handleNew={handleNew}
              />
            ) : (
              <div />
            )}
          </div>
        )}

        {isObjectEmpty(open) &&
          list.map((items) => {
            return (
              <div class="basis-1/3 text-white">
                <button onClick={() => setOpen(items)}>{items.name}</button>
              </div>
            );
          })}
      </div>
    </Layout>
  );
};

export default Home;

import { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import AddButton from "../components/AddButton";
import { useEditor } from "../context/AppContext";
import { app, database } from "../firebaseConfig";
import {
  doc,
  collection,
  addDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import WebD from "../components/WebD";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
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
  const [isExist, setIsExist] = useState(false);
  const dbInstance = collection(database, "codes");

  useEffect(() => {
    setHtml(open?.html);
    setCss(open?.css);
    setJs(open?.javascript);
    setTitle(open?.title);
    open?.id && setId(open.id);
    setIsExist(true);
  }, [open]);

  const isObjectEmpty = (objectName) => {
    return JSON.stringify(objectName) === "{}";
  };

  function handleBack() {
    setOpen({});
  }

  const getCodes = () => {
    getDocs(dbInstance).then((data) => {
      let codeList = data.docs.map((item) => {
        return { ...item.data(), id: item.id };
      });
      setList([...codeList]);
    });
  };

  useEffect(() => {
    getCodes();
  }, []);

  const handleNew = () => {
    console.log(title, html, css, javascript);
    addDoc(dbInstance, {
      title: !title ? html : title,
      html: html === undefined ? "" : html,
      css: css === undefined ? "" : css,
      javascript: javascript === undefined ? "" : javascript,
      isExist: true,
    });
  };
  const editCode = (id) => {
    console.log(id);
    console.log(title, html, css, javascript);
    const collectionById = doc(database, "codes", id);

    updateDoc(collectionById, {
      title: !title ? html : title,
      html: html,
      css: css,
      javascript: javascript,
      isExist: true,
    });
  };
  const handleChange = (event) => {
    setTitle(event.target.value);
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
          <div class="basis-1/3 text-white w-full">
            <form noValidate autoComplete="off">
              <div>
                <TextField
                  id="filled-name"
                  value={title}
                  onChange={handleChange}
                  variant="filled"
                />
              </div>
            </form>
          </div>
          <div class="basis-1/3 w-full justify-end">
            {" "}
            <AddButton
              setOpen={setOpen}
              id={id}
              setId={setId}
              html={html}
              setHtml={setHtml}
              css={css}
              setCss={setCss}
              javascript={javascript}
              setJs={setJs}
              title={title}
              setTitle={setTitle}
              handleNew={handleNew}
              editCode={editCode}
              isExist={isExist}
              setIsExist={setIsExist}
            />
          </div>
        </div>

        {!isObjectEmpty(open) && (
          <div class="h-full">
            {!isObjectEmpty(open) ? (
              <WebD
                id={id}
                html={html}
                setHtml={setHtml}
                css={css}
                setCss={setCss}
                javascript={javascript}
                setJs={setJs}
                title={title}
                setTitle={setTitle}
                handleNew={handleNew}
                editCode={editCode}
                isExist={isExist}
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

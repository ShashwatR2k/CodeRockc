import { makeStyles } from "@material-ui/core";
import cookieCutter from "cookie-cutter";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { useEditor } from "../context/AppContext";
import { getCssFrameworkLink } from "../utils/getCssFrameworkLink";

const Editor = dynamic(() => import("../components/Editor"), { ssr: false });

const useStyles = makeStyles(() => ({
  rightAlign: {
    gridTemplateColumns: "2fr 3fr",
  },
  leftAlign: {
    gridTemplateColumns: "2fr 3fr",
    direction: "rtl",
  },
}));

function WebD() {
  const classes = useStyles();
  const {
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
    alignment,
    headTags,
    cssFramework,
  } = useEditor();

  const [srcDoc, setSrcDoc] = useState("");

  const [htmlOpen, setHtmlOpen] = useState(true);
  const [cssOpen, setCssOpen] = useState(true);
  const [jsOpen, setJsOpen] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
        <head>
        ${headTags}
        ${cssFramework === "none" ? "" : getCssFrameworkLink(cssFramework)}
        <style>${css}</style>
        </head>
        <body>
        ${html}
        <script>
        ${javascript}
        </script>
        </body>
        </html>
        `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, javascript, headTags, cssFramework]);

  const container = (alignment) => {
    if (alignment === "right") {
      return classes.rightAlign;
    }
    if (alignment === "left") {
      return classes.leftAlign;
    }
  };

  const editorOpenStyle = (isOpen) => {
    return isOpen ? (alignment === "bottom" ? "w-full" : "h-full") : "";
  };

  return (
    <div className={`grid h-full bg-background   ${container(alignment)}`}>
      {/* Adjust orientation of editors */}
      <div
        className={`flex bg-background p-1 pr-3 gap-4 ${
          alignment === "bottom" ? "flex-row" : "flex-col"
        }`}
      >
        {/* HTML Editor */}
        <div className={editorOpenStyle(htmlOpen)}>
          <Editor
            language="html"
            code={html}
            setCode={setHtml}
            editorOpen={htmlOpen}
            setEditorOpen={setHtmlOpen}
          />
        </div>

        {/* CSS Editor */}
        <div className={editorOpenStyle(cssOpen)}>
          <Editor
            language="css"
            code={css}
            setCode={setCss}
            editorOpen={cssOpen}
            setEditorOpen={setCssOpen}
          />
        </div>

        {/* JS Editor */}
        <div className={editorOpenStyle(jsOpen)}>
          <Editor
            language="javascript"
            code={javascript}
            setCode={setJs}
            editorOpen={jsOpen}
            setEditorOpen={setJsOpen}
          />
        </div>
      </div>

      {/* Output section */}
      <div class={`flex p-1 pr-3 gap-4 flex-col}`}>
        <iframe
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          className="h-full"
          width="100%"
          srcDoc={srcDoc}
          style={{ backgroundColor: "white" }}
        />
      </div>
      <section class="h-12 fixed bottom-0 right-3">
        <div class="h-12">
          {" "}
          <Button
            variant="contained"
            color="primary"
            onClick={isExist ? () => editCode(id) : addNew}
          >
            {"Save"}
          </Button>
        </div>
      </section>
    </div>
  );
}

export default WebD;

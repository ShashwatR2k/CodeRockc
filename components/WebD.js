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

function WebD(params) {
  const classes = useStyles();

  const [srcDoc, setSrcDoc] = useState("");

  const [htmlOpen, setHtmlOpen] = useState(true);
  const [cssOpen, setCssOpen] = useState(true);
  const [jsOpen, setJsOpen] = useState(true);

  const { alignment, headTags, cssFramework } = useEditor();
  useEffect(() => {
    params.setHtml(params.html);
    params.setCss(params.css);
    params.setJs(params.javascript);
  }, [params]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
        <head>
        ${headTags}
        ${cssFramework === "none" ? "" : getCssFrameworkLink(cssFramework)}
        <style>${params.css}</style>
        </head>
        <body>
        ${params.html}
        <script>
        ${params.javascript}
        </script>
        </body>
        </html>
        `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [
    params.html,
    params.css,
    params.javascript,
    headTags,
    cssFramework,
    params,
  ]);

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
    <div className={`grid h-full bg-white   ${container(alignment)}`}>
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
            code={params.html}
            setCode={params.setHtml}
            editorOpen={htmlOpen}
            setEditorOpen={setHtmlOpen}
          />
        </div>

        {/* CSS Editor */}
        <div className={editorOpenStyle(cssOpen)}>
          <Editor
            language="css"
            code={params.css}
            setCode={params.setCss}
            editorOpen={cssOpen}
            setEditorOpen={setCssOpen}
          />
        </div>

        {/* JS Editor */}
        <div className={editorOpenStyle(jsOpen)}>
          <Editor
            language="javascript"
            code={params.javascript}
            setCode={params.setJs}
            editorOpen={jsOpen}
            setEditorOpen={setJsOpen}
          />
        </div>
      </div>

      {/* Output section */}
      <div>
        <iframe
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          className="h-full"
          width="100%"
          srcDoc={srcDoc}
        />
      </div>
      <sectionc class="h-12 fixed bottom-0 right-3">
        <div class="h-12">
          {" "}
          <Button
            variant="contained"
            color="primary"
            onClick={params.handleNew}
          >
            {"Save"}
          </Button>
        </div>
      </sectionc>
    </div>
  );
}

export default WebD;

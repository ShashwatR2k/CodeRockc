import { Button } from "@material-ui/core";
import WebD from "./WebD";
import { useEditor } from "../context/AppContext";

const AddButton = () => {
  const { setId, setOpen, setCss, setHtml, setJs, setTitle, setIsExist } =
    useEditor();

  function handleNew() {
    setOpen({
      html: "",
      css: "",
      javascript: "",
      title: "",
      id: "",
      isExist: false,
    });
    setTitle("");
    setHtml("");
    setCss("");
    setJs("");
    setId("");
    setIsExist(false);
  }

  return (
    <Button variant="contained" color="primary" onClick={handleNew}>
      {"Add New"}
    </Button>
  );
};

export default AddButton;

import { Button } from "@material-ui/core";
import WebD from "./WebD";
import { useEditor } from "../context/AppContext";

const AddButton = (params) => {
  const { language } = useEditor();

  function handleNew() {
    params.setOpen({
      html: "",
      css: "",
      javascript: "",
      title: "",
      id: "",
      isExist: false,
    });
    params.setTitle("");
    params.setHtml("");
    params.setCss("");
    params.setJs("");
    params.setId("");
    params.setIsExist(false);
    console.log("new", language, params);
  }

  return (
    <Button variant="contained" color="primary" onClick={handleNew}>
      {"Add New"}
    </Button>
  );
};

export default AddButton;

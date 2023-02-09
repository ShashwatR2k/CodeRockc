import { Button } from "@material-ui/core";
import WebD from "./WebD";
import { useEditor } from "../context/AppContext";

const AddButton = (params) => {
  const { language } = useEditor();

  function handleNew() {
    console.log("new", language, params);
    params.setOpen({ html: "", css: "", javascript: "", name: "" });
  }

  return (
    <Button variant="contained" color="primary" onClick={handleNew}>
      {"Add New"}
    </Button>
  );
};

export default AddButton;

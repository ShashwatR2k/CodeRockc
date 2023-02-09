import { Button } from "@material-ui/core";
import WebD from "./WebD";
import { useEditor } from "../context/AppContext";

const AddButton = (params) => {
  const { language } = useEditor();

  function handleSubmission() {
    console.log("new", language, params);
    params.setOpen({ html: "", css: "", javascript: "", name: "" });
  }

  return (
    <Button variant="contained" color="primary" onClick={handleSubmission}>
      {"Add New"}
    </Button>
  );
};

export default AddButton;

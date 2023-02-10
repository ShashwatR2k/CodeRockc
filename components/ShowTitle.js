import TextField from "@material-ui/core/TextField";
import { useEditor } from "../context/AppContext";
const ShowTitle = () => {
  const { setOpen, list, deleteCode, title, setTitle } = useEditor();
  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  return (
    <form noValidate autoComplete="off">
      <div>
        <TextField
          id="outlined-name"
          color="secondary"
          inputProps={{
            style: { color: "white", textAlign: "center" },
          }}
          value={title}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default ShowTitle;

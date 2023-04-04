import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
} from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { useEditor } from "../context/AppContext";

const ShowCodeList = () => {
  const { setOpen, list, deleteCode } = useEditor();

  return (
    <List>
      {list.map((items) => {
        return (
          <ListItem key={items.id} onClick={() => setOpen(items)}>
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText style={{ color: "white" }} primary={items?.title} />
            <ListItemSecondaryAction>
              <IconButton
                onClick={() => deleteCode(items.id)}
                edge="end"
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
};

export default ShowCodeList;

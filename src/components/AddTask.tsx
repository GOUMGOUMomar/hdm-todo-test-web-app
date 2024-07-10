import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

interface TaskDto {
  name: string;
}

interface AddTaskDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: () => void;
  setDto: (dto: TaskDto) => void;
}

const AddTaskDialog: React.FC<AddTaskDialogProps> = ({
  open,
  onClose,
  onAdd,
  setDto,
}) => {
  const [taskName, setTaskName] = useState("");

  const handleAdd = () => {
    const dto: TaskDto = {
      name: taskName,
    };
    setDto (dto)
    onAdd();
    setTaskName("");
  };


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Ajouter une tâche</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Saisissez le nom de la nouvelle tâche:
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Nom de la tâche"
          fullWidth
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button onClick={handleAdd} variant="contained" color="primary">
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskDialog;

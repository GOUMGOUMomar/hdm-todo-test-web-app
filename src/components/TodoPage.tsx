/**
 * @todo YOU HAVE TO IMPLEMENT THE SAVE TASK ENDPOINT, A TASK CANNOT BE UPDATED IF THE TASK NAME DID NOT CHANGE, YOU'VE TO CONTROL THE BUTTON STATE ACCORDINGLY
 * @todo THERE ARE ALSO FEW BUGS, FIX THEM
 */
import { Check, Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch.ts";
import { Task } from "../index";
import AddTaskDialog from './AddTask.tsx'

interface TaskDto {
  name: string;
}

const TodoPage = () => {
  const api = useFetch();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dto, setDto] = useState<TaskDto | null>(null);

  const handleFetchTasks = async () => setTasks(await api.get("/tasks"));

  const handleDelete = async (id: number) => {
    await api.delete(`/tasks/${id}`);
    handleFetchTasks();
  };

  const handleSave = async () => {
    if (dto) {
      await api.post("/tasks", dto);
      handleFetchTasks();
    }
    setOpenDialog(false)
  };

  useEffect(() => {
    (async () => {
      handleFetchTasks();
    })();
  }, []);
  return (
    <Container>
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h2">HDM Todo List</Typography>
      </Box>

      <Box justifyContent="center" mt={5} flexDirection="column">
        <>
          {tasks.length > 0 &&
            tasks.map((task) => (
              <Box
                key={task.id}
                display="flex"
                justifyContent="center"
                alignItems="center"
                mt={2}
                gap={1}
                width="100%"
              >
                <TextField
                  size="small"
                  value={task.name}
                  fullWidth
                  sx={{ maxWidth: 350 }}
                />
                <Box>
                  <IconButton color="success" disabled>
                    <Check />
                  </IconButton>
                  <IconButton color="error">
                    <Delete />
                  </IconButton>
                </Box>
              </Box>
            ))}
        </>
        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <Button variant="outlined" onClick={() => setOpenDialog(true)}>
            Ajouter une tâche
          </Button>
        </Box>
      </Box>

      <AddTaskDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onAdd={handleSave}
        setDto={setDto}
      />
    </Container>
  );
};

export default TodoPage;

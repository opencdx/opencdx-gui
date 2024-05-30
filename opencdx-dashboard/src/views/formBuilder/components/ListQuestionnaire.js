import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Button, Dialog } from "@mui/material";
import { Endpoints } from "utils/axios/apiEndpoints";
import { Avatar } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import FullscreenIcon from "@mui/icons-material/List";
import { openSnackbar } from "store/slices/snackbar";
import { useDispatch } from "store";
import { useAnfFormStore } from "../utils/useAnfFormStore";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const ListQuestionnaire = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [userResponses, setUserResponses] = useState([]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
    const fetchUserResponses = async () => {
      Endpoints.getQuestionnaireList({
        pagination: {
          pageSize: 300,
          sortAscending: true,
        },
        updateAnswers: true,
      })
        .then((response) => {
          setUserResponses(response.data.questionnaires);
        })
        .catch(() => {
          dispatch(
            openSnackbar({
              open: true,
              message: "Something went wrong while fetching list questionnaire",
              variant: "error",
              alert: {
                color: "success",
              },
              close: false,
            })
          );
        });
    };
    fetchUserResponses();
  };

  const { setFormData, setUploadData, setAnfData } = useAnfFormStore();
  const convertDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <Box>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        title="List Questionnaire"
        sx={{ ml: 5, mr: 1 }}
      >
        <Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Last Updated</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userResponses.length > 0 &&
                  userResponses.map((response, index) => (
                    <TableRow key={response.id}>
                      <TableCell>{response.title}</TableCell>
                      <TableCell>{convertDate(response.modified)}</TableCell>
                      <TableCell>{response.status}</TableCell>

                      <TableCell>
                        <Button
                          key={index}
                          variant="outlined"
                          color="primary"
                          sx={{
                            m: 1,
                            ml: 3,
                            width: "90%",
                            display: "flex",
                            flexDirection: "column",
                          }}
                          onClick={() => {
                            setFormData(response);
                            setUploadData(response);
                            setAnfData(response);
                            setOpen(false);
                          }}
                        >
                          {"View / Update"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Dialog>
      <Box sx={{ ml: 2, mr: 2 }}>
        <Tooltip title={"List Questionnaire"} placement={"right"}>
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              border: "1px solid",
              borderColor:
                theme.palette.mode === "dark"
                  ? theme.palette.dark.main
                  : theme.palette.primary.light,
              background:
                theme.palette.mode === "dark"
                  ? theme.palette.dark.main
                  : theme.palette.primary.light,
              color: theme.palette.primary.dark,
              transition: "all .2s ease-in-out",
              '&[aria-controls="menu-list-grow"],&:hover': {
                borderColor: theme.palette.primary.main,
                background: theme.palette.primary.main,
                color: theme.palette.primary.light,
              },
            }}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            color="inherit"
          >
            <FullscreenIcon />
          </Avatar>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default ListQuestionnaire;

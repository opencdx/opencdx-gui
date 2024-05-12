import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Button, Dialog } from '@mui/material';
import { useEffect } from 'react';
import { Endpoints } from 'utils/axios/apiEndpoints';
import { Avatar } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import FullscreenIcon from '@mui/icons-material/List';
import { openSnackbar } from 'utils/store/slices/snackbar';
import { useDispatch } from 'utils/store';
import { useAnfFormStore } from '../utils/useAnfFormStore';

const ListQuestionnaire = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [userResponses, setUserResponses] = useState([]);

    useEffect(() => {
        const fetchUserResponses = async () => {
            Endpoints.getQuestionnaireList({
                pagination: {
                    pageSize: 300,
                    sortAscending: true
                }
            })
                .then((response) => {
                    setUserResponses(response.data.questionnaires);
                })
                .catch(() => {
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: 'Something went wrong.',
                            variant: 'error',
                            alert: {
                                color: 'success'
                            },
                            close: false
                        })
                    );
                });
        };
        fetchUserResponses();
    }, [dispatch]);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const { setFormData, setUploadData } = useAnfFormStore();

    return (
        <Box>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                sx={{ ml: 5, mr: 1 }}
            >
                <Box>
                    {userResponses.length > 0 &&
                        userResponses.map((response, index) => (
                            <Button
                                key={index}
                                variant="contained"
                                color="primary"
                                sx={{ m: 1, ml: 3, width: '90%', display: 'flex', flexDirection: 'column' }}
                                onClick={() => {
                                    setFormData(response);
                                    setUploadData(response);
                                    const data = {
                                        default: response,
                                        updated: response
                                    };
                                    localStorage.setItem('anf-form', JSON.stringify(data));
                                    setOpen(false);
                                }}
                            >
                                {response.title}
                            </Button>
                        ))}
                </Box>
            </Dialog>
            <Box sx={{ ml: 2, mr: 2 }}>
                <Tooltip title={'List'}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            border: '1px solid',
                            borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
                            background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
                            color: theme.palette.primary.dark,
                            transition: 'all .2s ease-in-out',
                            '&[aria-controls="menu-list-grow"],&:hover': {
                                borderColor: theme.palette.primary.main,
                                background: theme.palette.primary.main,
                                color: theme.palette.primary.light
                            }
                        }}
                        aria-controls={open ? 'menu-list-grow' : undefined}
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

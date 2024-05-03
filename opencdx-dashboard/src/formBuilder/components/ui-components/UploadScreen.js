import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Button, Dialog } from '@mui/material';
import { useEffect } from 'react';
import { Endpoints } from 'utils/axios/apiEndpoints';
import { DataGrid } from '@mui/x-data-grid';
import { Avatar } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';




const UploadScreen = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [userResponses, setUserResponses] = useState([]);

   
    useEffect(() => {
        const fetchUserResponses = async () => {
            Endpoints.getQuestionnaireList(
                {
                    pagination: {
                        pageSize: 30,
                        sortAscending: true
                    }
                }
            ).then((response) => {

                console.log(response.data);
                setUserResponses(response.data.questionnaires);
            })
                .catch(err => err);
        };
        fetchUserResponses();
    }, []);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
        
    }

    
    return (
        <Box sx={{ ml: 2, mr: 2 }}>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            >
                <Box >
                    {userResponses.length > 0 && userResponses.map((response, index) => (
                        <Button key={index} variant="contained" color="primary" sx={{ m: 1 , width: '90%',display: 'flex',flexDirection: 'column'}}>
                            {response.title}
                        </Button>
                    ))
                        }
                </Box>
            </Dialog>
            <Box sx={{ ml: 2, mr: 2 }}>
                <Tooltip title={open ? 'Exit Fullscreen' : 'Fullscreen'}>
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
                        {open ? <FullscreenExitIcon /> : <FullscreenIcon />}
                    </Avatar>
                </Tooltip>
            </Box>
            
        </Box>
    );
};

export default UploadScreen;

import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Endpoints } from 'utils/axios/apiEndpoints';
import { openSnackbar } from 'utils/store/slices/snackbar';
import { useDispatch } from 'utils/store';
import { useAnfFormStore } from '../utils/useAnfFormStore';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEffect } from 'react';
import { Suspense } from 'react';
import ANFStatementPlaceholder from 'ui-component/cards/Skeleton/ANFStatementPlaceholder';

const ListQuestionnaire = () => {
    const dispatch = useDispatch();

    const [open, setOpen] = useState(true);
    const [userResponses, setUserResponses] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserResponses = async () => {
            setLoading(true);
            Endpoints.getQuestionnaireList({
                pagination: {
                    pageSize: 300,
                    sortAscending: true
                },
                updateAnswers: true
            })
                .then((response) => {
                    setLoading(false);
                    setUserResponses(response.data.questionnaires);
                })
                .catch(() => {
                    setLoading(false);
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: 'Something went wrong while fetching list questionnaire',
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
    }, []);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const { setFormData, setUploadData, setAnfData } = useAnfFormStore();
    const convertDate = (date) => {
        return new Date(date).toLocaleDateString();
    };

    return (
        <Box>
            <Box sx={{ ml: 2, mr: 2 }}>
                <Button
                    variant="outlined"
                    color="primary"
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    <Typography
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            textAlign: 'center'
                        }}
                        fontSize={16}
                        fontWeight={600}
                    >
                        {'List Questionnaire'}
                    </Typography>
                </Button>
            </Box>
            {open && (
                <Box sx={{ ml: 2, mr: 2, mt: 2 }}>
                    {loading ? (
                        <ANFStatementPlaceholder />
                    ) : (
                        <Suspense fallback={<ANFStatementPlaceholder />}>
                            <Box sx={{ ml: 2, mr: 2, mt: 2 }}>
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
                                                                    width: '90%',
                                                                    display: 'flex',
                                                                    flexDirection: 'column'
                                                                }}
                                                                onClick={() => {
                                                                    setFormData(response);
                                                                    setUploadData(response);
                                                                    setAnfData(response);
                                                                    setOpen(false);
                                                                }}
                                                            >
                                                                {'View / Update'}
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Suspense>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default ListQuestionnaire;

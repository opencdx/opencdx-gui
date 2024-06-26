import { useState, useEffect } from 'react';
import { Grid, Stack, TextField, MenuItem } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useTheme } from '@mui/material/styles';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { gridSpacing } from 'utils/store/constant';
import { Endpoints } from 'utils/axios/apiEndpoints';
import { openSnackbar } from 'utils/store/slices/snackbar';
import { useDispatch } from 'utils/store';

const Email = () => {
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const [emailTemplates, setEmailTemplates] = useState([]);
    useEffect(() => {
        const fetchEmailList = async () => {
            try {
                const response = await Endpoints.getEmailList(
                    {
                        pagination: {
                            pageSize: 30,
                            sortAscending: true
                        }
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem('serviceToken')}`
                        }
                    }
                );
                setEmailTemplates(response?.data);
            } catch (error) {
                console.error('Error fetching email list:', error);
                dispatch(
                    openSnackbar({
                        open: true,
                        message: 'Something went wrong while fetching email list',
                        variant: 'error',
                        alert: {
                            color: 'success'
                        },
                        close: false
                    })
                );
            }
        };
        fetchEmailList();
    }, [dispatch]);

    const [template, setTemplate] = useState(1);

    const handleChange = (value) => {
        setText(value);
    };
    const handleTemplateChange = (evt) => {
        setTemplate(evt.target.value);
        const template = emailTemplates?.templates?.find((template) => template.subject === evt.target.value);
        setText(template.content);
    };

    const theme = useTheme();

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Stack
                        spacing={gridSpacing}
                        sx={{
                            '& .quill': {
                                bgcolor: theme.palette.mode === 'dark' ? 'dark.main' : 'grey.50',
                                borderRadius: '12px',
                                '& .ql-toolbar': {
                                    bgcolor: theme.palette.mode === 'dark' ? 'dark.light' : 'grey.100',
                                    borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.light + 20 : 'primary.light',
                                    borderTopLeftRadius: '12px',
                                    borderTopRightRadius: '12px'
                                },
                                '& .ql-container': {
                                    borderColor:
                                        theme.palette.mode === 'dark' ? `${theme.palette.dark.light + 20} !important` : 'primary.light',
                                    borderBottomLeftRadius: '12px',
                                    borderBottomRightRadius: '12px',
                                    '& .ql-editor': {
                                        minHeight: 135
                                    }
                                }
                            }
                        }}
                    >
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="template-selection"
                                select
                                label="Select a template..."
                                value={template}
                                onChange={handleTemplateChange}
                                variant="outlined"
                                style={{ width: '50ch' }}
                            >
                                {emailTemplates?.templates?.map((template) => (
                                    <MenuItem key={template.subject} value={template.subject}>
                                        {template.subject}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <ReactQuill value={text} onChange={handleChange} />
                    </Stack>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Email;

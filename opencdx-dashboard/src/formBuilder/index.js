import { JsonView, allExpanded, defaultStyles } from 'react-json-view-lite';
import PropTypes from 'prop-types';
import 'react-json-view-lite/dist/index.css';
import {
    Box,
    Drawer,
    CssBaseline,
    Toolbar,
    List,
    Typography,
    Divider,
    ListItem,
    ListItemButton,
    ListItemText,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton
} from '@mui/material';
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import MuiAppBar from '@mui/material/AppBar';
import { styled, useTheme } from '@mui/material/styles';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';

/* start - anf statement type */
import StatementTypesReport from './components/ui-components/StatementTypesReport';
import MainWrapper from './components/ui-components/MainWrapper';
import FullScreenSection from './components/ui-components/FullScreen';
import { Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import GetAppIcon from '@mui/icons-material/GetApp';
import { useAnfFormStore } from './utils/useAnfFormStore';


import Slide from '@mui/material/Slide';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
import './custom.css';

/* end - anf statement type */

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2)
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1)
    }
}));

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
    })
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    })
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
}));

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1
});

const FormBuilder = () => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [open1, setOpen1] = React.useState(true);
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const [openDialog, setOpenDialog] = React.useState(false);
    const [openAnfDialog, setOpenAnfDialog] = React.useState(false);
    const { formData, setFormData, uploadData, setUploadData } = useAnfFormStore();
    const handleClickOpen1 = () => {
        setOpen1(true);
    };

    const handleClose1 = () => {
        setOpen1(false);
    };
    const handleChange = (e) => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], 'UTF-8');
        fileReader.onload = (e) => {
            const formData = JSON.parse(e.target.result);
            setFormData(formData);
            setUploadData(formData);
            const data = {
                default: formData,
                updated: formData
            };
            localStorage.setItem('anf-form', JSON.stringify(data));
        };
    };

    const handleClickOpen = () => {
        setOpenDialog(true);
    };
    const handleClose = () => {
        setOpenDialog(false);
    };
    const handleClickOpenAnfDialog = () => {
        setOpenAnfDialog(true);
    };
    const handleCloseAnfDialog = () => {
        setOpenAnfDialog(false);
    };
    const handlePreviewDownload = () => {
        handleDownload(uploadData, 'upload-form.json');
    };
    const handleAnfDownload = () => {
        handleDownload(uploadData, 'anf-form.json');
    };
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleDownload = (uploadData, fileName) => {
        const data = JSON.stringify(uploadData);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(url);
    };
    const DialogWrapper = ({ open, handleClose, title, children, handleDownload }) => {
        return (
            <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {title}
                    <IconButton
                        aria-label="close"
                        id="close-dialog"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500]
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>{children}</DialogContent>
                <DialogActions>
                    <Button onClick={() => handleDownload()} startIcon={<GetAppIcon />}>
                        Download
                    </Button>
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        );
    };

    return (
        <>
            {open1 ?<React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen1}>
                    Open full-screen dialog
                </Button>
                <Dialog
                    fullScreen
                    open={open1}
                    onClose={handleClose1}
                    TransitionComponent={Transition}
                >
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar>
                            <IconButton
                                edge="end"
                                color="inherit"
                                onClick={handleClose1}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                            
                            <Button autoFocus color="inherit" onClick={handleClose1}>
                                Ok
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <List>
                        <ListItemButton>
                            <ListItemText primary="Phone ringtone" secondary="Titania" />
                        </ListItemButton>
                        <Divider />
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            {
                                isDragActive ?
                                    <p>Drop the files here ...</p> :
                                    <p>Drag 'n' drop some files here, or click to select files</p>
                            }
                        </div>
                    </List>
                </Dialog>
            </React.Fragment>:
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
           
            <AppBar position="fixed" open={open1} style={{ backgroundColor: 'white' }}>
                <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h3" component="div">
                        ANF Statement
                    </Typography>
                    <Grid item style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
                            <FullScreenSection />
                        </Box>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box'
                    }
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <Button onChange={handleChange} component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                        Upload file
                        <VisuallyHiddenInput type="file" />
                    </Button>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>

                <Divider />
                <List>
                    {formData &&
                        formData.item &&
                        formData.item.map(({ linkId, text }) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemText primary={linkId + ' - ' + text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
                    {uploadData && uploadData.item && (
                        <Button sx={{ m: 1 }} variant="contained" id="user-form-json" onClick={handleClickOpen}>
                            User Form JSON
                        </Button>
                    )}
                    {formData && formData.item && (
                        <Button sx={{ m: 1 }} variant="contained" id="anf-statement-json" onClick={handleClickOpenAnfDialog}>
                            ANF Statement JSON
                        </Button>
                    )}

                    <DialogWrapper open={openDialog} handleClose={handleClose} title="Preview JSON" handleDownload={handlePreviewDownload}>
                        <JsonView data={uploadData} shouldExpandNode={allExpanded} style={defaultStyles} />
                    </DialogWrapper>
                    <DialogWrapper
                        open={openAnfDialog}
                        handleClose={handleCloseAnfDialog}
                        title="ANF Statement"
                        handleDownload={handleAnfDownload}
                    >
                        <JsonView data={formData} shouldExpandNode={allExpanded} style={defaultStyles} />
                    </DialogWrapper>
                    <StatementTypesReport />

                    {formData && formData.item && <MainWrapper uploadedFile={formData} />}
                </Box>
            </Main>
        </Box>}
        </>
    );
};
FormBuilder.propTypes = {
    children: PropTypes.node,
    handleClose: PropTypes.func,
    handleDownload: PropTypes.func,
    open: PropTypes.bool,
    title: PropTypes.string
};

export default FormBuilder;

import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Snackbar } from '@mui/material';
import { Tooltip } from '@mui/material';
import { useAnfFormStore } from '../utils/useAnfFormStore';

const QuestionsList = forwardRef((props, ref) => {
    const { formData } = useAnfFormStore();
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

    const handleCopyToClipboard = (value) => {
        navigator.clipboard.writeText('{{REPLACE_' + value + '}}').catch((error) => {
            console.error('Unable to copy text to clipboard', error);
        });
        setIsSnackbarOpen(true);
    };

    const handleCloseSnackbar = () => {
        setIsSnackbarOpen(false);
    };

    return (
        <div ref={ref} {...props}>
            {/* <h2>List</h2> */}
            {/* <p style={{ color: 'red' }}>
                This will be displayed in each ANF Staement above the tabs. <br /> This will allow users to copy the document id values to
                cliapboard and past into the ANF Statement fields.
            </p> */}
            <table>
                <thead>
                    <tr style={{ height: '60px' }}>
                        <th>Question Text</th>
                        {/* <th>Question Link ID</th> */}
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {formData?.item.map((item, index) => (
                        <tr key={index}>
                            <td>{item.text}</td>
                            {/* <td style={{ wordWrap: 'break-word' }}>document.getElementById({item.linkId}).value</td> */}
                            <td>
                                <Tooltip title={`{{REPLACE_${item.linkId})}}`}>
                                    <Button
                                        data-testid={`{{REPLACE_${item.linkId})}}`}
                                        onClick={() => handleCopyToClipboard(item.linkId, index)}
                                    >
                                        Copy to Clipboard
                                    </Button>
                                </Tooltip>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Snackbar open={isSnackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar} message="Copied to clipboard" />
        </div>
    );
});

export default QuestionsList;

QuestionsList.propTypes = {
    currentIndex: PropTypes.number,
    tab: PropTypes.string
};

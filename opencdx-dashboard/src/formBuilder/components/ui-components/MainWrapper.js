import React, { useEffect, forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import ChildWrapper from './ChildWrapper';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Grid } from '@mui/material';
import { useAnfFormStore } from '../../utils/useAnfFormStore';
import { Endpoints } from 'utils/axios/apiEndpoints';

const MainWrapper = forwardRef(({ uploadedFile }, ref) => {
    const { formData } = useAnfFormStore();

    const [showAlert, setShowAlert] = useState(false);

    const defaultValues = {
        item: uploadedFile.item
    };
    const { register, handleSubmit, control, getValues, errors, setValue, reset } = useForm({ defaultValues });

    const handleAlertClose = () => {
        setShowAlert(false);
    };

    useEffect(() => {
        reset({
            item: formData.item
        });
    }, [formData, reset]);

    const onSubmit = (data) => {
        const anf = JSON.parse(localStorage.getItem('anf-form'));
        anf.updated.item = data.item;
        let tempData = data;

        tempData.title = anf.updated.title;
        tempData.resourceType = anf.updated.resourceType;
        tempData.status = anf.updated.status;

        tempData.ruleId = data?.ruleId || '';
        tempData.ruleQuestionId = data?.ruleQuestionId?.ruleId ? [data.ruleQuestionId.ruleId] : [];

        localStorage.setItem('anf-form', JSON.stringify(anf));
        tempData.item = tempData.item.map(({ componentType, anfOperatorType, operatorValue, markedMainANFStatement, selectedCategories, componentId, answerTextValue, ...rest }) => {
            const { anfStatement } = rest?.item[0]?.anfStatementConnector[0] || {};
            console.log('anfStatement', componentType, anfOperatorType, operatorValue, markedMainANFStatement, selectedCategories, componentId, answerTextValue);
            if (anfStatement) {
                if (anfStatement.authors && !Array.isArray(anfStatement.authors)) {
                    anfStatement.authors = [anfStatement.authors];
                }
                if (anfStatement.time) {
                    anfStatement.time.includeLowerBound = anfStatement.time.includeLowerBound === 'yes';
                    anfStatement.time.includeUpperBound = anfStatement.time.includeUpperBound === 'yes';
                }
                if (anfStatement.performanceCircumstance?.normalRange) {
                    const { normalRange } = anfStatement.performanceCircumstance;
                    normalRange.includeLowerBound = normalRange.includeLowerBound === 'yes';
                    normalRange.includeUpperBound = normalRange.includeUpperBound === 'yes';
                }
                if (anfStatement.performanceCircumstance?.result) {
                    const { result } = anfStatement.performanceCircumstance;
                    result.includeLowerBound = result.includeLowerBound === 'yes';
                    result.includeUpperBound = result.includeUpperBound === 'yes';
                }
                if (anfStatement.performanceCircumstance?.timing) {
                    const { timing } = anfStatement.performanceCircumstance;
                    timing.includeLowerBound = timing.includeLowerBound === 'yes';
                    timing.includeUpperBound = timing.includeUpperBound === 'yes';
                }
                if (anfStatement.performanceCircumstance?.participant && !Array.isArray(anfStatement.performanceCircumstance.participant)){
                    anfStatement.performanceCircumstance.participant=[anfStatement.performanceCircumstance.participant];
                }

                delete anfStatement.performanceCircumstance?.circumstanceType;
            }

            return { ...rest };
        });

        const saveQuestionnare = async () => {
            const response = await Endpoints.submitQuestionnaire({
                questionnaire: tempData
            });
            if (response.status === 200) {
                setShowAlert(true);
            }
        };
        saveQuestionnare();
    };

    return (
        <div ref={ref}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ChildWrapper {...{ control, register, getValues, setValue, errors, defaultValues }} />
                <Grid sx={{ pt: 2 }}>
                    <Button disableElevation color="primary" size="large" type="submit" variant="contained">
                        Save
                    </Button>
                </Grid>
            </form>

            <Snackbar open={showAlert} autoHideDuration={3000} onClose={handleAlertClose}>
                <MuiAlert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
                    Saved successfully!
                </MuiAlert>
            </Snackbar>
        </div>
    );
});

MainWrapper.propTypes = {
    uploadedFile: PropTypes.object
};

export default MainWrapper;

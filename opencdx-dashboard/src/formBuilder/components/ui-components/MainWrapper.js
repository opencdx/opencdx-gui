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
        if (data.ruleId)
        anf.updated.ruleId = data.ruleId
        if(data.ruleId=='')
        anf.updated.ruleId ='';
        if (data.ruleQuestionId)
        anf.updated.ruleQuestionId = [data.ruleQuestionId.ruleId];

        localStorage.setItem('anf-form', JSON.stringify(anf));

        anf.updated.item.forEach((element) => {
            let componentType = element.componentType;
            let Type = element.anfOperatorType === 'Equal' ? 'ANF_OPERATOR_TYPE_EQUAL' : 'ANF_OPERATOR_TYPE_NOT_EQUAL';
            let Value = element.operatorValue;

            if (Array.isArray(element.item)) {
                element.item.forEach((connector) => {
                    connector.anfStatementConnector[0].anfStatementType = componentType;
                    connector.anfStatementConnector[0].anfOperatorType = Type;
                    connector.anfStatementConnector[0].operatorValue = Value;
                    if (connector.anfStatementConnector[0].anfStatement.authors)
                        connector.anfStatementConnector[0].anfStatement.authors = [
                            connector.anfStatementConnector[0].anfStatement.authors,
                            connector.anfStatementConnector[0].anfStatement.authors
                        ];
                    connector.anfStatementConnector[0].anfStatement.time.includeLowerBound =
                        connector.anfStatementConnector[0].anfStatement.time.includeLowerBound === 'yes' ? true : false;
                    connector.anfStatementConnector[0].anfStatement.time.includeUpperBound =
                        connector.anfStatementConnector[0].anfStatement.time.includeUpperBound === 'yes' ? true : false;
                    if (
                        connector &&
                        connector.anfStatementConnector[0] &&
                        connector.anfStatementConnector[0].anfStatement &&
                        connector.anfStatementConnector[0].anfStatement.performanceCircumstance
                    ) {
                        connector.anfStatementConnector[0].anfStatement.performanceCircumstance.normalRange.includeLowerBound =
                            connector.anfStatementConnector[0].anfStatement?.performanceCircumstance?.normalRange?.includeLowerBound ===
                            'yes'
                                ? true
                                : false;
                        connector.anfStatementConnector[0].anfStatement.performanceCircumstance.normalRange.includeUpperBound =
                            connector.anfStatementConnector[0].anfStatement?.performanceCircumstance.normalRange?.includeUpperBound ===
                            'yes'
                                ? true
                                : false;
                        connector.anfStatementConnector[0].anfStatement.performanceCircumstance.result.includeLowerBound =
                            connector.anfStatementConnector[0].anfStatement?.performanceCircumstance?.result?.includeLowerBound === 'yes'
                                ? true
                                : false;
                        connector.anfStatementConnector[0].anfStatement.performanceCircumstance.result.includeUpperBound =
                            connector.anfStatementConnector[0].anfStatement?.performanceCircumstance?.result?.includeUpperBound === 'yes'
                                ? true
                                : false;

                        connector.anfStatementConnector[0].anfStatement.performanceCircumstance.timing.includeLowerBound =
                            connector.anfStatementConnector[0].anfStatement?.performanceCircumstance?.timing?.includeLowerBound === 'yes'
                                ? true
                                : false;
                        connector.anfStatementConnector[0].anfStatement.performanceCircumstance.timing.includeUpperBound =
                            connector.anfStatementConnector[0].anfStatement?.performanceCircumstance?.timing?.includeUpperBound === 'yes'
                                ? true
                                : false;
                    }
                });
            }
            delete element.componentType;
            delete element.anfOperatorType;
            delete element.operatorValue;
            delete element.markedMainANFStatement;
            delete element.selectedCategories;
            delete element.componentId;
            delete element.answerTextValue;
        });
        const saveQuestionnare = async () => {
            const response = await Endpoints.submitQuestionnaire({
                questionnaire: anf.updated
            });
            if (response.status === 200) {
                setShowAlert(true);
            }

        };
        saveQuestionnare();

        // setFiles({ item: data.test, ruleset: data.test.rulesets });
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

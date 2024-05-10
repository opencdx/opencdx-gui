import React, { useEffect, forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import ChildWrapper from './ChildWrapper';
import { Grid } from '@mui/material';
import { useAnfFormStore } from '../utils/useAnfFormStore';
import { Endpoints } from 'utils/axios/apiEndpoints';
import { openSnackbar } from 'utils/store/slices/snackbar';
import { useDispatch } from 'utils/store';
import ANFStatementPlaceholder from 'ui-component/cards/Skeleton/ANFStatementPlaceholder';

const MainWrapper = forwardRef(({ uploadedFile }, ref) => {
    const dispatchSnack = useDispatch();
    const [showSkeleton, setShowSkeleton] = useState(false);
    const { formData } = useAnfFormStore();
    const defaultValues = {
        item: uploadedFile.item
    };
    const { register, handleSubmit, control, getValues, errors, setValue, reset } = useForm({ defaultValues });

    useEffect(() => {
        reset({
            item: formData.item
        });
    }, [formData, reset]);

    const onSubmit = async (data) => {
        setShowSkeleton(true);
        const anf = JSON.parse(localStorage.getItem('anf-form'));
        anf.updated.item = data.item;
        let tempData = data;
        tempData.title = anf.updated.title;
        tempData.resourceType = anf.updated.resourceType;
        tempData.status = anf.updated.status;
        tempData.description = anf.updated.description;
        tempData.ruleId = anf.updated.ruleId || '';
        tempData.ruleQuestionId = anf.updated.ruleQuestionId?.ruleId ? [anf.updated.ruleQuestionId.ruleId] : [];
        localStorage.setItem('anf-form', JSON.stringify(anf));
        tempData.item = tempData.item.map(
            ({
                componentType,
                anfOperatorType,
                operatorValue,
                markedMainANFStatement,
                selectedCategories,
                componentId,
                answerTextValue,
                ...rest
            }) => {
                const { anfStatement } = rest?.item[0]?.anfStatementConnector[0] || {};
                console.log(
                    'anfStatement',
                    componentType,
                    anfOperatorType,
                    operatorValue,
                    markedMainANFStatement,
                    selectedCategories,
                    componentId,
                    answerTextValue
                );
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
                    if (
                        anfStatement.performanceCircumstance?.participant &&
                        !Array.isArray(anfStatement.performanceCircumstance.participant)
                    ) {
                        anfStatement.performanceCircumstance.participant = [anfStatement.performanceCircumstance.participant];
                    }
                    delete anfStatement.performanceCircumstance?.circumstanceType;
                }
                return { ...rest };
            }
        );

        try {
            const response = await Endpoints.submitQuestionnaire({
                questionnaire: tempData
            });
            console.log(response);
            dispatchSnack(
                openSnackbar({
                    open: true,
                    message: 'Successfully saved',
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: false
                })
            );
        } catch (error) {
            dispatchSnack(
                openSnackbar({
                    open: true,
                    message: 'Something went wrong',
                    variant: 'error',
                    alert: {
                        color: 'success'
                    },
                    close: false
                })
            );
            console.error(error);
        } finally {
            setShowSkeleton(false);
        }
    };

    return (
        <div ref={ref}>
            {showSkeleton ? (
                <ANFStatementPlaceholder />
            ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ChildWrapper {...{ control, register, getValues, setValue, errors, defaultValues }} />
                    <Grid sx={{ pt: 2 }}>
                        <Button disableElevation color="primary" size="large" type="submit" variant="contained">
                            Save
                        </Button>
                    </Grid>
                </form>
            )}
        </div>
    );
});

MainWrapper.propTypes = {
    uploadedFile: PropTypes.object
};

export default MainWrapper;

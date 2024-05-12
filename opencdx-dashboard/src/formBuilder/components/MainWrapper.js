import React, { useEffect, forwardRef, Suspense, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import { useAnfFormStore } from '../utils/useAnfFormStore';
import { Endpoints } from 'utils/axios/apiEndpoints';
import { openSnackbar } from 'utils/store/slices/snackbar';
import { useDispatch } from 'utils/store';
const ChildWrapperSuspense = React.lazy(() => import('./ChildWrapper'));

import ANFStatementPlaceholder from 'ui-component/cards/Skeleton/ANFStatementPlaceholder';

const MainWrapper = forwardRef(({ uploadedFile }, ref) => {
    const dispatchSnack = useDispatch();
    const { formData } = useAnfFormStore();
    const defaultValues = {
        item: uploadedFile.item
    };
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        getValues,
        setValue,
        reset,
        formState: { isSubmitting }
    } = useForm({ defaultValues });

    useEffect(() => {
        reset({
            item: formData.item
        });
    }, [formData, reset]);

    const onSubmit = async (data) => {
        setIsLoading(true);
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
        /* eslint-disable */
        tempData.item = tempData.item.map( ({ componentType, anfOperatorType, operatorValue, markedMainANFStatement, selectedCategories, componentId, answerTextValue, ...rest }) => {
        /* eslint-enable */
                const { anfStatement } = rest?.item[0]?.anfStatementConnector[0] || {};
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
            response &&
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
            setIsLoading(false);
        }
    };

    return (
        <div ref={ref}>
            {isLoading ? (
                <ANFStatementPlaceholder />
            ) : (
                <Suspense fallback={<ANFStatementPlaceholder />}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ChildWrapperSuspense {...{ control, register, getValues, setValue, defaultValues }} />
                        <Grid sx={{ pt: 2 }}>
                            <Button disabled={isSubmitting} color="primary" size="large" type="submit" variant="contained">
                                {isSubmitting ? 'Saving...' : 'Save'}
                            </Button>
                        </Grid>
                    </form>
                </Suspense>
            )}
        </div>
    );
});

MainWrapper.propTypes = {
    uploadedFile: PropTypes.object
};

export default MainWrapper;

import React, { useEffect, Suspense, useState } from 'react';
import PropTypes from 'prop-types';
import { FormProvider, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import { useAnfFormStore } from '../utils/useAnfFormStore';
import { Endpoints } from 'utils/axios/apiEndpoints';
import { openSnackbar } from 'utils/store/slices/snackbar';
import { useDispatch } from 'utils/store';
const ChildWrapperSuspense = React.lazy(() => import('./ChildWrapper'));

import ANFStatementPlaceholder from 'ui-component/cards/Skeleton/ANFStatementPlaceholder';

const MainWrapper = ({ uploadedFile }) => {
    const dispatchSnack = useDispatch();
    const { formData, setAnfData, anfData } = useAnfFormStore();
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
            ruleId: '',
            ruleQuestionId: [],
            item: formData?.item
        });
    }, [formData, reset]);

    const onSubmit = async (data) => {
        setIsLoading(true);
        const anf = anfData;
        anf.item = data.item;
        let tempData = data;
        tempData.title = anfData.title;
        tempData.resourceType = anfData.resourceType;
        tempData.status = anfData.status;
        tempData.description = anfData.description;
        tempData.ruleId = anfData.ruleId || '';
        tempData.ruleQuestionId = anfData.ruleQuestionId?.ruleId ? [anfData.ruleQuestionId.ruleId] : anf.ruleQuestionId;
        /* eslint-disable */
        tempData.item = tempData.item.map(
            (
                {
                    componentType,
                    operatorValue,
                    componentTypeAssociated,
                    markedMainANFStatement,
                    selectedCategories,
                    componentId,
                    items,
                    ...rest
                },
                i
            ) => {
                /* eslint-enable */
                rest.anfStatementConnector = rest.anfStatementConnector.map((connector, ival) => {
                    let { anfStatement, anfOperatorType } = connector;
                    if (anfStatement) {
                        if (componentType && componentType !== '') {
                            connector.anfStatementType = componentType;
                        } else {
                            if (
                                formData?.item &&
                                formData.item[i]?.anfStatementConnector &&
                                formData.item[i].anfStatementConnector[ival]?.anfStatementType
                            ) {
                                connector.anfStatementType = formData.item[i].anfStatementConnector[ival].anfStatementType;
                            }
                        }
                        if (anfOperatorType === '') {
                            connector.anfOperatorType = 'ANF_OPERATOR_TYPE_UNSPECIFIED';
                        }
                    }

                    return connector;
                });

                return { ...rest };
            }
        );

        try {
            let response;

            if (anfData && anfData?.id) {
                tempData.id = anfData.id;
                response = await Endpoints.updateQuestionnaire({
                    questionnaire: tempData
                });
                setAnfData(response.data);
            } else {
                response = await Endpoints.submitQuestionnaire({
                    questionnaire: tempData
                });
                setAnfData(response.data);
            }
            window.location.reload();
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
        <>
            {isLoading ? (
                <ANFStatementPlaceholder />
            ) : (
                <Suspense fallback={<ANFStatementPlaceholder />}>
                    <FormProvider {...{ control, register, getValues, setValue, defaultValues, reset }}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <ChildWrapperSuspense {...{ control, register, getValues, setValue, defaultValues }} />
                            <Grid sx={{ pt: 2 }}>
                                <Button disabled={isSubmitting} color="primary" size="large" type="submit" variant="contained">
                                    {isSubmitting ? 'Saving...' : 'Save'}
                                </Button>
                            </Grid>
                        </form>
                    </FormProvider>
                </Suspense>
            )}
        </>
    );
};

MainWrapper.propTypes = {
    uploadedFile: PropTypes.object
};

export default MainWrapper;

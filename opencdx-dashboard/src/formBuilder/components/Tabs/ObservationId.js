import React from 'react';

import PropTypes from 'prop-types';
import { FormControl, Grid, InputLabel, TextField } from '@mui/material';

import { Controller } from 'react-hook-form';
import { SystemVariables } from '../SystemVariables';

import { MainCard } from '../ui-component/MainCard';

export const ObservationId = ({ currentIndex, index, control, getValues, register }) => {
    return (
        <Grid item xs={12} lg={12}>
            <SystemVariables index={index} currentIndex={currentIndex} tab="observation" getValues={getValues} />
            <MainCard>
                <Grid item xs={12} sm={12} lg={12} sx={{ paddingBottom: 2 }}>
                    <InputLabel style={{ fontWeight: 'bold' }} horizontal>
                        Observation Type
                    </InputLabel>
                </Grid>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={12} lg={12}>
                        <FormControl fullWidth>
                            <Controller
                                name={`item.${index}.anfStatementConnector.${currentIndex}.anfStatement.topic`}
                                control={control}
                                value={'OBSERVATION_PROCEDURE'}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        {...register(`item.${index}.anfStatementConnector.${currentIndex}.anfStatement.type`)}
                                        
                                        fullWidth
                                        placeholder="Enter Subject Of Information"
                                    />
                                )}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </MainCard>
        </Grid>
    );
};
ObservationId.propTypes = {
    register: PropTypes.func,
    index: PropTypes.number,
    currentIndex: PropTypes.number,
    tab: PropTypes.string,
    control: PropTypes.object,
    getValues: PropTypes.func,
    filteredAttributes: PropTypes.array
};
export default ObservationId;

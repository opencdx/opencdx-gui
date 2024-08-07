import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormControl, Radio, RadioGroup, Divider, Grid, TextField, FormControlLabel } from '@mui/material';
import { Controller } from 'react-hook-form';
import { MainCard } from '../ui-component/MainCard';
import { InputLabel } from '../ui-component/InputLabel';

import { useAnfFormStore } from '../../utils/useAnfFormStore';

export const CircumstanceMeasureComponent = React.forwardRef(({ register, index, currentIndex, tab, control }, ref) => {
    const { formData } = useAnfFormStore();
    let initialStateLowerBound;
    if (formData.item?.[index]?.anfStatementConnector?.[currentIndex]?.anfStatement?.[tab]?.includeLowerBound === undefined) {
        initialStateLowerBound = 'not';
    } else {
        initialStateLowerBound = formData.item[index]?.anfStatementConnector?.[currentIndex]?.anfStatement[tab]?.includeLowerBound;
    }
    let initialStateUpperBound;
    if (formData.item?.[index]?.anfStatementConnector?.[currentIndex]?.anfStatement?.[tab]?.includeUpperBound === undefined) {
        initialStateUpperBound = 'not';
    } else {
        initialStateUpperBound = formData.item?.[index]?.anfStatementConnector?.[currentIndex]?.anfStatement?.[tab]?.includeUpperBound;
    }

    // eslint-disable-next-line no-unused-vars
    const [upperBoundOptionsState, setUpperBoundOptions] = useState(initialStateUpperBound);
    // eslint-disable-next-line no-unused-vars
    const [lowerBoundOptionsState, setLowerBoundOptions] = useState(initialStateLowerBound);

    return (
        <Grid item xs={12} lg={12} ref={ref}>
            <MainCard border>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12}>
                        <Grid container spacing={1} alignItems="center">
                            <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                                <InputLabel horizontal>Lower Bound</InputLabel>
                            </Grid>
                            <Grid item xs={12} sm={9} lg={8}>
                                
                                    <TextField
                                        {...register(`item.${index}.anfStatementConnector.${currentIndex}.anfStatement.${tab}.lowerBound`)}
                                        fullWidth
                                        type="text"
                                        InputProps={{
                                            inputProps: { min: 0 }
                                        }}
                                        placeholder="Enter Lower Bound Value"
                                    />
                                
                            </Grid>
                            <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                                <InputLabel horizontal>Include Lower Bound</InputLabel>
                            </Grid>
                            <Grid item xs={12} sm={9} lg={8}>
                                <FormControl>
                                    <Controller
                                        control={control}
                                        {...register(
                                            `item.${index}.anfStatementConnector.${currentIndex}.anfStatement.${tab}.includeLowerBound`
                                        )}
                                        render={({ field }) => (
                                            <RadioGroup
                                                row
                                                aria-label="includeLowerBound"
                                                name="includeLowerBound"
                                                {...field}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    setLowerBoundOptions(value);
                                                    field.onChange(value === 'true' ? true : value === 'false' ? false : null);
                                                }}
                                                // value={lowerBoundOptionsState}
                                                defaultValue={
                                                    lowerBoundOptionsState === false
                                                        ? 'false'
                                                        : lowerBoundOptionsState == true
                                                          ? 'true'
                                                          : 'not'
                                                }
                                            >
                                                <FormControlLabel value={'true'} control={<Radio />} label="Yes" />
                                                <FormControlLabel value={'false'} control={<Radio />} label="No" />
                                                <FormControlLabel value={'not'} control={<Radio />} label="Not Answered" />
                                            </RadioGroup>
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                                <InputLabel horizontal>Semantic</InputLabel>
                            </Grid>
                            <Grid item xs={12} sm={9} lg={8}>
                                
                                    <TextField
                                        {...register(`item.${index}.anfStatementConnector.${currentIndex}.anfStatement.${tab}.semantic`)}
                                        fullWidth
                                        placeholder="Enter Semantic Value"
                                    />
                                
                            </Grid>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                        <InputLabel horizontal>Resolution </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={8} lg={8}>
                        
                            <TextField
                                {...register(`item.${index}.anfStatementConnector.${currentIndex}.anfStatement.${tab}.resolution`)}
                                fullWidth
                                type="text"
                                InputProps={{
                                    inputProps: { min: 0 }
                                }}
                                placeholder="Enter Resolution"
                                data-testid="resolution"
                            />
                    </Grid>
                    <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                        <InputLabel horizontal>Upper Bound</InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={9} lg={8}>
                        
                            <TextField
                                {...register(`item.${index}.anfStatementConnector.${currentIndex}.anfStatement.${tab}.upperBound`)}
                                fullWidth
                                InputProps={{
                                    inputProps: { min: 0 }
                                }}
                                type="text"
                                placeholder="Enter Upper Bound Value"
                            />
                    </Grid>
                    <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                        <InputLabel horizontal>Include Upper Bound</InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={9} lg={6}>
                        <FormControl>
                            <Controller
                                control={control}
                                {...register(`item.${index}.anfStatementConnector.${currentIndex}.anfStatement.${tab}.includeUpperBound`)}
                                render={({ field }) => (
                                    <RadioGroup
                                        row
                                        aria-label="includeUpperBound"
                                        name="includeUpperBound"
                                        {...field}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setUpperBoundOptions(value);
                                            field.onChange(value === 'true' ? true : value === 'false' ? false : null);
                                        }}
                                        defaultValue={
                                            upperBoundOptionsState === false ? 'false' : upperBoundOptionsState == true ? 'true' : 'not'
                                        }
                                        // value={upperBoundOptionsState}
                                    >
                                        <FormControlLabel value={'true'} control={<Radio />} label="Yes" />
                                        <FormControlLabel value={'false'} control={<Radio />} label="No" />
                                        <FormControlLabel value={'not'} control={<Radio />} label="Not Answered" />
                                    </RadioGroup>
                                )}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </MainCard>
        </Grid>
    );
});
CircumstanceMeasureComponent.propTypes = {
    register: PropTypes.func,
    index: PropTypes.number,
    currentIndex: PropTypes.number,
    tab: PropTypes.string,
    control: PropTypes.any
};

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormControl, Radio, RadioGroup, Divider, Grid, TextField, FormControlLabel } from '@mui/material';
import { Controller } from 'react-hook-form';
import { MainCard } from '../ui-component/MainCard';
import { InputLabel } from '../ui-component/InputLabel';

import { systemVariables, statementType } from '../../store/constant';
import { useAnfFormStore } from '../../utils/useAnfFormStore';

export const MeasureComponent = React.forwardRef(({ register, index, currentIndex, tab, control }, ref) => {
    const { formData } = useAnfFormStore();
    const componentType =
        [statementType.MAIN, statementType.ASSOCIATED].includes(formData.item[index]?.componentType) &&
        !['timingMeasure', 'rangeMeasure', 'result'].includes(tab);
    const [lowerBoundState, setLowerBound] = useState(systemVariables[tab]?.lowerBound);
    const [upperBoundState, setUpperBound] = useState(systemVariables[tab]?.upperBound);
    const [resolutionState, setResolution] = useState(systemVariables[tab]?.resolution);
    const [semanticState, setSemantic] = useState(systemVariables[tab]?.semantic);
    const [upperBoundOptionsState, setUpperBoundOptions] = useState( systemVariables[tab]?.includeUpperBound     )
    const [lowerBoundOptionsState, setLowerBoundOptions] = useState(
        systemVariables[tab]?.includeUpperBound    );

    // useEffect(() => {
    //     const isComponentType =
    //     [statementType.MAIN, statementType.ASSOCIATED].includes(formData.item[index]?.anfStatementConnector[currentIndex]?.anfStatementType) &&
    //     !['timingMeasure', 'rangeMeasure', 'result'].includes(tab);
    //     if (isComponentType) {
    //         setLowerBoundOptions(systemVariables[tab]?.includeLowerBound);
    //     } else {
    //         formData.item[index]?.anfStatementConnector[currentIndex]?.anfStatement[tab]?.includeLowerBound &&
    //         setLowerBoundOptions(formData.item[index]?.anfStatementConnector[currentIndex]?.anfStatement[tab]?.includeLowerBound);
    //     }

    // }
    // , [formData]);
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
                                {componentType ? (
                                    <TextField
                                        {...register(`item.${index}.anfStatementConnector.${currentIndex}.anfStatement.${tab}.lowerBound`)}
                                        fullWidth
                                        type="text"
                                        value={lowerBoundState}
                                        placeholder="Enter Lower Bound Value"
                                        onChange={(e) => {
                                            setLowerBound(e.target.value);
                                        }}
                                    />
                                ) : (
                                    <TextField
                                        {...register(`item.${index}.anfStatementConnector.${currentIndex}.anfStatement.${tab}.lowerBound`)}
                                        fullWidth
                                        type="text"
                                        InputProps={{
                                            inputProps: { min: 0 }
                                        }}
                                        placeholder="Enter Lower Bound Value"
                                    />
                                )}
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
                                                    field.onChange(e.target.value); 
                                                    setLowerBoundOptions(e.target.value);
                                                }}
                                                value={lowerBoundOptionsState}
                                            >
                                                <FormControlLabel value={true} control={<Radio />} label="Yes" />
                                                <FormControlLabel value={false} control={<Radio />} label="No" />
                                                <FormControlLabel  control={<Radio />} label="Not Answered" />
                                            </RadioGroup>
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                                <InputLabel horizontal>Semantic</InputLabel>
                            </Grid>
                            <Grid item xs={12} sm={9} lg={8}>
                                {componentType ? (
                                    <TextField
                                        {...register(`item.${index}.anfStatementConnector.${currentIndex}.anfStatement.${tab}.semantic`)}
                                        fullWidth
                                        value={semanticState}
                                        onChange={(e) => {
                                            setSemantic(e.target.value);
                                        }}
                                        placeholder="Enter Semantic Value"
                                    />
                                ) : (
                                    <TextField
                                        {...register(`item.${index}.anfStatementConnector.${currentIndex}.anfStatement.${tab}.semantic`)}
                                        fullWidth
                                        placeholder="Enter Semantic Value"
                                    />
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                        <InputLabel horizontal>Resolution </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={8} lg={8}>
                        {componentType ? (
                            <TextField
                                {...register(`item.${index}.anfStatementConnector.${currentIndex}.anfStatement.${tab}.resolution`)}
                                fullWidth
                                value={resolutionState}
                                onChange={(e) => {
                                    setResolution(e.target.value);
                                }}
                                placeholder="Enter Resolution"
                                data-testid="resolution"
                            />
                        ) : (
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
                        )}
                    </Grid>
                    <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                        <InputLabel horizontal>Upper Bound</InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={9} lg={8}>
                        {componentType ? (
                            <TextField
                                type={'text'}
                                {...register(`item.${index}.anfStatementConnector.${currentIndex}.anfStatement.${tab}.upperBound`)}
                                fullWidth
                                value={upperBoundState}
                                onChange={(e) => {
                                    setUpperBound(e.target.value);
                                }}
                                placeholder="Enter Upper Bound Value"
                            />
                        ) : (
                            <TextField
                                {...register(`item.${index}.anfStatementConnector.${currentIndex}.anfStatement.${tab}.upperBound`)}
                                fullWidth
                                InputProps={{
                                    inputProps: { min: 0 }
                                }}
                                type="text"
                                placeholder="Enter Upper Bound Value"
                            />
                        )}
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
                                            field.onChange(e.target.value);

                                            setUpperBoundOptions(e.target.value);
                                        }}
                                        value={upperBoundOptionsState}
                                    >
                                       <FormControlLabel value={true} control={<Radio />} label="Yes" />
                                                <FormControlLabel value={false} control={<Radio />} label="No" />
                                                <FormControlLabel  control={<Radio />} label="Not Answered" />
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
MeasureComponent.propTypes = {
    register: PropTypes.func,
    index: PropTypes.number,
    currentIndex: PropTypes.number,
    tab: PropTypes.string,
    control: PropTypes.any
};

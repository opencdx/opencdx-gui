import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField } from '@mui/material';
import { MainCard } from '../ui-component/MainCard';
import { InputLabel } from '../ui-component/InputLabel';

import { systemVariables, statementType } from '../../store/constant';
import { useAnfFormStore } from '../../utils/useAnfFormStore';

export const ParticipantComponent = React.forwardRef(({ register, index, currentIndex, tab }, ref) => {
    const { formData } = useAnfFormStore();
    const componentType =
        [statementType.MAIN, statementType.ASSOCIATED].includes(formData.item[index]?.componentType) &&
        !['timingMeasure', 'rangeMeasure', 'result'].includes(tab);
    const [id, setId] = useState(systemVariables[tab]?.id);
    const [practitioner, setPractitioner] = useState(systemVariables[tab]?.practitionerValue);
    const [code, setCode] = useState(systemVariables[tab]?.code);
  

    
    return (
        <Grid item xs={12} lg={12} ref={ref}>
            <MainCard border>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12}>
                        <Grid container spacing={1} alignItems="center">
                            <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                                <InputLabel horizontal>ID</InputLabel>
                            </Grid>
                            <Grid item xs={12} sm={9} lg={8}>
                                {componentType ? (
                                    <TextField
                                        {...register(`item.${index}.anfStatementConnector.${currentIndex}.anfStatement.${tab}.id`)}
                                        fullWidth
                                        type="text"
                                        value={id}
                                        placeholder="Enter ID Value"
                                        onChange={(e) => {
                                            setId(e.target.value);
                                        }}
                                    />
                                ) : (
                                    <TextField
                                        {...register(`item.${index}.anfStatementConnector.${currentIndex}.anfStatement.${tab}.id`)}
                                        fullWidth
                                        type="text"
                                        InputProps={{
                                            inputProps: { min: 0 }
                                        }}
                                        placeholder="Enter ID Value"
                                    />
                                )}
                            </Grid>
                            <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                                <InputLabel horizontal>practitioner</InputLabel>
                            </Grid>
                            <Grid item xs={12} sm={9} lg={8}>
                                {componentType ? (
                                    <TextField
                                        {...register(`item.${index}.anfStatementConnector.${currentIndex}.anfStatement.${tab}.practitionerValue`)}
                                        fullWidth
                                        type="text"
                                        value={practitioner}
                                        placeholder="Enter Practitioner Value"
                                        onChange={(e) => {
                                            setPractitioner(e.target.value);
                                        }}
                                    />
                                ) : (
                                    <TextField
                                        {...register(`item.${index}.anfStatementConnector.${currentIndex}.anfStatement.${tab}.practitionerValue`)}
                                        fullWidth
                                        type="text"
                                        InputProps={{
                                            inputProps: { min: 0 }
                                        }}
                                        placeholder="Enter Practitioner Value"
                                    />
                                )}
                            </Grid>
                            <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                                <InputLabel horizontal>Code</InputLabel>
                            </Grid>
                            <Grid item xs={12} sm={9} lg={8}>
                                {componentType ? (
                                    <TextField
                                        {...register(`item.${index}.anfStatementConnector.${currentIndex}.anfStatement.${tab}.code`)}
                                        fullWidth
                                        type="text"
                                        value={code}
                                        placeholder="Enter Code Value"
                                        onChange={(e) => {
                                            setCode(e.target.value);
                                        }}
                                    />
                                ) : (
                                    <TextField
                                        {...register(`item.${index}.anfStatementConnector.${currentIndex}.anfStatement.${tab}.code`)}
                                        fullWidth
                                        type="text"
                                        InputProps={{
                                            inputProps: { min: 0 }
                                        }}
                                        placeholder="Enter Code Value"
                                    />
                                )}
                            </Grid>
                            
                           
                        </Grid>
                    </Grid>
                    
                </Grid>
            </MainCard>
        </Grid>
    );
});
ParticipantComponent.propTypes = {
    register: PropTypes.func,
    index: PropTypes.number,
    currentIndex: PropTypes.number,
    tab: PropTypes.string,
    control: PropTypes.any
};

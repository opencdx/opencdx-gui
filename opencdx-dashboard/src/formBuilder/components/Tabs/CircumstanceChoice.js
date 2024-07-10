import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

import { MeasureComponent } from '../TabComponents/MeasureComponent';
// import { ParticipantComponent } from '../TabComponents/ParticipantComponent';
import { FormControl, Grid, TextField } from '@mui/material';
import { MainCard } from '../ui-component/MainCard';
import { InputLabel } from '../ui-component/InputLabel';

import { systemVariables, statementType } from '../../store/constant';
import { SystemVariables } from '../SystemVariables';
import { useAnfFormStore } from '../../utils/useAnfFormStore';

export const CircumstanceChoice = React.forwardRef(({ control, register, index, currentIndex, getValues }, ref) => {
    const { formData } = useAnfFormStore();
    const componentType = [statementType.MAIN, statementType.ASSOCIATED].includes(formData.item[index]?.componentType);
    const [id, setId] = useState(systemVariables['circumstance']?.id);
    const [practitioner, setPractitioner] = useState(systemVariables['circumstance']?.practitionerValue);
    const [code, setCode] = useState(systemVariables['circumstance']?.code);
  
    return (
        <Grid item xs={12} lg={12} ref={ref}>
            <SystemVariables index={index} currentIndex={currentIndex} getValues={getValues} tab="performanceCircumstance" />
            <MainCard>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                        <InputLabel horizontal>Circumstance Type </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={9} lg={8}>
                        <TextField fullWidth type="text" value="Performance Circumstance" />
                    </Grid>
                    <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                        <InputLabel horizontal>Status</InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={9} lg={8}>
                        <TextField
                            {...register(
                                `item.${index}.item.${currentIndex}..anfStatementConnector[0].anfStatement.performanceCircumstance.status`
                            )}
                            fullWidth
                            placeholder="Enter Type Information"
                            defaultValue={JSON.stringify(systemVariables['status'])}
                        />
                    </Grid>

                    <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                        <InputLabel horizontal>Result</InputLabel>
                    </Grid>
                    {<MeasureComponent {...{ control, register, index, currentIndex }} tab="performanceCircumstance.result" />}
                    <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                        <InputLabel horizontal>Health Risks</InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={9} lg={8}>
                        <FormControl fullWidth>
                            {componentType ? (
                                <TextField
                                    {...register(
                                        `item.${index}.anfStatementConnector.${currentIndex}.anfStatement.performanceCircumstance.healthRisk`
                                    )}
                                    fullWidth
                                    placeholder="Enter Health Risk Information"
                                    defaultValue={systemVariables['performanceCircumstance'][0].healthRisk.replace('XXXXX', '')}
                                />
                            ) : (
                                <TextField
                                    {...register(
                                        `item.${index}.anfStatementConnector.${currentIndex}.anfStatement.performanceCircumstance.healthRisk`
                                    )}
                                    fullWidth
                                    placeholder="Enter Health Risk Information"
                                />
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                        <InputLabel horizontal>Normal Range</InputLabel>
                    </Grid>
                    {<MeasureComponent {...{ control, register, index, currentIndex }} tab="performanceCircumstance.normalRange" />}
                    {/* <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important', marginTop: 10 } }}>
                        <InputLabel horizontal>Circumstance</InputLabel>
                    </Grid>
                    {<ParticipantComponent {...{ control, register, index, currentIndex }} tab="performanceCircumstance.circumstance" />} */}

                    <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important', marginTop: 10 } }}>
                        <InputLabel horizontal>Timing</InputLabel>
                    </Grid>
                    {<MeasureComponent {...{ control, register, index, currentIndex }} tab="performanceCircumstance.timing" />}
                    <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important', marginTop: 10 } }}>
                        <InputLabel horizontal>Participant</InputLabel>
                    </Grid>
                    <Grid container spacing={1} alignItems="center">
                            <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                                <InputLabel horizontal>ID</InputLabel>
                            </Grid>
                            <Grid item xs={12} sm={9} lg={8}>
                                {componentType ? (
                                    <TextField
                                        {...register(`item.${index}.anfStatementConnector.${currentIndex}.anfStatement.performanceCircumstance.participant.id`)}
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
                                        {...register(`item.${index}.anfStatementConnector.${currentIndex}.anfStatement.performanceCircumstance.participant.id`)}
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
                                        {...register(`item.${index}.anfStatementConnector.${currentIndex}.anfStatement.performanceCircumstance.participant.practitionerValue`)}
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
                                        {...register(`item.${index}.anfStatementConnector.${currentIndex}.anfStatementperformanceCircumstance.participant.practitionerValue`)}
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
                                        {...register(`item.${index}.anfStatementConnector.${currentIndex}.anfStatement.performanceCircumstance.participant.code`)}
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
                                        {...register(`item.${index}.anfStatementConnector.${currentIndex}.anfStatement.performanceCircumstance.participant.code`)}
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
                    {/* {<ParticipantComponent {...{ control, register, index, currentIndex }} tab={'performanceCircumstance.participant'} />} */}
                </Grid>
            </MainCard>
        </Grid>
    );
});

CircumstanceChoice.propTypes = {
    register: PropTypes.func,
    control: PropTypes.object,
    index: PropTypes.number,
    currentIndex: PropTypes.number,
    getValues: PropTypes.func
};

import React from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField } from '@mui/material';

import { MainCard } from '../ui-component/MainCard';
import { InputLabel } from '../ui-component/InputLabel';
import { systemVariables, statementType } from '../../store/constant';
import { useAnfFormStore } from '../../utils/useAnfFormStore';

export const ExpressionType = React.forwardRef(({ register, index, currentIndex, tab }, ref) => {
    const { formData } = useAnfFormStore();
    const componentType = [statementType.MAIN, statementType.ASSOCIATED].includes(formData.item[index]?.componentType);
    return (
        <Grid item xs={12} lg={12} ref={ref}>
            <MainCard border>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                                <InputLabel horizontal>Expression Type</InputLabel>
                            </Grid>
                            <Grid item xs={12} sm={9} lg={8}>
                                {componentType ? (
                                    <TextField
                                        {...register(`item.${index}.anfStatementConnector.${currentIndex}.anfStatement.${tab}.expressionType`)}
                                        fullWidth
                                        placeholder="Enter ExpressionType Value"
                                        value={systemVariables[tab].expressionType}
                                    />
                                ) : (
                                    <TextField
                                        {...register(`item.${index}.anfStatementConnector.${currentIndex}.anfStatement.${tab}.expressionType`)}
                                        fullWidth
                                        placeholder="Enter ExpressionType Value"
                                    />
                                )}
                            </Grid>

                            <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                                <InputLabel horizontal>Expression Language</InputLabel>
                            </Grid>
                            <Grid item xs={12} sm={9} lg={8}>
                                {componentType ? (
                                    <TextField
                                        {...register(`item.${index}.anfStatementConnector.${currentIndex}.anfStatement.${tab}.expressionLanguage`)}
                                        fullWidth
                                        placeholder="Enter ExpressionLanguage Value"
                                        value={systemVariables[tab].expressionLanguage}
                                    />
                                ) : (
                                    <TextField
                                        {...register(`item.${index}.anfStatementConnector.${currentIndex}.anfStatement.${tab}.expressionLanguage`)}
                                        fullWidth
                                        placeholder="Enter ExpressionLanguage Value"
                                    />
                                )}
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                        <InputLabel horizontal>Expression Value</InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={9} lg={8}>
                        {componentType ? (
                            <TextField
                                {...register(`item.${index}.anfStatementConnector.${currentIndex}.anfStatement.${tab}.expressionValue`)}
                                fullWidth
                                placeholder="Enter ExpressionValue Value"
                                value={systemVariables[tab].expressionValue}
                            />
                        ) : (
                            <TextField
                                {...register(`item.${index}.anfStatementConnector.${currentIndex}.anfStatement.${tab}.expressionValue`)}
                                fullWidth
                                placeholder="Enter ExpressionValue Value"
                            />
                        )}
                    </Grid>
                    <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                        <InputLabel horizontal>Expression Value</InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={9} lg={8}>
                        {componentType ? (
                            <TextField
                                {...register(`item.${index}.anfStatementConnector.${currentIndex}.anfStatement.${tab}.expressionDescription`)}
                                fullWidth
                                placeholder="Enter Expression Description Value"
                                value={systemVariables[tab].expressionDescription}
                            />
                        ) : (
                            <TextField
                                {...register(`item.${index}.anfStatementConnector.${currentIndex}.anfStatement.${tab}.expressionDescription`)}
                                fullWidth
                                placeholder="Enter expressionDescription Value"
                            />
                        )}
                    </Grid>
                </Grid>
            </MainCard>
        </Grid>
    );
});
ExpressionType.propTypes = {
    register: PropTypes.func,
    index: PropTypes.number,
    currentIndex: PropTypes.number,
    tab: PropTypes.string
};

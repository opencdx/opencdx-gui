import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, Typography, Grid, MenuItem, Select } from '@mui/material';
import { Controller } from 'react-hook-form';
import { AccordianWrapper } from './ui-component/AccordianWrapper';
import { CustomTabs } from './ui-component/CustomTabs';
import { Button } from '@mui/material';


const ANF_OPERATOR_TYPE_EQUAL = 'ANF_OPERATOR_TYPE_EQUAL';
const ANF_OPERATOR_TYPE_NOT_EQUAL = 'ANF_OPERATOR_TYPE_NOT_EQUAL';

const OptionWrapper = React.forwardRef(({ control, register, index, item, getValues}, ref) => {
    // eslint-disable-next-line no-unused-vars
    const [showValueField, setShowValueField] = React.useState(false);
    const [anfStatementConnector, setAnfStatementConnector] = React.useState(item?.anfStatementConnector);

    const handleAddButtonClick = () => {
        const newConnector = {
            anfStatementType: '',
            anfOperatorType: '',
            anfStatement: {},
        };

        if (!anfStatementConnector) {
            setAnfStatementConnector([newConnector]);
            return;
            
        }else{
            setAnfStatementConnector([...anfStatementConnector, newConnector]);
        }
    };
    const getOptions = (type) => {
        const choices = [];
        switch (type) {
            case 'boolean':
                return ['Yes', 'No'];
            case 'choice':
                for (let i = 0; i < item.answerOption?.length; i++) {
                    choices.push(item.answerOption[i].valueCoding.display);
                }
                return choices;
            case 'integer':
                return ['Any value', 'Value'];
            case 'logical':
                return [
                    { value: ANF_OPERATOR_TYPE_EQUAL, label: 'Equal' },
                    { value: ANF_OPERATOR_TYPE_NOT_EQUAL, label: 'Not Equal' }
                ];
            default:
                return [];
        }
    };

    return (
        <Grid item xs={12} lg={12} sx={{ pt: 2 }} ref={ref}>
            
            {anfStatementConnector && anfStatementConnector?.length > 0 ? (
                anfStatementConnector.map((connector, i) => (
                    <div style={{ display: 'flex', flexDirection: 'column' }} key={i}>
                        <Grid container sx={{ pl: 2 }}>
                            <Grid item xs={12} sm={3} lg={4} sx={{ pt: 2, pr: 2 }}>
                                <Typography variant="subtitle1">Operator</Typography>
                                <FormControl fullWidth sx={{ pt: 2 }}>
                                    <Controller
                                        fullWidth
                                        {...register(`item.${index}.anfStatementConnector.${i}.anfOperatorType`, { value: '' })}
                                        control={control}
                                        render={({ field }) => (
                                            <Select {...field} id={`item.${index}.item.${0}.anfStatementConnector.${i + 1}.operatorValue`}>
                                                {getOptions('logical').map((option, index) => (
                                                    <MenuItem key={index} value={option.value || option}>
                                                        {option.label || option}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        )}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={3} lg={4} sx={{ pt: 2 }}>
                                <Typography variant="subtitle1">Answer</Typography>

                                <FormControl fullWidth sx={{ pt: 2 }}>
                                    <Controller
                                        fullWidth
                                        {...register(`item.${index}.anfStatementConnector.${i}.operatorValue`)}
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e.target.value);
                                                    if (e.target.value === 'Value') {
                                                        setShowValueField(true);
                                                    } else {
                                                        setShowValueField(false);
                                                    }
                                                }}
                                            >
                                                {getOptions(item.type).map((option, index) => (
                                                    <MenuItem key={index} value={option}>
                                                        {option}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid style={{ display: 'flex', alignItems: 'baseline' }}>
                            <Grid item xs={12} lg={4} sx={{ pt: 2, pr: 2 }}>
                                <AccordianWrapper title="Anf Statement">
                                    <CustomTabs currentIndex={i} {...{ control, register, index, item, getValues }} />
                                </AccordianWrapper>
                            </Grid>
                            {/* <Button variant="contained" type="button" onClick={() => remove(index)} size="small">
                                Remove
                            </Button> */}
                        </Grid>
                    </div>
                ))
            ) : (
                <>
                   
                </>
            )}
            {item.type !== 'integer' && (
                <Grid sx={{ pt: 2, textAlign: 'right' }}>
                    <Button disableElevation variant="contained" color="primary" size="small" type="button" onClick={() => handleAddButtonClick()}>
                        + Add ANF Statement
                    </Button>
                </Grid>
            )}
        </Grid>
    );
});
OptionWrapper.propTypes = {
    control: PropTypes.any,
    register: PropTypes.any,
    index: PropTypes.number,
    item: PropTypes.any
};

export default OptionWrapper;

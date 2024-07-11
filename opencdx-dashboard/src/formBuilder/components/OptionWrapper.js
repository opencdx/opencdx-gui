import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormControl, Typography, Grid, MenuItem, Select } from '@mui/material';
import { Controller } from 'react-hook-form';
import { AccordianWrapper } from './ui-component/AccordianWrapper';
import { CustomTabs } from './ui-component/CustomTabs';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';

const ANF_OPERATOR_TYPE_EQUAL = 'ANF_OPERATOR_TYPE_EQUAL';
const ANF_OPERATOR_TYPE_NOT_EQUAL = 'ANF_OPERATOR_TYPE_NOT_EQUAL';

const OptionWrapper = React.forwardRef(({ control, register, index, item, getValues, setValue }, ref) => {
    const [anfStatementConnector, setAnfStatementConnector] = React.useState(item?.anfStatementConnector);
    useEffect(() => {
        const newConnector = {
            anfStatementType: '',
            anfOperatorType: '',
            anfStatement: {}
        };

        if (!anfStatementConnector) {
            setAnfStatementConnector([newConnector]);
            return;
        }
    }, []);

    const handleAddButtonClick = () => {
        const newConnector = {
            anfStatementType: '',
            anfOperatorType: '',
            anfStatement: {}
        };

        if (!anfStatementConnector) {
            setAnfStatementConnector([newConnector]);
            return;
        } else {
            setAnfStatementConnector([...anfStatementConnector, newConnector]);
        }
    };
    const getOptions = (type) => {
        const choices = [];
        const groupItem = item?.item;
        switch (type) {
            case 'boolean':
                return ['Yes', 'No'];
            case 'choice':
                for (let i = 0; i < item.answerOption?.length; i++) {
                    choices.push(item.answerOption[i].valueCoding.display);
                }
                return choices;
            case 'group':
                if (groupItem && groupItem.length > 0) {
                    for (let j = 0; j < groupItem[0].answerOption?.length; j++) {
                        choices.push(groupItem[0].answerOption[j].valueCoding.display);
                    }
                }
                return choices;
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
                                <Typography variant="subtitle1">Value</Typography>

                                <FormControl fullWidth sx={{ pt: 2 }}>
                                    <Controller
                                        control={control}
                                        {...register(`item.${index}.anfStatementConnector.${i}.operatorValue`)}
                                        render={({ field }) =>
                                            item.type === 'boolean' || item.type === 'choice' ||  item.type === 'group' ? (
                                                <Select
                                                    {...field}
                                                    defaultSelectedKeys={[field.value]}
                                                    onChange={(e) => {
                                                        field.onChange(e.target.value);
                                                        console.log(e.target.value);
                                                    }}
                                                >
                                                    {getOptions(item.type).map((option, index) => (
                                                        <MenuItem key={index} value={option}>
                                                            {option}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            ) : (
                                                <TextField
                                                    fullWidth
                                                    placeholder="Enter the Value"
                                                    type={ 'text'}
                                                    {...register(`item.${index}.anfStatementConnector.${i}.operatorValue`)}
                                                />
                                            )
                                        }
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid style={{ display: 'flex', alignItems: 'baseline' }}>
                            <Grid item xs={12} lg={4} sx={{ pt: 2, pr: 2 }}>
                                <AccordianWrapper title="Anf Statement">
                                    <CustomTabs currentIndex={i} {...{ control, register, index, item, getValues, setValue }} />
                                </AccordianWrapper>
                            </Grid>      
                        </Grid>
                    </div>
                ))
            ) : (
                <></>
            )}
            {
                <Grid sx={{ pt: 2, textAlign: 'right' }}>
                    <Button
                        disableElevation
                        variant="contained"
                        color="primary"
                        size="small"
                        type="button"
                        onClick={() => handleAddButtonClick()}
                    >
                        + Add ANF Statement
                    </Button>
                </Grid>
            }
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

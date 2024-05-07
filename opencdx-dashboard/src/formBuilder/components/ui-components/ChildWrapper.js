import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFieldArray } from 'react-hook-form';
import StatementTypes from './StatementTypes';
import OptionWrapper from './OptionWrapper';
import { ComponentID } from '../TabComponents/ComponentID';
import { AccordianWrapper } from './AccordianWrapper';
import { Grid, FormControl, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Controller } from 'react-hook-form';
import { useAnfFormStore } from '../../utils/useAnfFormStore';
import { statementType } from '../../store/constant';
import { Endpoints } from 'utils/axios/apiEndpoints';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const ChildWrapper = ({ control, register }) => {
    const { formData } = useAnfFormStore();
    const [hideOptions, setHideOptions] = React.useState(true);
    const { fields, remove } = useFieldArray({
        control,
        name: 'item'
    });
    const [ruleSets, setRuleSets] = React.useState([]);
    const [responseRule, setResponseRule] = React.useState([]);

    const theme = useTheme();
    const handleStatementTypeChange = (value) => setHideOptions(value !== statementType.USER_QUESTION);

    useEffect(() => {
        const fetchRules = async () => {
            Endpoints.rulesetList({
                organizationId: 'organizationId',
                workspaceId: 'workspaceId'
            })
                .then((response) => {
                    const rules = response.data.ruleSets.map((rule) => {
                        return  rule.ruleId
                    });
                    setRuleSets(rules);
                    const ruleQuestion = formData.item.map((rule) => {
                        console.log(rule)
                        return{
                            ruleId: rule.linkId,
                            label: rule.text
                        }
                    });
                    console.log(ruleQuestion)
                    setResponseRule(ruleQuestion);
                })
                .catch((err) => err);
        };
        fetchRules();
    }, []);
    return (
        <div className="wrapper">
            {fields.map((item, index) => (
                <AccordianWrapper key={index} title={`${index + 1}. ${item.text} - ${item.linkId}`} remove={() => remove(index)}>
                    <ComponentID {...{ control, register, index }} />
                    <StatementTypes {...{ control, register, index, item }} handleStatementTypeChange={handleStatementTypeChange} />
                    {hideOptions && <OptionWrapper {...{ control, register, index, item }} />}
                </AccordianWrapper>
            ))}

            <Grid
                container
                item
                xs={12}
                lg={12}
                mt={1}
                padding={3}
                alignItems="center"
                sx={{
                    border: '1px solid',
                    borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.light + 15 : theme.palette.grey[200],
                    ':hover': {
                        boxShadow: theme.palette.mode === 'dark' ? '0 2px 14px 0 rgb(33 150 243 / 10%)' : '0 2px 14px 0 rgb(32 40 45 / 8%)'
                    }
                }}
            >
                <Grid item xs={12} sm={3} lg={2} marginBottom={2}>
                    <Typography variant="h5" gutterBottom>
                        Select a rule
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={9} lg={10}>
                    <FormControl fullWidth>
                        <Controller
                            name={`ruleId`}
                            {...register(`ruleId`)}
                            control={control}
                            render={({ field }) => (
                                <Autocomplete
                                    onChange={(_,data) => {
                                        field.onChange(data || '')
                                    }}
                                    defaultValue={formData?.ruleId ? formData?.ruleId : ruleSets[0]}
                                    id="controllable-states-demo"
                                    options={ruleSets}
                                    renderInput={(params) => <TextField {...params} {...field}  />}
                                />
                            )}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={3} lg={2} mt={2}>
                    <Typography variant="h5" gutterBottom>
                        Select response for rule
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={9} lg={10} mt={2}>
                    <FormControl fullWidth>
                        <Controller
                            name={`ruleQuestionId`}
                            {...register(`ruleQuestionId`)}
                            control={control}
                            render={({ field }) => (
                                <Autocomplete
                                    onChange={(_,data) => {
                                        field.onChange(data || '')
                                    }}
                                    defaultValue={formData.ruleQuestionId ? formData.ruleQuestionId : responseRule[0]}
                                    id="controllable-states-demo"
                                    options={responseRule}
                                    renderInput={(params) => <TextField {...params} {...field}  />}
                                />
                                
                            )}
                        />
                    </FormControl>
                </Grid>
            </Grid>
        </div>
    );
};

ChildWrapper.propTypes = {
    register: PropTypes.func,
    control: PropTypes.object
};

export default ChildWrapper;

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFieldArray } from 'react-hook-form';
import StatementTypes from './StatementTypes';
import OptionWrapper from './OptionWrapper';
import { ComponentID } from './TabComponents/ComponentID';
import { AccordianWrapper } from './ui-component/AccordianWrapper';
import { Grid, FormControl, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Controller } from 'react-hook-form';
import { useAnfFormStore } from '../utils/useAnfFormStore';
import { statementType } from '../store/constant';
import { Endpoints } from 'utils/axios/apiEndpoints';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { openSnackbar } from 'utils/store/slices/snackbar';
import { useDispatch } from 'utils/store';

const ChildWrapper = ({ control, register }) => {
    const { formData } = useAnfFormStore();
    const dispatch = useDispatch();

    const [hideOptions, setHideOptions] = React.useState(true);
    const { fields, remove } = useFieldArray({
        control,
        name: 'item'
    });
    const [ruleSets, setRuleSets] = React.useState([]);
    const [responseRule, setResponseRule] = React.useState([]);
    const [defaultRule, setDefaultRule] = React.useState([]);
    const [defaultId, setDefaultId] = React.useState('');
    const [ruleset, setRuleSet] = React.useState([]);

    const theme = useTheme();
    const handleStatementTypeChange = (value) => setHideOptions(value !== statementType.USER_QUESTION);

    useEffect(() => {
        const fetchRules = async () => {
            Endpoints.rulesetList({
                organizationId: 'organizationId',
                workspaceId: 'workspaceId'
            })
                .then((response) => {
                    setRuleSet(response.data.ruleSets);
                    const rules = response.data.ruleSets.map((rule) => {
                        return rule.name;
                    });
                    if (formData.ruleId) {
                        setDefaultId('Blood Pressure');
                    }

                    setRuleSets(rules);
                    const ruleQuestion = formData.item.map((rule) => {
                        return {
                            ruleId: rule.linkId,
                            label: rule.text
                        };
                    });
                    if (formData?.ruleQuestionId) {
                        const ruleQuestionId = Array.isArray(formData?.ruleQuestionId)
                            ? formData.ruleQuestionId[0]
                            : formData.ruleQuestionId;
                        const selectedRule = Object.hasOwn(ruleQuestionId, 'ruleId')
                            ? ruleQuestionId
                            : ruleQuestion.find((rule) => rule.ruleId === ruleQuestionId);
                        setDefaultRule(selectedRule);
                    }
                    setResponseRule(ruleQuestion);
                })
                .catch(() => {
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: 'Something went wrong.',
                            variant: 'error',
                            alert: {
                                color: 'success'
                            },
                            close: false
                        })
                    );
                });
        };
        fetchRules();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);
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
                                    onChange={(_, data) => {
                                        field.onChange(data || '');
                                        const anf = JSON.parse(localStorage.getItem('anf-form'));
                                        const ruleId = ruleset.find((rule) => rule.name === data)?.ruleId;
                                        anf.updated.ruleId = ruleId;
                                        localStorage.setItem('anf-form', JSON.stringify(anf));

                                        setDefaultId(data);
                                    }}
                                    value={defaultId}
                                    id="controllable-states-demo1"
                                    options={ruleSets}
                                    renderInput={(params) => <TextField {...params} {...field} />}
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
                                    onChange={(_, data) => {
                                        setDefaultRule(data);
                                        field.onChange(data || '');
                                        const anf = JSON.parse(localStorage.getItem('anf-form'));
                                        anf.updated.ruleQuestionId = data;
                                        localStorage.setItem('anf-form', JSON.stringify(anf));
                                    }}
                                    value={defaultRule}
                                    id="controllable-states-demo"
                                    options={responseRule}
                                    renderInput={(params) => <TextField {...params} {...field} />}
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

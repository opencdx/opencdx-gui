import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useFieldArray } from 'react-hook-form';
import StatementTypes from './StatementTypes';
import OptionWrapper from './OptionWrapper';
import { ComponentID } from '../TabComponents/ComponentID';
import { AccordianWrapper } from './AccordianWrapper';
import { Grid, FormControl, Select, MenuItem, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Controller } from 'react-hook-form';
import { useAnfFormStore } from '../../utils/useAnfFormStore';
import { statementType } from '../../store/constant';
import { Endpoints } from 'utils/axios/apiEndpoints';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

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
    // const [selectedRule, setSelectedRule] = useState(null);
   
    useEffect(() => {
        const fetchRules = async () => {
            Endpoints.rulesetList(
                {
                    organizationId: "organizationId",
                    workspaceId: "workspaceId"
                }).then((response) => {
                    console.log(formData);
                    const rules = response.data.ruleSets.map((rule) => {
                        return {
                            name: rule.ruleId,
                        };
                    })
                    setRuleSets(rules);
                    const ruleQuestion = formData.item.map((rule) => {
                        return {
                            name: rule.text,
                            code: rule.linkId
                        };
                    }
                    )
                    setResponseRule(ruleQuestion);
                    
                }).catch(err => err);
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
                            name={`item.ruleId`}
                            {...register(`item.ruleId`)}
                            control={control}
                            defaultValue={formData.ruleId ? formData.ruleId[0] : ''}
                            render={({ field }) => (
                                <Dropdown id={field.name}  value={field.value} onChange={(e) => {
                                    field.onChange(e.value||'')
                                }
                                    
                                } options={ruleSets} optionLabel="name" showClear placeholder="Select a Rule" className="w-full md:w-14rem" />
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
                            name={`item.ruleQuestionId`}
                            {...register(`item.ruleQuestionId`)}
                            control={control}
                            defaultValue={formData.ruleQuestionId ? formData.ruleQuestionId[0] : ''}
                            render={({ field }) => (
                                <Dropdown id={field.name} value={field.value} onChange={(e) => field.onChange(e.value || '')} options={responseRule} optionLabel="name" showClear placeholder="Select a Rule" className="w-full md:w-14rem" />
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

import React, { useEffect } from 'react';
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
import axios from 'utils/axios';

const ChildWrapper = ({ control, register }) => {
    const { formData } = useAnfFormStore();
    const [hideOptions, setHideOptions] = React.useState(true);
    const { fields, remove } = useFieldArray({
        control,
        name: 'item'
    });
    const [ruleSets, setRuleSets] = React.useState([]);
    const theme = useTheme();
    const handleStatementTypeChange = (value) => setHideOptions(value !== statementType.USER_QUESTION);

    useEffect(() => {
        const fetchRules = async () => {
            axios.post('/classification/ruleset/list',
            {
                organizationId: "organizationId",
                workspaceId: "workspaceId"
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('serviceToken')}`
                }
            }).then((response) => {
                setRuleSets(response.data.ruleSets);
            })
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
                <Grid item xs={12} sm={3} lg={2}>
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
                            defaultValue={formData ? formData.ruleId : ''}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    id={`item.ruleIds`}
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    // onClick={(e) => setFormData({ ruleset: e.target.value })}
                                >
                                    {ruleSets.map((ruleset) => (
                                        <MenuItem key={ruleset.ruleId} value={ruleset.ruleId}>
                                            {ruleset.type} - {ruleset.category} - {ruleset.description} - {ruleset.ruleId}
                                        </MenuItem>
                                    ))}
                                </Select>
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

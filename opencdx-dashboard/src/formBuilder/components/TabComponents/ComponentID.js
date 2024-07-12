import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField, FormControl, Typography } from '@mui/material';
import { MainCard } from '../ui-component/MainCard';
import generateUUID from '../../utils/GenerateUUID';

export const ComponentID = forwardRef(({ register, index, item }, ref) => {
    return (
        <Grid item xs={12} lg={12} sx={{ pt: 2 }} ref={ref}>
            <MainCard border>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                                <Typography variant="subtitle1">Component ID</Typography>
                            </Grid>
                            <Grid item xs={12} sm={3} lg={8}>
                                <FormControl fullWidth>
                                    <TextField
                                        fullWidth
                                        disabled
                                        placeholder="Generate Component UUID"
                                        defaultValue={item?.componentId ?? generateUUID()}
                                        id={`component-id-${index}`}
                                        name={`component-id-${index}`}
                                        {...register(`item.${index}.componentId`)}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </MainCard>
        </Grid>
    );
});

ComponentID.propTypes = {
    register: PropTypes.func,
    index: PropTypes.number,
    item: PropTypes.object
};

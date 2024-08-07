import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Time } from '../Tabs/Time';
import { Authors } from '../Tabs/Authors';
import { Type } from '../Tabs/Type';
import { CircumstanceChoice } from '../Tabs/CircumstanceChoice';
import { ObservationId } from '../Tabs/ObservationId';
import { SubjectofRecord } from '../Tabs/SubjectofRecord';
import { SubjectOfInformation } from '../Tabs/SubjectOfInformation';
function CustomTabPanel(props) {
    const { children, tabState, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={tabState !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {tabState === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number,
    tabState: PropTypes.number
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

export const CustomTabs = React.forwardRef(({ control, register, index, currentIndex, item, getValues, setValue }, ref) => {
    const [tabState, setTabState] = React.useState(0);

    const handleChange = (event, newValue) => {
        setTabState(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} ref={ref}>
                <Tabs
                    value={tabState}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                    onChange={handleChange}
                >
                    <Tab sx={{ textTransform: 'none' }} label="Time" {...a11yProps(0)} />
                    <Tab sx={{ textTransform: 'none' }} label="Subject of Record" {...a11yProps(1)} />
                    <Tab sx={{ textTransform: 'none' }} label="Authors" {...a11yProps(2)} />
                    <Tab sx={{ textTransform: 'none' }} label="Subject Of Information" {...a11yProps(3)} />
                    <Tab sx={{ textTransform: 'none' }} label="Topic" {...a11yProps(4)} />
                    <Tab sx={{ textTransform: 'none' }} label="Type" {...a11yProps(5)} />
                    <Tab sx={{ textTransform: 'none' }} label="Circumstance Choice" {...a11yProps(6)} />
                </Tabs>
            </Box>
            <CustomTabPanel tabState={tabState} index={0}>
                <Time {...{ control, register, index, currentIndex, item, getValues, setValue }} />
            </CustomTabPanel>
            <CustomTabPanel tabState={tabState} index={1}>
                <SubjectofRecord {...{ control, register, index, currentIndex, item, getValues, setValue }} />
            </CustomTabPanel>
            <CustomTabPanel tabState={tabState} index={2}>
                <Authors {...{ control, register, index, currentIndex, item, getValues, setValue }} />
            </CustomTabPanel>
            <CustomTabPanel tabState={tabState} index={3}>
                <SubjectOfInformation {...{ control, register, index, currentIndex, item, getValues, setValue }} />
            </CustomTabPanel>
            <CustomTabPanel tabState={tabState} index={4}>
                <ObservationId {...{ control, register, index, currentIndex, item, getValues, setValue }} />
            </CustomTabPanel>
            <CustomTabPanel tabState={tabState} index={5}>
                <Type {...{ control, register, index, currentIndex, item, getValues, setValue }} />
            </CustomTabPanel>
            <CustomTabPanel tabState={tabState } index={6}>
                <CircumstanceChoice {...{ control, register, index, currentIndex, item, getValues, setValue }} />
            </CustomTabPanel>
        </Box>
    );
});
CustomTabs.propTypes = {
    control: PropTypes.object,
    register: PropTypes.any,
    index: PropTypes.number,
    currentIndex: PropTypes.number,
    item: PropTypes.any,
    getValues: PropTypes.any,
    setValue: PropTypes.func
};

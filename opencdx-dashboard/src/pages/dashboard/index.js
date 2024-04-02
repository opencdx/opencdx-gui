import { React, useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import EmojiEmotionsTwoToneIcon from '@mui/icons-material/EmojiEmotionsTwoTone';
import RemoveRedEyeTwoToneIcon from '@mui/icons-material/RemoveRedEyeTwoTone';
import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import AccountBalanceWalletTwoToneIcon from '@mui/icons-material/AccountBalanceWalletTwoTone';

import DataCard from './DataCard';
import GenderChart from './Chart/GenderChart';
import RaceChart from './Chart/RaceChart';
import { gridSpacing } from 'utils/store/constant';

import axios from 'utils/axios';

const Dashboard = () => {
    const theme = useTheme();

    const [userResponses, setUserResponses] = useState([]);
    const [users, setUsers] = useState([]);
    const [graphqlData, setGraphqlData] = useState([]);

    useEffect(() => {
        const fetchUserResponses = async () => {
            const response = await axios.post(
                '/questionnaire/user/questionnaire/list',
                {
                    pagination: {
                        pageSize: 30,
                        sortAscending: true
                    }
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('serviceToken')}`
                    }
                }
            );
            setUserResponses(response.data);
        };
        const fetchUsers = async () => {
            const response = await axios.post(
                '/iam/user/list',
                {
                    pagination: {
                        pageSize: 30,
                        sortAscending: true
                    }
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('serviceToken')}`
                    }
                }
            );
            setUsers(response.data);
        };
        const fetchGraphqlData = async () => {
            const response = await axios.post('http://localhost:8632', {
                query: `{
                    active: getUsersCountByStatus(status: "IAM_USER_STATUS_ACTIVE")
                    inactive: getUsersCountByStatus(status: "IAM_USER_STATUS_INACTIVE")
                    getOrganizationCount
                    getDevicesCount
                    getQuestionnaireCount
                  }`
            });
            setGraphqlData(response.data);
        };
        fetchUserResponses();
        fetchUsers();
        fetchGraphqlData();
    }, []);

    return (
        <Grid container spacing={gridSpacing} alignItems="center">
            <Grid item xs={12} lg={2}>
                <DataCard primary="Total users" secondary={users?.pagination?.totalRecords} color={theme.palette.primary.main} iconPrimary={AccountCircleTwoToneIcon} />
            </Grid>
            <Grid item xs={12} lg={2}>
                <DataCard primary="Active users"
                    secondary={graphqlData?.data?.active}
                    color={theme.palette.orange.dark}
                    iconPrimary={EmojiEmotionsTwoToneIcon} />
            </Grid>
            <Grid item xs={12} lg={2}>
                <DataCard
                    primary="Inactive users"
                    secondary={graphqlData?.data?.inactive}
                    color={theme.palette.warning.dark}
                    iconPrimary={RemoveRedEyeTwoToneIcon}
                />
            </Grid>
            <Grid item xs={12} lg={2}>
                <DataCard primary="Test types"
                secondary={graphqlData?.data?.getDevicesCount}
                color={theme.palette.primary.main}
                iconPrimary={MonetizationOnTwoToneIcon} />
            </Grid>
            <Grid item xs={12} lg={2}>
                <DataCard primary="Organizations"
                secondary={graphqlData?.data?.getOrganizationCount}
                color={theme.palette.success.main} iconPrimary={ShoppingCartTwoToneIcon} />
            </Grid>
            <Grid item xs={12} lg={2}>
                <DataCard
                    primary="User Responses"
                    secondary={graphqlData?.data?.getQuestionnaireCount}
                    color={theme.palette.orange.main}
                    iconPrimary={AccountBalanceWalletTwoToneIcon}
                />
            </Grid>
            <Grid item xs={12} lg={6}>
                <GenderChart />
            </Grid>
            <Grid item xs={12} lg={12}>
                <RaceChart />
            </Grid>
        </Grid>
    );
};

export default Dashboard;

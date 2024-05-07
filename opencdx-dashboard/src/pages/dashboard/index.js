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

import { Endpoints } from 'utils/axios/apiEndpoints';
import { Graphql } from 'utils/axios/graphqlEndpoints';

const Dashboard = () => {
    const theme = useTheme();

    const [userResponses, setUserResponses] = useState([]);
    const [users, setUsers] = useState([]);
    const [graphqlData, setGraphqlData] = useState([]);

    useEffect(() => {
        const fetchUserResponses = async () => {
            Endpoints.userResponses({
                pagination: {
                    pageSize: 30,
                    sortAscending: true
                }
            })
                .then((response) => {
                    setUserResponses(response.data);
                })
                .catch((err) => err);
        };
        const fetchUsers = async () => {
            Endpoints.userList({
                pagination: {
                    pageSize: 30,
                    sortAscending: true
                }
            })
                .then((response) => {
                    setUsers(response.data);
                })
                .catch((err) => err);
        };
        const fetchGraphqlData = async () => {
            Graphql.post({
                query: `{
                    active: getUsersCountByStatus(status: "IAM_USER_STATUS_ACTIVE")
                    inactive: getUsersCountByStatus(status: "IAM_USER_STATUS_INACTIVE")
                    getOrganizationCount
                    getDevicesCount
                    getQuestionnaireCount
                  }`
            })
                .then((response) => {
                    setGraphqlData(response.data);
                })
                .catch((err) => err);
        };
        fetchUserResponses();
        fetchUsers();
        fetchGraphqlData();
    }, []);

    return (
        <Grid container spacing={gridSpacing} alignItems="center">
            <Grid item xs={12} lg={2}>
                <DataCard
                    primary="Total users"
                    secondary={'' + users?.pagination?.totalRecords !== 'undefined' ? users?.pagination?.totalRecords : 'Pending'}
                    color={theme.palette.primary.main}
                    iconPrimary={AccountCircleTwoToneIcon}
                />
            </Grid>
            <Grid item xs={12} lg={2}>
                <DataCard
                    primary="Active users"
                    secondary={'' + graphqlData?.data?.active !== 'undefined' ? graphqlData?.data?.active : 'Pending'}
                    color={theme.palette.orange.dark}
                    iconPrimary={EmojiEmotionsTwoToneIcon}
                />
            </Grid>
            <Grid item xs={12} lg={2}>
                <DataCard
                    primary="Inactive users"
                    secondary={'' + graphqlData?.data?.inactive !== 'undefined' ? graphqlData?.data?.inactive : 'Pending'}
                    color={theme.palette.warning.dark}
                    iconPrimary={RemoveRedEyeTwoToneIcon}
                />
            </Grid>
            <Grid item xs={12} lg={2}>
                <DataCard
                    primary="Test types"
                    secondary={'' + graphqlData?.data?.getDevicesCount !== 'undefined' ? graphqlData?.data?.getDevicesCount : 'Pending'}
                    color={theme.palette.primary.main}
                    iconPrimary={MonetizationOnTwoToneIcon}
                />
            </Grid>
            <Grid item xs={12} lg={2}>
                <DataCard
                    primary="Organizations"
                    secondary={
                        '' + graphqlData?.data?.getOrganizationCount !== 'undefined' ? graphqlData?.data?.getOrganizationCount : 'Pending'
                    }
                    color={theme.palette.success.main}
                    iconPrimary={ShoppingCartTwoToneIcon}
                />
            </Grid>
            <Grid item xs={12} lg={2}>
                <DataCard
                    primary="User Responses"
                    secondary={
                        '' + userResponses?.pagination?.totalRecords !== 'undefined' ? userResponses?.pagination?.totalRecords : 'Pending'
                    }
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

import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { openSnackbar } from 'utils/store/slices/snackbar';
import { useDispatch } from 'utils/store';
import { Graphql } from 'utils/axios/graphqlEndpoints';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const DeviceChart = () => {
    const [device, setDevice] = useState([]);

    const dispatch = useDispatch();

    const fetchData = useCallback(async () => {
        try {
            const response = await Graphql.post({
                query: `{
                   
                    getDevices: getDevices {
                    id
                    type
                    model
                    manufacturerId
                    vendorId
                    vendorCountryId
                    batchNumber
                    serialNumber
                    testTypeId
                    testSensitivity
                    testSpecificity
                    storageRequirements
                    approvalStatus
                    url
                    notes
                    safety
                    userInstructions
                    limitations
                    warrantyInfo
                    intendedUseAge
                    fdaAuthorized
                    deviceStatus
                    associatedSoftwareVersion
                    }
                }`
            });
            setDevice(response.data.data.getDevices);
        } catch (error) {
            console.error(error);
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Something went wrong',
                    variant: 'error',
                    alert: {
                        color: 'error'
                    },
                    close: false
                })
            );
        }
    }, [dispatch]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <MainCard title="Device List">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Device Type</TableCell>
                            <TableCell align="right">Model</TableCell>
                            <TableCell align="right">Manufacturer ID</TableCell>
                            <TableCell align="right">Vendor ID</TableCell>
                            <TableCell align="right">Vendor Country ID</TableCell>
                            <TableCell align="right">Batch Number</TableCell>
                            <TableCell align="right">Serial Number</TableCell>
                            <TableCell align="right">Test Type ID</TableCell>
                            <TableCell align="right">Test Sensitivity</TableCell>
                            <TableCell align="right">Test Specificity</TableCell>
                            <TableCell align="right">Storage Requirements</TableCell>
                            <TableCell align="right">Approval Status</TableCell>
                            <TableCell align="right">URL</TableCell>
                            <TableCell align="right">Warranty Info</TableCell>
                            <TableCell align="right">Intended Use Age</TableCell>
                            <TableCell align="right">FDA Authorized</TableCell>
                            <TableCell align="right">Device Status</TableCell>
                            <TableCell align="right">Associated Software Version</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {device.map((row) => (
                            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {row.deviceType}
                                </TableCell>
                                <TableCell align="right">{row.model}</TableCell>
                                <TableCell align="right">{row.manufacturerId}</TableCell>
                                <TableCell align="right">{row.vendorId}</TableCell>
                                <TableCell align="right">{row.vendorCountryId}</TableCell>
                                <TableCell align="right">{row.batchNumber}</TableCell>
                                <TableCell align="right">{row.serialNumber}</TableCell>
                                <TableCell align="right">{row.testTypeId}</TableCell>
                                <TableCell align="right">{row.testSensitivity}</TableCell>
                                <TableCell align="right">{row.testSpecificity}</TableCell>
                                <TableCell align="right">{row.storageRequirements}</TableCell>
                                <TableCell align="right">{row.approvalStatus}</TableCell>
                                <TableCell align="right">{row.url}</TableCell>
                                <TableCell align="right">{row.warrantyInfo}</TableCell>
                                <TableCell align="right">{row.intendedUseAge}</TableCell>
                                <TableCell align="right">{row.fdaAuthorized}</TableCell>
                                <TableCell align="right">{row.deviceStatus}</TableCell>
                                <TableCell align="right">{row.associatedSoftwareVersion}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </MainCard>
    );
};

DeviceChart.propTypes = {
    gender: PropTypes.array
};

export default DeviceChart;

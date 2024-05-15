import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';
import Chart from 'react-apexcharts';
import MainCard from 'ui-component/cards/MainCard';
import { Graphql } from 'utils/axios/graphqlEndpoints';
import { openSnackbar } from 'utils/store/slices/snackbar';
import { useDispatch } from 'utils/store';

const GenderChart = () => {
    const [getManufacturers, setGetManufacturers] = useState([0, 0]);
    const dispatch = useDispatch();
    const fetchData = useCallback(async () => {
        try {
            const response = await Graphql.post({
                query: `{
                   getManufacturers: getManufacturers {
                    id
                    name
                    website
                    }
                }`
            });

            const aconDiagnosticsCount = response.data.data.getManufacturers.filter((manufacturer) =>
                manufacturer.name.startsWith('ACON')
            ).length;
            const abbottLabsCount = response.data.data.getManufacturers.filter((manufacturer) =>
                manufacturer.name.startsWith('Abbott')
            ).length;

            setGetManufacturers([aconDiagnosticsCount, abbottLabsCount]);
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

    const chartData = {
        height: 228,
        type: 'pie',
        options: {
            chart: {
                id: 'getManufacturers-chart'
            },
            dataLabels: {
                enabled: false
            },
            labels: ['ACON Diagnostics', 'Abbott Laboratories'],
            legend: {
                show: true,
                position: 'bottom',
                fontFamily: 'inherit',
                labels: {
                    colors: 'inherit'
                },
                itemMargin: {
                    horizontal: 10,
                    vertical: 10
                }
            }
        },
        series: getManufacturers
    };

    return (
        <MainCard title="Manufactures">
            <Chart {...chartData} />
        </MainCard>
    );
};

GenderChart.propTypes = {
    getManufacturers: PropTypes.array
};

export default GenderChart;

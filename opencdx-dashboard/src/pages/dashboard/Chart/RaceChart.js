import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';
import Chart from 'react-apexcharts';
import MainCard from 'ui-component/cards/MainCard';
import { Graphql } from 'utils/axios/graphqlEndpoints';
import { openSnackbar } from 'utils/store/slices/snackbar';
import { useDispatch } from 'utils/store';
// ==============================|| WIDGET - Race CHART ||============================== //

const RaceChart = () => {
    const [race, setRace] = useState([0, 0, 0, 0, 0, 0]);
    const dispatch = useDispatch();

    const fetchData = useCallback(async () => {
        try {
            const response = await Graphql.post({
                query: `{
                    white: getRaceCount(race:"white")
                    black: getRaceCount(race:"black")
                    hispanic: getRaceCount(race:"hispanic")
                    asian: getRaceCount(race:"asian")
                }`
            });

            let blackCount = response.data.data?.black;
            let whiteCount = response.data.data?.white;
            let hispanicCount = response.data.data?.hispanic;
            let asianCount = response.data.data?.asian;

            setRace([blackCount, whiteCount, hispanicCount, asianCount]);
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
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const series = [
        {
            name: 'Race',
            data: race
        }
    ];
    const options = {
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: ['Black or African American', 'White', 'Hispanic or Latino', 'Asian']
        },
        yaxis: {
            title: {
                text: ''
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val;
                }
            }
        }
    };
    return (
        <MainCard title="Race ">
            <Chart series={series} options={options} type="bar" height={350} />
        </MainCard>
    );
};

RaceChart.propTypes = {
    gender: PropTypes.array
};

export default RaceChart;

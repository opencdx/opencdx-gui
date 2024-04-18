import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';
import Chart from 'react-apexcharts';
import MainCard from 'ui-component/cards/MainCard';
import { Graphql } from 'utils/axios/graphqlEndpoints';

// ==============================|| WIDGET - Gender CHART ||============================== //

const GenderChart = () => {
    const [gender, setGender] = useState([0, 0]);

    const fetchData = useCallback(async () => {
        try {
            const response = await Graphql.post({
                query: `{
                    male: getGenderCount(gender: "GENDER_MALE")
                    female: getGenderCount(gender: "GENDER_FEMALE")
                  }`
            });

            let maleCount = response.data.data?.male;
            let femaleCount = response.data.data?.female;

            setGender([maleCount, femaleCount]);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const chartData = {
        height: 228,
        type: 'donut',
        options: {
            chart: {
                id: 'gender-chart'
            },
            dataLabels: {
                enabled: false
            },
            labels: ['Male', 'Female'],
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
        series: gender
    };

    return (
        <MainCard title="Gender ">
            <Chart {...chartData} />
        </MainCard>
    );
};

GenderChart.propTypes = {
    gender: PropTypes.array
};

export default GenderChart;

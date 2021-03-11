import React, {useEffect, useState} from 'react';
import ReactApexChart from 'react-apexcharts';
import {useHttp} from '../hooks/http.hook';
import Loader from '../components/Loader';

const LineCharts = () => {
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const {loading, request, error, clearError} = useHttp();

    useEffect( async () => {
        try {
            const {list} = await request('/graph.json', 'GET');
            setData(list[0].data.slice(0, 12).map(item => item[1]));
            setCategories(list[0].data.slice(0, 12).map(item => item[0]));
            setErrorMessage(null);
        } catch(e){}
    }, []);

    useEffect(() => {
        if (error) {
            setErrorMessage('Не удалось загрузить данные графика:(');
        }
        clearError()
    }, [error, clearError]);

    const series = [{
        name: "Desktops",
        data,
    }];
    const options = {
        chart: {
        height: 350,
        type: 'line',
        zoom: {
            enabled: false
        }
        },
        dataLabels: {
        enabled: false
        },
        stroke: {
        curve: 'straight'
        },
        title: {
        text: 'Product Trends by Month',
        align: 'left'
        },
        grid: {
        row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
        },
        },
        xaxis: {
        categories,
        }
    };
    return (
        <div className="charts">
            { loading &&
                <Loader/>
            }
            { errorMessage &&
                <div className="charts__error">{errorMessage}</div>
            }
            { !loading && !error &&
                <ReactApexChart options={options} series={series} type="line" height={350} />
            }
        </div>
    )
}

export default LineCharts;

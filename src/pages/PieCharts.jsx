import React, {useEffect, useState} from 'react';
import ReactApexChart from 'react-apexcharts';
import {useHttp} from '../hooks/http.hook';
import Loader from '../components/Loader';

const PieCharts = () => {
    const [data, setData] = useState([]);
    const [labels, setLabels] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const {loading, request, error, clearError} = useHttp();

    useEffect( async () => {
        try {
            const {list} = await request('/graph.json', 'GET');
            setData(list[0].data.slice(0, 12).map(item => item[1]));
            setLabels(list[0].data.slice(0, 12).map(item => item[0]));
            setErrorMessage(null);
        } catch(e){}
    }, []);

    useEffect(() => {
        if (error) {
            setErrorMessage('Не удалось загрузить данные графика:(');
        }
        clearError();
    }, [error, clearError]);

    const series = data;
    const options = {
        chart: {
        width: 380,
        type: 'pie',
        },
        labels,
        responsive: [{
        breakpoint: 480,
        options: {
            chart: {
            width: 200
            },
            legend: {
            position: 'bottom'
            }
        }
        }]
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
                <ReactApexChart options={options} series={series} type="pie" width={500} />
            }
        </div>
    )
}

export default PieCharts;

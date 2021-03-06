import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2'
import { useState, useEffect } from 'react';

export default function Stats(props) {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    )

    const [chartData, setChartData] = useState({
        datasets: [],
    })

    const [chartOptions, setChartOptions] = useState({})

    useEffect(() => {
        setChartData({
            labels: ['HP', 'Attack', 'Defense', 'Sp Attack', 'Sp Defense', 'Speed'],
            datasets: [
                {
                    label: 'Stats',
                    data: props.dataArr,
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'cyan'
                },
            ],
        })
        setChartOptions({
            indexAxis: 'y',
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Stats Pokémon'
                }
            }
        })
    }, [])

    //Chart needs id to get updated
    return (
        <div style={{ visibility: props.idKey === '' && 'hidden' }} className='stats w-25 mx-3'>
            <Bar datasetIdKey={props.idKey} options={chartOptions} data={chartData} />
            <h5 className='text-center mt-3 mb-0'>Abilities</h5>
            <ul className='list-group list-group-horizontal mt-1'>
                {props.abilities.map(value => <li className='list-group-item flex-fill text-center' key={Math.random()}>{value}</li>)}
            </ul>
        </div>
    )
}
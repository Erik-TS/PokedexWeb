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

export default function Stats(props){

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
            plugins:{
                legend:{
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
    return(
        <div className={'stats w-25 mx-auto'}>
            <Bar datasetIdKey={props.key} options={chartOptions} data={chartData} />            
        </div>
    )
}
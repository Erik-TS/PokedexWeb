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
import { ListGroup } from 'react-bootstrap';

export async function getServerSideProps() {
    return {
        props: {
            dataArr: [''],
            idKey: '',
            abilities: ['']
        }
    }
}

export default function Stats(props: { dataArr: any; idKey: string; abilities: string[]; }): JSX.Element {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    )

    const [chartData, setChartData] = useState({
        labels: [],
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
        <div style={{ visibility: props.idKey === "" ? "hidden" : "visible" }} >
            <Bar style={{height: "300px"}} datasetIdKey={props.idKey} options={chartOptions} data={chartData} />
            <h5 className='text-center mt-3 mb-0'>Abilities</h5>
            <ListGroup horizontal className={"mt-1"}>
                {props.abilities.map((value: string) => <ListGroup.Item className={"flex-fill text-center"} key={Math.random()}>{value}</ListGroup.Item>)}
            </ListGroup>
        </div>
    )
}
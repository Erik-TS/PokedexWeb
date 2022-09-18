import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import ProfileArea from './profileArea'

export default function InfoBlock(props): JSX.Element {
    const url: string = `https://pokeapi.co/api/v2/pokemon/${props.search}`
    let { error, data, fetchStatus } = useQuery(['poke'], async () =>
        await axios(url)
    )

    if (fetchStatus === 'idle' && props.search !== '') {
        if (error) return (
            <div className='fs-3 text-center mt-5 w-25 mx-auto'>
                <div className='text-white bg-danger py-4 rounded-2'>
                    <p>Pokémon not found!</p>
                </div>
            </div>
        )

        let imgUrl: string = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/'
        if (data.data.id >= 100) imgUrl += `${data.data.id}.png`
        else if (data.data.id >= 10) imgUrl += `0${data.data.id}.png`
        else imgUrl += `00${data.data.id}.png`

        return (
            <ProfileArea
                name={data.data.species.name[0].toUpperCase() + data.data.species.name.substring(1)}
                id={data.data.id}
                imgUrl={imgUrl}
                types={data.data.types.map(value => value.type.name)}
                abilities={data.data.abilities.map(value => value.ability.name)}
                weight={data.data.weight}
                height={data.data.height}
                stats={data.data.stats.map(value => value.base_stat)}
            />
        )
    }

    if (fetchStatus === 'fetching') {
        return (
            <div className='bg-info mx-auto w-25 text-white rounded-2 py-4 mt-5'>
                <div className='text-center'>
                    <div className='spinner-border' role={'status'}></div>
                    <p className='fs-3'>We're searching. Wait a little please.</p>
                </div>
            </div>
        )
    }
}
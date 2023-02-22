import { SetStateAction, useEffect, useState } from 'react'
import Topbar from './components/topbar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Router from 'next/router'
import ProfileArea from './components/profileArea'

export default function Home() {
    const [loading, setLoading] = useState(false)
    const [pokemon, setPokemon] = useState([{
        name: "",
        id: 0,
        imgUrl: "",
        types: [],
        abilities: [],
        weight: 0,
        height: 0,
        stats: [],
        species: { name: "" }
    }])
    const [used, setUsed] = useState(false)
    const [found, setFound] = useState(false)

    function search(e) {
        e.preventDefault()
        setLoading(true)
        const query = { name: e.target.name.value }
        const reqInit = {
            method: "POST",
            body: JSON.stringify(query)
        }

        fetch('./api/info', reqInit).then(res => {
            if (res.ok) res.json().then(response => {
                let imgUrl: string = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/'
                if (response.id >= 100) imgUrl += `${response.id}.png`
                else if (response.id >= 10) imgUrl += `0${response.id}.png`
                else imgUrl += `00${response.id}.png`

                setPokemon(response)
                setUsed(true)
                setFound(true)
                setLoading(false)
            })
            else {
                setUsed(true)
                setFound(false)
                setLoading(false)
            }
        })
    }

    if (!loading && !used) return (
        <div>
            <Topbar search={search} />
        </div>
    )
    else if (!loading && used && found) return (
        <div>
            <Topbar search={search} />
            <ul>
                {pokemon.map(value =>
                    <li key={Math.random()}>
                        <ProfileArea
                            name={value.species.name[0].toUpperCase() + value.species.name.substring(1)}
                            id={value.id}
                            imgUrl={value.imgUrl}
                            types={value.types.map(value => value.type.name)}
                            abilities={value.abilities.map(value => value.ability.name)}
                            stats={value.stats.map(value => value.base_stat)}
                        />
                    </li>
                )}
            </ul>
        </div>
    )
    else if (!loading && used && !found) return (
        <div>
            <Topbar search={search} />
            <h2 className={'text-center mt-5'}>Not found!</h2>
        </div>
    )
    else return (
        <div>
            <Topbar />
            <h2 className={'text-center mt-5'}>LOADING...</h2>
        </div>
    )
}
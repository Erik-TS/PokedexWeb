import { SetStateAction, useEffect, useState } from 'react'
import Topbar from './components/topbar'
import InfoBlock from './components/InfoBlock'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Router from 'next/router'
import ProfileArea from './components/profileArea'

function H(): JSX.Element {
    const [poke, setPoke] = useState('')
    const cliente: QueryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false
            }
        }
    })

    function handlePoke(value: SetStateAction<string>): void {
        setPoke(value)
    }

    function searchPoke(): void {
        const searchInp: string = (document.querySelector('.idNameInput') as HTMLInputElement).value.toLocaleLowerCase()
        handlePoke(searchInp)
    }

    //Press Enter trigger fetchPokeApi()
    useEffect(() => {
        const { pathname } = Router
        if (pathname == '/') {
            Router.push('/pikachu')
        }
        let listener = (e: { key: string }) => e.key === 'Enter' && searchPoke()
        document.addEventListener('keydown', listener)

        //The 'useEffect' needs to be cleaned so as not to trigger effects several times
        return () => document.removeEventListener('keydown', listener)
    })

    return (
        <div>
            <Topbar search={searchPoke} />
            <QueryClientProvider client={cliente}>
                <InfoBlock key={poke} search={poke} />
            </QueryClientProvider>
        </div>
    )
}

export default function Home() {
    const [loading, setLoading] = useState(false)
    const [pokemon, setPokemon] = useState({
        name: "",
        id: 0,
        imgUrl: "",
        types: [],
        abilities: [],
        weight: 0,
        height: 0,
        stats: [],
        species: { name: "" }
    })
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

                setPokemon({ ...response, imgUrl: imgUrl })
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
            <ProfileArea
                name={pokemon.species.name[0].toUpperCase() + pokemon.species.name.substring(1)}
                id={pokemon.id}
                imgUrl={pokemon.imgUrl}
                types={pokemon.types.map(value => value.type.name)}
                abilities={pokemon.abilities.map(value => value.ability.name)}
                stats={pokemon.stats.map(value => value.base_stat)}
            />
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
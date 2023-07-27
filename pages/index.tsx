import { useState } from 'react'
import Topbar from './components/topbar'
import ProfileArea from './components/profileArea'

export default function Home() {
    enum PageStates {
        Initial,
        Loading,
        Found,
        NotFound
    }
    
    const [pageState, setPageState] = useState(PageStates.Initial)
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

    function search(e) {
        e.preventDefault()
        setPageState(PageStates.Loading)
        const query = { name: e.target.name.value }
        const reqInit = {
            method: "POST",
            body: JSON.stringify(query)
        }

        fetch('./api/info', reqInit).then(res => {
            if (res.ok) res.json().then(response => {
                setPokemon(response)
                setPageState(PageStates.Found)
            })
            else setPageState(PageStates.NotFound)
        })
    }

    function WelcomeMessage() {
        return (
            <div className={'welcomeMessage'}>
                <div>
                    <h1>Welcome</h1>
                    <p>
                        To search pokémon information, enter its name or Pokédex number. Use the species name rather than a specific form or regional variant.
                    </p>
                </div>
            </div>
        )
    }

    if (pageState == PageStates.Initial) return (
        <div>
            <Topbar search={search} />
            <WelcomeMessage />
        </div>
    )
    else if (pageState == PageStates.Found) return (
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
    else if (pageState == PageStates.NotFound) return (
        <div>
            <Topbar search={search} />
            <h2 className={'text-center mt-5'}>Not found!</h2>
        </div>
    )
    else if (pageState == PageStates.Loading) return (
        <div>
            <Topbar />
            <h2 className={'text-center mt-5'}>LOADING...</h2>
        </div>
    )
    else return (
        <div>
            <h1>Internal Error</h1>
        </div>
    )
}
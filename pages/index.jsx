import { useEffect, useState } from 'react'
import Profile from './components/profile'
import Stats from './components/stats'

export default function(props){

    const [pokemon, setPokemon] = useState({
        name: '',
        id: '',
        imgUrl: '',
        types: [],
        abilities: [],
        weight: '',
        height: '',
        stats: [0, 0, 0, 0, 0, 0]
    })

    function handlePokemon(value){
        setPokemon(value)
    }

    function fetchPokeApi(){
        const url = 'https://pokeapi.co/api/v2/pokemon/' + document.querySelector('input').value.toLowerCase()
        fetch(url)
        .then( response => response.json())
        .then( res => {
            let img = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/'
            if(res.id < 10) img = `${img}00${res.id}.png`
            else if(res.id < 100) img = `${img}0${res.id}.png`
            else img = `${img}${res.id}.png`

            handlePokemon(
                {
                    name: res.species.name[0].toUpperCase() + res.species.name.substring(1),
                    id: res.id,
                    imgUrl: img,
                    types: res.types.map( value => value.type.name ),
                    abilities: res.abilities.map( value => value.ability.name),
                    weight: res.weight,
                    height: res.height,
                    stats: res.stats.map( value => value.base_stat)
                }
            )
        })
        .catch( () => alert('Not Found!') )
    }

    //Press Enter trigger fetchPokeApi()
    useEffect(() => {
        let listener = ( e ) => e.key === 'Enter' && fetchPokeApi()

        document.addEventListener('keydown', listener)
        //The 'useEffect' needs to be cleaned so as not to trigger effects several times
        return () => document.removeEventListener('keydown', listener)
    })

    return(
        <div>
            <div className='navbar bg-danger'>
                <div className='mx-auto text-center'>
                    <label>Name or NatDex ID</label>
                    <input className='form-control' type={'text'}/>
                    <input className='my-2 btn btn-outline-dark' 
                    type={'button'} 
                    onClick={fetchPokeApi} value={'Submit'} />
                </div>
            </div>
            <Profile name={pokemon.name} 
            id={pokemon.id} 
            imgUrl={pokemon.imgUrl} 
            types={pokemon.types} 
            abilities={pokemon.abilities}
            weight={pokemon.weight}
            height={pokemon.height}
            stats={pokemon.stats} />
        </div>
    )
}
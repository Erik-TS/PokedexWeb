import https from 'https'
import { useEffect, useState } from 'react'
import Profile from './profile'

export default function(props){

    const [pokemon, setPokemon] = useState({
        name: '',
        id: '',
        imgUrl: '',
        types: [],
        abilities: [],
        weight: '',
        height: ''
    })

    function handlePokemon(value){
        setPokemon(value)
    }

    function searchAPI(){
        const urlSearch = 'https://pokeapi.co/api/v2/pokemon/' + document.querySelector('input').value.toLowerCase()
        const req = https.request(urlSearch, (res) => {
            let chunk = []
            res.on('data', d => {
                chunk.push(d)
            }).on('end', () => {
                let data = Buffer.concat(chunk)
                let info
                try{
                    info = JSON.parse(data)
                    let img = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/'
                    if(info.id < 10){
                        img = `${img}00${info.id}.png`
                    }
                    else if(info.id < 100){
                        img = `${img}0${info.id}.png`
                    }
                    else{
                        img = `${img}${info.id}.png`
                    }

                    handlePokemon({
                        //First letter upper case
                        name: info.species.name[0].toUpperCase() + info.species.name.substring(1),
                        id: info.id,
                        imgUrl: img,
                        types: info.types.map( value => { return value.type.name }),
                        abilities: info.abilities.map( value => { return value.ability.name }),
                        weight: info.weight,
                        height: info.height
                    })
                }
                catch(e){
                    alert('Name or NationalDex ID is invalid')
                }
            })
        })
        
        req.end()
    }

    useEffect(() => {
        document.addEventListener('keydown', e => {
            e.key === 'Enter' && searchAPI()
        })
    })

    return(
        <div>
            <navbar className='navbar bg-danger'>
                <div className='mx-auto text-center'>
                    <label>Name or NatDex ID</label>
                    <input className='form-control' type={'text'}/>
                    <input className='my-2 btn btn-outline-dark' 
                    type={'button'} 
                    onClick={searchAPI} value={'Submit'} />
                </div>
            </navbar>
            <Profile name={pokemon.name} 
            id={pokemon.id} 
            imgUrl={pokemon.imgUrl} 
            types={pokemon.types} 
            abilities={pokemon.abilities}
            weight={pokemon.weight}
            height={pokemon.height} />
        </div>
    )
}
import axios from "axios"
import ProfileArea from "./components/profileArea"

function getImage(id: number, index: number) {
    if (index === 0) return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`
    else return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}_f${index + 1}.png`
}

export async function getServerSideProps(context) {

    const { search } = context.query
    let arr = []

    await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${search}`)
        .then(async res => {
            const species = res.data

            for (let i = 0; i < species.varieties.length; i++) {
                await axios.get(species.varieties[i].pokemon.url)
                    .then(res => {
                        const pokemon = res.data
                        arr.push({
                            img: getImage(species.id, i),
                            param: search,
                            name: pokemon.name,
                            id: pokemon.id,
                            height: pokemon.height,
                            weight: pokemon.weight,
                            types: pokemon.types.map(value => value.type.name),
                            abilities: pokemon.abilities.map(value => value.ability.name),
                            stats: pokemon.stats.map(value => value.base_stat)
                        })
                    })
                    .catch(err => console.log(`ERROR: ${err}`))
            }
        })
        .catch(err => {
            arr.push({
                param: search,
                name: "Nothing",
                id: "Nothing",
                types: [{ type: { name: "Nothing" } }],
                height: "Nothing",
                weight: "Nothing"
            })

        })

    return { props: { arr } }
}

export default function Search(props: any) {

    return (
        <div>
            {props.arr.map(value =>
                <ProfileArea
                    imgUrl={value.img}
                    id={value.id}
                    key={value.id}
                    name={value.name}
                    types={value.types}
                    abilities={value.abilities}
                    stats={value.stats}
                />
            )}
        </div>
    )
}
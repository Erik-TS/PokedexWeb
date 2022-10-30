import axios from "axios"

export async function getServerSideProps(context) {

    const { search } = context.query
    let ret: any
    let arr = []

    await axios.get(`https://pokeapi.co/api/v2/pokemon/${search}`)
        .then(res => {
            const data = res.data
            ret = {
                param: search,
                name: data.species.name,
                id: data.id,
                types: data.types,
                height: data.height,
                weight: data.weight
            }

            arr.push(ret)
        })
        .catch(err => {
            arr.push({
                param: search,
                name: "Nothing",
                id: "Nothing",
                types: [{ type: { name: "Nothing" } }, { type: { name: "Nothing" } }],
                height: "Nothing",
                weight: "Nothing"
            })

            ret = null
        })

    return { props: { ret, arr } }
}

export default function Search(props: any): JSX.Element {

    function profile(value) {
        return (
            <>
                <h1>Search Page Prototype</h1>
                <h2>{`Param: ${value.param}`}</h2>
                <p>{value.name}</p>
                <p>{value.id}</p>
                <p>{value.types.map(value => value.type.name.toString())}</p>
                <p>{value.height}</p>
                <p>{value.weight}</p>
            </>
        )
    }

    return (
        <div>
            {profile(props.arr[0])}
        </div>
    )
}
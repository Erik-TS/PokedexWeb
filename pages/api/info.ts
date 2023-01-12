import axios from "axios";

export default async function handler(req, res) {
    let r: { name: string } = JSON.parse(req.body)
    let search = r.name.toLowerCase()
    
    await axios.get(`https://pokeapi.co/api/v2/pokemon/${search}`)
        .then(response => {
            res.status(200).send(JSON.stringify(response.data))
        })
        .catch(err => {
            res.status(400).send(err)
        })
}
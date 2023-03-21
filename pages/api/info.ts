import { NextApiRequest, NextApiResponse } from "next";
import { MainClient } from "pokenode-ts";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const requestBody: { name: string } = JSON.parse(req.body)
    const userInput = requestBody.name.toLowerCase()
    const foundPokemon = []
    const api = new MainClient()

    await api.pokemon
        .getPokemonSpeciesByName(userInput)
        .then(async data => {
            for (let PokemonSpeciesVariety of data.varieties) {
                await api.pokemon
                    .getPokemonByName(PokemonSpeciesVariety.pokemon.name)
                    .then(poke => {
                        foundPokemon.push({ ...poke, imgUrl: poke.sprites.other["official-artwork"].front_default })
                    })
            }
            res.status(200).send(JSON.stringify(foundPokemon))
        })
        .catch(err => res.status(400).send(err))
}
import { NextApiRequest, NextApiResponse } from "next";
import { MainClient } from "pokenode-ts";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    function getImgUrls(response, hasVarieties: boolean, varieties: number) {
        const urlList: Array<string> = []
        let imgUrl = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/'
        let fileSuffix = '.png'
        let fileId: string

        if (response.id >= 100) fileId = `${response.id}`
        else if (response.id >= 10) fileId = `0${response.id}`
        else fileId = `00${response.id}`

        if (hasVarieties) {
            for (let i = 0; i < varieties; i++) {
                if (i > 0) fileSuffix = `_f${i + 1}.png`
                imgUrl += `${fileId}${fileSuffix}`
                urlList.push(imgUrl)
                imgUrl = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/'
            }
        }
        else {
            imgUrl += `${fileId}${fileSuffix}`
            urlList.push(imgUrl)
        }

        return urlList
    }

    const r: { name: string } = JSON.parse(req.body)
    let search = r.name.toLowerCase()
    const arr = []
    const api = new MainClient()

    await api.pokemon
        .getPokemonSpeciesByName(search)
        .then(async data => {
            const varieties = data.varieties.length
            const hasVarieties = varieties > 1
            let imgs = getImgUrls(data, hasVarieties, varieties)

            for (let x of data.varieties) {
                await api.pokemon
                    .getPokemonByName(x.pokemon.name)
                    .then(poke => {
                        const imgUrl = imgs.shift()
                        arr.push({ ...poke, imgUrl: imgUrl })
                    })
            }
            res.status(200).send(JSON.stringify(arr))
        })
        .catch(err => res.status(400).send(err))
}
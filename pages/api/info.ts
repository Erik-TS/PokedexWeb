import axios from "axios";

export default async function handler(req, res) {

    function getImgUrls(response, hasVarieties: boolean, varieties: number) {
        let urlList: Array<string> = []
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

    let r: { name: string } = JSON.parse(req.body)
    let search = r.name.toLowerCase()

    await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${search}`)
        .then(async response => {
            let arr = []
            const varieties = response.data.varieties.length
            const hasVarieties = varieties > 1
            let imgs = getImgUrls(response.data, hasVarieties, varieties)

            for (let i = 0; i < varieties; i++) {
                await axios.get(response.data.varieties[i].pokemon.url)
                    .then(poke => {
                        const imgUrl = imgs.shift()
                        arr.push({ ...poke.data, imgUrl: imgUrl })
                    })
            }
            res.status(200).send(JSON.stringify(arr))
        })
        .catch(err => {
            res.status(400).send(err)
        })
}
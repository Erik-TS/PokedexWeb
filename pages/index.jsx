import { useEffect, useState } from 'react'
import Topbar from './components/topbar'
import InfoBlock from './components/InfoBlock'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function () {
    const [poke, setPoke] = useState('')
    const cliente = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false
            }
        }
    })

    function handlePoke(value) {
        setPoke(value)
    }

    function searchPoke() {
        const searchInp = document.querySelector('.idNameInput').value.toLocaleLowerCase()
        handlePoke(searchInp)
    }

    //Press Enter trigger fetchPokeApi()
    useEffect(() => {
        let listener = (e) => e.key === 'Enter' && searchPoke()
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
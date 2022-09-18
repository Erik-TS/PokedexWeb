import { SetStateAction, useEffect, useState } from 'react'
import Topbar from './components/topbar'
import InfoBlock from './components/InfoBlock'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function(): JSX.Element {
    const [poke, setPoke] = useState('')
    const cliente: QueryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false
            }
        }
    })

    function handlePoke(value: SetStateAction<string>): void {
        setPoke(value)
    }

    function searchPoke(): void {
        const searchInp: string = document.querySelector('.idNameInput').value.toLocaleLowerCase()
        handlePoke(searchInp)
    }

    //Press Enter trigger fetchPokeApi()
    useEffect(() => {
        let listener = (e: { key: string }) => e.key === 'Enter' && searchPoke()
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
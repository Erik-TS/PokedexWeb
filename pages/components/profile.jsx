import ProfileHead from './profileHead'
import ProfileBody from './profileBody'
import { useState, useEffect } from 'react'
import Stats from './stats'

export default function Profile(props){

    const [graph, setGraph] = useState(<Stats key={props.key} name={props.name} dataArr={props.stats} />)
    function handleGraph(value){
        setGraph(value)
    }

    

    return (
        //If pokemon state has no data, all the component is hidden
        <div className='profile text-center' style={{visibility: props.id === '' && 'hidden'}}>
            <div className='profile-cont mt-2 mx-auto'>
                <ProfileHead 
                name={props.name} 
                id={props.id} 
                imgUrl={props.imgUrl} />
                <ProfileBody 
                weight={props.weight}
                height={props.height}
                abilities={props.abilities}
                types={props.types} />
            </div>    
            <Stats key={props.id} name={props.name} dataArr={props.stats} />
        </div>
    )
}

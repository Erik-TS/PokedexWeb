import Profile from "./profile"
import Stats from './stats'

export default function ProfileArea(props){
    //Stats key isn't a prop but it's needed to update
    return(
        <div className="profileArea">
            <div className="profileContainer d-flex justify-content-center">
                <Profile name={props.name} 
                id={props.id} 
                imgUrl={props.imgUrl} 
                types={props.types} 
                abilities={props.abilities}
                weight={props.weight}
                height={props.height} />
                <Stats key={props.id} idKey={props.id} dataArr={props.stats} />
            </div>
        </div>
    )
}
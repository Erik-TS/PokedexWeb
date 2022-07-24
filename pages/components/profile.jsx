import ProfileHead from './profileHead'
import ProfileBody from './profileBody'

export default function Profile(props){
    return (
        //If pokemon state has no data, all the component is hidden
        <div className='profile text-center profile-cont mt-2' style={{visibility: props.id === '' && 'hidden'}}>
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
    )
}

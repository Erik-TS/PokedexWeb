import ProfileHead from './profileHead'
import ProfileBody from './profileBody'

export default function Profile(props){
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
        </div>
    )
}

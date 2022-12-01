import Profile from "./profile"
import Stats from './stats'

export default function ProfileArea(props: {
    name: string,
    imgUrl: string,
    id: number,
    stats: {},
    abilities: Array<string>,
    types: Array<string>
}): JSX.Element {
    //Stats key isn't a prop but it's needed to update
    return (
        <div className="profileArea">
            <div className="profileContainer">
                <h2 className="text-center">
                    {`${props.name.toUpperCase()} ${props.id.toString() !== '' ? '#' : ''}${props.id}`}
                </h2>
                <div className="d-flex justify-content-center">
                    <Profile
                        img={props.imgUrl}
                        types={props.types}
                    />
                    <Stats
                        key={props.id}
                        idKey={props.id}
                        dataArr={props.stats}
                        abilities={props.abilities} />
                </div>
            </div>
        </div>
    )
}
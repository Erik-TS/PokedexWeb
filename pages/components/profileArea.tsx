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
        <div className="profileArea my-5">
            <div className="profileContainer w-75 py-3 bg-white mx-auto border border-dark">
                <h2 className="text-center w-25 mx-auto">
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
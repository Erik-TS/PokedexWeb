export default function Profile(props) {
    return (
        //If pokemon state has no data, all the component is hidden
        <div className='profile mx-3'>
            <img alt="" src={props.img} />
            <ul className="d-flex ps-0 list-group list-group-horizontal">
                {props.types.map(value => <li className="profile-type text-center list-group-item flex-fill" style={{ backgroundColor: 'var(--' + value + ')' }} key={Math.random()}>{value.toUpperCase()}</li>)}
            </ul>
        </div>
    )
}

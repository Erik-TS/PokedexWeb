export default function(props){
    return(
        <div className="mx-auto w-75 border border-2 border-dark rounded-bottom">
            <div className="border-bottom border-dark bg-white">
                <h6 className="fw-bold">Types</h6>
                <hr className="w-100 my-0" />
                { props.types.map( value => { 
                    return <p key={Math.random()} style={{textShadow: '1px 1px 2px black', backgroundColor: 'var(--' + value + ')'}} className="badge my-2">{value.toUpperCase()}</p> 
                }) }
            </div>
            <div className="border-bottom border-dark bg-white">
                <h6 className="fw-bold">Abilities</h6>
                <hr className="my-0"/>
                {props.abilities.map(value => {
                    return <p key={Math.random()} style={{color: 'black'}} className="badge mb-0">{value}</p>
                })}
            </div>
            <div className="container">
                <div className="row">
                    <div className="border-end border-dark col-6 bg-white">
                        <h6 className="fw-bold">Height</h6>
                        <p className="my-0">{props.height / 10 + ' m'}</p>
                    </div>
                    <div className="col-6 bg-white">
                        <h6 className="fw-bold">Weight</h6>
                        <p className="my-0">{props.weight / 10 + ' Kg'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
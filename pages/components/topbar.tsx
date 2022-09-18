export default function Topbar(props): JSX.Element {
    return (
        <div className='navbar bg-danger'>
            <div className='mx-auto text-center'>
                <label className='fw-bold text-white'>Name or NatDex ID</label>
                <input className='form-control idNameInput' type={'text'} />
                <input
                    className='my-2 btn btn-outline-light'
                    type={'button'}
                    onClick={props.search}
                    value={'Submit'}
                />
            </div>
        </div>
    )
}
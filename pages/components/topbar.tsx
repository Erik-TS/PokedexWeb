export default function Topbar(props): JSX.Element {
    return (
        <div className='navbar bg-danger'>
            <div className='mx-auto text-center'>
                <form onSubmit={props.search}>
                    <label htmlFor={'name'} className='fw-bold text-white'>Name or NatDex ID</label>
                    <input id={'name'} className='form-control idNameInput' type={'text'} />
                    <button className='my-2 btn btn-outline-light'>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}
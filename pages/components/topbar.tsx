import { Navbar, Button, FormControl } from "react-bootstrap"

export default function Topbar(props): JSX.Element {
    return (
        <Navbar className='bg-danger'>
            <div className='mx-auto text-center'>
                <form onSubmit={props.search}>
                    <label htmlFor={'name'} className='fw-bold text-white'>Name or NatDex ID</label>
                    <FormControl id={'name'} type={'text'} />
                    <Button variant={"outline-light"} className='my-2' >Submit</Button>
                </form>
            </div>
        </Navbar>
    )
}
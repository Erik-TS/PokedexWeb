import { ListGroup } from "react-bootstrap"

export async function getServerSideProps() {
    return {
        props: {
            img: '',
            types: ['']
        }
    }
}

export default function Profile(props: { img: string, types: Array<string> }): JSX.Element {

    function getWhiteFont(value: string): string {
        if (value === "normal" || value === "ground" ||
            value === 'flying' || value === 'electric' ||
            value === 'ice' || value === 'fairy') return ''

        return 'text-white'
    }

    return (
        //If pokemon state has no data, all the component is hidden
        <div className='profile mx-3'>
            <img alt="" src={props.img} />
            <ListGroup horizontal>
                {
                    props.types.map((value: string) =>
                        <ListGroup.Item
                            className={`profile-type fs-5 fw-bold text-center flex-fill ${getWhiteFont(value)}`}
                            style={{ backgroundColor: `var(--${value})` }}
                            key={Math.random()}
                        >
                            {value.toUpperCase()}
                        </ListGroup.Item>)
                }
            </ListGroup>
        </div>
    )
}

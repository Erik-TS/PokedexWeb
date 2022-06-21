export default function(props){
    return(
        <div className="w-75 mx-auto rounded-top border border-2 border-bottom-0 border-dark">
            <div className="bg-white container border-bottom border-1 border-dark">
                <div className="row">
                    <div className="col-2 my-auto">
                        {`#${props.id}`}
                    </div>
                    <div className="col-10">
                        <p className="fs-2 mb-0 me-2">{props.name}</p>
                    </div>
                </div>
                
            </div>
            <img className="bg-white" 
            src={props.imgUrl} 
            width={'100%'} 
            height={'100%'} />
        </div>
    )
}
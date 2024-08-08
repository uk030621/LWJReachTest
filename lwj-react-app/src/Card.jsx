
function Card(props){

    return(
        
        <div className="card">
            <img className="card-image"  src = {props.pic} alt = "profile picture"></img>
            <p>Name: {props.name}</p>
            <p>Age: {props.age}</p>
            <p>Pensioner: {props.pensioner ? "Yes":"No"}</p>
        </div>
        
    );

}

export default Card
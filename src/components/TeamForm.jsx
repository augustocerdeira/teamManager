import React, { useState} from "react";

import axios from 'axios';

const AuthorForm = (props) => {
    const [player, setPlayer] = useState('');
    const [preferred, setPreferred] = useState('');
    const [errors, setErrors] = useState([]); 

    const onSubmitHandler = (e) => {
        // e.preventDefault();
        axios.post('http://localhost:8000/api/teams', {
            player,
            preferred
        })
        .then(res => console.log("response: ", res))
        .catch(err=>{
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
                return errors
            }) 
    }

    return(
        <div>

        <form onSubmit={onSubmitHandler} class="container" style={{ backgroundColor: "lightblue", width: 500, color: "dimgray" }}>
            <p>{errors.map((err, index) => <p key={index}>{err}</p>)}</p>
            <p>
                <label class="form-label">Player</label>
                <input class="form-control"  type="text" onChange={(e) => setPlayer(e.target.value)} value={player}/>
            </p>
            <p>
                <label class="form-label">Preferred</label>
                <input class="form-control"  type="text" onChange={(e) => setPreferred(e.target.value)} value={preferred}/>
            </p>
            <input class="btn btn-light"  type="submit"/>
        </form>
        <p></p>
        </div>
    )
}
export default AuthorForm;
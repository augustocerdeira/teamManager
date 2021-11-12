import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from "react-router-dom";
    
const Update = (props) => {
    const { id } = useParams();
    const [player, setPlayer] = useState('');
    const [preferred, setPreferred] = useState('');
    const [errors, setErrors] = useState([]); 
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/teams/' + id)
            .then(res => {
                setPlayer(res.data.team.player);
                setPreferred(res.data.team.preferred);
            })
    }, []);
    
    const updateTeam = e => {
        e.preventDefault();
        axios.put('http://localhost:8000/api/teams/' + id, {
            player,
            preferred
        })
            .then(res => console.log(res))
            .catch(err=>{
                const errorResponse = err.response.data.errors; 
                const errorArr = []; 
                for (const key of Object.keys(errorResponse)) { 
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
                return errors
            }) 
    }

    const { removeFromDom } = props;
    
    const deleteTeam = (teamId) => {
        axios.delete('http://localhost:8000/api/teams/' + id)
            .then(res => {
                removeFromDom(teamId)
            })
            .catch(err => console.error(err));
    }
    
    return (
        <div class="container" style={{ backgroundColor: "lightblue", width: 500, color: "dimgray" }}>
            <h1>Update a Player</h1>
            <form onSubmit={updateTeam}>
            <p>{errors.map((err, index) => <p key={index}>{err}</p>)}</p>
                <p>
                    <label class="form-label">Player</label><br />
                    <input class="form-control" type="text" name="player" value={player} onChange={(e) => { setPlayer(e.target.value) }} />
                </p>
                <p>
                    <label class="form-label">Preferred</label><br />
                    <input class="form-control" type="text" name="preferred" value={preferred} onChange={(e) => { setPreferred(e.target.value) }} />
                </p>
                <input type="submit" class="btn btn-light" value="update"/>
            </form>
            <p> <a href="/"><button class="btn btn-danger"  onClick={(e)=> {if (window.comfirm("Sure you want to delete this MVP?")) {deleteTeam(id)}}}>Delete</button></a></p>
        </div>
    )
}
    
export default Update;
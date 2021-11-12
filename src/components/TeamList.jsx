import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useHistory, useParams, Link } from "react-router-dom";

const AuthorList = (props) => {
    const [player, setPlayer] = useState('');
    const [preferred, setPreferred] = useState('');
    const history = useHistory();
    const { id } = useParams();
    const { removeFromDom } = props;
    
    const deleteTeam = (teamId) => {
        axios.delete('http://localhost:8000/api/teams/' + teamId)
            .then(res => {
                removeFromDom(teamId)
            })
            .catch(err => console.error(err));
    }

    return (
        <div class="container" style={{ backgroundColor: "lightblue", width: 500, color: "dimgray" }}>
            <h1>All Players:</h1>
            <div>
            {props.team.map((team, index) => {
                return <p key={index} class="d-flex justify-content-evenly">
                    <Link to={"/teams/game1"}>{team.player}</Link>
                    {team.preferred}
                    <Link class="btn btn-light" to={"/teams/" + team._id + "/edit"}>Edit</Link>
                    <button class="btn btn-danger"  onClick={(e)=>{if (window.confirm("Sure you want to delete this MVP?"))deleteTeam(team._id)}}>Delete</button>
                    </p>
            })}
            </div>

        </div>
    )
}

export default AuthorList;
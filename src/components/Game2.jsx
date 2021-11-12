import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

const Game2 = (props) => {
    const { id } = useParams();
    const [player, setPlayer] = useState('');
    const [preferred, setPreferred] = useState('');
    const [status2, setStatus2] = useState('');
    const [team, setTeam] = useState([]);
    

    useEffect(() => {
        axios.get('http://localhost:8000/api/teams')
            .then(res => { 
                setTeam(res.data.team); 
                console.log(res.data.team)
            })
            .catch(err => console.log("Error: ", err))
    }, [team])

    const onSubmitHandler = (id) => {
        axios.put('http://localhost:8000/api/teams/'+ id, {
            status2
        })
        .then(res => console.log("response: ", res))
        .catch(err => console.error(err));
        console.log("where is the id " + id)
    }
    
    return (
        <div>
            <div>
                <div class="container" style={{ backgroundColor: "lightblue", width: 700, color: "dimgray" }}>
                <h1>Player Status - Game 2</h1>
                <div>
                    <Link to={"/teams/game1"}><button class="btn btn-light">Game 1</button></Link>

                    <Link to={"/teams/game3"}><button class="btn btn-light">Game 3</button></Link>
                </div>
                <hr/>
                <div> 
                    {team.map((team, index) => {
                        return <div key={index} class="d-flex justify-content-evenly">
                            <Link to={"/teams"}>{team.player}</Link>
                            {team.preferred}
                            
                            {team.status2 === "playing"  ?
                            <button class="btn btn-success" onClick={(e) => { 
                                setStatus2("playing") 
                                onSubmitHandler(team._id)
                                }}>playing</button>
                                :
                                <button class="btn btn-light" onClick={(e) => { 
                                    setStatus2("playing") 
                                    onSubmitHandler(team._id)
                                    }}>playing</button>}
                                {team.status2 === "not playing"  ?
                                <button class="btn btn-danger" onClick={(e) => { 
                                setStatus2("not playing") 
                                onSubmitHandler(team._id)
                                }}>Not playing</button>
                                :
                                <button class="btn btn-light" onClick={(e) => { 
                                    setStatus2("not playing") 
                                    onSubmitHandler(team._id)
                                    }}>Not playing</button>}
                                    {!team.status2  ?
                                <button class="btn btn-warning" onClick={(e) => { 
                                setStatus2("") 
                                onSubmitHandler(team._id)
                                }}>Undecided</button>
                                :
                                <button class="btn btn-light" onClick={(e) => { 
                                    setStatus2("") 
                                    onSubmitHandler(team._id)
                                    }}>Undecided</button>}
                            
                        </div>
                    })}
                </div>
                </div>
            </div>
        </div>
    );
}
export default Game2;
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import axios from 'axios';
import TeamForm from '../components/TeamForm';
import TeamList from '../components/TeamList';
import Game1 from '../components/Game1';
import Update from './Update';
import Game2 from '../components/Game2';
import Game3 from '../components/Game3';

export default () => {
    const [team, setTeam] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/api/teams')
            .then(res => { setTeam(res.data.team); setLoaded(true); })
            .catch(err => console.log("Error: ", err))
    }, [team])

    const removeFromDom = teamId => {
        setTeam(team.filter(team => team._id != teamId));
    }

    return (
        <BrowserRouter>
            <div>
                <Link to="/"></Link>
                <Link to="/teams/id"></Link>
                <Link to="/teams/game1"></Link>
                <Link to="/teams/game2"></Link>
                <Link to="/teams/game3"></Link>
                <Switch>
                    <Route path="/teams/:id/edit">
                        <Update />
                    </Route>
                    <Route path="/teams/game1">
                        <Game1 team={team} />
                    </Route>
                    <Route path="/teams/game2">
                        <Game2/>
                    </Route>
                    <Route path="/teams/game3">
                        <Game3/>
                    </Route>
                    <Route path="/">
                        <TeamForm />
                        {loaded && <TeamList team={team} removeFromDom={removeFromDom} />}
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    )
}

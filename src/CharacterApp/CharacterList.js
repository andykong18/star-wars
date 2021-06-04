import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

export default class CharacterList extends Component {
    state = {
        isLoading: true,
        characters: [],
        error: ''
    }

    componentDidMount() {
        fetch("https://swapi.dev/api/people/")
            .then(response => response.json())
            .then((parsedJSON) => parsedJSON.results)
            .then(data => {
                this.setState({
                    characters: data,
                    isLoading: false
                })
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                    error: error.message
                })
            });
    }

    render() {
        const { isLoading, error, characters } = this.state;
        console.log(characters);

        return (
            <div className="characters-list">
                {isLoading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {characters.map((character, idx) => {
                    const id = idx + 1;
                    return (
                        <div className="character font-weight-bold h6" key={idx}>
                            <Link className="text-white" to={`/character/${id}`}>{character.name}</Link>
                        </div>
                    )
                })}
            </div>
        )
    }
}

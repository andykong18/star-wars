import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';

export default class CharacterList extends Component {
    state = {
        isLoading: true,
        characters: [],
        image: null,
        error: ''
    }
    componentDidMount() {
        fetch("https://swapi.dev/api/people/")
            .then(response => response.json())
            .then((parsedJSON) => parsedJSON.results)
            .then(data => {
                this.setState({
                    characters: data,
                    isLoading: false,
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
        const { isLoading, error, characters, image } = this.state;
        console.log(characters);

        return (
            <div className="characters-list row">
                {isLoading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {characters.map((character, idx) => {
                    const id = idx + 1;
                    return (
                        <div className="character col-2 m-2 font-weight-bold h6" key={idx}>
                            <Link to={`/character/${id}`}>
                                <img src={`./image/${id}.jpg`} alt="image" className="card-img-top image-fluid p-0" style={{ height: 300 }} />
                                <div>{character.name}</div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        )
    }
}

import React, { Component } from 'react'
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';

export default class CharacterList extends Component {
    state = {
        isLoading: true,
        film: [],
        error: ''
    }

    componentDidMount() {
        fetch("https://swapi.dev/api/films/")
            .then(response => response.json())
            .then((parsedJSON) => parsedJSON.results)
            .then(data => {
                this.setState({
                    film: data,
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
        const { isLoading, error, film } = this.state;
        console.log(film);

        return (
            <div className="film-list">
                {isLoading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {film.map((film, idx) => {
                    const id = idx + 1;
                    return (
                        <div className="character font-weight-bold h6" key={idx}>
                            <Link className to={`/film/${id}`}>{film.name}</Link>
                        </div>
                    )
                })}
            </div>
        )
    }
}
import React, { Component } from 'react'
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';

export default class Film extends Component {
    state = {
        isLoading: true,
        film: null,
        error: ''
    }

    componentDidMount() {
        const {filmUrl} = this.props; 

        fetch(filmUrl)
            .then(response => response.json())
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
        const { isLoading, error, film, character } = this.state;
        console.log(film);
        let content;
        if(film){content = <div>{film.title}</div>}

        return (
            <div>
                {isLoading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {content}
            </div>
        )
    }
}

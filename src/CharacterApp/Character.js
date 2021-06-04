import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

class Character extends Component {
    state = {
        isLoading: true,
        character: null,
        error: false
    }

    componentDidMount() {
        this.fetch();
    }

    componentDidUpdate(prevProps) {
        const oldid = prevProps.match.params.id;
        const incomingid = this.props.match.params.id;
        if (oldid !== incomingid) {
            this.fetch();
        }
    }

    fetch= () => {
        const id = this.props.match.params.id
        fetch(`https://swapi.dev/api/people/${id}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    isLoading: false,
                    character: data
                });
            })
            .catch(() => {
                this.setState({
                    isLoading: false,
                    error: true
                });
            });
    }

    static propTypes = {
        character: PropTypes.shape({
            name: PropTypes.string.isRequired,
            height: PropTypes.string.isRequired,
            birth_year: PropTypes.string.isRequired,
            gender: PropTypes.string.isRequired
        }),
        isLoading: PropTypes.bool.isRequired,
        error: PropTypes.bool.isRequired
    }

    render() {
        const { isLoading, error, character } = this.state;
        let content;

        if (character) {
            content = (
                <div className="row border p-2">
                    <h2 className="text-center col-12">{character.name}</h2>
                    <h4 className="col-12">height: {character.height}</h4>
                    <h4 className="col-12">birth year: {character.birth_year}</h4>
                    <h4 className="col-12">gender: {character.gender}</h4>
                </div>
            );
        }

        return (
            <div className="container col-4 offset-4 bg-info p-5">
                {isLoading && <p>Loading...</p>}
                {error && <p>Error. Please refresh and try again</p>}
                {content}
            </div>
        );
    }
}

export default withRouter(Character);

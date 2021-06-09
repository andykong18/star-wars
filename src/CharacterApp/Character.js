import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import Film from './Film.js';
import Name from './Name.js';

class Character extends Component {
    state = {
        isLoading: true,
        character: null,
        image: null,
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

    fetch = () => {
        const id = this.props.match.params.id
        this.setState({
            image: `./image/${id}.jpg`,
        });
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
            gender: PropTypes.string.isRequired,
            mass: PropTypes.string.isRequired,
            hair_color: PropTypes.string.isRequired,
            skin_color: PropTypes.string.isRequired,
            eye_color: PropTypes.string.isRequired,
            homeworld: PropTypes.string.isRequired
        }),
        isLoading: PropTypes.bool.isRequired,
        error: PropTypes.bool.isRequired,
        image: PropTypes.string.isRequired,
        vehicles: PropTypes.array.isRequired
    }

    render() {
        const { isLoading, error, character, image } = this.state;
        let content;
        let films;
        let vehicles;
        let starships;

        if (character) {
            content = (
                <div className="card row" style={{ height: 390 }} >
                    <img src={image} alt="image" className="card-img-top image-fluid col-6 p-0" style={{ height: 350 }} />
                    <h5 className="card-title">{character.name}</h5>
                    <div className="card-body text-left col-6">
                        <p>height: {character.height}</p>
                        <p>mass: {character.mass}</p>
                        <p>birth year: {character.birth_year}</p>
                        <p>gender: {character.gender}</p>
                        <p>Hair color: {character.hair_color}</p>
                        <p>Skin color: {character.skin_color}</p>
                        <p>Eye color: {character.eye_color}</p>
                        <p>Homeworld: <Name url={character.homeworld} /> </p>
                    </div>
                </div >
            );
            films = (
                <div className="card">
                    <h5>Appeared in film:</h5>
                    <div>
                        {character.films.map((url, idx) => {
                            return (
                                <div>
                                    <Film filmUrl={url} key={idx} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            );
            vehicles = (
                <div className="card">
                    <h5>Vehicles:</h5>
                    {(character.vehicles.length !== 0) ? (<div> {character.vehicles.map((url, idx) => {
                        return (
                            <div>
                                <Name url={url} key={idx} />
                            </div>
                        )
                    })}</div>) : (<div> none</div>)}
                </div>
            )
            starships = (
                <div className="card">
                    <h5>Starships:</h5>
                    {(character.starships.length !== 0) ? (<div> {character.starships.map((url, idx) => {
                        return (
                            <div>
                                <Name url={url} key={idx} />
                            </div>
                        )
                    })}</div>) : (<div> none</div>)}
                </div>
            )
        }

        return (
            <div className="row">
                {isLoading && <p>Loading...</p>}
                {error && <p>Error. Please refresh and try again</p>}
                <div className="col-5 ml-auto">
                    {content}
                </div>
                <div className="col-5 mr-auto text-left">
                    {films}
                    {vehicles}
                    {starships}
                </div>
            </div>
        );
    }
}

export default withRouter(Character);

import React, { Component } from 'react'

export default class Name extends Component {
    state = {
        isLoading: true,
        data: null,
        error: ''
    }

    componentDidMount() {
        const { url } = this.props;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    data: data,
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
        const { isLoading, error, data } = this.state;
        console.log(data);
        let content;
        if (data) { content = <span>{data.name}</span> }

        return (
            <>
                {isLoading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {content}
            </>
        )
    }
}
import React, { Component } from 'react'

import './Search.scss';

import Suggestions from './Suggestions';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            suggestions: [],
            isShown: false,
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    makeRequest = async (query) => {
        let rawResults = await fetch(`http://localhost:6969/searchMovie?query=${query}`);
        let results = await rawResults.json();

        return results;
    }


    onChangeHandler = async (e) => {
        let input = e.target.value;

        if(input.length > 2) {
            this.setState({ isShown: true });

            let suggestions = await this.makeRequest(input);
            
            if(suggestions !== this.state.suggestions) {
                this.setState({suggestions})
            }
        }
        if(input.length <= 2) {
            this.setState({ isShown: false })
        }
    }

    render() {
        let list = this.state.suggestions;

        return (
            <div className="search">
                <input 
                type="text" 
                placeholder="Search..."
                onChange={this.onChangeHandler}
                />
                <Suggestions 
                list={list} 
                show={this.state.isShown}
                ref={this.setWrapperRef}
                /> 
            </div>
        )
    }
}

export default Search;
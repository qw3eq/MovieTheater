import React, { Component } from 'react';


import './MoviePoster.scss';



class MoviePoster extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title,
            genres: this.props.genres,
            rating: this.props.rating,
            poster: this.props.poster,
            id: this.props.id
        }
    }


    componentDidUpdate(prevProps) {
        if(prevProps !== this.props) {
            console.log("new props")
            this.setState({
                title: this.props.title,
                genres: this.props.genres,
                rating: this.props.rating,
                poster: this.props.poster,
                id: this.props.id
            })
        }
    }
    
    

    render() {
    return (
        <div className="poster" onClick={() => this.props.onClickHandler(this.state.id)}>
            <div className="poster-image">
                <img src={this.state.poster} alt="poster"/>
            </div>
            <div className="poster-info">
                <div className="poster-info-name">
                    <span>{this.state.title}</span> &nbsp; <span>{this.state.rating}</span>
                </div>
                <div className="poster-info-genre">
                    <ul>
                    {this.state.genres.map((genre, i) => <li key={i}>{genre}</li>)}
                    </ul>
                </div>
            </div>
        </div>
    )
    }
}

export default MoviePoster;
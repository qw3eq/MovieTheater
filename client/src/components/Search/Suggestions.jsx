import React, { Component } from 'react';

class Suggestions extends Component {
    constructor(props) {
        super(props);

        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onClickHandler = async (id) => {
        let rawData = await fetch(`http://localhost:6969/imdbID?id=${id}`);
        let data = await rawData.json()
        
        
        let url = `https://vidsrc.me/embed/${data}`
        console.log(url)
        // let win = window.open(url, '_blank');
        // win.focus();

    }

    render() {
    if(!this.props.show){
        return null;
    } else {
    return(
        <div className="suggestions" ref={this.props.ref}>
            <ul className="list">
                {this.props.list.map((movie, i) => {
                    let pDate;
                    if(movie.release_date) {
                        pDate = <p className="item-year">{movie.release_date.slice(0,4)}</p>
                    }
                    return (

                    <li key={i} db-id={movie.id} onClick={() => this.onClickHandler(movie.id)}>
                    {pDate}
                    <p className="item-title">{movie.title}</p>
                    </li>
                    )
                })}
            </ul>
        </div>
    )
    }
    }
}

export default Suggestions;
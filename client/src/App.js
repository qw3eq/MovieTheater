import React, { Component } from 'react';

import Navbar from './components/Home/Navbar/Navbar';

import MoviePoster from './components/Home/MoviePoster/MoviePoster';
import Carousel from './components/Home/Carousel/Carousel';
import Container from './components/Home/Container/Container';
import TrailerPreview from './components/Home/TrailerPreview/TrailerPreview';


import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        trending : [],
        movieTrailer : {},

    }

    this.clickHandler = this.clickHandler.bind(this);
  }
  
  async componentDidMount() {
    let rawData = await fetch('http://localhost:6969/getTrending');
    let data = await rawData.json();
  
    let chosenMovie = data[0];
    let trailer_id = await fetch(`http://localhost:6969/getTrailer?id=${chosenMovie.id}`)
    let ytData = await trailer_id.json();

    console.log(ytData)
    chosenMovie["trailer_id"] = ytData.youtubeId

    this.setState({ 
        trending: data,
        movieTrailer: chosenMovie,
      })
  }

  async clickHandler(id) {
    let chosenMovie = this.state.trending.filter(a => a.id === id)[0];
    if(this.state.movieTrailer !== chosenMovie) {
      let trailer_id = await fetch(`http://localhost:6969/getTrailer?id=${chosenMovie.id}`)
      let ytData = await trailer_id.json();

      chosenMovie["trailer_id"] = ytData.youtubeId

      this.setState({movieTrailer: chosenMovie});
    }
  }

  render() {
    let arr = []
    let trending = this.state.trending;
    for(let i = 0; i < trending.length; i++) {
      arr.push(<MoviePoster 
        title={trending[i].title} 
        rating={trending[i].vote_average}
        genres={trending[i].genres}
        poster={trending[i].poster_path}
        id={trending[i].id}
        onClickHandler={this.clickHandler}
        key={trending[i].id}
        
        />)
    }
    
  console.log(this.state.movieTrailer.trailer_id)

    return (
      <div className="App">
        <Navbar />

        <TrailerPreview 
        title={this.state.movieTrailer.title}
        rating={this.state.movieTrailer.vote_average}
        description={this.state.movieTrailer.overview}
        trailer_id={this.state.movieTrailer.trailer_id}
        />

        <Container title={"Fan Favourites"}>
        <Carousel children={arr} />
        </Container>
      </div>
    )
  }
}

export default App;

import React, { Component } from 'react';

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import './Carousel.scss';


class Carousel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            children: []
        }
    }

    componentDidMount() {
        this.setState({children : this.props.children})
    }

    componentDidUpdate(prevProps) {
        if(this.props !== prevProps) {
            this.setState(this.props);
        }
    }



    render() {
        let parts = splitArray(this.state.children);

        return (
            <CarouselProvider
                naturalSlideHeight={25}
                naturalSlideWidth={100}
                totalSlides={parts.length}
            >
                <Slider>
                {parts.map((part, i) => {
                        
                        return (
                            <Slide index={i} key={i} innerClassName="carousel-group">
                                {part.map( poster => poster)}
                            </Slide>
                        )
                    })}
                </Slider>
                <ButtonBack className="back">&lt;</ButtonBack>
                <ButtonNext className="next">&gt;</ButtonNext>
            </CarouselProvider>
        )
    }
}

function splitArray(arr) {
    let parts = [];
    let part = [];

    let index = 0;
    for(let i = 0; i < arr.length; i++) {
        part.push(arr[i]);
        index += 1;
        
        if(index === 5 || i === arr.length - 1) {
            parts.push(part);
            part = [];
            index = 0;
        }
    }
    
    return parts;
}


export default Carousel;



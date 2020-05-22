import React from 'react';

import YouTube from 'react-youtube';

import './TrailerPreview.scss';

function TrailerPreview(props)  {    
    let width = window.innerWidth * 0.7;           // width: 70% 
    let height = window.innerWidth * 0.7 * 9 / 16; // aspect ratio 16:9
    
    let opts = {
        height: height,   
        width: width,     
        playerVars: {
            autoplay: 0,
            controls: 1,

        }
    }


    return (
        <div className="preview" style={{height: height+"px"}}>
            <div className="preview-bg">
                <div className="preview-bg-shadow" >
                <div className="preview-description">
                    <h3>{props.title}</h3>
                    <h4>{props.rating}</h4>
                    <p>{props.description}</p>
                    {/* <ul>
                        {props.actors.map(a => <li>{a}</li>)}
                    </ul> */}
                </div>

                

                </div>
                <YouTube 
                // https://www.npmjs.com/package/react-youtube
                className="preview-player"
                videoId={props.trailer_id}
                opts={opts}
                />
            </div>

            
        </div>
    )
    
}

export default TrailerPreview;

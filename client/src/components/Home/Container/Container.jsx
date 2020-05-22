import React from 'react';

import './Container.scss';

function Container(props) {
    let title;
    if(props.title) {
    title = <div className="container-title"><span>{props.title}</span></div>
    }
    return (
        <div className="container">
            {title}

            {props.children}
        </div>
    )
}

export default Container;
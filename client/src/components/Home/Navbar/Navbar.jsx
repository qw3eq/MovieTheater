import React from 'react';

import './Navbar.scss';

import Search from '../../Search/Search';

function Navbar() {
    return(
        <div className="navbar">
            <div className="navbar-tab">
                <span>Home</span>
            </div>

            <div className="navbar-tab">
                <Search />
            </div>
        </div>
    )
}

export default Navbar;
import React from 'react'
import logo from '../../images/logo.png';


const Header = () => {
    return(
        <>
            <header className='header'>
                <div className="header-wrap">
                    <h1 className='logo'>
                        <a href="/">
                            <img src={logo} alt="logo" />
                            Simple Thumb Maker
                        </a>
                    </h1>
                </div>
            </header>
        </>
    )
}

export default Header;
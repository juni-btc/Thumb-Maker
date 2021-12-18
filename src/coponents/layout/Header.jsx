import React from 'react'
import logo from '../../images/logo.png';


const Header = () => {
    return(
        <>
            <header className='header'>
                <div className="header-wrap">
                    <h1 className='logo'>
                        <a href="https://juni-official.tistory.com/" target="_blank" rel="noreferrer">
                            <img src={logo} alt="logo" />
                            Thumbnail Maker
                        </a>
                    </h1>
                </div>
            </header>
        </>
    )
}

export default Header;
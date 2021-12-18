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
                            Thumbnail Maker
                        </a>
                    </h1>
                    <ul className='subMenu'>
                        <li>
                            <a href="https://juni-official.tistory.com/" target="_blank">
                            <box-icon name='home' color='#ffffff' ></box-icon>
                            </a>
                        </li>
                    </ul>
                    
                </div>
            </header>
        </>
    )
}

export default Header;
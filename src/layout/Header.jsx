import React from 'react'
import logo from '../images/logo.ico'
import { BsGithub } from 'react-icons/bs'

const Header = () => {
  return (
    <>
      <header className="header">
        <div className="header-wrap">
          <h1 className="logo">
            <a href="https://juni-official.tistory.com/" target="_blank" rel="noreferrer">
              <img src={logo} alt="logo" />
              썸네일 메이커
            </a>
          </h1>
          <a href="https://github.com/macjjuni/Thumb-Maker" target="_blnak" className="git-icon">
            <BsGithub fontSize={30} color="#000" />
          </a>
        </div>
      </header>
    </>
  )
}

export default Header

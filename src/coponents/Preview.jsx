import React from 'react'
import styled from 'styled-components';

const Background = styled.div`
    position: fixed; top: 0; left: 0;
    width: 100%; height: 100%;
    background-color: rgba(0,0,0,0.3);
    z-index: 9999;
`
const Img = styled.img`
    display: inline-block; width: 60vw; height: auto;
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
`
const Close = styled.button`
    display: inline-block; width: 50px; height: 50px;
    position: absolute; top: 30px; right: 30px;
    background-color: rgba(0,0,0,0.7); border-radius: 50%; 
    &:after{
        content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(45deg);
        width: 4px; height: 27px; background-color: #fff;
    }
    &:before{
        content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(135deg);
        width: 4px; height: 27px; background-color: #fff;
    }
    @media screen and (max-width: 768px){
        top: 20px; right: 20px; width: 40px; height: 40px;
    }
`

const Preview = ({img, previewRemove}) => {
    

    return(
        <>
            {
                img === false
                    ?
                    <></>
                    :
                <Background>
                    <Close onClick={previewRemove}/>
                    <Img src={img} alt="thumbnail" />
                </Background>                
            }
        </>
    )
}


export default Preview;
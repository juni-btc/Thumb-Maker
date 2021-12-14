import React from 'react'
import View from './View';
import Control from './Control';
import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import html2canvas from 'html2canvas';



const ThumbMaker = () => {
    
    const canvasEl = useRef(null);

    const [size, setSize] = useState([960, 540]); //Canvas Size
    const [BgColor, setBgColor] = useState('#fff'); //Canvas Color
    const [titleTxt, setTitleTxt] = useState('제목'); //Title Text
    const [titleColor, setTitleColor] = useState('#000'); //Title Color
    const [subTxt, setSubTxt] = useState('소제목'); //SubTitle Text
    const [subColor, setSubColor] = useState('#000'); //SubTitle Color
    const [cateTxt, setCateTxt] = useState('분류'); //Category Text
    const [cateColor, setCateColor] = useState('#000'); //Category Color

    const [isSub, setIsSub] = useState(true);


    useEffect(()=>{ //기본 크기 설정 1120x540
        const canvas = canvasEl.current;
        const ctx = canvas.getContext('2d');
        canvas.width = size[0];
        canvas.height = size[1];

        ctx.fillStyle = BgColor; 
        ctx.fillRect(0, 0, size[0], size[1]);
    }, []);

    useEffect(()=>{
        setIsSub(subTxt !== '' ? true : false);
    }, [subTxt])

    

    const onChangeInput = (e) => { 
        
        const files = e.target.files;
        if(files.length !== 0){
            console.log(files);
            fileRead(files[0]);
        }else{
            console.log("이미지 파일이 없음")
        }

    }

    const fileRead = (file) => { //이미지 로드 후 캔버스에 삽입
        const reader = new FileReader();
        const image = new Image();

        reader.readAsDataURL(file);
        reader.onload = (e) => {
            image.src = e.target.result;
            image.onload = () => {
                drawImage(image); //캔버스에 이미지 삽입
            }   
        }
    }

    const drawImage = (image) => { //캔버스에 이미지 삽입
        const ctx = canvasEl.current.getContext('2d');
        canvasEl.current.width = size[0];
        canvasEl.current.height = size[1];
        ctx.drawImage(image, 0, 0, size[0], size[1]);
    }

    const drawTxt = (e) => {
        const chk = e.target.getAttribute('data-id');
        switch(chk){
            case 'title' : {
                setTitleTxt(e.target.value);
                break;
            }
            case 'sub' : {
                setSubTxt(e.target.value);
                break;
            }
            case 'cate' : {
                setCateTxt(e.target.value);
                break;
            }
        }
    }

    const changeColor = (e) => {
        const chk = e.target.getAttribute('data-id');
        switch(chk){
            case 'title' : {
                setTitleColor(e.target.value);
                break;
            }
            case 'subTitle' : {
                setSubColor(e.target.value);
                break;
            }
            case 'cate' : {
                setCateColor(e.target.value);
                break;
            }
            case 'bgColor' : {
                const ctx = canvasEl.current.getContext('2d');
                ctx.fillStyle = e.target.value;
                ctx.fillRect(0, 0, size[0], size[1]);
                break;
            }
        }
    }

    const randomBg = () => {
        
        const r = (Math.random() * 255 - 150) + 150;
        const g = (Math.random() * 255 - 150) + 150;
        const b = (Math.random() * 255 - 150) + 150;
    
        const ctx = canvasEl.current.getContext('2d');

        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(0, 0, size[0], size[1]);

        console.log(size[0] + ' - ' + size[1]);
    }

    const changeSize = (e) => {
        const chk = e.target.getAttribute('data-size');
        switch(chk){
            case '1' : { setSize([960, 540]); break; }
            case '2' : { setSize([960, 720]); break; }
            case '3' : { setSize([800, 800]); break; }
        }
    }


    const download = () => {
        const date = new Date();   
        const year = date.getFullYear(); // 년도
        const month = date.getMonth() + 1;  // 월
        const days = date.getDate();  // 날짜

        html2canvas(document.querySelector('#canvasWrap')).then(canvas=>{
            canvas.toBlob(res=>{
                const aTag = document.createElement('a');
                aTag.download = `thumbnail_${year}${month}${days}.png`;
                aTag.href = URL.createObjectURL(res);
                aTag.click();
            });
        });
    }

    const openTap = () => {
        html2canvas(document.querySelector('#canvasWrap')).then(canvas=>{
            canvas.toBlob(res=>{
                const url = URL.createObjectURL(res);
                window.open(url);
            });
        });
    }

    return(
        <>
            <View>
                <CanvasWrap width={size[0]} height={size[1]} id="canvasWrap">
                    <canvas ref={canvasEl} id="target" width={size[0]} height={size[1]}/>
                    <TitleH color={titleColor} top={isSub === true ? 42 : 49}>{titleTxt}</TitleH>
                    <SubH color={subColor}>{subTxt}</SubH>
                    <CateH color={cateColor}>{cateTxt}</CateH>
                </CanvasWrap>
            </View>
            <Control>
                <div className="sizeBox">
                    <h2>크기</h2>
                    <div className="thirdBtn-box">
                        <button className='sizeBtn' data-size="1" onClick={changeSize}>
                            960x540<br/>
                            16:9
                        </button>
                        <button className='sizeBtn' data-size="2" onClick={changeSize}>
                            960x720<br/>
                            4:3
                        </button>
                        <button className='sizeBtn'data-size="3" onClick={changeSize}>
                            800x800<br/>
                            1:1
                        </button>
                    </div>
                    
                </div>
                <div className="bgWrap">

                    <h2>배경</h2> 
                    <input type="file" id="bgImg-Input" onChange={onChangeInput} accept="image/png, image/jpg, image/jpeg, image/webp, image/gif"/>
                    
                    <div className="oneBtn-box">
                        <button className="uploadBtn">
                            <label htmlFor="bgImg-Input">이미지 업로드</label>
                        </button>
                    </div>

                    <h2>단색</h2>
                    <div className="twoBtn-box">
                        <button>단색
                        <input type="color" data-id="bgColor" onChange={changeColor} className="colorPicker" value="#eeeeee"/>
                        </button>
                        <button onClick={randomBg}>단색 랜덤</button>
                    </div>

                    <h2>그라데이션</h2>
                    <div className="twoBtn-box">
                        <button>그라데이션</button>
                        <button>그라데이션 랜덤</button>
                    </div>             
                    
                </div>
                <div className="titleWrap">
                    <h2>제목</h2>
                    <div className="oneInput-box">
                        <input onChange={drawTxt} type="text" defaultValue={"제목"} data-id="title"/>
                        <input type="color" data-id="title" onChange={changeColor} className="colorPicker" value={titleColor}/>
                    </div>

                    <h2>소제목</h2>
                    <div className="oneInput-box">    
                        <input onChange={drawTxt} type="text" defaultValue={"소제목"} data-id="sub"/>
                        <input type="color" data-id="subTitle" onChange={changeColor} className="colorPicker" value={subColor}/>
                    </div>
                    <h2>분류</h2>
                    <div className="oneInput-box">    
                        <input onChange={drawTxt} type="text" defaultValue={"분류"} data-id="cate"/>
                        <input type="color" data-id="cate" onChange={changeColor} className="colorPicker" value={cateColor}/>
                    </div>
                </div>

                <div className="twoBtn-box donwBtn">
                    <button onClick={openTap}>새탭에서 열기</button>
                    <button onClick={download}>다운로드</button>
                </div>

            </Control>
            
        </>
    )
}


const CanvasWrap = styled.span`
    position: absolute;
    top: 50%; left: 50%; transform: translate(-50%, -50%);
    display: inline-block; vertical-align: middle;
    width: ${props=> props.width}px; height: ${props=> props.height}px;
    user-select: none;
    box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
    &>canvas{ width: 100%; height: 100%; }
`
const TitleH = styled.h1`
    position: absolute; top: ${props=> props.top}%; left: 50%; transform: translate(-50%, -50%);
    width: 100%;  height: 54px; padding: 0 30px;
    font-size: 54px; font-family: 'Noto Sans';
    color: ${props=> props.color}; transition: top 0.3s ease;`

const SubH = styled.h2`
    position: absolute; top: 60%; left: 50%;
    transform: translate(-50%, -50%);
    font-size: 30px; color: ${props=> props.color};
    height: 30px; padding: 40px 0 0 0;
    font-family: 'Noto Sans';
    border-top: 1px solid #fff;
`
const CateH = styled.h3`
    position: absolute; bottom: 5%; left: 50%;
    transform: translate(-50%, -50%);
    font-size: 25px;
    height: 25px;
    font-family: 'Noto Sans';
    color: ${props=> props.color};
`


export default ThumbMaker;
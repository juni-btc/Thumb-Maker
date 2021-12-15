import React from 'react'
import View from './View';
import Control from './Control';
import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import html2canvas from 'html2canvas';



const ThumbMaker = () => {
    
    const canvasEl = useRef(null);
    const coverEl = useRef(null);
    const [loadImg, setLoadImg] = useState();
    // Canvas State
    const [cvSize, setCvSize] = useState([960, 540, 0]); //Canvas Size [width, height, mode]
    const [cvCover, setCvCover] = useState('none');
    const [isImage, setIsImage] = useState(false);
    const [border, setBorder] = useState('0'); //Canvas Border Size
    const [borderColor, setBorderColor] = useState('#fff'); //Canvas Border Color
    const [BgColor, setBgColor] = useState('#fff'); //Canvas Color
    // Text State
    const [titleTxt, setTitleTxt] = useState('Title'); //Title Text
    const [titleColor, setTitleColor] = useState('#000'); //Title Color
    const [titleTop, setTitleTop] = useState(38); //Title CSS Top Size
    const [subTxt, setSubTxt] = useState('SubTitle'); //SubTitle Text
    const [subColor, setSubColor] = useState('#000'); //SubTitle Color
    const [subTxtTop, setSubTxtTop] = useState(57); //subTitle CSS Top Size
    const [cateTxt, setCateTxt] = useState('Category'); //Category Text
    const [cateColor, setCateColor] = useState('#000'); //Category Color

    
    useEffect(()=>{ //소제목이 없을 경우 제목 위치 변경
        if(subTxt === ''){
            setTitleTop(49);
        }else{
            setTitleTop(38);
            setSubTxtTop(57); 
        }

    }, [subTxt], [cvSize]) 

    useEffect(()=> { // 캔버스 크기 변경
        const canvas = canvasEl.current;
        const ctx = canvas.getContext('2d');
        canvas.width = cvSize[0];
        canvas.height = cvSize[1];
        if(!isImage){
            ctx.fillStyle = BgColor; 
            ctx.fillRect(0, 0, cvSize[0], cvSize[1]);
        }else{
            ctx.drawImage(loadImg, 0, 0, cvSize[0], cvSize[1]);
        }
        
    }, [cvSize]);

    /* --------------- Image ----------------- */
    const addImage = (e) => { 
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
                setLoadImg(image);
                drawImage(image); //캔버스에 이미지 삽입
            }
        }
        setIsImage(true);
    }
    const drawImage = (image) => { //캔버스에 이미지 삽입
        
        const ctx = canvasEl.current.getContext('2d');
        canvasEl.current.width = cvSize[0];
        canvasEl.current.height = cvSize[1];
        ctx.drawImage(image, 0, 0, cvSize[0], cvSize[1]);
    }
    /* --------------- Image ----------------- */


    const drawTxt = (e) => {
        const chk = e.target.getAttribute('data-id');
        switch(chk){
            case 'title' : {
                setTitleTxt(e.target.value); break;
            }
            case 'sub' : {
                setSubTxt(e.target.value); break;
            }
            case 'cate' : {
                setCateTxt(e.target.value); break;
            }
        }
    }

    const changeColor = (e) => {
        const chk = e.target.getAttribute('data-id');
        switch(chk){
            case 'title' : {
                setTitleColor(e.target.value); break;
            }
            case 'subTitle' : {
                setSubColor(e.target.value); break;
            }
            case 'cate' : {
                setCateColor(e.target.value); break;                
            }
            case 'bgColor' : {
                setBgColor(e.target.value);
                setIsImage(false);

                const ctx = canvasEl.current.getContext('2d');
                ctx.fillStyle = e.target.value;
                ctx.fillRect(0, 0, cvSize[0], cvSize[1]);
                break;
            }
            case 'borderColor' : {
                setBorderColor(e.target.value); break;
            }
        }
    }

    const isCover = () => {
        const chk = coverEl.current.checked;
        if(chk !== true){
            setCvCover('none');
        }else{
            setCvCover('block');
        }
    }

    const randomBg = () => {
        
        const r = (Math.random() * (255 - 150 + 1) + 150).toFixed(0);
        const g = (Math.random() * (255 - 150 + 1) + 150).toFixed(0);
        const b = (Math.random() * (255 - 150 + 1) + 150).toFixed(0);
        const ctx = canvasEl.current.getContext('2d');
        
        setIsImage(false);
        setBgColor(`rgb(${r}, ${g}, ${b})`);

        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(0, 0, cvSize[0], cvSize[1]);
    }

    const changeSize = (e) => {
        const chk = e.target.getAttribute('data-size');

        switch(chk){
            case '1' : { setCvSize([960, 540, 0]); break; }
            case '2' : { setCvSize([960, 720, 1]); break; }
            case '3' : { setCvSize([800, 800, 2]); break; }
        }
    
    }

    const changeBorder = (e) => { setBorder(e.target.getAttribute('data-size')); }

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
                <CanvasWrap width={cvSize[0]} height={cvSize[1]} id="canvasWrap" bg={borderColor} padding={border} cover={cvCover}>
                    <Canvas ref={canvasEl} id="target" width={cvSize[0]} height={cvSize[1]} />
                    <TitleH color={titleColor} top={titleTop}>{titleTxt}</TitleH>
                    <SubH color={subColor} top={subTxtTop}>{subTxt}</SubH>
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

                    <h2>
                        배경
                        <label htmlFor="bcInput" className="bgCover">
                            <input type="checkbox" id="bcInput" ref={coverEl} onChange={isCover}/><span> Cover</span>
                        </label>
                    </h2> 
                    <input type="file" id="bgImg-Input" onChange={addImage} accept="image/png, image/jpg, image/jpeg, image/webp, image/gif"/>
                    
                    <div className="oneBtn-box">
                        <button className="uploadBtn">
                            <label htmlFor="bgImg-Input">이미지 업로드</label>
                        </button>
                    </div>
                    <div className="twoBtn-box">
                        <button>단색
                        <input type="color" data-id="bgColor" onChange={changeColor} className="colorPicker" value="#eeeeee"/>
                        </button>
                        <button onClick={randomBg}>단색 랜덤</button>
                    </div>
                    <div className="twoBtn-box">
                        <button>그라데이션</button>
                        <button>그라데이션 랜덤</button>
                    </div>             
                    
                </div>
                <div className="titleWrap">
                    <h2>제목</h2>
                    <div className="oneInput-box">
                        <input onChange={drawTxt} type="text" defaultValue={"Title"} data-id="title"/>
                        <input type="color" data-id="title" onChange={changeColor} className="colorPicker" value={titleColor}/>
                    </div>

                    <h2>소제목</h2>
                    <div className="oneInput-box">    
                        <input onChange={drawTxt} type="text" defaultValue={"Subtitle"} data-id="sub"/>
                        <input type="color" data-id="subTitle" onChange={changeColor} className="colorPicker" value={subColor}/>
                    </div>
                    <h2>분류</h2>
                    <div className="oneInput-box">    
                        <input onChange={drawTxt} type="text" defaultValue={"Category"} data-id="cate"/>
                        <input type="color" data-id="cate" onChange={changeColor} className="colorPicker" value={cateColor}/>
                    </div>
                </div>
                <div className="borderWrap">
                    <h2>테두리</h2>
                    <div className="thirdBtn-box h40">
                        <button data-size="5" onClick={changeBorder}>5px</button>
                        <button data-size="15" onClick={changeBorder}>15px</button>
                        <button data-size="30" onClick={changeBorder}>30px</button>
                    </div>
                    <div className="twoBtn-box">
                        <button data-size="0" onClick={changeBorder}>
                            None
                        </button>
                        <button data-size="15">
                            Color
                            <input type="color" data-id="borderColor" onChange={changeColor} className="colorPicker" value={borderColor}/>
                        </button>
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
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
    display: inline-block; vertical-align: middle;
    width: ${props=> props.width}px; height: ${props=> props.height}px;
    background-color : ${props=>props.bg};
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; padding: ${props=> props.padding}px;
    user-select: none;
    &:after{
        display: inline-block; width: 100%; height: 100%; 
        position: absolute; top: 0; left: 0; content: '';
        background-color: rgba(0,0,0, 0.3); z-index: 100;
        display: ${props=>props.cover};
    }
`
const Canvas = styled.canvas`
    display: block; position: relative;
    width: 100%; height: 100%;
`

const TitleH = styled.h1`
    position: absolute; top: ${props=> props.top}%; left: 50.05%; transform: translate(-50%, -50%);
    width: 100%;  height: 54px; padding: 0 30px;
    font-size: 60px; font-family: 'Noto Sans';
    color: ${props=> props.color}; transition: top 0.3s ease;
    z-index: 110;`

const SubH = styled.h2`
    position: absolute; top: ${props=>props.top}%; left: 50%;
    transform: translate(-50%, -50%);
    font-size: 33px; color: ${props=> props.color}; font-family: 'Noto Sans';
    height: 30px; padding: 40px 0 0 0;
    border-top: 2px solid #fff;
    z-index: 110;
`
const CateH = styled.h3`
    position: absolute; bottom: 7%; left: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px; font-family: 'Noto Sans';
    height: 22px; color: ${props=> props.color};    
    font-family: 'Noto Sans';
    z-index: 110;
`


export default ThumbMaker;
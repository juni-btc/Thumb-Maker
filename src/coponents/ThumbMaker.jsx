import React from 'react'
import View from './View';
import Control from './Control';
import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import html2canvas from 'html2canvas';
import Preview from './Preview';
import { requestClipboardWritePermission } from 'copy-image-clipboard'

const ThumbMaker = () => {  

    // Check Clipboard Permission
    const [perChk, setPerChk] = useState(); 
    // Ele Ref
    const canvasWrap = useRef(null);
    const canvasEl = useRef(null);  
    const [uploadImg, setUploadImg] = useState();
    const [isLinear, setIsLinear] = useState(false);
    // Canvas State
    const [cvSize, setCvSize] = useState([960, 540, 0]); //Canvas Size [width, height, mode]
    const [cvCover, setCvCover] = useState('none');
    const [isImage, setIsImage] = useState(false);
    const [border, setBorder] = useState('0'); //Canvas Border Size
    const [borderColor, setBorderColor] = useState('#ffffff'); //Canvas Border Color
    const [bgColor, setBgColor] = useState('#ffffff'); //Canvas Color 
    const [linearColor, setLinearColor] = useState(['', '']);
    // Text State
    const [titleTxt, setTitleTxt] = useState('Title'); //Title Text
    const [titleColor, setTitleColor] = useState('#000000'); //Title Color
    const [titleTop, setTitleTop] = useState(38); //Title CSS Top Size
    const [subTxt, setSubTxt] = useState('SubTitle'); //SubTitle Text
    const [subColor, setSubColor] = useState('#000000'); //SubTitle Color
    const [subTxtTop, setSubTxtTop] = useState(57); //subTitle CSS Top Size
    const [cateTxt, setCateTxt] = useState('Category'); //Category Text
    const [cateColor, setCateColor] = useState('#000000'); //Category Color
    // checkbox State
    const coverEl = useRef(null);
    const [txtShadow, setTxtShadow] = useState('none');
    const [copyMsg, setCopyMsg] = useState('');
    // preview State
    const [preivew, setPreview] = useState(false);

    useEffect(async()=> {
        const chk = await requestClipboardWritePermission(hasPer => { return hasPer; }); //클립보드 브라우저 권한체크
        setPerChk(chk);
        if(chk === true){ setCopyMsg('클립보드 복사'); }
        else{ setCopyMsg('이미지 보기'); }
    }, [])

    useEffect(()=>{ //소제목이 없을 경우 제목 위치 변경
        if(subTxt === ''){
            setTitleTop(49);
        }else{
            setTitleTop(38);
            setSubTxtTop(57); 
        }
    }, [subTxt]) 

    useEffect(()=> { // 캔버스 크기 변경시 초기 설정
        
        const canvas = canvasEl.current;
        const ctx = canvas.getContext('2d');
        canvas.width = cvSize[0];
        canvas.height = cvSize[1];

        if(isImage && !isLinear){ //이미자가 있을 경우
            ctx.drawImage(uploadImg, 0, 0, cvSize[0], cvSize[1]);
        }else if(!isImage && isLinear){ //그라데이션일 경우
            const gradient = ctx.createLinearGradient(0,0,0,cvSize[1]);
            gradient.addColorStop(0, linearColor[0]);
            gradient.addColorStop(1, linearColor[1]);
            ctx.fillStyle=gradient;
            ctx.fillRect(0, 0, cvSize[0], cvSize[1]);
        }else{ //단색일 경우
            ctx.fillStyle = bgColor; 
            ctx.fillRect(0, 0, cvSize[0], cvSize[1]);
        }
        
    }, [cvSize]);

    /* --------------- Image ----------------- */
    const addImage = (e) => { 
        const files = e.target.files;
        console.log(files)    
        if(files.length !== 0){
            fileRead(files[0]);
        }else{
            console.log("이미지 파일이 없음")
        }
        e.target.value = '';
    }
    const fileRead = (file) => { //이미지 로드 후 캔버스에 삽입
        const reader = new FileReader();
        const image = new Image();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            image.src = e.target.result;
            image.onload = () => {
                setUploadImg(image);
                setIsImage(true);
                setIsLinear(false);

                drawImage(image); //캔버스에 이미지 삽입
            }
        }
        
    }
    const drawImage = (image) => { //캔버스에 이미지 삽입
        console.log(image)
        const ctx = canvasEl.current.getContext('2d');
        canvasEl.current.width = cvSize[0];
        canvasEl.current.height = cvSize[1];
        ctx.drawImage(image, 0, 0, cvSize[0], cvSize[1]);
    }
    /* --------------- Image ----------------- */

    const changeSize = (e) => {
        const chk = e.target.getAttribute('data-size');

        switch(chk){
            case '1' : { setCvSize([960, 540, 0]); break; }
            case '2' : { setCvSize([720, 540, 1]); break; }
            case '3' : { setCvSize([510, 680, 2]); break; }
            case '4' : { setCvSize([600, 600, 3]); break; }
            default : { break; }
        }
    
    }

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
            default : { break; }
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
                setIsLinear(false);
                const ctx = canvasEl.current.getContext('2d');
                ctx.fillStyle = e.target.value;
                ctx.fillRect(0, 0, cvSize[0], cvSize[1]);
                break;
            }
            case 'linearBg' :{
                setIsImage(false);
                setIsLinear(true);

                const ctx = canvasEl.current.getContext('2d');
                const gradient = ctx.createLinearGradient(0,0,0,cvSize[1]);
                const linear = [randomColor(), randomColor()];

                setLinearColor([linear[0], linear[1]]);
                setBgColor(`linear-gradient( to bottom, ${linear[0]}, ${linear[1]})`);

                gradient.addColorStop(0, linear[0]);
                gradient.addColorStop(1, linear[1]);
                ctx.fillStyle=gradient;
                ctx.fillRect(0, 0, cvSize[0], cvSize[1]);
                break;
            }
            case 'borderColor' : {
                setBorderColor(e.target.value); break;
            }
            default : { break; }
        }
    }

    const randomColor = () =>{
        const r = Math.floor(Math.random() * (255 - 150 + 1) + 150);
        const g = Math.floor(Math.random() * (255 - 150 + 1) + 150);
        const b = Math.floor(Math.random() * (255 - 150 + 1) + 150);

        return '#'+r.toString(16)+g.toString(16)+b.toString(16);
    }

    const isCheck = (e) => {
        const chk = e.target.checked;
        const id = e.target.getAttribute('data-id');
        
        if(chk === true){
            switch(id){
                case 'bg-cover' : {
                    setCvCover('block'); break;
                }
                case 'txt-shadow' : {
                    setTxtShadow('2px 2px 2px rgba(0,0,0,0.3)'); break;
                }
                default : { break; }
            }
        }else{
            switch(id){
                case 'bg-cover' : {
                    setCvCover('none'); break;
                }
                case 'txt-shadow' : {
                    setTxtShadow('none'); break;
                }
                default : { break; }
            }
        }
    }

    const randomBg = () => {
        const color = randomColor();
        const ctx = canvasEl.current.getContext('2d');

        setIsImage(false);
        setIsLinear(false);
        setBgColor(color);
        
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, cvSize[0], cvSize[1]);
    }


    const changeBorder = (e) => { setBorder(e.target.getAttribute('data-size')); }

    const download = async() => { //이미지 다운로드
        
        const canvas = await captureEl();
        const blob = await transBlob(canvas);
        const url = URL.createObjectURL(blob);
        const aTag = document.createElement('a');
        aTag.download = `thumbnail-maker_${getDate()}.jpg`;
        aTag.href = url;
        aTag.click();
        URL.revokeObjectURL(url);
    }

    const copyImg = async() => { // 클립보드 복사
            const canvas = await captureEl(); 
            const blob = await transBlob(canvas);
            copy(blob);

    }

    const previewImage = async() => {
        const canvas = await captureEl();
        const base64 = canvas.toDataURL('image/*');
        setPreview(base64);
    }
    const previewRemove = () => { setPreview(false); }

    const captureEl = async() =>{ // ele => canvas
        const canvas = await html2canvas(canvasWrap.current).then( cv=> { return cv; }); // Ele => canvas image
        return canvas;
    }

    const transBlob = async(canvas) =>{ // canvas => blob data
        return new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                resolve(blob);
            })
        })
    }

    const copy = async(blob) =>{
        const { ClipboardItem } = window;
        navigator.clipboard.write([  //3
            new ClipboardItem({
              'image/png': blob //<- 복사할 blob 데이터
            })       
        ]);
        setCopyMsg('복사 완료!');
        setTimeout(()=>{ setCopyMsg('클립보드 복사'); }, 1000);
    }

    const getDate = () => {
        const date = new Date();   
        const year = date.getFullYear(); // 년도
        const month = date.getMonth() + 1;  // 월
        const days = date.getDate();  // 날짜
        return `${year}${month}${days}`;
    }

    return(
        <>
            <Preview img={preivew} previewRemove={previewRemove}/>
            <View>
                <CanvasWrap width={cvSize[0]} height={cvSize[1]} id="canvasWrap" cover={cvCover} ref={canvasWrap}>
                    <Canvas ref={canvasEl} id="target" padding={border} borderColor={borderColor}/>
                        <TitleH color={titleColor} top={titleTop} txtShadow={txtShadow}>{titleTxt}</TitleH>
                        <SubH color={subColor} top={subTxtTop}>{subTxt}</SubH>
                        <CateH color={cateColor}>{cateTxt}</CateH>
                </CanvasWrap>
            </View>
            <Control>
                <div className="sizeBox">
                    <h2>크기</h2>
                    <div className="twoBtn-box">
                        <button className='sizeBtn' data-size="1" onClick={changeSize}>
                            16:9
                        </button>
                        <button className='sizeBtn'data-size="4" onClick={changeSize}>
                            1:1
                        </button>
                    </div>
                    <div className="twoBtn-box">
                        <button className='sizeBtn' data-size="2" onClick={changeSize}>
                            4:3
                        </button>
                        <button className='sizeBtn'data-size="3" onClick={changeSize}>
                            3:4
                        </button>
                        
                    </div>
                    
                </div>
                <div className="bgWrap">

                    <h2>
                        배경
                        <label htmlFor="bcInput" className="optionChk">
                            <input type="checkbox" data-id="bg-cover" id="bcInput" onChange={isCheck}/><span> Cover</span>
                        </label>
                    </h2> 
                    <input type="file" id="bgImg-Input" onChange={addImage} accept="image/png, image/jpg, image/jpeg, image/webp, image/gif"/>
                    
                    <div className="oneBtn-box">
                        <button className="uploadBtn">
                            <label htmlFor="bgImg-Input">이미지 업로드</label>
                        </button>
                    </div>
                    <div className="oneBtn-box">
                        <button data-id="linearBg" onClick={changeColor}>그라데이션 랜덤</button>
                    </div>      
                    <div className="twoBtn-box">
                        <button>단색
                        <input type="color" data-id="bgColor" onChange={changeColor} className="colorPicker" value="#eeeeee"/>
                        </button>
                        <button onClick={randomBg}>단색 랜덤</button>
                    </div>       
                    
                </div>
                <div className="titleWrap">
                    <h2>제목
                        <label htmlFor="shadowInput" className="optionChk">
                            <input type="checkbox" data-id="txt-shadow" id="shadowInput" ref={coverEl} onChange={isCheck}/><span>그림자 효과</span>
                        </label>
                    </h2>
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

                <div className="twoBtn-box doneBox">
                    {
                        perChk === true
                            ?
                        <button onClick={copyImg} className="btn1">
                            {copyMsg}
                        </button>
                            :
                        <button className="btn1" onClick={previewImage}>
                            이미지 보기
                        </button>
                    }
                    <button onClick={download} className="btn1">다운로드</button>
                </div>

            </Control>
            
        </>
    )
}

const CanvasWrap = styled.span`
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(1);
    display: inline-block; vertical-align: middle;
    width: ${props=> props.width}px; height: ${props=> props.height}px;
    background-color : ${props=>props.bg};
    /* box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;  */
    box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
    padding: ${props=> props.padding}px;
    user-select: none;
    &:after{
        display: inline-block; width: 100%; height: 100%; 
        position: absolute; top: 0; left: 0; content: '';
        background-color: rgba(0,0,0, 0.3); z-index: 100;
        display: ${props=>props.cover}; 
    }
    @media screen and (max-width: 1330px) { transform: translate(-50%, -50%) scale(0.8);
    @media screen and (max-width: 1150px) { 
        position: relative; width: auto; height: auto; top: auto; left: auto; 
        transform: translate(0, 0) scale(1); }
    }
`
const Canvas = styled.canvas`
    display: block; position: relative;
    width: 100%; height: 100%;
    border: ${props=>props.padding}px solid ${props=>props.borderColor};
`

const TitleH = styled.h1`
    position: absolute; top: ${props=> props.top}%; left: 50.05%; transform: translate(-50%, -50%);
    width: 100%;  height: 54px; padding: 0 30px;
    font-size: 56px; font-family: 'Noto Sans';
    color: ${props=> props.color}; transition: top 0.3s ease;
    text-shadow: ${props=>props.txtShadow};
    z-index: 110;
    @media screen and (max-width: 765px){ font-size: 48px; }
    @media screen and (max-width: 486px){ font-size: 40px; }
`

const SubH = styled.h2`
    position: absolute; top: ${props=>props.top}%; left: 50%;
    transform: translate(-50%, -50%);
    font-size: 33px; color: ${props=> props.color}; font-family: 'Noto Sans';
    height: 30px; padding: 40px 0 0 0;
    border-top: 2px solid #fff;
    z-index: 110;
    @media screen and (max-width: 765px){ font-size: 25px; padding: 25px 0; }
    @media screen and (max-width: 486px){ font-size: 17px; padding: 15px 0; }
`
const CateH = styled.h3`
    position: absolute; bottom: 7%; left: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px; font-family: 'Noto Sans';
    height: 24px; color: ${props=> props.color};    
    font-family: 'Noto Sans';
    z-index: 110;
    @media screen and (max-width: 765px){ font-size: 12px; }
    @media screen and (max-width: 486px){ font-size: 7px; line-height: 30px; }
`


export default ThumbMaker;
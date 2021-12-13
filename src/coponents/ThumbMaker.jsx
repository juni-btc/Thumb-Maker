import React from 'react'
import View from './View';
import Control from './Control';
import { useRef } from 'react';

const ThumbMaker = () => {
    const target = useRef(null);


    return(
        <>
            <View>
                <canvas ref={target} id="target"/>
            </View>
            <Control>
                <div className="sizeBox">
                    <h2>섬네일 크기</h2>
                    <button>
                        <span>1280x720</span>
                        <span>16:9</span>
                    </button>
                    <button>
                        <span>1200x900</span>
                        <span>4:3</span>
                    </button>
                    <button>
                        <span>900x900</span>
                        <span>1:1</span>
                    </button>
                </div>
                <div className="bgBox">
                    <h2>섬네일 배경</h2> <input type="file" id="bgImg"/>
                    
                    <button class="uploadBtn">
                        <label htmlFor="bgImg">이미지 업로드</label>
                    </button>
                    <button>단색(solid)</button>
                    <button>그라데이션(gradation)</button>
                </div>
                <div className="textBox">
                    <h2>제목</h2>
                    <input type="text" />
                    <h2>소제목</h2>
                    <input type="text" />
                </div>
            </Control>
            
        </>
    )
}

export default ThumbMaker;
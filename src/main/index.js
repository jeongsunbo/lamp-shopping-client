import React from 'react';
import './index.scss';
import axios from 'axios';
import useAsync from '../customHook/useAsync';
import MainProduct from './MainProduct';
import { API_URL } from '../config/contansts';
import { Carousel } from 'antd'; // antd에서 디자인 슬라이더 가져옴

async function getProducts(){
    const response = await axios.get(`${API_URL}/products`)
    return response.data;
}
const contentStyle = {  // 슬라이더 안에 영역 스타일임
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    position: 'absolute',
    bottom: '50px',
};
const MainPage = () => {
    const onChange = (currentSlide) => {  // 슬라이더 관련
        console.log(currentSlide);
    };
    const [state] = useAsync(getProducts,[])
    const { loading, data, error} = state;
    if(loading) return <div>로딩중......</div>
    if(error) return <div>에러가 발생했습니다.</div>
    if(!data) return <div>로딩중입니다.</div>
    return (
        <div>
            <div id="main">
                <div id="banner">
                    {/* 슬라이더 자동으로 */}
                    <Carousel afterChange={onChange} autoplay>  
                    <div>
                        <img src="images/banners/banner1.png" alt="" />
                        <h3 style={contentStyle}>1</h3>
                    </div>
                    <div>
                        <img src="images/banners/banner1.png" alt="" />
                        <h3 style={contentStyle}>2</h3>
                    </div>
                    <div>
                        <img src="images/banners/banner1.png" alt="" />
                        <h3 style={contentStyle}>3</h3>
                    </div>
                    </Carousel>
                </div>
                <div id="product-list" className='inner'>
                    <h2>그린조명 최신상품</h2>
                    <div id="product-items">
                        {/* 화면에 값을 뿌려줌 */}
                        {data.map(product=><MainProduct key={product.id} product={product}/>)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
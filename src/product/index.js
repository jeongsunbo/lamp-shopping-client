import "./product.scss";
import axios from 'axios';  //axios 사용해서 get, put, post, delete등의 메서드로 api요청함
import { useParams } from 'react-router-dom';
import useAsync from '../customHook/useAsync';
import { useNavigate } from 'react-router-dom'; //리다이렉션 홈으로
import { API_URL } from '../config/contansts'; // http://localhost:3000을 API_URL상수로 만들어서 사용

async function getProduct(id){
    const response = await axios.get(`${API_URL}/product/${id}`);
    return response.data;
}
// 상품페이지
const ProductPage = () => { 
    const navigate = useNavigate(); //삭제하면 리다이렉션 홈으로
    //product/1
    const { id } = useParams();     //useParams() -> 파라미터 값을 가지고 있는 객체를 반환
    const [state] = useAsync(()=>getProduct(id),[id]);
    const { loading, data:product, error } = state;

    const productDel = () => {
        axios.delete(`${API_URL}/product/${id}`)    //axios 사용해서 delete메소드 api 요청
        .then(result=> {
            console.log("삭제되었습니다.");
            navigate("/"); //리다이렉션 홈으로
        })
        .catch(e=> {
            console.log(e);
        })
    }
    if(loading) return <div>로딩중입니다.......</div>;
    if(error) return <div>에러가 발생했습니다.</div>;
    if(!product) return null;
    return (
        <div className='inner'>
            <div id="image-box">
                <img src={product.imageUrl} alt=""/>
            </div>
            <div id="profile-box">
                <ul>
                    <li>
                        <div>
                            <img src="/images/icons/avatar.png" alt=""/>
                            <span>{product.seller}</span>
                        </div>
                    </li>
                    <li>
                        {product.name}
                    </li>
                    <li>
                        가격 {product.price}원
                    </li>
                    <li>등록일 </li>
                    <li>상세설명 </li>
                    <li>{product.description}</li>
                </ul>
            </div>
            <div>
                <span onClick={productDel}>삭제하기</span>
            </div>
        </div>
    );
};

export default ProductPage;
import axios from 'axios';
import React , {useState , useEffect} from 'react'
import Card from './Card'
function BestSelling() {
    const [listProduct , setlistProduct] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:9090/api/v1/product').then((response)=> {
            setlistProduct(response.data.content);
        }).catch((error) =>{
        });
    },[])
    return (
    <div>
        {( listProduct.length === 0 ) ? (
            <div class="isloading">
                Loading....
            </div>
        ) : (
        <div class="featured-product product">
            <div class="container-fluid">
                <div class="section-header">
                    <h1>Best-Selling</h1>
                </div>
                <div className="row align-items-center product-slider product-slider-4">
                    {listProduct.map((product) => (
                        <Card product={product} key={product.id}></Card>
                    ))}
                </div>
            </div>
        </div> 
        )}
    </div>
    )
}

export default BestSelling

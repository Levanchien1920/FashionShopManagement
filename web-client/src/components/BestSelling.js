import axios from 'axios';
import React , {useState , useEffect} from 'react'
import Card from './Card'
import Slide from './Slide'
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
        <div>
                 <div class="call-to-action">
                    <div class="container-fluid">
                        <div class="row align-items-center">
                            <div class="col-md-6">
                                <h1>call us for any queries</h1>
                            </div>
                            <div class="col-md-6">
                                <a href="tel:0123456789">0339905697</a>
                            </div>
                        </div>
                    </div>
                </div>
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
        </div>
        )}
    </div>
    )
}

export default BestSelling

import axios from 'axios';
import React , {useState , useEffect} from 'react'
import Card from './Card'
function FeaturedProduct() {
    const [listProduct , setlistProduct] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:9090/api/v1/product').then((response)=> {
            setlistProduct(response.data.content);
        }).catch((error) =>{
        });
    }, [])
    return (
        <div className="featured-product product">
            <div className="container-fluid">
                <div className="section-header">
                    <h1>Featured Product</h1>
                </div>
                <div className="row align-items-center product-slider product-slider-4">
                    {listProduct.map((product) => (
                        <Card product={product} key={product.id}></Card>
                    ))}
                </div>
            </div>
        </div> 
    )
}

export default FeaturedProduct

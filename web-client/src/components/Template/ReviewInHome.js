import Api from '../Config/Api';
import React, { useState } from 'react'
import { useEffect } from 'react';
import Carousel from 'react-elastic-carousel';
const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 768, itemsToShow: 2 },
  ];
export default function ReviewInHome() {
    const [state, setstate] = useState([]);
    useEffect(() => {
        Api.get('client/review/good').then((response)=> {
            setstate(response.data.content);
        }).catch((error) =>{
        })
    }, [])
    return (
        <div class="review">
            <div class="container-fluid">
                <div class="row align-items-center review-slider normal-slider">
                    <Carousel breakPoints={breakPoints}>
                        {state.map((review) => (
                            <div class="review-slider-item">
                                <div class="review-img">
                                    <img src="img/review-4.jpg" alt="Image"></img>
                                </div>
                                <div class="review-text">
                                    <h2>{review.name_User}</h2>
                                    <h3>{review.name_Product}</h3>
                                    <div class="ratting">
                                        <i className={review.number_Of_Star >=1 ?"fa fa-star": review.number_Of_Star >= 0.5 ? 'fa fa-star-half':'fa fa-star-o'}></i>
                                        <i className={review.number_Of_Star >=2 ?"fa fa-star": review.number_Of_Star >= 1.5 ? 'fa fa-star-half':'fa fa-star-o'}></i>
                                        <i className={review.number_Of_Star >=3 ?"fa fa-star": review.number_Of_Star >= 2.5 ? 'fa fa-star-half':'fa fa-star-o'}></i>
                                        <i className={review.number_Of_Star >=4 ?"fa fa-star": review.number_Of_Star >= 3.5 ? 'fa fa-star-half':'fa fa-star-o'}></i>
                                        <i className={review.number_Of_Star >=5 ?"fa fa-star": review.number_Of_Star >= 4.5 ? 'fa fa-star-half':'fa fa-star-o'}></i>
                                        <i>({review.number_Of_Star} Star)</i>
                                    </div>
                                    <p>
                                        {review.content}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
        </div>
    )
}

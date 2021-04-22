import React from 'react'
import Slide from './Slide'
import BestSelling from './BestSelling'
import NewProduct from './NewProduct'
import ReviewInHome from './ReviewInHome'
export default function Home() {
    return (
        <div>
            <Slide/>
            <BestSelling/>
            <NewProduct/>
            <ReviewInHome/>
        </div>
    )
}

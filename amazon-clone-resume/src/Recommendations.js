import React from 'react'
import Product from './Product'
import './Recommendations.css'
import './Home.css'

function Recommendations({ recs, products }) {
    return (
        <div className='recommendations'>
            <h1>Recommendations for you</h1>
            <div className="rec__list">
                {recs?.map(item => {
                    return (
                        <>
                            {
                                products.map(product => {
                                    if (product.data.id == item) {
                                        return (
                                            <div className="rec__item">
                                                <Product
                                                    id={product.data.id}
                                                    title={product.data.title}
                                                    price={product.data.price}
                                                    rating={product.data.rating}
                                                    image={product.data.image}
                                                />
                                            </div>
                                        )
                                    }
                                })
                            }
                        </>
                    )
                }
                )
                }
            </div>
        </div>
    )
}

export default Recommendations
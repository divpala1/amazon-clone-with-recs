import React from 'react'
import './Checkout.css'
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider'
import Subtotal from './Subtotal'

function Checkout() {
    const [state, dispatch] = useStateValue();

    return (
        <div className='checkout'>
            <div className="checkout__left">
                <div>
                    <div className="checkout__title">
                        <h1>Shopping Cart</h1>
                        <p>Price</p>
                    </div>
                    {state.basket.map(item => (
                        <CheckoutProduct
                            id= {item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                        />
                    ))}

                </div>
            </div>

            <div className="checkout__right">
                <Subtotal />
            </div>

        </div>
    )
}

export default Checkout
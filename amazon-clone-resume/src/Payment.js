import React from 'react'
import './Payment.css'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct'
import { Link, useNavigate } from 'react-router-dom'
import CurrencyFormat from 'react-currency-format'
import { getBasketTotal } from './reducer'
import { db } from './firebase'
import { v4 as uuid } from 'uuid'

function Payment() {
    const [state, dispatch] = useStateValue();
    const navigate = useNavigate();

    const unique_id = uuid();
    const small_id = unique_id.slice(0, 6);

    const buyNow = () => {
        // Push the current basket to the database
        db
            .collection('users')
            .doc(state.user?.uid)
            .collection('orders')
            .doc(small_id)
            .set({
                basket: state.basket,
                amount: getBasketTotal(state.basket),
                'created': Date(),
            })
        
        dispatch({
            type: 'EMPTY_BASKET'
        });
        navigate('/orders', { replace: true })
    }

    return (
        <div className='payment'>
            <div className="payment__container">
                <h1>
                    Checkout (
                    <Link to='/checkout'>
                        {state.basket?.length} items
                    </Link>
                    )
                </h1>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{state.user?.email}</p>
                        <p>221B Baker Street</p>
                        <p>London, UK</p>
                    </div>
                </div>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment__items">
                        {state.basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        <form>
                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <>
                                            <p>Subtotal ({state.basket?.length} items): <strong>{value}</strong></p>
                                        </>
                                    )}

                                    decimalScale={2} // Display price upto 2 decimal places
                                    value={getBasketTotal(state.basket)} // Value to be displayed
                                    displayType={"text"}
                                    thousandSeparator={true} // Comma after thousands
                                    prefix={"₹"} // Text to be displayed to the left of the value
                                />

                                <button onClick={buyNow}>
                                    <span>Buy Now</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Payment
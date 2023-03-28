import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from './StateProvider';
import './Subtotal.css'
import { getBasketTotal } from './reducer';
import { useNavigate } from 'react-router-dom';

function Subtotal() {
    const navigate = useNavigate();
    const [state, dispatch] = useStateValue();

    return (
        <div className='subtotal'>
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>Subtotal ({state.basket?.length} items): <strong>{value}</strong></p>
                        <small className='subtotal__gift'>
                            <input type="checkbox" />This order contains a gift
                        </small>
                    </>
                )}

                decimalScale={2} // Display price upto 2 decimal places
                value={getBasketTotal(state.basket)} // Value to be displayed
                displayType={"text"}
                thousandSeparator={true} // Comma after thousands
                prefix={"₹"} // Text to be displayed to the left of the value
            />
        
            <button onClick={e => navigate('/payment')}>Proceed to Checkout</button>
        </div>
    )
}

export default Subtotal
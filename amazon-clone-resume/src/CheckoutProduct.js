import React from 'react'
import './CheckoutProduct.css'
import { useStateValue } from './StateProvider'

function CheckOutProduct({ id, title, image, price, rating, hideButton }) {
  const [ state, dispatch ] = useStateValue();

  const removeFromBasket = () => {
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      id: id
    })
  }

  return (
    <div className='checkoutProduct'>
        <img className='checkoutProduct__image' src={image} alt="checkoutProduct__image"/>

        <div className="checkoutProduct__info">
            <p className='checkoutProduct__title'>{title}</p>
            <div className="checkoutProduct__rating">
                 {Array(rating) // Creates an array of size 'rating'
                 .fill() // Fill with null values
                 .map(() => ( // Map over each value
                    <p>⭐</p>
                 ))}   
            </div>

            {!hideButton && (
              <button onClick={removeFromBasket}>Remove from basket</button> 
            )}
        </div>

        <div className='checkoutProduct__price'>
                <small>₹ </small>
                <strong>{price}</strong>
        </div>
    </div>
  )
}

export default CheckOutProduct
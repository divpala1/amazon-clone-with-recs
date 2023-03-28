import React from 'react'
import './Product.css'
import { useStateValue } from "./StateProvider"
import CurrencyFormat from 'react-currency-format'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'

function Product({ id, title, image, price, rating }) {
    const [state, dispatch] = useStateValue();

    const addToBasket = () => {
        // Dispatch the item into the data layer
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating
            },
        });
    };

    return (
        <div className="product">
            <div className="product__info">
                <p>{title}</p>

                <CurrencyFormat
                    renderText={(value) => (
                        <strong>{value}</strong>
                    )}

                    decimalScale={2} // Display price upto 2 decimal places
                    value={price} // Value to be displayed
                    displayType={"text"}
                    thousandSeparator={true} // Comma after thousands
                    prefix={"₹"} // Text to be displayed to the left of the value
                />

                <div className="product__rating">
                    <Rating name="read-only" value={rating} readOnly />
                </div>
            </div>

            <img
                src={image}
                alt="" />

            <button onClick={addToBasket}>Add to basket</button>

        </div>
    )
}

export default Product
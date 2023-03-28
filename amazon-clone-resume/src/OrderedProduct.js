import React, { useState } from 'react'
import './OrderedProduct.css'
import { db } from './firebase'
import { useStateValue } from './StateProvider'
import firebase from 'firebase/compat/app'
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

function OrderedProduct({ id, title, image, price, rating, orderId, index }) {
    const [state, dispatch] = useStateValue();
    const [value, setValue] = useState(0);  // For rating
    const [clicked, setClicked] = useState(false);  // For rating submission

    const orderRef = db.collection('users').doc(state.user?.uid).collection('orders').doc(orderId);

    // Adding ratings to the ratings array in firestore
    const rate = (id, userRating) => {
        orderRef.update({
            ratings: firebase.firestore.FieldValue.arrayUnion(id, userRating)
        }, { merge: true })
    }

    return (
        <div className='orderedProduct'>
            <img className='orderedProduct__image' src={image} alt="orderedProduct__image" />

            <div className="orderedProduct__info">
                <p className='orderedProduct__title'>{title}</p>

                {clicked ?
                    <div>
                        <button className='orderedProduct__ratingSubmit' disabled>Thank You</button>
                    </div> :
                    <div className="orderedProduct__userRating">
                        <br />
                        <Typography component="legend">How was the product?</Typography>
                        <Rating
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        />

                        <button className='orderedProduct__ratingSubmit' onClick={() => (rate(id, value), setClicked(true))}>Submit</button>
                    </div>
                }

            </div>

            <div className='orderedProduct__price'>
                <small>₹ </small>
                <strong>{price}</strong>
            </div>
        </div>
    )
}

export default OrderedProduct; 
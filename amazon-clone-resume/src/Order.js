import React from 'react'
import './Order.css'
import OrderedProduct from './OrderedProduct'
import CurrencyFormat from 'react-currency-format'

function Order({ order }) {
    return (
        <div className='order'>
            <h2>Order</h2>
            <p>{order.data.created}</p>
            <p className='order__id'>
                <small>{order.id}</small>
            </p>

            {order.data.basket?.map((item, index) => (
                <OrderedProduct
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                    orderId={order.id}
                    ind={index}
                />
            ))}
            
            <CurrencyFormat
                renderText={(value) => (
                    <h3 className='order__total'>Order Total: {value}</h3>
                )}

                decimalScale={2} // Display price upto 2 decimal places
                value={order.data.amount} // Value to be displayed
                displayType={"text"}
                thousandSeparator={true} // Comma after thousands
                prefix={"₹"} // Text to be displayed to the left of the value
            />
            
        </div>
    )
}

export default Order
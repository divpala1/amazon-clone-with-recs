import React, { useEffect, useState } from 'react'
import { useStateValue } from './StateProvider'
import { db } from './firebase'
import './Orders.css'
import Order from './Order';
import { Link } from 'react-router-dom';

function Orders() {
    const [state, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (state.user) {
            db
                .collection('users')
                .doc(state.user?.uid)
                .collection('orders')
                .orderBy('created', 'desc')
                .onSnapshot(snapshot => (
                    setOrders(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                ))
        } else {
            setOrders([])
        }
    }, [state.user])

    return (
        <div className='orders'>
            <h1>Your Orders</h1>

            {!state.user && (
                <div className='orders__notSignedIn'>
                    <Link to='/login'>Sign In </Link>
                    to Order now
                </div>
            )}

            <div className="orders__order">
                {orders?.map(order => (
                    <Order order={order} />
                ))}
            </div>
        </div>
    )
}

export default Orders
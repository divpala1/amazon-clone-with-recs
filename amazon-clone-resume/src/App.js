import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import { db, auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import Orders from './Orders';

function App() {
  const [state, dispatch] = useStateValue();
  const [recs, setRecs] = useState();
  const [products, setProducts] = useState();

  useEffect(() => { // Will only run once when the app component loads.
    auth.onAuthStateChanged(authUser => {
      if (authUser) { // If a user is already logged in
        dispatch({
          type: 'SET_USER', // Gives the information of current user to the data layer.
          user: authUser
        });
        fetch(`/recList/${authUser.uid}`);
        console.log("Current user: ", authUser.uid);

        // Getting recommendations list from firestore for the logged in user.
        db
          .collection('users')
          .doc(authUser.uid)
          .collection('recommendations')
          .doc('list')
          .get()
          .then(function (doc) {
            if (doc.exists) {
              setRecs(doc.data().items);
              console.log('Current User: ', authUser.uid);
              console.log("Document data:", doc.data().items);
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
          });
      } else { // User is logged out.
        dispatch({
          type: 'SET_USER',
          user: null // Sets current user to null.
        })
      };
    });

    db
      .collection('products')
      .onSnapshot(snapshot => (
        setProducts(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })))
      ))
  }, [])

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<><Header /><Home products={products} recs={recs} /></>} />
          <Route path="/login" element={<Login />} />
          <Route path="/payment" element={<> <Header /> <Payment /> </>} />
          <Route path="/checkout" element={<><Header /><Checkout /></>} />
          <Route path="/orders" element={<> <Header /> <Orders /> </>} />
        </Routes>
      </div>

    </Router>
  );
}

export default App;

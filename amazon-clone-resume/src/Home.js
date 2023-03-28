import React from 'react'
import Product from './Product'
import './Home.css'
import Recommendations from './Recommendations';


function Home({ recs, products }) {
    return (
        <div className='home'>
            <div className="home__container">
                <img
                    className='home__image'
                    src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
                    alt="" />

                <Recommendations recs={recs} products={products}/>

                <div className="home__row">
                    <Product
                        id="watch"
                        title="Samsung SmartWatch 9"
                        price={46499}
                        rating={3}
                        image="https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"
                    />
                    <Product
                        id="echo"
                        title="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"
                        price={3499}
                        rating={5}
                        image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$"
                    />
                    <Product
                        id="iPad"
                        title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
                        price={99900}
                        rating={4}
                        image="https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"
                    />
                </div>

                <div className="home__row">
                    <Product
                        id="lean"
                        title="The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback"
                        price={521}
                        rating={5}
                        image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg"
                    />
                    <Product
                        id="mixer"
                        title="Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer"
                        price={8699}
                        rating={4}
                        image="https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg"
                    />
                </div>

                <div className="home__row">
                    <Product 
                        id='walker'
                        title='Cockatoo CTM-05 1.5 HP - 2HP Peak DC Motorized Treadmill for Home with 3 Level Manual Incline, Max Speed 14 Km/Hr, Max User Weight 90 Kg(DIY, Do It Yourelf Installation)'
                        price={16990}
                        rating={4}
                        image="https://m.media-amazon.com/images/I/81pZSSuX3pL._SX522_.jpg"
                    />
                    <Product 
                        id='weights'
                        title='FitBox Sports Intruder 20 Kg Dumbbells Weights, 10 Kg X 2 (Black)'
                        price={2475}
                        rating={3}
                        image="https://m.media-amazon.com/images/I/517FvNN-33L._SX522_.jpg"
                    />
                    <Product
                        id='breath'
                        title='Airofit Pro ™ Smart Breathing Trainer for Lungs Created by The Most Recognized Breathing Experts On The Planet | Breathing Exercise Device - Perfect for Everyone Seeking Better Fitness and Strength'
                        price={34990}
                        rating={4}
                        image="https://m.media-amazon.com/images/I/61oDIov3GwL._SX679_.jpg"
                    />
                </div>

                <div className="home__row">
                    <Product
                        id="monitor"
                        title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440"
                        price={14094}
                        rating={4}
                        image="https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg"
                    />
                </div>

            </div>
        </div>
    )
}

export default Home
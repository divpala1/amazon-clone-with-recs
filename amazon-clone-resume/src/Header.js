import React from 'react';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';

function Header() {
    const [state, dispatch] = useStateValue();

    const handleAuthentication = () => {
        if (state.user) {
            auth.signOut();
        }
    }

    return (
        <div className='header'>
            <Link to="/">
                <img
                    className='header__logo'
                    src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                    alt=""
                />
            </Link>

            <div className="header__search">
                <input type="text" className="header__searchInput" />
                {/* Search Logo */}
                <SearchIcon className='header__searchIcon' />
            </div>

            <div className="header__nav">
                <Link to={!state.user && '/login'}>  {/* If there is no user logged in, only then redirect to login page. Also, this will prevent us from going to login screen, everytime we logout. */}
                    <div className="header__option" onClick={handleAuthentication}>
                        <span className="header__option__lineOne">
                            Hello, {state.user ? state.user.email : 'Sign In'}
                        </span>
                        <span className="header__option__lineTwo">
                            {state.user ? 'Sign Out' : 'Accounts & Lists'}
                        </span>
                    </div>
                </Link>

                <Link to='/orders'>
                    <div className="header__option">
                        <span className="header__option__lineOne">
                            Returns
                        </span>
                        <span className="header__option__lineTwo">
                            &amp; Orders
                        </span>
                    </div>
                </Link>

                <div className="header__option">
                    <span className="header__option__lineOne">
                        Your
                    </span>
                    <span className="header__option__lineTwo">
                        Prime
                    </span>
                </div>

                <Link to="/checkout">
                    <div className="header__option__basket">
                        <ShoppingCartIcon />
                        <span className='header__basketCount'>{state.basket?.length}</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header
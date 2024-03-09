import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DataContext from './../Context';
import { CartContext } from '../Cart/cartContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './Header.module.css';
import Banner from './Banner';
import Logo from './Logo';
import NavBar from './NavBar';
import SearchBar from './SearchBar';
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import Cookies from 'js-cookie';


// for show account icon
const getAccessToken = () => {
  const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  };
  return getCookie('accessToken');

};


const Header = () => {
  const { setProducts, itemsCount } = useContext(DataContext);
  const { cartItemCount } = useContext(CartContext);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const resultsContainerRef = useRef(null);
  const navigate = useNavigate();
  // const accessToken = getAccessToken(); 
  const accessToken = Cookies.get("accessToken")
  const firstName = Cookies.get("first_name")
  console.log(accessToken)
  console.log(firstName)

  // retrieving products on input change
  const handleSearchQueryChange = async (query) => {
    setSearchQuery(query);

    if (query.trim() === '') {
      setTimeout(() => {
        setShowSuggestions(false);
      }, 800)
    } else {
      try {
        const response = await axios.get(`http://localhost:5000/products/search?q=${query}`);
        const searchedProducts = response.data.products;
        setSearchResults(searchedProducts);
        setProducts(searchedProducts); // Update global state
        setShowSuggestions(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  const handleSearchQuery = async (query) => {
    setSearchQuery(query);

    if (searchQuery.trim() === '') {
      setTimeout(() => {
        setShowSuggestions(false);
      }, 800)
      return
    } else {
      try {
        const response = await axios.get(`http://localhost:5000/products/search?q=${searchQuery}`);
        const searchedProducts = response.data.products;
        setSearchResults(searchedProducts);
        setProducts(searchedProducts);
        setShowSuggestions(false);
        navigate(`/products/search?q=${searchQuery}`)


      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };
  // retrieving products on suggestion click
  const handleSuggestionClick = async (query) => {
    try {
      setSearchQuery(query);
      const response = await axios.get(`http://localhost:5000/products/search?q=${query}`);
      const searchedProducts = response.data.products;
      setSearchResults(searchedProducts);
      setProducts(searchedProducts);
      console.log("header component :", searchedProducts)
      setShowSuggestions(false);
      navigate(`/products/search?q=${searchQuery}`)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };




  useEffect(() => {
    const handleClickOutside = (event) => {
      const searchBarInput = document.getElementById('search');
      if (
        resultsContainerRef.current &&
        !resultsContainerRef.current.contains(event.target) &&
        !event.target.isSameNode(searchBarInput) &&
        !searchBarInput.contains(event.target)
      ) {
        setSearchResults([]);
        setSearchQuery('');
        setShowSuggestions(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };

  }, []);

  return (
    <div>
      <Banner />
      <div className={styles.header}>
        <Logo />
        <NavBar />
        <div className={styles.iconContainer}>
          <SearchBar onSearchQueryChange={handleSearchQueryChange} onSearchQuery={handleSearchQuery} />
          <ul ref={resultsContainerRef} className={`${styles.suggestionsContainer} ${showSuggestions ? styles.show : ''}`}>
            {searchResults.length !== 0 ? (
              searchResults.map(result => (
                <li
                  className={styles.suggestion}
                  key={result._id}
                  onClick={() => handleSuggestionClick(result.name)} // Pass suggestion name as query
                >
                  {result.name}
                </li>
              ))
            ) : (
              <li>No matches found</li>
            )}
          </ul>

          <Link to="/wishlist" className={styles.link}>
            <div className={styles.wishIconContainer}>
              <div className="indicator relative">
                <span className="indicator-item badge absolute text-sm w-5 text-center right-4 bottom-0 rounded-full bg-red-500 text-white">{itemsCount}</span>
              </div>
              <FiHeart className={styles.wishIcon} />
            </div>
          </Link>
          <Link to="/cart" className={styles.link}>
            <div className={styles.wishIconContainer}>
              <div className="indicator relative">
                <span className={`indicator-item badge absolute text-sm w-5 text-center right-4 bottom-0 rounded-full bg-red-500 text-white ${styles.cartIndicator}`}>{cartItemCount}</span>
              </div>
              <FiShoppingCart className={styles.shopCartIcon} />
            </div>
          </Link>
          {accessToken && (
            <div className={styles.accountIcon}>
              {firstName ? firstName.charAt(0).toUpperCase() : null}

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
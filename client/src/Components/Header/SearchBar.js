import React, { useState } from 'react';
import styles from './Header.module.css';
import { LuSearch } from "react-icons/lu";


const SearchBar = ({ onSearchQueryChange, onSearchQuery }) => {
    const handleChange = (event) => {
        const query = event.target.value;
        onSearchQueryChange(query);
    }
    const handleSubmmit = () => {
        console.log("clicked")
        // const query = event.target.value;
        onSearchQuery();
    }
    const [isSearchBarVisible, setSearchBarVisible] = useState(false);

    const toggleSearchBar = () => {
        setSearchBarVisible(!isSearchBarVisible);
    };

    return (
        <>
            <div className={`${styles.searchBar} ${isSearchBarVisible ? styles.visible : ''}`}>
                <input
                    type="text"
                    name="search"
                    id="search"
                    className="rounded-md py-2 pl-3 pr-20 w-full text-gray-900 ring-1 ring-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-m sm:leading-6"
                    placeholder="Search a product..."
                    autoComplete="off"
                    onChange={handleChange}
                />
                <LuSearch className={styles.searchIcon} onClick={() => { handleSubmmit(); toggleSearchBar(); }} />

            </div>
            <LuSearch className={styles.searchIconSmall} onClick={toggleSearchBar} />
        </>
    );
}

export default SearchBar;


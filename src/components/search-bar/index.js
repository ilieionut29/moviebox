import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { BiSearchAlt } from 'react-icons/bi';
import { useLocation } from 'react-router-dom';

const SearchBar = (props) => {
  const [selectedOption, setSelectedOption] = useState('movie');
  const [inactive, setInactive] = useState(true);

  const history = useNavigate();
  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');
  const { pathname } = useLocation();

  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      history(`/${selectedOption}/search/${keyword}`); // to do
    }
  }, [keyword, history, selectedOption]);

  const searchHandler = (e) => {
    setKeyword(e.target.value);
    goToSearch();
  };

  useEffect(() => {
    if (pathname === '/tv') {
      setSelectedOption('tv');
      setInactive(true);
    } else if (pathname === '/movie') {
      setSelectedOption('movie');
      setInactive(true);
    } else {
      setInactive(false);
    }

    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    };
    document.addEventListener('keyup', enterEvent);
    return () => {
      document.removeEventListener('keyup', enterEvent);
    };
  }, [keyword, goToSearch, pathname, selectedOption]);

  return (
    <>
      <input
        type='text'
        placeholder='What do you want to watch? '
        value={keyword}
        onChange={searchHandler}
      />
      <span
        className={`search-type ${inactive ? 'inactive' : 'active'}`}
        id='searchType'
      >
        <select
          className='search-type-select'
          onChange={(e) => setSelectedOption(e.target.value)}
          value={selectedOption}
        >
          <option value='movie'>Movies</option>
          <option value='tv'>TV Series</option>
        </select>
      </span>

      <BiSearchAlt onClick={goToSearch} />
    </>
  );
};

export default SearchBar;

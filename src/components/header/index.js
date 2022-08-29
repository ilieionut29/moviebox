import React, { useRef, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from '../search-bar';
import menuItems from './menu-items';

import logo from '../../web/assets/logo.png';
import './_header.scss';

const Header = (props) => {
  const headerRef = useRef(null);
  const { pathname } = useLocation();
  const isActive = menuItems.findIndex((e) => e.path === pathname);
  const { keyword } = useParams();

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        headerRef.current.classList.add('shrink');
      } else {
        headerRef.current.classList.remove('shrink');
      }
    };

    window.addEventListener('scroll', shrinkHeader);
    return () => {
      window.removeEventListener('scroll', shrinkHeader);
    };
  }, []);

  return (
    <div ref={headerRef} className='header'>
      <div className='header-box'>
        <div className='header-logo'>
          <img src={logo} alt='movieBox_logo' width={40} height={40} />
          <Link to='/'>MovieBox</Link>
        </div>
        <div className='header-search'>
          <SearchBar category={props.category} keyword={keyword} />
        </div>
        <ul className='header_navigation'>
          {menuItems.map((e, i) => {
            return (
              <li key={i} className={`${i === isActive ? 'active' : ''}`}>
                <Link to={e.path}>{e.display}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Header;

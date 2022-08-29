import React from 'react';
import {
  AiFillFacebook,
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiFillYoutube,
} from 'react-icons/ai';

import './_footer.scss';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-socials'>
        <AiFillFacebook />
        <AiOutlineInstagram />
        <AiOutlineTwitter />
        <AiFillYoutube />
      </div>

      <div className='footer-links'>
        <a href='/' rel='noopener noreferrer'>
          Conditions of Use
        </a>
        <a href='/' rel='noopener noreferrer'>
          Privacy & Policy
        </a>
        <a href='/' rel='noopener noreferrer'>
          Press Room
        </a>
      </div>

      <div className='footer-copyright'>
        © 2021 MovieBox by
        <a href='https://www.jonu.dev' rel='noopener noreferrer'>
          jonu.dev
        </a>
      </div>
    </div>
  );
};

export default Footer;

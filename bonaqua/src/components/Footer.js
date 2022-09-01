import React from 'react';
import water from '../images/svg/order 1/water 2.jpg';
import footerw from '../images/svg/home/FOOTER.svg';
import footer from '../images/svg/order 1/dood tsetseg.svg';

export default function Footer() {
  const path = window.location.pathname;
  return (
    path === '/' || path === '/instruction' || path === '/nutrition' ?
      <div className='footer'>
        <img src={footer} alt="" className='footer1flower' />
        <img src={footerw} alt="" className='md:ml-14' />
      </div>
      :
      <div className='footer1 flex'>
        <img src={water} alt="" className='footerwater' />
        <img src={footer} alt="" className='footer2flower' />
      </div>
  )
}

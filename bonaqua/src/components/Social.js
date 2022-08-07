import React from 'react';
import insta from '../images/svg/home/Instagram.svg';
import fb from '../images/svg/home/Facebook.svg';
import twitter from '../images/svg/home/Twitter.svg';

export default function Social() {
    return (
        <div className='social'>
            <a href="#" className='cursor-pointer flex justify-center items-center'> <img src={insta} alt="" className='sc' /> </a>
            <a href="#" className='cursor-pointer flex justify-center items-center'> <img src={fb} alt="" className='sc scf' /> </a>
            <a href="#" className='cursor-pointer flex justify-center items-center'> <img src={twitter} alt="" className='sc' /> </a>
        </div>
    )
}

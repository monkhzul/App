import React, { useEffect, useState } from 'react';
import bigflower from '../images/svg/home/tsetseg tom.svg';
import point from '../images/svg/order 1/Ellipse -1.svg';
import bonaqua from '../images/bona0.5.png';
import { NavLink } from 'react-router-dom';
import { useRef } from 'react';

export default function BonaquaType() {
  const [data, setData] = useState([]);
  const [capacity, setCapacity] = useState("");
  const [image, setImage] = useState(bonaqua);
  const [active, setActive] = useState("");

  const imageArray = [
    { "img": bonaqua, "size": "1.5L" },
    { "img": bonaqua, "size": "4.5L" },
    { "img": bonaqua, "size": "800ml" },
    { "img": bonaqua, "size": "500ml" },
    { "img": bonaqua, "size": "330ml" },
    { "img": bonaqua, "size": "18.9L" },
    { "img": bonaqua, "size": "11.3L" },
  ];

  useEffect(() => {
    var getData = async () => {
      try {
        var data = await fetch('http://localhost:8008/api/bonaqua');
        var resData = await data.json();
        setData(resData)
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [])

  // Link
  const buttonElements = Array.from(document.querySelectorAll('.button'));
  buttonElements.forEach(buttonElement => {
    buttonElement.addEventListener('click', () => {
      buttonElement.classList.add('active');
    });
  });

  const delay = 4000;
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === imageArray.length - 1 ? 0 : prevIndex + 1),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className='choosing w-full xl:w-1/2 flex items-center justify-center relative'>
      {/* <div className='choose flex justify-center self-center relative'>
            <div class="main">
              <ul>
                {data.map((res) =>
                  <li className='bonaquaType' onClick={() => { 
                      setCapacity(res.Capacity) 
                      imageArray.map(img => {
                        if (img.size == res.Capacity) {
                          setImage(img.img)
                        }
                      })
                  }}>
                    <ul>
                      <li id='liCapacity' value={res.Capacity} className="9xl:text-6xl">{res.Capacity}</li>
                    </ul>
                  </li>
                )}
              </ul>
            </div>
          </div> */}
      <div className='choose'>
        {data.map((res, index) =>
          <ul>
            <li key={index} >
              <NavLink exact to={`#${res.Capacity}`} id="bonaq" className={res === active ? "current" : "nav-link"} onClick={() => {
                setCapacity(res.Capacity)
                imageArray.map(img => {
                  if (img.size == res.Capacity) {
                    setImage(img.img)
                  }
                })
                setActive(res)
              }}>
                <img src={point} alt="" id='lists' />
              </NavLink>
            </li>
          </ul>
        )}
      </div>

      <div className='bona flex justify-center items-start relative'>
        <div className='flower absolute'>
          <img src={bigflower} alt="" className='bigflower' />
        </div>

        <div className='toirog absolute'>
          <div className='white flex justify-center items-center'>
            <div className='circle relative flex justify-center items-center'>
              <p className='text-white font-semibold 9xl:text-4xl flex items-center' id='capaInCircle'>{capacity}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

  // Link
  // const buttonElements = Array.from(document.querySelectorAll('.button'));
  // buttonElements.forEach(buttonElement => {
  //   buttonElement.addEventListener('click', () => {
  //     const activeElements = Array.from(document.querySelectorAll('.li-active'));
  //     activeElements.forEach(activeElement => {
  //       activeElement.classList.remove('li-active');
  //     });
  //     buttonElement.parentElement.classList.add('li-active');
  //   });
  // });

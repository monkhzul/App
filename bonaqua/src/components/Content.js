import React, { useEffect, useState, useContext } from 'react';
import { Link, NavLink } from "react-router-dom";
import { useRoutes, Routes, Route } from "react-router-dom";
import Instruction from './ProductInformation/Instruction';
import Nutrition from './ProductInformation/Nutrition';
import Product from './ProductInformation/Product';
import water from '../images/svg/home/water 2.jpg';
import sagsicon from '../images/icons/busket.svg';
import productInfo from '../images/svg/home/buteegdhuunii medeelel.svg';
import bigflower from '../images/svg/home/tsetseg tom.svg';
import bonaqua05 from '../images/546A4010.png';
import bonaqua330 from '../images/546A4006.png';
import bonaqua15 from '../images/546A4015.png';
import bonaqua45 from '../images/546A4021.png';
import bonaqua800 from '../images/546A4025.png';
import addButton from '../images/svg/order 1/add.svg';
import removeButton from '../images/svg/order 1/hasah.svg';
import deleteButton from '../images/svg/order 1/x.svg';
import rightArrow from '../images/svg/rightArrow.svg';
import { AppContext } from '../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Social from './Social';
import $, { ready } from 'jquery';
import CreatableSelect from 'react-select/creatable';

export default function Content() {
  var { array, setTotal, total, setItem, item, setValues } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [render, setRender] = useState(false);
  const [capacity, setCapacity] = useState("");
  const [image, setImage] = useState(bonaqua15);
  const [select, setSelect] = useState(1);
  // const [article, setArticle] = useState("");
  const [text, setText] = useState("");

  const imageArray = [
    { "img": bonaqua15, "size": "1.5L" },
    { "img": bonaqua45, "size": "4.5L" },
    { "img": bonaqua800, "size": "800ml" },
    { "img": bonaqua05, "size": "500ml" },
    { "img": bonaqua330, "size": "330ml" },
    { "img": bonaqua05, "size": "18.9L" },
    { "img": bonaqua05, "size": "11.3L" },
  ];

  sessionStorage.setItem("imagearray", JSON.stringify(imageArray));

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

  var fprice = [];
  var fsize = [];
  var ftotal;
  const fincase = [];

  data.forEach(x => {
    fprice.push(x.BPrice)
    fincase.push(x.InCase)
    fsize.push(x.Capacity)
  })
  ftotal = fprice[0] * fincase[0];

  const options = [];

  for (let i = 1; i < 11; i++) {
      options.push({ value: i, label: i }) 
  }

  const handleChange = (selectedOption) => {
    setSelect(selectedOption.value)
    const price = document.getElementById('mlselect').value.split(',')[1];
    const incase = document.getElementById('mlselect').value.split(',')[2];

    const totals = (incase * price) * selectedOption.value;
    sessionStorage.setItem('total', totals);
    const result = document.getElementById("result");
    result.innerHTML = `${totals.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}₮`;
  }

  function setValue() {
    const size = document.getElementById('mlselect').value.split(',')[0];
    const price = document.getElementById('mlselect').value.split(',')[1];
    const incase = document.getElementById('mlselect').value.split(',')[2];
    // const number = document.getElementById('avdar').value;
    const title = document.getElementById('title');
    const caseinunit = document.getElementById('caseinunit');
    const result = document.getElementById("result");

    // setTotal(incase)
    const totals = (incase * price) * select;
    sessionStorage.setItem('total', totals);
    title.innerHTML = `Bonaqua ${size} - ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}₮`;
    result.innerHTML = `${totals.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}₮`;
    caseinunit.innerHTML = `1 авдар доторх ширхэгийн тоо - ${incase}ш`;

    imageArray.map(img => {
      if (img.size == size) {
        setImage(img.img)
        setCapacity(size)
      }
    })
  }

  // Захиалга сагсанд орох
  function Busket() {
    const size = document.getElementById('mlselect').value.split(',')[0];
    const prices = document.getElementById('mlselect').value.split(',')[1];
    const incase = document.getElementById('mlselect').value.split(',')[2];
    const article = document.getElementById('mlselect').value.split(',')[3];

    // const bagts = parseInt(document.getElementById('avdar').value);
    const bagts = select;
    
    var index = array.findIndex(x => x.size == size);

    const totalPrice = prices * incase * bagts;

    if (totalPrice > 0) {
      index === -1 ? array.push({
        size: size,
        sprice: prices,
        price: prices * incase * bagts,
        tincase: incase * bagts,
        incase: incase,
        avdar: bagts,
        article: article,
        image: image
      })
        : array.forEach(e => {
          if (e.size == size) {
            e.price += (prices * incase) * bagts;
            e.tincase += (incase * bagts);
            e.avdar += bagts;
          }
        })

      var c = 1;
      array.forEach(x => {
        if (x.size != size) {
          c += 1;
        }
      });
      sessionStorage.setItem("item", c);
      setItem(c);
    }
    else {
      toast("Уучлаарай cагслах боломжгүй байна. Үнийн дүн 0-ээс их байх хэрэгтэй!")
    }

    sessionStorage.setItem("array", JSON.stringify(array));
    // Нийт дүн
    var sum = 0;
    array.forEach(x => {
      sum += x.price;
    });

    sessionStorage.setItem("sum", sum);
    setTotal(sum)

    setRender(!render)
  }

  const number = Array(10).fill(0).map((e, i) => i + 1);

  let sum = sessionStorage.getItem("sum");
    // Захиалга устгах
    function removeOrder(element) {
      const index = array.indexOf(element);
  
      if (index > -1) {
        array.splice(index, 1);
        sessionStorage.setItem("array", JSON.stringify(array));
        sum -= element.price;
        sessionStorage.setItem("sum", sum);
        setTotal(sum)
        item -= 1;
        sessionStorage.setItem("item", item);
      }
      setRender(!render)
    }

    var btns = document.getElementsByClassName("bonaquaType");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function() {
      var current = document.getElementsByClassName("bona-active");
      if (current.length > 0) { 
        current[0].className = current[0].className.replace(" bona-active", "");
      }
      this.className += " bona-active";
      });
    }

    let element = useRoutes([
      {path: '/', element: <Product/>},
      {path: '/instruction', element: <Instruction/>},
      {path: '/nutrition', element: <Nutrition/>}
    ])

  return (
    <div className='mx-auto flex flex-col justify-between'>
      <div className='flex flex-col xl:flex-row contentInfo'>

        <div className='choosing w-full xl:w-1/2 flex items-center justify-center relative'>
          <div className='choose flex justify-center self-center relative'>
            <div class="main">
              <ul id='accordion'>
                {data.map((res, i) => 
                <div className='bonaqua' id={`heading${i}`}>
                  <li className="bonaquaType" id={`type${i}`} data-toggle="collapse" data-target={`#list${res.Capacity}`}
                   onClick={() => { 
                    setCapacity(res.Capacity)
                    imageArray.map(img => {
                      if (img.size == res.Capacity) {
                        setImage(img.img)
                        setText(res.Capacity)
                      }
                    })
                   }}>
                  </li>
                  
                  <li id={`list${res.Capacity}`} data-parent="#accordion" aria-labelledby={`heading${i}`} className="9xl:text-6xl collapse listCol">{res.Capacity}</li>
                 </div>
                )}
              </ul>
              
            </div>
          </div>

          <div className='bona flex justify-center items-end relative'>
            <div className='flower absolute'>
              <img src={bigflower} alt="" className='bigflower' />
            </div>
            <img src={image} alt=""/>
            <div className='toirog absolute'>
              <div className='white flex justify-center items-center'>
                <div className='circle relative flex justify-center items-center'>
                  <p className='text-white text-sm font-semibold 9xl:text-4xl flex items-center' id='capaInCircle'>{capacity == '' ? fsize[0] : capacity}</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className='info w-full xl:w-1/2 pl-4 flex flex-col'>
          <div className='water'>
            <img src={water} alt="" />
          </div>

          <div className='waterfor pl-3 flex flex-col justify-around'>

            <div className='sagslah'>
              <p className='font-semibold text-2xl md:text-3xl 9xl:text-6xl' id='title'>
                {`Bonaqua ${fsize[0]} - ${fprice[0]}₮`}
              </p>
              <p id='caseinunit' className='text-xs md:text-base 9xl:text-4xl text-gray-500 font-medium mb-3'>1 авдар доторх ширхэгийн тоо - {fincase[0]}ш</p>
              <div className='flex inputForm'>

                <form action="" id="mlform" className='flex relative flex-col md:flex-row'>
                  <select name="ml" id="mlselect" className='select' onChange={setValue}>
                    {data.map((res) =>
                      res.BPrice === null ? <option id="incase" value={[res.Capacity, res.BPrice, res.InCase, res.Article]} disabled>{res.Capacity}</option> : <option id="incase" value={[res.Capacity, res.BPrice, res.InCase, res.Article]}>{res.Capacity}</option>
                    )}
                  </select>
                  
                  {/* <datalist id='case'>
                    {number.map(res =>
                      <option value={res} id='number'>{res}</option>
                    )}
                  </datalist>
                  <input type="text" list="case" id="avdar" className='select' onChange={setValue} placeholder="Авдарны тоо" defaultValue={1}/> */}
                  <CreatableSelect 
                    className='select'
                    id='avdar'
                    onChange={handleChange}
                    options={options}
                    defaultValue={{ value: 1, label: 1 }}
                  />

                  <div className='selectTotal flex justify-center items-center text-center'>
                    <p className='total text-red-700 pt-4 9xl:text-3xl' id='result'>
                      {ftotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}₮
                    </p>
                  </div>
                  <div className='tablenames absolute flex flex-col md:flex-row text-sm 9xl:text-3xl mt-1'>
                    <div className='tablename1'>
                      <p className=''>Хэмжээ</p>
                    </div>
                    <div className='tablename2'>
                      <p className=''>Авдар</p>
                    </div>
                    <div className='tablename3'>
                      <p className=''>Нийт үнэ</p>
                    </div>
                  </div>

                  <Link className="nav-link" to="#" id='submit' onClick={Busket}>
                    <ToastContainer />
                    <button className="sagslahButton text-xl 9xl:text-5xl" id='fly'>
                      Сагслах
                    </button>
                  </Link>

                </form>
              </div>
            </div>
             {array == '' ? '' : <Link to="/order"> <h4 className='flex justify-center text-gray-400 xl:hidden mt-3 hover:text-black'> <img src={sagsicon} alt="" className='w-[8%] sm:w-[6%] md:w-[5%]'/>  <img src={rightArrow} alt="" className='ml-5 w-[6%] sm:w-[5%] md:w-[3%] hover:w-[3.2%]'/> </h4> </Link>}
            <div className='phoneBusket mb-3 flex flex-wrap flex-row justify-center xl:hidden'>
        
            {array.map(data =>
            <div className='flex w-full sm:w-1/2'>
                  <div className="zahialsanHesegContent mt-3">

                    <div className="order1 flex">
                      <div className="order1Img flex justify-center">
                        <img src={data.image} alt="" className="" />
                      </div>

                      <div className="order1Info p-2">
                        <div className="orderName">
                          <div className="flex justify-between w-full">
                            <h6 className="9xl:text-4xl">Bonaqua {data.size} </h6>
                            <img src={deleteButton} onClick={() => removeOrder(data)} id="remove" alt="" className="cursor-pointer" />
                          </div>
                          <p className="text-sm 9xl:text-3xl 9xl:mt-3">Ширхэгийн тоо: {data.tincase} ширхэг</p>
                        </div>

                        <div className="order1Price flex justify-between items-center">
                          <h3 className="9xl:text-5xl">{data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}₮ </h3>
                          <div className="order1Button flex justify-between">
                            <button className="" onClick={() => {
                              if (data.avdar > 1 && sum > 0) {
                                data.avdar -= 1;
                                data.tincase -= parseInt(data.incase);
                                data.price -= parseInt(data.incase) * parseInt(data.sprice);
                                sum -= parseInt(data.incase) * parseInt(data.sprice);
                              }
                              sessionStorage.setItem("array", JSON.stringify(array));
                              sessionStorage.setItem("sum", sum);
                              setTotal(sum)
                              setRender(!render)
                            }}>
                              <img src={removeButton} alt="" className="9xl:w-14" />
                            </button>
                            <p className="font-semibold 9xl:text-5xl" id="count">{data.avdar}</p>
                            <button onClick={() => {
                              data.avdar += 1;
                              data.tincase += parseInt(data.incase);
                              data.price += parseInt(data.incase) * parseInt(data.sprice);
                              sessionStorage.setItem("array", JSON.stringify(array));
                              var sum = 0;
                              array.forEach(x => {
                                sum += x.price;
                              });

                              sessionStorage.setItem("sum", sum);
                              setTotal(sum)
                              setRender(!render)
                            }}>
                              <img src={addButton} alt="" className="9xl:w-14" />
                            </button>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                )}
                </div>
                
                {total === 0 ? '' : 
                  <div className='font-semibold flex justify-center w-[80%] xl:hidden'>
                  <p>Нийт дүн: <span className='text-[#3dbee3] text-lg'> {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}₮ </span> </p>
                </div>
                }
                
            <div className='productInfo'>
              <img src={productInfo} alt="" className='productImg' />
            </div>
              <div className='ChangeInfo '>
                <div className='link flex justify-between py-3'>
                  <NavLink className={({ isActive }) => (isActive ? 'is-active' : 'nav-link')} to='/'>
                    Бүтээгдэхүүний тайлбар
                  </NavLink>
                  <NavLink className={({ isActive }) => (isActive ? 'is-active' : 'nav-link')} to='/instruction'>
                    Хадгалах заавар
                  </NavLink>
                  <NavLink className={({ isActive }) => (isActive ? 'is-active' : 'nav-link')} to='/nutrition'>
                    Тэжээллэг чанар
                  </NavLink>
                </div>
                <div className=''>
                    {element}
                </div>
              </div>
          </div>

        </div>
        <Social />
      </div>
    </div>
  )
}

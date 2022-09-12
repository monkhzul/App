import React, { useEffect, useState } from 'react'
import bonaqua05 from '../../images/546A4010.png';
import bonaqua330 from '../../images/546A4006.png';
import bonaqua15 from '../../images/546A4015.png';
import bonaqua45 from '../../images/546A4021.png';
import bonaqua800 from '../../images/546A4025.png';
import { Link } from 'react-router-dom';

export default function OrderDetails() {

  const imageArray = [
    { "img": bonaqua15, "size": "1.5L" },
    { "img": bonaqua800, "size": "800ml" },
    { "img": bonaqua05, "size": "500ml" },
    { "img": bonaqua330, "size": "330ml" },
    { "img": bonaqua45, "size": "4.5L" },
    { "img": bonaqua05, "size": "18.9L" },
    { "img": bonaqua05, "size": "11.3L" },
  ];

  const [data, setData] = useState([]);
  const orderno = sessionStorage.getItem("random")

  useEffect(() => {
    const Orderid = () => {
      fetch('http://192.168.244.6:8089/api/bonaqua/getOrderDetail', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          orderno: orderno
        })
      })
        .then(res => {
          const data = res.json()
          var arr = [];
          data.then((res) => {
            for (var i in res) {
              arr.push({
                size: res[i].Capacity,
                sprice: res[i].Capacity,
                price: res[i].Capacity * res[i].InCase * res[i].Quantity / res[i].InCase,
                tincase: res[i].InCase * res[i].Quantity / res[i].InCase,
                incase: res[i].InCase,
                avdar: res[i].Quantity / res[i].InCase,
                amount: res[i].Amount
              })
            }
            setData(arr)
          })
        })
    }
    Orderid()
  }, [])

  return (
    <div className='flex flex-col justify-center items-center'>
      <h3 className='mx-auto mb-3'>Захиалгын дэлгэрэнгүй</h3>
      <h5 className='mx-auto mb-[5%] text-gray-600'>Захиалгын дугаар: <span className='text-[#3dbee3]'> {orderno} </span> </h5>
      <div className='flex flex-col sm:flex-row flex-wrap justify-center'>
        {data.map((data, i) =>
          <div className="zahialsanHesegDetail mx-2 my-1 9xl:my-40" key={i}>

            <div className="order1 flex">
              <div className="order1Imgdt flex justify-center">
                {
                  <img src={`http://192.168.244.6:8089/images/${data.size}.png`} alt="" className="" />
                }
              </div>

              <div className="order1Info p-2">
                <div className="orderName">
                  <div className="flex justify-between w-full">
                    <h6 className="9xl:text-4xl">Bonaqua {data.size} </h6>

                  </div>
                  <p className="text-sm 9xl:text-3xl 9xl:mt-3">Ширхэгийн тоо: {data.tincase} ширхэг</p>
                </div>

                <div className="order1Price flex justify-between items-center">
                  <h3 className="text-2xl 9xl:text-5xl">{data.amount}₮ </h3>
                  <div className="order1Button flex justify-between">

                    <p className="font-semibold 9xl:text-5xl" id="count">{ }</p>

                  </div>

                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className='w-full flex justify-center mt-[5%]'>
        <div className='w-full flex justify-center'>
        <Link to="/" className="text-gray-800 hover:text-[#3dbee3] font-semibold text-lg mx-[5%]">
          Нүүр хуудас-руу очих
        </Link>
        <Link to="/orderHistory" className="text-gray-800 hover:text-[#3dbee3] font-semibold text-lg mx-[5%]">
          Буцах
        </Link>
        </div>
      </div>
    </div>
  )
}

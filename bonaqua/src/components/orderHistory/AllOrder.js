import React, { useState, useEffect } from "react";
import bona from '../../images/bona0.5.png';
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

export default function AllOrder() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(0);
  const [payment_status, setPayment_status] = useState(0);
  const [tOrder, settOrder] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const perPage = 5;
  const pagesVisited = pageNumber * perPage;

  const userarrays = sessionStorage.getItem("userarray");
  const userArray = JSON.parse(userarrays);
  const random = sessionStorage.getItem("random");
  const orderid = sessionStorage.getItem("orderid");

  const dugaarc = sessionStorage.getItem("dugaar");
  var Pay_Status = sessionStorage.getItem("status");

  console.log(Pay_Status)
  
  useEffect(() => {
    var getData = async () => {
      try {
        var data = await fetch('http://localhost:8008/api/bonaqua/orderHistory');
        var resData = await data.json();
        setData(resData)
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [])


  const ordernoNumber = [];

  for (let i = 0; i < data.length; i++) {
    if (data[i].phonenumber == dugaarc) {
      ordernoNumber.push({
        phonenumber: data[i].phonenumber,
        orderno: data[i].orderno,
        date: data[i].DDate,
        totalPrice: data[i].TotalAmount,
        orderid: orderid,
        status: Pay_Status === 'PAID' ? 'Баталгаажсан' : Pay_Status === 'Canceled' ? 'Цуцлагдсан' : 'Хүлээгдэж буй'
      });
    }
  }

  function HistoryToPayment(orderno, price) {
    sessionStorage.setItem("random", orderno);
    sessionStorage.setItem("sum", price);

    const Orderid = () => {
      fetch('http://localhost:8008/api/bonaqua/getDetail', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic TUNTOmFoTlpGT00x"
      },
      body: JSON.stringify({
        orderno: random
      })
    })
      .then(res => {
        const data = res.json()
        data.then(res => console.log(res))
      })
    }
    Orderid()

      const QPay = () => {
        fetch('https://api.qpay.mn/v1/auth/token', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Basic TUNTOmFoTlpGT00x"
        },
        body: JSON.stringify({
          "client_id": "qpay_test",
          "client_secret": "sdZv9k9m",
          "grant_type": "client",
          "refresh_token": ""
        })
      })
        .then(res => {
          const data = res.json()
          data.then(res => {
            const token = res.access_token;
            sessionStorage.setItem("token", token);
            window.location.pathname = '/payment';
          })
        })
      }
      QPay()
  }

  // console.log(ordernoNumber[0].date.slice(0,10), today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate())


  const display = ordernoNumber.sort((a, b) => a.date - b.date).slice(pagesVisited, pagesVisited + perPage)
    .map(data => {
      return (
        <div className="orderHistory flex mb-2">
          <div className="orderHistoryImg flex justify-center">
            <img src={bona} alt="" className="" />
          </div>

          <div className="orderHistoryInfo flex flex-col sm:flex-row justify-between w-full mx-2 9xl:mx-8 my-2 items-center 9xl:text-3xl">
            <div className="flex flex-row w-full sm:w-1/2 justify-around items-center">
              <div className="date">
                <p className="text-gray-500 9xl:text-3xl leading-3">Огноо</p>
                <p className="font-semibold 9xl:text-3xl">{(data.date).slice(0,10)}</p>
              </div>
              <div className="state">
                <p className="text-gray-500 leading-3">Төлөв</p>
                {
                  data.status === 'Баталгаажсан' ? <p className="font-semibold text-green-400">{data.status}</p> 
                  : data.status === 'Цуцлагдсан' ? <p className="font-semibold text-red-600">{data.status}</p>
                  : <p className="font-semibold text-orange-400">{data.status}</p> 
                }
              
              </div>
            </div>
            <div className="flex flex-row w-full sm:w-1/2 justify-around items-center">
              <div className="orderNumber">
                <p className="text-gray-500 leading-3">Захиалгын дугаар</p>
                <p className="font-semibold">{data.orderno}</p>
              </div>
              <div className="amount">
                <p className="text-gray-500 leading-3">Дүн</p>
                <p className="font-semibold">{data.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}₮</p>
              </div>
            </div>
            {data.status === 'Хүлээгдэж буй' ?
              <div className="font-semibold text-sm flex justify-center text-[#3dbee3] opacity-80 hover:opacity-100"
                onClick={() => 
                  {
                    HistoryToPayment(data.orderno, data.totalPrice);
                  }
                }>
                <p className="cursor-pointer">Төлбөр төлөх</p>
              </div>
              : ''
            }
          </div>
        </div>
      )
    })

  const pageCount = Math.ceil(ordernoNumber.length / perPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  return (
    <div className="page">
      {display}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  )
}

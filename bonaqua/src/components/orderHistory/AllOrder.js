import React, { useState, useEffect } from "react";
import bona from '../../images/bona0.5.png';
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";

export default function AllOrder() {
  const [data, setData] = useState([]);
  var [status, setStatus] = useState(10);
  const [payment_status, setPayment_status] = useState(0);
  const [tOrder, settOrder] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const navigate = useNavigate();

  const perPage = 5;
  const pagesVisited = pageNumber * perPage;

  const userarrays = sessionStorage.getItem("userarray");
  const userArray = JSON.parse(userarrays);
  const random = sessionStorage.getItem("random");
  const orderid = sessionStorage.getItem("orderid");

  const dugaarc = sessionStorage.getItem("dugaar");
  var Pay_Status = sessionStorage.getItem("status");

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


  useEffect(() => {
    const status = () => {
      fetch('http://localhost:8008/api/bonaqua/getStatus', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderno: random
        })
      })
        .then((res) => {
          const data = res.json();
          data.then(res => {
            const state = res[0].State;
            setStatus(state)
          });
        })
    }
    status();
  }, [])

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (status == 10 || status == 0) {
  //       status = 0;
  //     }

  //   }, 2000)
  // }, [])

  const ordernoNumber = [];

  for (let i = 0; i < data.length; i++) {
    if (data[i].phonenumber == dugaarc) {
      ordernoNumber.push({
        phonenumber: data[i].phonenumber,
        orderno: data[i].orderno,
        date: data[i].DDate,
        totalPrice: data[i].TotalAmount,
        status: status === 1 ? 'Баталгаажсан' : status === 10 ? 'Хүлээгдэж буй' : 'Цуцлагдсан'
      });
    }
  }

  function HistoryToPayment(orderno, price) {
    sessionStorage.setItem("random", orderno);
    // sessionStorage.setItem("sum", price);
    sessionStorage.setItem("sumo", price);

    const Orderid = () => {
      fetch('http://localhost:8008/api/bonaqua/getOrderDetail', {
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
                article: res[i].DocumentId
              })
            }
            console.log(arr, orderno)
            sessionStorage.setItem("array", JSON.stringify(arr));
          })
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
            navigate('/payment')
          })
        })
    }
    QPay()
  }

  const orderDetail = (orderno) => {
    sessionStorage.setItem("random", orderno)
    navigate('/orderDetails')
  }

  // console.log(ordernoNumber[0].date.slice(0,10), today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate())

  const sortedDesc = ordernoNumber.sort(
    (objA, objB) =>
      new Date(objB.date) - new Date(objA.date)
  );

  const display = sortedDesc.slice(pagesVisited, pagesVisited + perPage)
    .map((data, i) => {
      return (
        <div className="orderHistory flex mb-2" key={i}>
          <div className="orderHistoryImg flex justify-center">
            <img src={bona} alt="" className="" />
          </div>

          <div className="cursor-pointer w-[80%] flex 3xl:items-center hover:bg-[#edf9ff]" onClick={() => {
            orderDetail(data.orderno);
          }}>
            <div className="orderHistoryInfo flex flex-col sm:flex-row justify-between w-full mx-2 9xl:mx-8 my-2 items-center 9xl:text-3xl">
              <div className="flex flex-row w-full sm:w-1/2 justify-around my-auto">
                <div className="date">
                  <p className="text-gray-500 9xl:text-3xl leading-3">Огноо</p>
                  <p className="font-semibold 9xl:text-3xl">{(data.date).slice(0, 10)}</p>
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
              <div className="flex flex-row w-full sm:w-1/2 justify-around">
                <div className="orderNumber">
                  <p className="text-gray-500 leading-3">Захиалгын дугаар</p>
                  <p className="font-semibold">{data.orderno}</p>
                </div>
                <div className="amount">
                  <p className="text-gray-500 leading-3">Дүн</p>
                  <p className="font-semibold">{data.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}₮</p>
                </div>
              </div>

            </div>
          </div>
          {data.status === 'Хүлээгдэж буй' ?
            <div className="font-semibold text-sm flex justify-center items-center text-[#3dbee3] opacity-80 hover:opacity-100"
              onClick={() => {
                HistoryToPayment(data.orderno, data.totalPrice);
              }
              }>
              <p className="cursor-pointer ml-4">Төлбөр төлөх</p>
            </div>
            : ''
          }
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

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bona from '../../images/bona0.5.png';
import ReactPaginate from "react-paginate";

export default function AllOrder() {
  const [data, setData] = useState([]);
  const [token, setToken] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const dugaarc = sessionStorage.getItem("dugaar");
  const navigate = useNavigate();

  useEffect(() => {
    const orders = () => {
      fetch('http://192.168.244.6:8089/api/bonaqua/getorderConfirm', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
        .then((res) => {
          const data = res.json();
          data.then((data) => {
            setData(data)
          })
        })
    }
    orders();
  }, [])

  var ordernoNumber = [];

  for (let i = 0; i < data.length; i++) {
    if (data[i].phonenumber === dugaarc) {
      ordernoNumber.push({
        phonenumber: data[i].phonenumber,
        orderno: data[i].orderno,
        date: data[i].DateCreate,
        totalPrice: data[i].TotalAmount,
        status: data[i].State
      });
    }
  }

  const sortedDesc = ordernoNumber.sort(
    (objA, objB) =>
      new Date(objB.date) - new Date(objA.date)
  );

  const perPage = 5;
  const pagesVisited = pageNumber * perPage;
  const pageCount = Math.ceil(ordernoNumber.length / perPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  function orderDetail(orderno) {
    sessionStorage.setItem("random", orderno);
    navigate('/orderDetails');
  }

  useEffect(() => {
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
          setToken(token);
        })
      })
  }, [])

  function payment(orderno, sum) {
    sessionStorage.setItem("randompay", orderno);
    sessionStorage.setItem("sumo", sum);
    sessionStorage.setItem("login", dugaarc)

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
                  sprice: res[i].Price,
                  price: res[i].Amount,
                  tincase: res[i].InCase * res[i].Quantity,
                  incase: res[i].InCase,
                  avdar: res[i].Quantity / res[i].InCase,
                  amount: res[i].Amount
                })
              }
              sessionStorage.setItem("arrayto", JSON.stringify(arr));
              sessionStorage.setItem("ordertopay", 1);
              sessionStorage.setItem("tokento", token);
              navigate('/payment')
            })
          })
      }
      Orderid()

    //  const send = () => {
    //   console.log(data1)
    //    sessionStorage.setItem("array", JSON.stringify(data1));
    //    navigate('/payment')
    //  }

    //  send();

  }

  const display = sortedDesc.slice(pagesVisited, pagesVisited + perPage)
    .map((data, i) => {
      return (
        <div className="orderHistory flex mb-2" key={i}>
          <div className="orderHistoryImg flex justify-center">
            <img src={bona} alt="" className="" />
          </div>

          <div className="cursor-pointer w-full flex 3xl:items-center hover:bg-[#edf9ff]" onClick={() => orderDetail(data.orderno)}>
            <div className="orderHistoryInfo flex flex-col sm:flex-row justify-between w-full mx-2 9xl:mx-8 my-2 items-center 9xl:text-3xl">
              <div className="flex flex-row w-full sm:w-1/2 justify-around my-auto">
                <div className="date">
                  <p className="text-gray-500 9xl:text-3xl leading-3">Огноо</p>
                  <p className="font-semibold 9xl:text-3xl">{(data.date).slice(0, 10)}</p>
                </div>
                <div className="state">
                  <p className="text-gray-500 leading-3">Төлөв</p>
                  {
                    data.status === 0 ? <p className="font-semibold text-green-400">Баталгаажсан</p>
                      : data.status === 1 ? <p className="font-semibold text-red-600">Цуцлагдсан</p>
                        : <p className="font-semibold text-orange-400">Хүлээгдэж буй</p>
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

          <div onClick={() => 
            {payment(data.orderno, data.totalPrice)}
          }>
            {data.status == 10 ? 
            <div className="h-full flex justify-center items-center mx-auto cursor-pointer text-gray-600 hover:text-[#3dbee3]"> <p className="mx-auto flex justify-center text-sm items-center text-center">Төлбөр төлөх</p> </div> : ''}
          </div>
        </div>
      )
    })

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

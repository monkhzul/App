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

  const dugaarc = sessionStorage.getItem("dugaar");
  var Pay_Status = sessionStorage.getItem("status");

  useEffect(() => {
    var getData = async () => {
      try {
        var data = await fetch('http://192.168.244.6:8089/api/bonaqua/orderHistory');
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
        status: Pay_Status === 'PAID' ? 'Баталгаажсан' : 'Хүлээгдэж буй'
      });
    }
  }

  const HistoryToPayment = (orderno, price) => {
    sessionStorage.setItem("random", orderno);
    sessionStorage.setItem("sum", price);

    // window.location.pathname = '/payment'
    console.log('clicked')
  }

  const display = ordernoNumber.slice(pagesVisited, pagesVisited + perPage)
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
                <p className="font-semibold 9xl:text-3xl">{(data.date).slice(0, 10)}</p>
              </div>
              <div className="state">
                <p className="text-gray-500 leading-3">Төлөв</p>
                <p className="font-semibold">{data.status}</p>
              </div>
            </div>
            <div className="flex flex-row w-full sm:w-1/2 justify-around items-center">
              <div className="orderNumber">
                <p className="text-gray-500 leading-3">Захиалгын дугаар</p>
                <p className="font-semibold">{data.orderno}</p>
              </div>
              <div className="amount">
                <p className="text-gray-500 leading-3">Дүн</p>
                <p className="font-semibold">{data.totalPrice}₮</p>
              </div>
            </div>
            {data.status === 'Хүлээгдэж буй' ?
              <div className="font-semibold text-sm flex justify-center text-[#3dbee3] opacity-80 hover:opacity-100"
                onClick={HistoryToPayment(data.orderno, data.totalPrice)}>
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

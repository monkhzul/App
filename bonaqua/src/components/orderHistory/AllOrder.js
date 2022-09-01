import React, { useState, useEffect } from "react";
import bona from '../../images/bona0.5.png';
import ReactPaginate from "react-paginate";

export default function AllOrder() {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const dugaarc = sessionStorage.getItem("dugaar");

  useEffect(() => {
    const orders = () => {
      fetch('http://localhost:8008/api/bonaqua/getorderConfirm', {
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

  const display = sortedDesc.slice(pagesVisited, pagesVisited + perPage)
    .map((data, i) => {
      return (
        <div className="orderHistory flex mb-2" key={i}>
          <div className="orderHistoryImg flex justify-center">
            <img src={bona} alt="" className="" />
          </div>

          <div className="cursor-pointer w-[80%] flex 3xl:items-center hover:bg-[#edf9ff]">
            <div className="orderHistoryInfo flex flex-col sm:flex-row justify-between w-full mx-2 9xl:mx-8 my-2 items-center 9xl:text-3xl">
              <div className="flex flex-row w-full sm:w-1/2 justify-around my-auto">
                <div className="date">
                  <p className="text-gray-500 9xl:text-3xl leading-3">Огноо</p>
                  <p className="font-semibold 9xl:text-3xl">{(data.date).slice(0, 10)}</p>
                </div>
                <div className="state">
                  <p className="text-gray-500 leading-3">Төлөв</p>
                  {
                    data.status === 1 ? <p className="font-semibold text-green-400">Баталгаажсан</p>
                      : data.status === 0 ? <p className="font-semibold text-red-600">Цуцлагдсан</p>
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

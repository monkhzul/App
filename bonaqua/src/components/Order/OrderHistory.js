import React, { useState, useEffect, useContext } from "react";
import { useRoutes } from "react-router-dom";
import bonaqua from "../../images/546A4010.png";
import bigflower from "../../images/svg/home/tsetseg tom.svg";
import lineflower from "../../images/svg/order 2/Group 550.svg";
import { NavLink } from "react-router-dom";
import AllOrder from "../orderHistory/AllOrder";
import OrderConfirm from "../orderHistory/OrderConfirm";
import OrderDelivered from "../orderHistory/OrderDelivered";
import Social from "../Social";
import OrderDetails from "../orderHistory/OrderDetails";
import { toast, ToastContainer } from "react-toastify";

export default function OrderHistory() {
  // const { orderHistory, value } = useContext(AppContext);
  const [render, setRender] = useState(false);

  const dugaarc = sessionStorage.getItem("dugaar");

  let element = useRoutes([
    { path: "/", element: <AllOrder /> },
    { path: "orderConfirm", element: <OrderConfirm /> },
    { path: "orderWaiting", element: <OrderDelivered /> },
  ]);

  var duration = 180;
  setInterval(updateTimer, 1000);
  
  function updateTimer() {
    duration--;
    if (duration < 1) {
      toast("Та идэвхгүй 3 минут болсон байна.")
      setTimeout(() => {
        window.location.pathname = "/";
        sessionStorage.clear();
      }, 500)
    }
  }

  window.addEventListener("mousemove", resetTimer);

  function resetTimer() {
    duration = 180;
  }

  return (
    <div className="mx-auto flex flex-col justify-between">
      <div className="flex flex-col xl:flex-row">
        <div className="choosing w-full xl:w-1/2 flex items-center justify-center relative mt-14">
          <div className="bona flex justify-center items-end relative">
            <div className="flower absolute">
              <img src={bigflower} alt="" className="bigflower" />
            </div>
            <img src={bonaqua} alt="" className="" />
            <div className="toirog absolute">
              <div className="white flex justify-center items-center">
                <div className="circle relative flex justify-center items-center">
                  <p
                    className="text-white font-semibold text-xs 9xl:text-4xl"
                    id="capaInCircle"
                  >
                    bonaqua
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="info w-full xl:w-1/2 mr-14 mt-3">
          <h1 className="">Захиалгын түүх</h1>
          <ToastContainer />

          <div className="orderHistoryLink">
            <div className="link flex justify-between py-3 w-full">
              <div className="flex w-full md:w-[80%] justify-between mb-3 md:mb-0 2xl:mr-10">
                <div className="">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "is-active" : "nav-link"
                    }
                    to="/orderHistory"
                  >
                    Бүгд
                  </NavLink>
                </div>
                <div className="mx-3">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "is-active" : "nav-link"
                    }
                    to="/orderHistory/orderConfirm"
                  >
                    Баталгаажсан
                  </NavLink>
                </div>
                <div className="">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "is-active" : "nav-link"
                    }
                    to="/orderHistory/orderWaiting"
                  >
                    Хүлээгдэж буй
                  </NavLink>
                </div>
              </div>

              <div className="sort flex justify-end ml-5">
                <select name="" id="" className="select w-full">
                  <option value="" className="">
                    Сүүлийнх нь эхэндээ
                  </option>
                  <option value=""></option>
                </select>
              </div>
            </div>
            <div className="">{element}</div>
          </div>

          <div className="my-14">
            <img src={lineflower} alt="" className="w-full" />
          </div>

          <div>
            <a className="nav-link" href="/">
              <button
                className="backPaymentButton"
                onClick={() => {
                  window.location.pathname = "/";
                  // history.push('/');
                  sessionStorage.clear();
                  window.location.reload();
                }}
              >
                Гарах
              </button>
            </a>
          </div>
        </div>

        <Social />
      </div>
    </div>
  );
}

import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import orderinfo from "../../images/svg/order 2/Header.svg";
import user from "../../images/svg/order 2/Header-2.svg";
import location from "../../images/svg/order 2/Header-1.svg";
import sags from "../../images/svg/order 2/Group 550.svg";
import { AppContext } from "../../App";
import { toast, ToastContainer } from 'react-toastify';
import SlideImage from "../SlideImage";
import Social from "../Social";
import Select from 'react-select';

export default function OrderInfo() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [district, setDistrict] = useState("");
  const [committee, setCommittee] = useState("");
  const [apartment, setApartment] = useState("");
  const [entrance, setEntrance] = useState("");
  const [code, setCode] = useState("");
  const [doornumber, setDoorNumber] = useState("");
  const [add, setAdd] = useState("");
  const [data, setData] = useState([]);
  const { setRandom, random, pack, setOrderid, size, incase, setAccess_Token } = useContext(AppContext)

  const arrays = sessionStorage.getItem("array");
  const orderArray = JSON.parse(arrays);
  const sum = sessionStorage.getItem("sum");

  const navigate = useNavigate();

  useEffect(() => {
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
            setAccess_Token(token);
            sessionStorage.setItem("token", token);
          })
        })
    }
    QPay()
  }, [])

  function getUserData() {

    if (orderArray != null && sum != null) {

      if (name === '' || number === '' || district === '' || committee === '' || apartment === '' || doornumber === '' || add === '') {
        toast("???????????????????????? ?????????????????????? ?????????????? ????!");
      }
      else {
        var phoneno = /^[7-9]\d{7}$/;
        var regName = /^[a-zA-Z ]{2,30}$/;
        var today = new Date();
        if (number.match(phoneno) && name.match(regName)) {

          fetch('http://192.168.244.6:8089/api/bonaqua/addOrder', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              date: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
              description: [`ner: ${name}, duureg: ${district}, horoo: ${committee}, bair/gudamj: ${apartment}, orts: ${entrance}, ortsnii kod: ${code}, haalganii dugaar: ${doornumber}, nemelt: ${add}`].join(","),
              phone: number,
              array: orderArray,
              pricedisc: 0,
              amount: sum
            })
          })
            .then((res) => {
              const data = res.json();
              data.then(ordernumber => {
                const orderNumber = ordernumber[0].OrderNumber;
                const orderId = ordernumber[0].OrderID;
                setRandom(orderNumber);
                setOrderid(orderId);
                sessionStorage.setItem("random", orderNumber);
                sessionStorage.setItem("orderid", orderId);
                sessionStorage.setItem("ordertopay", 0);

                navigate('/payment')
              });
            })

        }
        else {
          toast("???? ?????? ?????????? ???????????? ???????????????? ?????????????? ????!");
        }
      }
    }
    else {
      toast("??????????????????! ?????????? ?????? 0-?????? ???? ???????? ????????????????! ???????????????? ?????????? ????!")
    }
  }

  // const options = Array(32).fill(0).map((e, i) => i + 1);

  if (orderArray === '' || orderArray === null) {
    console.log("hooson")
  } else {
    orderArray.forEach(x => {
      pack.push(x.size)
      incase.push(x.incase)
      size.push(x.avdar)
    });
  }

  const districts = [
    { name: "?????????????? ????????????" },
    { name: "???????????????? ????????????" },
    { name: "??????-?????? ????????????" },
    { name: "?????????????????? ????????????" },
    { name: "??????????????-?????????????? ????????????" },
    { name: "?????????????????? ????????????" },
    // {name: "???????????? ????????????"},
    // {name: "???????????????????? ????????????"},
    // {name: "???????????????? ????????????"},
  ]
  const dist = [];

  for (let i = 0; i < districts.length; i++) {
    dist.push({ value: districts[i].name, label: districts[i].name })
  }

  const handleDistrict = (selectedOption) => {
    setDistrict(selectedOption.value)
  }

  const options = [];

  for (let i = 1; i < 33; i++) {
    options.push({ value: i, label: i + '-?? ??????????' })
  }

  const handleChange = (selectedOption) => {
    setCommittee(selectedOption.value)
  }

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

  return (
    <div className="mx-auto flex flex-col justify-between">
      <div className="flex flex-col xl:flex-row">
        <div className="w-full xl:w-1/2 flex relative choosing">
          <SlideImage />
        </div>

        <div className="w-full xl:w-1/2 flex flex-col justify-between mr-10">
          <div className="orderInfo flex flex-col justify-between">
            <h1 className="mb-3 9xl:text-7xl">?????????????????? ????????????????</h1>

            <div className="">
              <div className="flex justify-between">
                <img src={orderinfo} alt="" className="userImg mb-3" />
                <img src={sags} alt="" className="flowerImg" />
              </div>
              <div className="order2TotalInfo">
                <div className="seeTotalInfo flex relative">
                  <div className='order1selectTotal flex justify-center items-center overflow-scroll'>
                    <div className="flex mx-2 w-full flex-column mt-3">
                      {orderArray === '' || orderArray === null ? 'Empty' : orderArray.map((data, i) =>
                        <p className='totalInfo font-semibold 7xl:text-2xl' key={i}>
                          {pack === '' ? 'Empty' : `${pack[i]} - ${size[i]} ?????????? (${incase[i] * size[i]}??),`}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className='order1selectTotal2'>
                    <p className='total pt-3 text-red-700 text-3xl font-semibold'>{sum}???</p>
                    {/* .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") */}
                  </div>
                  <div className='order2tablenames absolute flex flex-row text-xs 9xl:text-3xl'>
                    <div className='flex'>
                      <p className=''>????????????/?????? ????????????</p>
                    </div>

                    <div className='flex'>
                      <p className=''>???????? ??????</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* ???????????????????????? ???????????????? */}
            <div className="userInfo w-full">
              <div className="flex w-full justify-between my-3">
                <img src={user} alt="" className="userImg" />
                <img src={sags} alt="" className="flowerImg" />
              </div>
              <div className="">
                <form className="flex justify-between text-sm 9xl:text-3xl" id="userform">
                  <div class="group mr-1">
                    <label className="form-label">??????</label>
                    <input type="text" id="name" className="check" onChange={(e) => setName(e.target.value)} required="required" />
                  </div>
                  <div class="group mr-1">
                    <label className="form-label">???????????? ????????????</label>
                    <input type="text" id="number" className="check"
                      onChange={(e) => {
                        setNumber(e.target.value);
                        var dugaar = [];
                        data.forEach(x => {
                          dugaar.push(x.phonenumber)
                        })

                      }}
                      required="required" />
                  </div>
                  <div class="group">
                    <label>?????????????????? ????????????</label>
                    {random === '' ? <input type="text" id="ordernumber" disabled="disabled" className="cursor-not-allowed" placeholder="???????????????????? ??????????" />
                      : <input type="text" id="ordernumber" disabled="disabled" className="randomOrderNumber cursor-not-allowed" placeholder="" />}
                  </div>
                </form>
              </div>
            </div>

            {/* ???????????????? ???????????????? */}
            <div className="locationInfo w-full">
              <div className="userInfo w-full">
                <div className="flex w-full justify-between my-3">
                  <img src={location} alt="" className="userImg" />
                  <img src={sags} alt="" className="flowerImg" />
                </div>
                <div className="locate flex justify-between w-full">
                  <form className="flex justify-between flex-wrap text-sm 9xl:text-3xl" id="orderInfo">
                    <div className="flex district justify-between">
                      <div className="groupS mr-3 w-1/2">
                        <label htmlFor="" className="form-label">????????????</label>
                        <Select
                          className='select w-full 9xl:text-4xl check'
                          id='district'
                          onChange={handleDistrict}
                          options={dist}
                          placeholder="????????????..."
                        />
                      </div>
                      <div className="groupS w-1/2">
                        <label htmlFor="" className="form-label">??????????</label>
                        <Select
                          className='select w-full 9xl:text-4xl check'
                          id='committee'
                          onChange={handleChange}
                          options={options}
                          placeholder="??????????..."
                        />
                      </div>
                    </div>

                    <div className="flex house">
                      <div class="groupL mr-3 w-1/2">
                        <label className="form-label">????????/????????????</label>
                        <input type="text" className="w-full check" id="apartment" onChange={(e) => setApartment(e.target.value)} required="required" />
                      </div>
                      <div class="groupL w-1/2">
                        <label className="form-label">??????</label>
                        <input type="text" className="w-full check" id="entrance" onChange={(e) => setEntrance(e.target.value)} />
                      </div>
                    </div>
                    <div className="flex door">
                      <div class="groupL mr-3 w-1/2">
                        <label className="form-label">?????????? ??????</label>
                        <input type="text" className="w-full check" id="entrancecode" onChange={(e) => setCode(e.target.value)} />
                      </div>
                      <div class="groupL w-1/2">
                        <label className="form-label">???????????????? ???????????? /????????/</label>
                        <input type="text" className="w-full check" id="doornumber" onChange={(e) => setDoorNumber(e.target.value)} required="required" />
                      </div>
                    </div>

                    <div class="groupLa w-full">
                      <label className="form-label">???????????? ????????????????</label>
                      <input type="text" className="w-full check" id="addinginfo" placeholder="?????????????????????? ????????" onChange={(e) => setAdd(e.target.value)} required="required" />
                    </div>
                    <div className="flex w-full">
                      <div className="back w-1/2">
                        <a className="backButton" href="/order">
                          ??????????
                        </a>
                      </div>

                      <ToastContainer 
                        position="top-center"
                      />
                      <div className="choosePayment w-1/2">
                        <div className="">
                          <div className="choosePaymentButton hover:font-semibold text-white cursor-pointer" onClick={getUserData}>
                            ????????????????????????????
                          </div>
                        </div>
                      </div>
                    </div>

                  </form>
                </div>
              </div>
            </div>
          </div>

        </div>
        <Social />
      </div>
    </div>
  );
}

import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import orderinfo from "../../images/svg/order 2/Header.svg";
import sags from "../../images/svg/order 2/Group 550.svg";
import qr from "../../images/qr.png";
import instruction from '../../images/svg/order 3/Header-2.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SlideImage from "../SlideImage";
import Social from "../Social";
import crypto from "crypto-js";
import QRCode from 'qrcode';

export default function Payment() {

  const { incase, pack, size, access_token, setAccess_Token,
    qr_text, setQR_text } = useContext(AppContext)

  const [render, setRender] = useState(false);
  const [qr_image, setQR_image] = useState("");
  const [payment_id, setPayment_id] = useState("");
  const [payment_status, setPayment_status] = useState("");
  const [QPay_status, setQPay_status] = useState("");
  var [payment, setPayment] = useState("Хүлээгдэж буй");

  const arrays = sessionStorage.getItem("array");
  const orderArray = JSON.parse(arrays);
  const sum = sessionStorage.getItem("sum");

  const userarrays = sessionStorage.getItem("userarray");
  const userArray = JSON.parse(userarrays);
  const random = sessionStorage.getItem("random");
  const orderid = sessionStorage.getItem("orderid");
  
  const navigate = useNavigate();

  if (orderArray === null) {
    console.log("array hooson")
  } 
  else {
      orderArray.forEach(x => {
        pack.push(x.size)
        incase.push(x.incase)
        size.push(x.avdar)
      })
  }

  const key = "bsuTPNVvbM#sAI2#";
  var checksum = random + sum + "POST" + "http://localhost:3000/orderHistory";
  var checksum1 = checksum.toString();
  const hash = crypto.HmacSHA256(`${checksum1}`, key);
  let sha256 = hash.toString(crypto.enc.Hex);


  var checksum1 = random + random;
  var checksum2 = checksum1.toString();
  const hash1 = crypto.HmacSHA256(`${checksum2}`, key);
  let sha2561 = hash1.toString(crypto.enc.Hex);


  function SocialPay() {
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJNRVJDSEFOVF9NQ1NfQ09DQV9DT0xBIiwiaWF0IjoxNjMyNzkxOTM4fQ.Tji9cxZsRZPcNJ1xtxx7O3lq2TDn9VZhbx9n6YZ7yOs";
    fetch('https://ecommerce.golomtbank.com/api/invoice', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        amount: sum,
        callback: "http://localhost:3000/orderHistory",
        checksum: sha256,
        genToken: "Y",
        returnType: "POST",
        transactionId: random
      })
    })
      .then(res => {
        const data = res.json()
        data.then(data => {
          console.log(data.invoice);
          window.location.href = `https://ecommerce.golomtbank.com/socialpay/mn/${data.invoice}`;
        })
      });
  }

    const Inquiry = () => {
      fetch('https://ecommerce.golomtbank.com/api/inquiry', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJNRVJDSEFOVF9NQ1NfQ09DQV9DT0xBIiwiaWF0IjoxNjMyNzkxOTM4fQ.Tji9cxZsRZPcNJ1xtxx7O3lq2TDn9VZhbx9n6YZ7yOs`,
        },
        body: JSON.stringify({
          checksum: sha2561,
          transactionId: random
        })
      })
      .then(res => {
        const data = res.json()
        data.then(data => {
          setPayment_status(data)
        })
      });
    };

  const token = sessionStorage.getItem("token")

  useEffect(() => {
    const QRcode = () => {
      fetch('https://api.qpay.mn/v1/bill/create', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          "template_id": "TEST_INVOICE",
          "merchant_id": "TEST_MERCHANT",
          "branch_id": "1",
          "pos_id": "1",
          "receiver": {
            "id": "CUST_001",
            "register_no": "ddf",
            "name": "Central",
            "email": "info@info.mn",
            "phone_number": "99888899",
            "note": "zulaa"
          },
          "transactions": [{
            "description": "qpay",
            "amount": 10000,
            "accounts": [{
              "bank_code": "050000",
              "name": "zulaa",
              "number": "5084107767",
              "currency": "MNT"
            }]
          }],
          "bill_no": random,
          "date": new Date(),
          "description": "bonaqua qpay",
          "amount": sum,
          "btuk_code": "",
          "vat_flag": "0"
        })
      })
        .then(res => {
          const data = res.json()
          data.then(res => {
            setQR_text(res.qPay_QRcode);
            setPayment_id(res.payment_id);

            QRCode.toDataURL(res.qPay_QRcode).then((data) => {
              setQR_image(data);
            })
          })
        })
    }
    QRcode()
  }, [])

    const CheckQpay = async () => {
      await fetch(`https://api.qpay.mn/v1/bill/check`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            "merchant_id": "TEST_MERCHANT",
            "bill_no": random
          })
        })
          .then(res => {
            const data = res.json()
            data.then(res => {
              const paymentStatus = res.payment_info.payment_status;
              setQPay_status(paymentStatus)
              // console.log(res.payment_info.payment_status)
            })
          })
    }
    
    // useEffect(() => {
    //   setTimeout(() => {
    //     Inquiry();
    //     CheckQpay();

    //     if (QPay_status == 'PAID' && payment_status.status == 'PAID' ) {
    //       payment = 1;
    //       sessionStorage.setItem("status", payment);
    //     } else {
    //       payment = 0;
    //       sessionStorage.setItem("status", payment);
    //     }

    //     window.sessionStorage.clear();
    //     navigate('/')

    //   }, 5000)
    // }, [])


  function CancelOrder() {
    toast("Захиалга цуцлагдлаа!")
    setTimeout(() => {
      sessionStorage.clear();
      window.location.pathname = '/';
      // history.push('/')
    }, 1000)
    setRender(!render)
  }

  return (
    <div className="mx-auto flex flex-col justify-between">
      <div className="flex flex-col xl:flex-row">
        <div className="w-full xl:w-1/2 flex items-center relative choosing orderInfo">
          <SlideImage />
        </div>

        <div className="order2Content w-full xl:w-1/2 flex flex-col justify-between mr-10">
          <div className="orderInfo flex flex-col justify-between">
            <h1 className="9xl:text-7xl">Төлбөр төлөх</h1>

            {/* Захиалгын мэдээлэл*/}
            <div className="">
              <div className="flex justify-between">
                <img src={orderinfo} alt="" className="userImg mb-3" />
                <img src={sags} alt="" className="flowerImg" />
              </div>
              <div className="order2TotalInfo">
                <div className="seeTotalInfo flex relative">
                  <div className='order1selectTotal flex justify-center items-center overflow-scroll'>
                    <div className="flex mx-2 w-full flex-column mt-3">
                      {orderArray === '' || orderArray === null ? '' : orderArray.map((data, i) =>
                        <p className='totalInfo font-semibold' key={i}>
                          {`${pack[i]} - ${size[i]} авдар (${incase[i] * size[i]}ш),`}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* <div className='order1selectTotal1 flex justify-center items-center overflow-scroll'>
                    <div className="min-w-0 flex mx-2 items-center">
                      {orderArray.map(data =>
                        <p className='total text-xl flex justify-center items-center font-semibold mr-2'>{data.incase}x{data.avdar}</p>
                      )}
                    </div>
                  </div> */}
                  <div className='order1selectTotal2'>
                    <p className='total pt-3 text-red-700 text-3xl font-semibold'>{sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}₮</p>
                  </div>
                  <div className='order2tablenames absolute flex flex-row text-xs 9xl:text-3xl'>
                    <div className='flex'>
                      <p className=''>Хэмжээ/Тоо ширхэг</p>
                    </div>

                    <div className='flex'>
                      <p className=''>Нийт үнэ</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Хэрэглэгчийн мэдээлэл */}
            <div className="userInfo">
              <form className="flex flex-wrap text-sm 9xl:text-4xl">

                {/* Байршлын мэдээлэл */}
                <div className="locationInfo">
                  <div className="userInfo w-full">
                    <div className="flex w-full justify-between my-3">
                      {/* <p className="payP">Төлбөр төлөх заавар</p> */}
                      <img src={instruction} alt="" className="userImg mx-2" />
                      <img src={sags} alt="" className="flowerImg" />
                    </div>
                    <div className="row px-4">
                      <p className='text-gray-500 text-2xl'>Таны захиалгын дугаар: <span className="ordernumber font-semibold text-2xl" id="random"> {random} </span> </p>
                      <p className="text-gray-500 text-base"> Та гүйлгээний утга дээрээ захиалгын дугаараа бичихийг анхаарна уу!</p>
                    </div>
                    <div className="flex w-full justify-around">
                      <p className="text-lg 9xl:text-4xl text-gray-900">Social Pay</p>
                      <p className="text-lg 9xl:text-4xl text-gray-900">QR код</p>
                    </div>

                    <div className="flex justify-around instructionPayment">

                      <div className="paymentInstruction flex flex-col items-center justify-center w-1/2 px-2">
                        <Link to="#" className="py-2 px-4 socialpay text-white font-semibold text-base"
                          onClick={SocialPay}>
                          Social Pay - ээр төлөх
                        </Link>
                      </div>

                      <div className="flex flex-col justify-center items-center w-1/2 ">
                        <div id="qrcode">
                          <img src={qr_image} alt="" />
                        </div>
                      </div>

                    </div>

                    <div className="warning my-2 9xl:my-10">
                      <p className="font-semibold 9xl:text-4xl">Төлбөр төлөгдсөний дараа таны захиалга идэвхжих ба Төлбөрөө төлөхдөө гүйлгээний утга дээр захиалгын дугаарыг заавал бичнэ үү!</p>
                    </div>

                    <div className="flex w-full">
                      <div className="back w-1/2">
                        <a className="backButton" href="/userinfo">
                          Буцах
                        </a>
                      </div>

                      <div className="removeOrder w-1/2 relative">
                        <Link className="nav-link" to="#">
                          <ToastContainer />
                          <button className="removeOrderButton text-white 9xl:text-5xl" onClick={CancelOrder}>
                            Захиалга цуцлах
                          </button>
                          <span className="tooltiptext">Төлбөр төлөгдсөн тохиолдолд захиалга цуцлах боломжгүйг анхаарна уу!</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

              </form>
            </div>
          </div>

        </div>
        <Social />
      </div>
    </div>
  );
}

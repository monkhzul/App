import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import orderinfo from "../../images/svg/order 2/Header.svg";
import sags from "../../images/svg/order 2/Group 550.svg";
import instruction from '../../images/svg/order 3/Header-2.svg';
import { ToastContainer, toast } from 'react-toastify';
import SlideImage from "../SlideImage";
import Social from "../Social";
import crypto from "crypto-js";
import QRCode from 'qrcode';
import { Modal, Button } from 'react-bootstrap';
import PulseLoader from 'react-spinners/PulseLoader'

export default function Payment() {

  const { incase, pack, size, setQR_text } = useContext(AppContext)

  const [qr_image, setQR_image] = useState("");
  const [invoice, setInvoice] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])

  const arrays = sessionStorage.getItem("array");
  const orderArray = JSON.parse(arrays);
  const sum = sessionStorage.getItem("sum");
  const sumo = sessionStorage.getItem("sumo");

  const arrayto = sessionStorage.getItem("arrayto");
  const orderToPayArray = JSON.parse(arrayto);

  const userarrays = sessionStorage.getItem("userarray");
  const userArray = JSON.parse(userarrays);
  const random = sessionStorage.getItem("random");
  const randompay = sessionStorage.getItem("randompay");

  const navigate = useNavigate();

  if (orderArray === null) {

  }
  else {
    orderArray.forEach(x => {
      pack.push(x.size)
      incase.push(x.incase)
      size.push(x.avdar)
    })
  }

  var packs = [];
  var sizes = [];
  var incases = [];

  if (orderToPayArray === null) {

  }
  else {
    orderToPayArray.forEach(x => {
      packs.push(x.size)
      incases.push(x.incase)
      sizes.push(x.avdar)
    })
  }

  const check = sessionStorage.getItem("ordertopay");

  const key = "bsuTPNVvbM#sAI2#";
  var checksum = random + (check == 0 ? sum : sumo) + "POST" + "http://192.168.244.6:8088/socialpay";
  var checksum1 = checksum.toString();
  const hash = crypto.HmacSHA256(`${checksum1}`, key);
  let sha256 = hash.toString(crypto.enc.Hex);


  var checksuming = random + random;
  var checksum2 = checksuming.toString();
  const hash1 = crypto.HmacSHA256(`${checksum2}`, key);
  let sha2561 = hash1.toString(crypto.enc.Hex);
  sessionStorage.setItem("sha2561", sha2561)

  const reinvoice = sessionStorage.getItem("invoice");

  function SocialPay() {

    if (reinvoice === null || reinvoice === '') {
      if (check == 0) {
        fetch('http://192.168.244.6:8089/api/bonaqua/paymentSocial2', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            random: random,
            sum: check == 0 ? sum : sumo,
            sha256: sha256
          })
        })
          .then((res) => {
            const data = res.json();
            data.then(res => {
              console.log(res.invoice)
              sessionStorage.setItem("invoice", res.invoice)
              setInvoice(res.invoice)

              window.location.href = `https://ecommerce.golomtbank.com/socialpay/mn/${res.invoice}`;

            })
          })
      }
      else {
        toast("Төлбөр төлөх хугацаа дууссан байна")
      }
    }
    else {

      if (random === randompay || randompay == null) {
        window.location.href = `https://ecommerce.golomtbank.com/socialpay/mn/${reinvoice}`;
      }
      else {
        toast("Төлбөр төлөх хугацаа дууссан байна")
      }
    }
  }

  const token = sessionStorage.getItem("token")
  const token2 = sessionStorage.getItem("tokento")

  useEffect(() => {
    fetch('http://192.168.244.6:8089/api/bonaqua/paymentQpay', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: check == 0 ? token : token2,
        random: check == 0 ? random : randompay,
        sum: check == 0 ? sum : sumo
      })
    })
      .then(res => {
        const data = res.json();
        data.then(res => {
          setQR_text(res.qPay_QRcode);

          QRCode.toDataURL(res.qPay_QRcode).then((data) => {
            setQR_image(data);
          })
        })
      })
  }, [])

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  setTimeout(() => {

  }, 5000)

  function Continue() {
    toast("Захиалга цуцлагдлаа!")
    setTimeout(() => {
      sessionStorage.clear();
      navigate('/')
    }, 1000)
  }

  function CancelOrder() {
    setShow(true)
  }

  return (
    <div className="mx-auto flex flex-col justify-between">
      <div className="flex flex-col xl:flex-row 2xl:mt-[4%]">
        <div className="w-full xl:w-1/2 flex items-center relative choosing orderInfo mt-5">
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
                      {check == 1 ? orderToPayArray.map((data, i) =>
                        <p className='totalInfo font-semibold' key={i}>
                          {`${packs[i]} - ${sizes[i]} авдар (${incases[i] * sizes[i]}ш),`}
                        </p>)
                        : orderArray.map((data, i) =>
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
                    {check == 0 ?
                      <p className='total pt-3 text-red-700 text-3xl font-semibold'>{sum != null ? sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : sum}₮</p>
                      : <p className='total pt-3 text-red-700 text-3xl font-semibold'>{sumo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}₮</p>
                    }
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
                      <p className='text-gray-500 text-2xl'>Таны захиалгын дугаар: <span className="ordernumber font-semibold text-2xl" id="random"> {check == 1 ? randompay : random} </span> </p>
                      <p className="text-gray-500 text-base"> Та гүйлгээний утга дээрээ захиалгын дугаараа бичихийг анхаарна уу!</p>
                    </div>
                    <div className="flex w-full justify-around">
                      <p className="text-lg 9xl:text-4xl text-gray-900">Social Pay</p>
                      <p className="text-lg 9xl:text-4xl text-gray-900">QR код</p>
                    </div>

                    <div className="flex justify-around instructionPayment">

                      <div className="paymentInstruction flex flex-col items-center justify-center w-1/2 px-2">
                        <div className="py-2 px-4 socialpay text-white font-semibold text-base cursor-pointer"
                          onClick={SocialPay}>
                          Social Pay - ээр төлөх
                        </div>
                      </div>

                      <div className="flex flex-col justify-center items-center w-1/2 ">
                        {loading ?
                          <PulseLoader
                            size={10}
                            color={"#3dbee3"}
                            loading={loading}
                            className={"w-full flex justify-center"}
                          /> :
                          <div id="qrcode">
                            <img src={qr_image} alt="" />
                            <div className="flex justify-center">
                              <Link className="bg-[#3dbee3] text-white px-4 py-1 rounded-md hover:font-semibold" to="/qpay">Төлбөр шалгах</Link>
                            </div>
                          </div>
                        }
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
                        </Link>
                      </div>
                    </div>
                    <span className="tooltiptext font-semibold flex justify-end text-xs">Төлбөр төлөгдсөн тохиолдолд захиалга цуцлах боломжгүйг анхаарна уу!</span>
                  </div>
                </div>

              </form>
            </div>
          </div>

        </div>
        <Social />
      </div>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="d-flex w-100 flex justify-center items-center" >
            <h2 className="my-2">Захиалга</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="was-validated d-flex flex-column" id="">
            <div className="row p-4">
              <p className='text-gray-900 font-semibold text-lg'>Та захиалгаа цуцлахдаа итгэлтэй байна уу?</p>
            </div>
            <a type="submit" className="w-50 mx-auto continueButton flex justify-center text-white rounded py-1" onClick={Continue} >
              Тийм
            </a>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

import React from 'react';
import logo from '../images/svg/home/logo.svg';
import sagsicon from '../images/icons/busket.svg';
import history from '../images/svg/home/Group 560.svg';
import flower from '../images/svg/order 1/tsetseg jijig.svg';
import { Modal, Button } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../App';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const [phoneNumber, setPhone] = useState("");
  const [orderHistory, setHistory] = useState([]);
  const arrays = sessionStorage.getItem("array");
  // const orderArray = JSON.parse(arrays);

  var sum = sessionStorage.getItem("sum");
  var item = sessionStorage.getItem("item");

  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const userarrays = sessionStorage.getItem("userarray");
  const userArray = JSON.parse(userarrays);

  useEffect(() => {
    var getData = async () => {
      try {
        var data = await fetch('http://localhost:8008/api/bonaqua/orderHistory');
        var resData = await data.json();
        setHistory(resData)
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [])

  var tuuh = [];
  var dugaar = [];
  var login = [phoneNumber];

  orderHistory.forEach(x => {
    tuuh.push(x.orderno)
    dugaar.push(x.phonenumber)
  })

  const Continue = () => {
    if (dugaar.includes(phoneNumber)) {
        sessionStorage.setItem("dugaar", phoneNumber);
        // window.location.pathname = '/orderHistory';
        navigate('/orderHistory')
        sessionStorage.setItem("login", login)
    }
    else {
      toast(`${phoneNumber} дугаартай захиалгын түүх олдсонгүй!`);
    }
    setShow(false)
  };
  var log = sessionStorage.getItem("login");

  const handleShow = () => setShow(true);

  return (
    <div className=''>
      <div className='header flex'>
        <div className='logo w-1/2 flex items-end ml-6'>
          <a className='nav-link' href='/' onClick={() => sessionStorage.clear()}>
            <img src={logo} alt="" className='' />
          </a>
        </div>
        <div className='w-1/2 flex justify-end'>
          <div className='ProductAndOrder flex justify-center'>

            <div className='busket flex relative'>
              <div className='popup'><p className='absolute text-sm'>{item}</p></div>
              <img src={sagsicon} alt="" data-items-count="6" />
              <div className='dun'>
                <Link className="nav-link" to='/order' id='submit'>
                  <p className='busket' id='resultH'>
                    {sum == null ? '0₮' : `${sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}₮`}
                  </p>
                  <p className='yourBusket'>Таны сагсанд</p>
                </Link>
              </div>

            </div>
            <div className='line my-auto'></div>
            <div className='busket flex relative'>
              <img src={history} alt="" className='' />
              <div className='dun cursor-pointer'>
                <p className='busket'>
                  { log == null ? `**** ****` : log }
                </p>
                <ToastContainer/>
                {
                  log != null ? <Link className="nav-link" to="/orderHistory">
                    <p className='yourBusket'>Захиалгын түүх</p>
                  </Link>
                    : <div className="nav-link" onClick={handleShow}>
                      <p className='yourBusket'>Захиалгын түүх</p>
                    </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="d-flex w-100 flex justify-center items-center" >
            <img src={flower} alt="" className='mx-3' />
            <h2 className="my-2">Захиалгын түүх</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="was-validated d-flex flex-column" id="">
            <div className="row p-4">
              <p className='text-gray-400'>Захиалга өгсөн утасны дугаараа оруулна уу!</p>
              <input className='py-2 px-3 w-100 input my-1' type="text" name="" id="phone" placeholder='Утасны дугаар' onChange={(e) => setPhone(e.target.value)} />
            </div>
            <a type="submit" className="w-50 mx-auto continueButton flex justify-center text-white rounded py-1" onClick={Continue} >
              Үргэлжлүүлэх
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
  )
}

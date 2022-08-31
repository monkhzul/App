import React, { createContext, useState, useEffect, useRef } from 'react';
import './css/style.css';
import './css/mediaQuery.css';
import Header from './components/Header';
import Order from './components/Order/Order';
import Footer from './components/Footer';
// import { BrowserRouter as Routes, Switch, Route, Router } from 'react-router-dom';
import { useRoutes, Router, Routes, Route } from 'react-router-dom';
import OrderInfo from './components/Order/OrderInfo';
import Payment from './components/Order/Payment';
import OrderHistory from './components/Order/OrderHistory';
import OrderDetails from './components/orderHistory/OrderDetails';
import Content from './components/Content';
import Instruction from './components/ProductInformation/Instruction';
import Nutrition from './components/ProductInformation/Nutrition';
import OrderConfirm from './components/orderHistory/OrderConfirm';
import OrderDelivered from './components/orderHistory/OrderDelivered';

export const AppContext = createContext();

function App() {
  const [value, setValues] = useState("");
  const [circle, setCircle] = useState("");
  const [random, setRandom] = useState("");
  const [total, setTotal] = useState(0);
  const [item, setItem] = useState(0);
  const [orderid, setOrderid] = useState("");
  const [array, setArray] = useState([]);
  const [userarray, setUserArray] = useState([]);
  const [render, setRender] = useState(false);
  const [pack, setPack] = useState([]);
  const [size, setSize] = useState([]);
  const [incase, setIncase] = useState([]);
  const [access_token, setAccess_Token] = useState("");
  const [invoice_id, setInvoice_id] = useState("");
  const [qr_text, setQR_text] = useState("");
  const [qr_image, setQR_image] = useState("")


  let element = useRoutes([
    {
     path: '/', element: <Content/>,
     children: [{ path: "instruction", element: <Instruction /> }, 
                { path: "nutrition", element: <Nutrition/>}]
    },
    {path: 'order', element: <Order/>},
    {path: 'userinfo', element: <OrderInfo/>},
    {path: 'payment', element: <Payment/>},
    {path: 'orderDetails', element: <OrderDetails/>},
    {
      path: 'orderHistory', element: <OrderHistory/>,
      children: [
                 {path: 'orderConfirm', element: <OrderConfirm/>},
                 {path: 'orderWaiting', element: <OrderDelivered/>}]
    },
  ])


  return (
    <AppContext.Provider
      value={{
        value, setValues,
        total, setTotal,
        array, setArray,
        item, setItem,
        userarray, setUserArray,
        circle, setCircle,
        orderid, setOrderid,
        random, setRandom,
        pack, setPack,
        size, setSize,
        incase, setIncase,
        access_token, setAccess_Token,
        invoice_id, setInvoice_id,
        qr_text, setQR_text,
        qr_image, setQR_image
      }}
      render={{ render, setRender }}>
      <div className="contain">
        <Header />
        <div className='routes'>
          {/* <Routes>
              <Route exact path="/" element={<Content/>} />
              <Route path="order" element={<Order/>} />
              <Route path="userinfo" component={<OrderInfo/>} />
              <Route path="payment" component={<Payment/>} />
              <Route path="orderHistory" component={<OrderHistory/>} />
          </Routes> */}
        {element}
        </div>
        <Footer />
      </div>

    </AppContext.Provider>
  )
}

export default App

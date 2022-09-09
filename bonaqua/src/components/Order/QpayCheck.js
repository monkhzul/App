import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function QpayCheck() {
    const [QPay_status, setQPay_status] = useState("");

    const random = sessionStorage.getItem("random");
    const check = sessionStorage.getItem("ordertopay");
    const token = sessionStorage.getItem("token")
    const token2 = sessionStorage.getItem("tokento")
    const randompay = sessionStorage.getItem("randompay");

    const CheckQpay = async () => {
        await fetch(`http://localhost:8008/api/bonaqua/paymentQpayCheck`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: check == 0 ? token : token2,
            random: check == 0 ? random : randompay
          })
        })
          .then(res => {
            const data = res.json()
            data.then(res => {
              const paymentStatus = res.payment_info.payment_status;
              setQPay_status(paymentStatus)
            })
          })
      }

    useEffect(() => {
        CheckQpay()

        console.log(QPay_status)

        if ( QPay_status === 'PAID' ) {
            fetch('http://localhost:8008/api/bonaqua/updateOrder', {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
            },
                body: JSON.stringify({
                    orderno: random
            })
            })
            .then((res) => {
                const data = res.json();
                console.log(data)
            })
        } 

    }, [])

  return (
    <div className='h-full flex justify-center items-center flex-col'>
        <h4>Төлбөрийн мэдээлэл: 
            <span className='text-[#3dbee3]'> {QPay_status === 'PAID' ? 'Төлөгдсөн' : 'Төлөлт хийгдээгүй'} </span> 
        </h4>

        <Link to='/payment' className='bg-[#3dbee3] text-white px-4 py-1 rounded-md mt-[10%]'>Буцах</Link>
    </div>
  )
}

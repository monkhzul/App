import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function SocialPayInquiry() {
    const [payment_status, setPayment_status] = useState("");

    const random = sessionStorage.getItem("random");
    const randompay = sessionStorage.getItem("randompay");
    const sha2561 = sessionStorage.getItem("sha2561");
    const check = sessionStorage.getItem("ordertopay");

    const Inquiry = () => {
        fetch('http://192.168.244.6:8089/api/bonaqua/paymentQpayInquiry', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sha2561: sha2561,
            random: random
          })
        })
          .then(res => {
            const data = res.json()
            data.then(data => {
              setPayment_status(data.errorDesc)
            })
          });
    };

    useEffect(() => {
        Inquiry()

        console.log(payment_status)

        if ( payment_status === 'Амжилттай' ) {
          fetch('http://192.168.244.6:8089/api/bonaqua/updateOrder', {
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
            <span className='text-[#3dbee3]'> { payment_status } </span> 
        </h4>

    <Link to='/payment' className='bg-[#3dbee3] text-white px-4 py-1 rounded-md mt-[10%]'>Буцах</Link>
    </div>
  )
}

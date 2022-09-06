import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import OTPInput, { ResendOTP } from "otp-input-react"
import { toast } from 'react-toastify';

export default function Confirmation() {

    const [OTP, setOTP] = useState("");
    const [random, setRandom] = useState("");
    const dugaarc = sessionStorage.getItem("dugaar");
    const navigate = useNavigate();

    const getCode = () => {
        fetch('http://192.168.244.6:8089/api/bonaqua/confirmPhone', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                number: dugaarc
            })
        })
            .then((res) => {
                const data = res.json();
                data.then(res => setRandom(res.random))
            })
    }

    const Confirmation = () => {

        console.log(OTP, random);

        if (OTP != '') {     
            if (OTP == random) {
                navigate('/orderHistory')
                sessionStorage.setItem("login", dugaarc)
            }
            else {
                toast("Амжилтгүй! Баталгаажуулах код буруу байна.")
            }
        } else {
            toast("Баталгаажуулах кодоо оруулна уу!")
        }
    }

    return (
        <div className='h-full'>
            <div className='h-full flex flex-col justify-center my-auto'>
                <h6 className='mx-auto'>Баталгаажуулах кодоор нэвтэрнэ үү!</h6>
                <h5 className='mx-auto mb-5 cursor-pointer bg-slate-400 p-2 rounded-md text-gray-50 hover:bg-[#3dbee3]' onClick={getCode}>Баталгаажуулах код авах</h5>
                {/* <h5 className='mx-auto mb-5 cursor-pointer'>Баталгаажуулах код</h5> */}
                <p className='text-gray-500 mx-auto text-sm'>Таны утас руу илгээсэн баталгаажуулах кодыг оруулна уу!</p>
                <OTPInput
                    className="flex justify-center"
                    value={OTP}
                    onChange={setOTP}
                    autoFocus
                    OTPLength={6}
                    otpType="number"
                    disabled={false}
                    inputStyles={{
                        width: "3rem",
                        height: "3rem",
                        margin: "auto 1rem",
                        fontSize: "2rem",
                        borderRadius: 4,
                        border: "1px solid #3dbee3"
                    }}
                />
                <div className='mx-auto font-semibold mt-5 hover:bg-[#3dbee3] cursor-pointer bg-slate-400 p-2 rounded-md text-gray-50' onClick={Confirmation}>Нэвтрэх</div>
                {/* <ResendOTP className="text-gray-600" handelResendClick={() => console.log("Resend clicked")} /> */}
            </div>
        </div>
    )
}

const key = "bsuTPNVvbM#sAI2#";
var checksum = random + sum + "POST" + "http://localhost:3000/orderHistory";
var checksum1 = checksum.toString();
const hash = crypto.HmacSHA256(`${checksum1}`, key);
let sha256 = hash.toString(crypto.enc.Hex);


var checksum1 = random + random;
var checksum2 = checksum1.toString();
const hash1 = crypto.HmacSHA256(`${checksum2}`, key);
let sha2561 = hash1.toString(crypto.enc.Hex);

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
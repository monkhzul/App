const db = require("../models");
const { QueryTypes } = require('sequelize');
const axios = require('axios');
const bcrypt = require('bcrypt');

exports.getPricelist = async(req, res) => {
    const customer = 666005079;
    const bonaqua = await db.sequelize.query(`exec Anungoo_db.dbo.SP_BtoC_PRICELIST 'getpricelist', ${customer}, ''`, { type: QueryTypes.SELECT });

    try {
        if(bonaqua != 0) {
            res.status(200).send(bonaqua);
        } else {
            res.status(404).json({ message: "Couldn't find bonaqua." });
            return;
        }
    } catch(err) {
        res.status(500).json({ message: err.message });
        return;
    };
};

exports.getBonaqua = async(req, res) => {

    const bonaqua = await db.sequelize.query(`select t.*, p.InCase, pr.BPrice 
    from SMTTerms.dbo.vGoods_Elements t
    left join SMTTerms.dbo.t_Products p
    on t.Article=p.Article
    left join SMTTerms.dbo.t_Pricelists pr
    on pr.Article=p.Article
    and pr.PLTypeId=1
    where Brand like '%bonaqua%' and FlavorName like '%still%'`, { type: QueryTypes.SELECT });

    try {
        if(bonaqua != 0) {
            res.status(200).send(bonaqua);
        } else {
            res.status(404).json({ message: "Couldn't find bonaqua." });
            return;
        }
    } catch(err) {
        res.status(500).json({ message: err.message });
        return;
    };
};

exports.addOrder = async(req, res) => {

    const date = req.body.date;
    const description = req.body.description;
    const phone = req.body.phone;
    // const productid = req.body.productid;
    // const quantity = req.body.quantity;
    // const price = req.body.price;
    const pricedisc = req.body.pricedisc;
    const array = req.body.array;

    const order = await db.sequelize.query(`exec Anungoo_db.dbo.SP_BtoC_CREATE_ORDER 'createorder','', '${date}', '${description}', '', '${phone}','',''`, { type: QueryTypes.SELECT });

    try {
        if(order != 0) {
            res.status(200).send(order);
            console.log(order)
            for(var i in array) {
                await db.sequelize.query(`exec Anungoo_db.dbo.SP_BtoC_CREATE_ORDER_DETAIL 'createdtl', ${order[0].OrderID}, ${array[i].article}, ${array[i].tincase}, ${array[i].sprice}, ${pricedisc},''`, { type: QueryTypes.SELECT })
            }
        } else {
            res.status(404).json({ message: "No data to insert." });
            return;
        }
    } catch(err) {
        res.status(500).json({ message: err.message });
        return;
    }
}

exports.addOrderDetail = async(req, res) => {

    const orderid = req.body.orderid;

    const order = await db.sequelize.query(`exec Anungoo_db.dbo.SP_BtoC_CREATE_ORDER_DETAIL 'createdtl', ${orderid}, ${productid}, ${quantity}, ${price}, ${pricedisc},''`, { type: QueryTypes.SELECT });

    try {
        if(order != 0) {
            res.status(200).send(order);
        } else {
            res.status(404).json({ message: "No data to insert." });
            return;
        }
    } catch(err) {
        res.status(500).json({ message: err.message });
        return;
    }
}

exports.getOrderDetail = async(req, res) => {

    const orderno = req.body.orderno;

    const order = await db.sequelize.query(`SELECT [DocumentId]
    FROM [SMTTerms].[dbo].[t_Orders] WHERE DocumentNo = '${orderno}'`, { type: QueryTypes.SELECT });

    try {
        if(order != 0) {
            console.log(order[0].DocumentId)
            const doc = await db.sequelize.query(`SELECT [DocumentId] ,[Article] ,[Quantity] ,[Amount] ,[Price] ,[PriceWODiscount]
            FROM [SMTTerms].[dbo].[t_OrderDetails] where DocumentId = '${order[0].DocumentId}'`, { type: QueryTypes.SELECT })
               
                var arr = [];
                for(var i in doc) {
                    arr.push({
                        article: doc[i].Article
                    })
                }

                var array = [];
                for(var i in arr) {
                const article = await db.sequelize.query(`select t.Article, t.Capacity, p.InCase, pr.BPrice 
                            from SMTTerms.dbo.vGoods_Elements t
                            left join SMTTerms.dbo.t_Products p
                            on t.Article=p.Article
                            left join SMTTerms.dbo.t_Pricelists pr
                            on pr.Article=p.Article
                            and pr.PLTypeId=1
                            where Brand like '%bonaqua%' and t.Article = ${arr[i].article}`)
                            
                            array.push(article)
                        }
                res.status(200).send(array);
        } else {
            res.status(404).json({ message: "No data to insert." });
            return;
        }
    } catch(err) {
        res.status(500).json({ message: err.message });
        return;
    }
}

exports.getOrderDetails = async(req, res) => {

    const orderno = req.body.orderno;

    const order = await db.sequelize.query(`select DocumentId from SMTTerms.dbo.t_Orders where DocumentNo = '${orderno}'`, { type: QueryTypes.SELECT });

    try {
        if(order != 0) {
            const doc = await db.sequelize.query(`SELECT [DocumentId], t.[Quantity], t.[Amount], t.[Price] ,[PriceWODiscount], v.Capacity, p.InCase
            FROM [SMTTerms].[dbo].[t_OrderDetails] t 
			left join SMTTerms.dbo.vGoods_Elements v on t.Article=v.Article
			left join SMTTerms.dbo.t_Products p on t.Article=p.Article
			where DocumentId = '${order[0].DocumentId}'`, { type: QueryTypes.SELECT })
               
                res.status(200).send(doc);
        } else {
            res.status(404).json({ message: "No data to insert." });
            return;
        }
    } catch(err) {
        res.status(500).json({ message: err.message });
        return;
    }
}

exports.getQuantity = async(req, res) => {

    const docid = req.body.docid;

    const order = await db.sequelize.query(`SELECT [DocumentId] ,[Article] ,[Quantity] ,[Amount] ,[Price] ,[PriceWODiscount]
    FROM [SMTTerms].[dbo].[t_OrderDetails] where DocumentId = '${docid}'`, { type: QueryTypes.SELECT });

    try {
        if(order != 0) {
            res.status(200).send(order);
        } else {
            res.status(404).json({ message: "No data to insert." });
            return;
        }
    } catch(err) {
        res.status(500).json({ message: err.message });
        return;
    }
}


exports.updateOrder = async(req, res) => {

    const orderid = req.body.orderid;

    const order = await db.sequelize.query(`exec Anungoo_db.dbo.SP_BtoC_CREATE_ORDER 'updateorder','', '', '', '', '',${orderid},''`, { type: QueryTypes.SELECT });

    try {
        if(order != 0) {
            res.status(200).send(order);
        } else {
            res.status(404).json({ message: "No data to insert." });
            return;
        }
    } catch(err) {
        res.status(500).json({ message: err.message });
        return;
    }
}

exports.paymentOrder = async(req, res) => {

    const orderid = req.body.orderid;

    const order = await db.sequelize.query(`exec Anungoo_db.dbo.SP_BtoC_CREATE_ORDER 'updateorder','', '', '', '', '',${orderid},''`, { type: QueryTypes.SELECT });

    try {
        if(order != 0) {
            res.status(200).send(order);
        } else {
            res.status(404).json({ message: "No data to insert." });
            return;
        }
    } catch(err) {
        res.status(500).json({ message: err.message });
        return;
    }
}

exports.confirmPhone = async(req, res) => {

    const number = req.body.number;
    
    const random = Math.floor(100000 + Math.random() * 900000);

    const response = axios.post("http://122.201.28.39:8080/api2/data/smsregister", {
        number: number,
        text: `[Bonaqua zahialga] Sain baina uu. Tanid neg udaagiin nevtrekh kod ilgeelee. Tanii nevtrekh kod: ${random}`
    })
  
    try {
        if(response != 0) {
            res.status(200).send({random: random});
        } else {
            res.status(404).json({ message: "Error!" });
            return;
        }
    } catch(err) {
        res.status(500).json({ message: err.message });
        return;
    };
}

exports.orderHistory = async(req, res) => {

    const bonaqua = await db.sequelize.query(`exec Anungoo_db.dbo.SP_BtoC_CREATE_ORDER 'getorder','', '', '', '', '','',''`, { type: QueryTypes.SELECT });

    try {
        if(bonaqua != 0) {
            res.status(200).send(bonaqua);
        } else {
            res.status(404).json({ message: "Couldn't find bonaqua." });
            return;
        }
    } catch(err) {
        res.status(500).json({ message: err.message });
        return;
    };
};

exports.t_Orders_Status = async(req, res) => {
    const orderno = req.body.orderno

    const bonaqua = await db.sequelize.query(`SELECT [DocumentId],[DocumentNo],[PaymentTermId]
    ,[DDate],[State],[Description],[DateCreate]
    FROM [SMTTerms].[dbo].[t_Orders] where DocumentNo = '${orderno}'`, { type: QueryTypes.SELECT });

    try {
        if(bonaqua != 0) {
            res.status(200).send(bonaqua);
        } else {
            res.status(404).json({ message: "Couldn't find bonaqua." });
            return;
        }
    } catch(err) {
        res.status(500).json({ message: err.message });
        return;
    };
};

exports.orderStatus = async(req, res) => {

    const bonaqua = await db.sequelize.query(`SELECT b.orderno, b.phonenumber, t.DateCreate, t.State, isnull(sum(d.Amount),0) TotalAmount
	FROM Anungoo_db.dbo.t_BtoCphoneno b
		left join SMTTerms.dbo.t_Orders t
		on b.orderno=t.DocumentNo collate SQL_Latin1_General_CP1251_CI_AS
		left join SMTTerms.dbo.t_OrderDetails d
		on t.DocumentId=d.DocumentId
		group by b.orderno, b.phonenumber , t.DateCreate, t.State`, { type: QueryTypes.SELECT });

    try {
        if(bonaqua != 0) {
            res.status(200).send(bonaqua);
        } else {
            res.status(404).json({ message: "Couldn't find bonaqua." });
            return;
        }
    } catch(err) {
        res.status(500).json({ message: err.message });
        return;
    };
};

async function TokenGet() {

    const result = await fetch('https://122.201.28.34:8080/api/MyCokeGetTokenQPay', {
        method: "POST",
    }).then(res => res.json());

    const today = new Date();
    const dateOffset = today.setDate(today.getDate() - 1);

    // if(dateOffset > Date(result.updateddate + 1)) {
    //     TokenUpdate(result.refresh_token, result.updateddate);
    // } else {
    //      return;
    // }
    setTimeout(() => {

    })
};

async function TokenUpdate(token, date) {

    await fetch('https://122.201.28.34:8080/api/MyCokeUpdateTokenQPay', {
        method: "POST",
        body: {
            "refresh_token": token,
            "updateddate": date
        },
        headers: {
            "Content-Type": "application/json"
        }
    })
};


exports.PaymentSocial = async(req, res) => {

    const random = req.body.random;
    const sum = req.body.sum;
    const sha256 = req.body.sha256;

    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJNRVJDSEFOVF9NQ1NfQ09DQV9DT0xBIiwiaWF0IjoxNjMyNzkxOTM4fQ.Tji9cxZsRZPcNJ1xtxx7O3lq2TDn9VZhbx9n6YZ7yOs";

    await axios.post('https://ecommerce.golomtbank.com/api/invoice', { 
        amount: sum,
        callback: "http://localhost:3000/orderHistory",
        checksum: sha256,
        genToken: "Y",
        returnType: "POST",
        transactionId: random
     }, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
        }
      })
      .then( ( response ) => {
        res.status(200).send(response.data);
      } )
}

exports.PaymentQpay = async(req, res) => {

    const token = req.body.token;
    const random = req.body.random;
    const sum = req.body.sum;

        axios.post('https://api.qpay.mn/v1/bill/create', { 
            template_id: "TEST_INVOICE",
            merchant_id: "TEST_MERCHANT",
            branch_id: "1",
            pos_id: "1",
            receiver: {
              id: "CUST_001",
              register_no: "ddf",
              name: "Central",
              email: "info@info.mn",
              phone_number: "99888899",
              note: "zulaa"
            },
            transactions: [{
              description: "qpay",
              amount: sum,
              accounts: [{
                bank_code: "050000",
                name: "zulaa",
                number: "5084107767",
                currency: "MNT"
              }]
            }],
            bill_no: random,
            date: new Date(),
            description: "bonaqua qpay",
            amount: sum,
            btuk_code: "",
            vat_flag: "0"
          }, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${token}`
            }
          })
          .then( ( response ) => {
            res.status(200).send(response.data);
          } )
}
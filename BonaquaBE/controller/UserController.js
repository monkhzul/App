const db = require("../models");
const { QueryTypes } = require('sequelize');

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

    const response = await fetch('http://122.201.28.39:8080/api2/data/smsregister', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'number' : number,
            'text': `[Bonaqua zahialgiin web] Sain baina uu. Tanid neg udaagiin nevtrekh kod ilgeelee. Tanii nevtrekh kod: ${random} `
        })
      }).catch(e => console.log(e));

    try {
        if(response != 0) {
            res.status(200).send(response);
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

exports.Payment = async(req, res) => {
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
          res.status(data)
        })
}
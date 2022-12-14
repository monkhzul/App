
module.exports = app => {
    const bonaqua = require("../controller/UserController");
    var router = require("express").Router();

    router.get("/", bonaqua.getBonaqua);
    router.get("/pricelist", bonaqua.getPricelist);
    router.post("/addOrder", bonaqua.addOrder);
    router.post("/addOrderDetail", bonaqua.addOrderDetail);
    router.post("/updateOrder", bonaqua.updateOrder);
    router.get("/orderHistory", bonaqua.orderHistory);
    //Payment
    router.post("/paymentSocial", bonaqua.PaymentSocial);
    router.post("/paymentSocial2", bonaqua.PaymentSocial2);
    router.post("/paymentQpay", bonaqua.PaymentQpay);
    router.post("/paymentQpayCheck", bonaqua.PaymentQpayCheck);
    router.post("/paymentQpayInquiry", bonaqua.PaymentQpayInquiry);
    
    router.post("/getDetail", bonaqua.getOrderDetail);
    router.post("/getOrderDetail", bonaqua.getOrderDetails);
    router.get("/getorderConfirm", bonaqua.orderStatus);
    router.post("/getStatus", bonaqua.t_Orders_Status);
    router.post("/getQuantity", bonaqua.getQuantity);
    router.post("/confirmPhone", bonaqua.confirmPhone);

    app.use('/api/bonaqua', router);
};

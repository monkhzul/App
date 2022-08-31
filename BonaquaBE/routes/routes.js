
module.exports = app => {
    const bonaqua = require("../controller/UserController");
    var router = require("express").Router();

    router.get("/", bonaqua.getBonaqua);
    router.get("/pricelist", bonaqua.getPricelist);
    router.post("/addOrder", bonaqua.addOrder);
    router.post("/addOrderDetail", bonaqua.addOrderDetail);
    router.post("/updateOrder", bonaqua.updateOrder);
    router.get("/orderHistory", bonaqua.orderHistory);
    router.get("/payment", bonaqua.Payment);
    router.post("/getDetail", bonaqua.getOrderDetail);
    router.post("/getOrderDetail", bonaqua.getOrderDetails);
    router.get("/getorderConfirm", bonaqua.orderStatus);
    router.post("/getStatus", bonaqua.t_Orders_Status);
    router.post("/getQuantity", bonaqua.getQuantity);
    router.post("/confirmPhone", bonaqua.confirmPhone);

    app.use('/api/bonaqua', router);
};

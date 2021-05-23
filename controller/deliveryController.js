var express = require('express');
var router = express.Router();

router.use(express.json());
// var Item = require('../schema/items');
var Order = require('../schema/orders');
// var DeliveryPerson = require('../schema/deliveryperson');

const getorders = (req,res) =>
{
    var delpersonid = req.query.delpersonid
    Order.find({delpersonId:delpersonid}, function (err, data) {
        if (err) return handleError(err);
        //fetched !
        res.status(200).send(data);   
      }); 
}
const updateorderstage = (req,res) =>
{
    var assign = { $set: {orderstage: req.body.orderstage } };
    Order.updateOne({ _id: req.body.orderid }, assign, function (err, data) {
        if (err) return handleError(err);
        // saved!
        res.status(200).send(data);   
      });
}

module.exports =
                {
                    getorders,
                    updateorderstage,
                }
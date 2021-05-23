var express = require('express');
var router = express.Router();

router.use(express.json());
const Item = require('../schema/items');
const Order = require('../schema/orders');
const DeliveryPerson = require('../schema/deliveryperson');
const getitems = (req, res) => 
{
    Item.find({}, function (err, data) {
        if (err) return res.status(500).send('Error on the server.');
        if (!data) return res.status(404).send('No Items found.');
        res.status(200).send(data);
      });
};
const additems = (req,res) =>
{
    itemdata = req.body
    Item.create(itemdata, function (err, data) {
        if (err) return handleError(err);
        // saved!
        res.status(200).send(data);   
      }); 
};
const deleteitems = (req,res) =>
{
    var itemid = req.query.id;
    console.log('itemid = ' ,itemid)
    Item.deleteOne({_id:itemid}, function (err, data) {
        if (err) return handleError(err);
        // deleted!
        res.status(200).send(data);   
      }); 
};
const getallorders = (req,res) =>
{
    Order.find({}, function (err, data) {
        if (err) return handleError(err);
        //fetched !
        res.status(200).send(data);   
      }); 
}
const filterorders = (req,res) =>
{
    var orderstatus = req.query.orderstatus;
    Order.find({orderstage:orderstatus}, function (err, data) {
        if (err) return handleError(err);
        //fetched !
        res.status(200).send(data);   
      }); 
}
const addDeliveryperson = (req,res) =>
{
    dpersonata = req.body;
    DeliveryPerson.create(dpersonata, function (err, data) {
        if (err) return handleError(err);
        // saved!
        res.status(200).send(data);   
      }); 
}
const getdeliveryperson = (req,res) =>
{
    DeliveryPerson.find({}, function (err, data) {
        if (err) return handleError(err);
        //fetched !
        res.status(200).send(data);   
      });
}
const assigndeliveryperson = (req,res) =>
{
    data = req.body
    var assign = { $set: {delpersonId: req.body.delpersonId } };
    Order.updateOne({ _id: req.body.orderid }, assign, function (err, data) {
        if (err) return handleError(err);
        // saved!
        res.status(200).send(data);   
      }); 
}
module.exports =    {
                        getitems,
                        additems,
                        deleteitems,
                        getallorders,
                        filterorders,
                        addDeliveryperson,
                        getdeliveryperson,
                        assigndeliveryperson
                    };
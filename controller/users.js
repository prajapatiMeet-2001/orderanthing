var express = require('express');
var router = express.Router();

router.use(express.json());
var User = require('../schema/users');
var Order = require('../schema/orders');
var Item = require('../schema/items');
var DeliveryPerson = require('../schema/deliveryperson');


 var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
 var bcrypt = require('bcryptjs');
 var config = require('../config'); // get config file


const signin = (req, res) => 
{
    User.findOne({ phone: req.body.phone }, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');
        
        // check if the password is valid
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    
        // if user is found and password is valid
        // create a token
        var token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
    
        // return the information including token as JSON
        res.status(200).send({ auth: true, token: token, user:user});
      });
};
const signout = (req, res) =>
{
    res.status(200).send({ auth: false, token: null });
}
const signup =  (req, res) => 
{
    console.log('HELLO')
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
        name : req.body.name,
        phone : req.body.phone,
        password : hashedPassword
    }, 
    function (err, user) {
        if (err) return res.status(500).send("There was a problem registering the user`.");

        // if user is registered without errors
        // create a token
        var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).send({ auth: true, token: token });
    });
}
const checkauth = (req, res) => 
{
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      else
      {
        User.findById(decoded.id, (err, user) =>{
            if (err) return res.status(500).send("There was a problem finding the user.");
            if (!user) return res.status(404).send("No user found.");
            Object.assign(decoded, user._doc)
            res.status(200).send(decoded);  
          });    
      } 
    }); 
}
const placeorder = (req,res) => 
{
    var orderdata = req.body
    Order.create(orderdata, 
    function (err, data) {
        if (err) return res.status(500).send("There was a problem placing order`.");

        res.status(200).send(data);
    });
}
const getorder = (req,res) => 
{
    var userid = req.query.userid
    Order.find({userid:userid}, 
    function (err, data) {
        if (err) return res.status(500).send("Can't fetch user orders`.");

        res.status(200).send(data);
    });
}
const getitemforloc = (req,res) => 
{
    var itemid = req.query.itemid
    Item.findById(itemid, 
    function (err, data) {
        if (err) return res.status(500).send("Can't fetch individual item.");

        res.status(200).send(data);
    });
}
const getdeliveryPerson = (req,res) => 
{
    var delpersonid = req.query.delpersonid
    DeliveryPerson.findById(delpersonid, 
    function (err, data) {
        if (err) return res.status(500).send("Can't fetch delivery boy details.");
        res.status(200).send(data);
    });
}

module.exports= {
                    signin,
                    signout,
                    signup,
                    checkauth,
                    placeorder,
                    getorder,
                    getitemforloc,
                    getdeliveryPerson
                };
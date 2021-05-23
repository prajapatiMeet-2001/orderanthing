const express = require('express'); 
const router  = express.Router(); 
const deliveryController = require('../controller/deliveryController');
router.get('/', (req, res) => {
    res.send('Hello Delivery Person')
}); 

//Get Order assigned to individual Delivery Person
router.get('/getorders/',deliveryController.getorders)
//Update Order Stage by Delivery Person
router.put('/updateorderstage', deliveryController.updateorderstage)

module.exports = router;
const express = require('express'); 
const router  = express.Router(); 
const adminController = require('../controller/adminController');
router.get('/', (req, res) => {
    res.send('Hello Admin')
}); 
//GET ITEMS
router.get('/items',adminController.getitems)
//ADD ITEMS
router.post('/items',adminController.additems)
//DELETE ITEMS
router.delete('/items/',adminController.deleteitems)
//GET All Orders
router.get('/vieworders',adminController.getallorders)
//GET All Orders with status Filter
router.get('/filterorders/',adminController.filterorders)
//ADD Delivery Person
router.post('/deliveryperson',adminController.addDeliveryperson)
//Get Delivery Person
router.get('/getdeliveryperson',adminController.getdeliveryperson)
//Assign Delivery Person
router.put('/assigndeliveryperson',adminController.assigndeliveryperson)
module.exports = router; // export to use in server.js
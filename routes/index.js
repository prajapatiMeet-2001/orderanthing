const express = require('express'); 
const router  = express.Router(); 
const userController = require('../controller/users');

router.get('/', (req, res) => {
    res.send('Hello World')
}); 

// CREATES A NEW USER
router.post('/signup', userController.signup);
// GETS LOGGED IN USER FROM THE DATABASE & CHECK AUTHENTICATION
router.get('/checkauth', userController.checkauth);
//LOGIN USER
router.post('/signin', userController.signin); 
//Logout user
router.get('/signout', userController.signout);
//Place Order
router.post('/placeorder', userController.placeorder)
//Get User Order
router.get('/getorder/',userController.getorder)
//Get Individual Item helps in placing order where random location is to be generated
router.get('/getitemforloc/',userController.getitemforloc)
//Get Deliveryperson details by their ID
router.get('/getdeliveryPerson/',userController.getdeliveryPerson)

module.exports = router; // export to use in server.js
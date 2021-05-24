var mongoose = require('mongoose');  
var DeliverPersonSchema = new mongoose.Schema({  
  name: {type:String,required:true},
  phone: {type:String,required:true,unique : true},
});
mongoose.model('DeliveryPerson', DeliverPersonSchema);

module.exports = mongoose.model('DeliveryPerson');